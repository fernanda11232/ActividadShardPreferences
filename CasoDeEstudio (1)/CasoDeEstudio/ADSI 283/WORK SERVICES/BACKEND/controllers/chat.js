const Chat = require("../models/chat")

function saveMessage(req, res){
    const { id_Work, message, nameUser, date } = req.body

    const chat = new Chat({
        nameUser,
        id_Work,
        message,
        date,
    })

    chat.save((error, userStorage) => {
        if(error){
            res.status(400).send({msg: "Error al enviar mensaje"})
        } else {
            res.status(200).send(userStorage)
        }
    })
}

async function getMessages(req, res){
    const { path } = req.params

    let messages = Chat.find({id_Work: path})

    messages.sort().exec((error, message)=>{
        if(error){
            res.status(400).send({msg: "Error al cargar mensajes"})
        } else if(!message){
            res.status(401).send({msg: "No hay mensajes para mostrar"})
        }else{
            res.status(200).send(message)
        }
    })
}

async function deleteMessages(req, res){
    const { id } = req.params

    Chat.findByIdAndDelete(id, (error)=>{
        if(error){
            res.status(400).send({msg: "Error al eliminar mensaje"})
        }else{
            res.status(200).send({msg: "Mensaje eliminado"})
        }
    })
}

module.exports = {
    saveMessage,
    getMessages,
    deleteMessages
}