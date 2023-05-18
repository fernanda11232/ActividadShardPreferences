const Work = require("../models/work")
const image = require("../utils/image")

async function getWorks(req, res){
    const { status } = req.query

    let response = null
    if(status == undefined){
        response = await Work.find()
    }else{
        response = await Work.find({status})
    }

    res.status(200).send(response)
}

function createWork(req, res){
    const { name, description, date, address, price, postulates, userWork } = req.body

    if(!name) res.status(400).send({msg: "El nombre del trabajo es obligatorio"})
    if(!description) res.status(400).send({msg: "La descripcion del trabajo es obligatoria"})
    if(!date) res.status(400).send({msg: "La fecha del trabajo es obligatoria"})
    if(!address) res.status(400).send({msg: "La direccion del trabajo es obligatoria"})
    if(!price) res.status(400).send({msg: "El pago del trabajo es obligatorio"})
    if(!postulates) res.status(400).send({msg: "El limite de postulaciones del trabajo es obligatorio"})

    const work = new Work({
        name,
        description,
        date,
        address,
        price,
        postulates,
        status: true,
        userWork,
    })

    if(req.files.imageWork){
        const imagePath = image.getFilePath(req.files.imageWork)
        work.imageWork = imagePath
    }

    work.save((error, userStorage) => {
        if (error) {
            res.status(400).send({msg: "Error al crear trabajo"})
        } else {
            res.status(200).send(userStorage)
        }
    })
}

function updateWork(req, res){
    const { id } = req.params
    const work = req.body

    if(req.files.imageWork){
        const imagePath = image.getFilePath(req.files.imageWork)
        work.imageWork = imagePath
    }

    Work.findByIdAndUpdate({_id: id}, work, (error)=>{
        if(error){
            res.status(400).send({msg: "Error al actualizar trabajo"})
        }else{
            res.status(200).send({msg: "Trabajo actualizado"})
        }
    })
}

function deleteWork(req, res){
    const { id } = req.params

    Work.findByIdAndDelete(id, (error)=>{
        if(error){
            res.status(400).send({msg: "Error al eliminar trabajo"})
        }else{
            res.status(200).send({msg: "Trabajo eliminado"})
        }
    })
}

function getWorkPath (req, res){
    const { id } = req.params

    Work.findOne({_id: id}, (error, postStored)=>{
        if(error){
            res.status(500).send({msg: "Error del servidor"})
        } else if(!postStored){
            res.status(400).send({msg: "No se ha encontrado ningun trabajo"})
        }else {
            res.status(200).send(postStored)
        }
    })
}

module.exports = {
    getWorks,
    createWork,
    updateWork,
    deleteWork,
    getWorkPath
}