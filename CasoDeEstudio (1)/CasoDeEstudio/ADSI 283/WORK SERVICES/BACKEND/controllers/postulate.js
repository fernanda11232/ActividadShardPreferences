const Postulate = require("../models/postulate")

async function getPostulatesMe(req, res){
    const { emailUser } = req.query

    const response = await Postulate.find({userPostulate: emailUser})

    if(!response){
        res.status(400).send({msg:"No se ha encontrado ninguna postulacion"})
    } else {
        res.status(200).send(response)
    }
}

function createPostulates(req, res) {
    //Requerimos el id del trabajo
    const { userPostulate, id_Work, date } = req.body

    console.log(req.body);
    const postulate = new Postulate({
        id_Work,
        userPostulate,
        date,
    })

    postulate.save((error, userStorage) => {
        if(error){
            console.error(error);
            res.status(400).send({msg: "Error al crear la postulacion"})
        } else {
            res.status(200).send(userStorage)
        }
    })
}

function deletePostulate(req, res){
    const { id } = req.params

    Postulate.findByIdAndDelete(id, (error)=>{
        if(error){
            res.status(400).send({msg: "Error al eliminar postulacion"})
        }else{
            res.status(200).send({msg: "Postulacion cancelada"})
        }
    })
}

function getPostulationPath (req, res){
    const { path } = req.params

    Postulate.find({id_Work: path}, (error, postStored)=>{
        if(error){
            res.status(500).send({msg: "Error del servidor"})
        } else if(!postStored){
            res.status(400).send({msg: "No se ha encontrado ningun post"})
        }else {
            res.status(200).send(postStored)
        }
    })
}

module.exports = {
    getPostulatesMe,
    createPostulates,
    deletePostulate,
    getPostulationPath,
}