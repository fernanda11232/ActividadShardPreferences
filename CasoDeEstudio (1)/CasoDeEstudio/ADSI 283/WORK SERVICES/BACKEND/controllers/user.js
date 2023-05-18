const User = require("../models/user")
const bcrypt = require("bcryptjs")
const image = require("../utils/image")

async function getMe(req, res) {
    const { user_id } = req.user;

    const response = await User.findById(user_id)

    if(!response){
        res.status(400).send({msg:"No se ha encontrado usuario"})
    } else {
        res.status(200).send(response)
    }
}

async function getUsers(req, res){
    const { active } = req.query

    let response = null
    if(active == undefined){
        response = await User.find()
    }else{
        response = await User.find({active})
    }

    res.status(200).send(response)
}

function createUsers(req, res){
    const { password } = req.body
    const user = new User({...req.body, active: true})

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    user.password = hashPassword

    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar)
        user.avatar = imagePath
    }
    user.save((error, userStored) => {
        if(error){
            res.status(400).send({msg: "Error al crear usuario"})
        } else {
            res.status(200).send(userStored)
        }
    })
}

function updateUsers(req, res){
    const { id } = req.params
    const user = req.body

    if(user.password){
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(user.password, salt)

        user.password = hashPassword
    } else {
        delete user.password
    }
    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar)
        user.avatar = imagePath
    }

    User.findByIdAndUpdate({_id: id}, user, (error)=>{
        if(error){
            res.status(400).send({msg: "Error al actualizar usuario"})
        }else{
            res.status(200).send({msg: "Usuario actualizado"})
        }
    })
}

function deleteUsers(req, res){
    const { id } = req.params

    User.findByIdAndDelete(id, (error)=>{
        if(error){
            res.status(400).send({msg: "Error al eliminar usuario"})
        }else{
            res.status(200).send({msg: "Usuario eliminado"})
        }
    })
}

function getUserPath (req, res){
    const { path } = req.params

    User.findOne({_id: path}, (error, postStored)=>{
        if(error){
            res.status(500).send({msg: "Error del servidor"})
        } else if(!postStored){
            res.status(400).send({msg: "No se ha encontrado ningun usuario"})
        }else {
            res.status(200).send(postStored)
        }
    })
}

module.exports = {
    getMe,
    createUsers,
    updateUsers,
    getUsers,
    deleteUsers,
    getUserPath,
}