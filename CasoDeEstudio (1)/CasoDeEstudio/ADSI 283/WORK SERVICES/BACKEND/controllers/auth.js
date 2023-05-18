const bcrypt = require('bcryptjs')
const User = require('../models/user')
const nodemailer = require("nodemailer")

const jwt = require('../utils/jwt')

function register(req, res){
    const {firstname, lastname, email, password} = req.body

    if(!email) res.status(400).send({msg: "El email es obligario"})
    if(!password) res.status(400).send({msg: "La constraseña es obligatoria"})

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,
        password
    })

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    user.password = hashPassword

    user.save((error, userStorage) => {
        if (error) {
            res.status(400).send({msg: "Error al crear usuario"})
        } else {
            res.status(200).send(userStorage)
        }
    })
}

function login(req, res){
    const { email, password } = req.body

    if(!email) res.status(400).send({msg: "El email es obligatorio"})
    if(!password) res.status(400).send({msg: "La contraseña es obligatoria"})

    const emailLowerCase = email.toLowerCase()

    User.findOne({ email: emailLowerCase }, (error, userStore)=>{
    if(userStore){
        if(error){
            res.status(401).send({msg: "Error del servidor"})
        }else{
            bcrypt.compare(password, userStore.password, (bcryptError, check)=>{
                if(bcryptError){
                    res.status(500).send({msg: "Error del servidor"})
                }else if(!check){
                    res.status(400).send({msg: "Contraseña incorrecta"})
                }else if(!userStore.active){
                    res.status(401).send({msg: "Usuario no autorizado"})
                }else{
                    res.status(200).send({
                        access: jwt.createAccesToken(userStore),
                        refresh: jwt.createRefreshToken(userStore)
                    })
                }
            })
        }
    }else{
        res.status(400).send({msg: "El usuario no existe"})
    }
    })
}

function recoverPassword(req, res){
    const { email } = req.body

    if(!email) res.status(400).send({msg: "Debe ingresar el email"})
    const emailLowerCase = email.toLowerCase()    

    User.findOne({email: emailLowerCase}, async (error, userStore)=>{
        let newPassword = `${userStore.firstname}${userStore.lastname}05`
        if(error){
            res.status(401).send({msg: "Error del servidor"})
        }else{
            let config = {
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                  user: "workservices283@gmail.com", // generated ethereal user
                  pass: "svblwrtuomoqlgkg", // generated ethereal password
                },
              }
              let mensaje = {
                from: 'workservices283@gmail.com', // sender address
                to: userStore.email, // list of receivers
                subject: "Recuperacion de contraseña Work Services", // Subject line
                text: `¿Hola ${userStore.firstname}, has olvidado tu contraseña? \nPara ingresar a tu cuenta Work Services deberas usar esta contraseña: 
Tu nueva contraseña es: ${newPassword} \n\n Cuado ingreses no olvides cambiar tu contraseña a una nueva contraseña que no olvides`
              }

              const transport = nodemailer.createTransport(config)
              const info = await transport.sendMail(mensaje)
            //   console.log(info)

            if(newPassword){
                const salt = bcrypt.genSaltSync(10)
                const hashPassword = bcrypt.hashSync(newPassword, salt)
                newPassword = hashPassword
            }
            console.log(newPassword);

              User.updateOne({email: emailLowerCase}, { $set: { password: newPassword } }, async (error)=>{
                if(error){
                    res.status(400).send({msg: "Error del servidor"})
                }else{
                    res.status(200).send(userStore)
                }
              })
        }
    })
}

function refreshAccesToken(req, res){
    const { token } = req.body

    if(!token) res.status(400).send({msg: "Token requerido"})

    const { user_id } = jwt.decoded(token)

    User.findOne({_id: user_id}, (error, userStorage)=>{
        if(error){
            res.status(400).send({msg: "Error del servidor"})
        }else{
            res.status(200).send({accessToken: jwt.createAccesToken(userStorage)})
        }
    })
}

module.exports = {
    register,
    login,
    refreshAccesToken,
    recoverPassword,
}