const Favorite = require('../models/favorite')

async function getFavorites(req, res){
    const { emailUser } = req.query

    const response = await Favorite.find({User:emailUser})

    if(!response){
        res.status(400).send({msg: "no se ha encontrado ningun favorito"})
    }else{
        res.status(200).send({msg:""})
    }
}

async function createFavorite(req, res){

    const {User, work} = req.body

    const favorite = {
        User: User,
        work: work
    }

    favorite.save((error, favoriteStorge) =>{
        if(error){
            res.status(400).send({msg: error})
        }else{
            res.status(201).send(favoriteStorge)
        }
    } )
}