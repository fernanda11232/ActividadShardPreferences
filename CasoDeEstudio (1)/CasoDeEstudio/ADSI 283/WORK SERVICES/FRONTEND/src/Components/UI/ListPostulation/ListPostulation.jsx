import React, { useState, useEffect } from 'react'
import { Loader } from 'semantic-ui-react'
import { size, map } from "lodash"
import { Work, Postulate } from '../../../api'
import { useAuth } from '../../../hooks'
import { PostulationItem } from '../PostulationItem/PostulationItem'

const workController = new Work()
const postulateController = new Postulate()

export function ListPostulation(props) {
    const { worksActive, reload, onReload, datos } = props
    const [ works, setWorks ] = useState(null)
    const [ postulates, setPostulates ] = useState(null)
    const [ search, setSearch] = useState(works)

    const { user, accessToken } = useAuth()

    useEffect(()=>{
        if(works!==null){
            filterWorks(datos)
        }
    },[datos])

    const filterWorks = (datos) =>{
        if(datos!==""){
            let result = works.filter((Element)=>{
                let Names = Element.name || ""
                let Users = Element.userWork || ""
                if(Names.toLowerCase().includes(datos.toLowerCase()) || Users.toLowerCase().includes(datos.toLowerCase())){
                    return Element
                }else{
                    console.log("No encuentra resultados");
                }
            })
            setSearch(result)
        }else{
            setSearch(works)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                setPostulates(null)
                const response = await postulateController.getPostulatesMe(accessToken, user)
                setPostulates(response)
            } catch (error) {
                console.error(error);
            }
        })()
    }, [reload])

    useEffect(() => {
        (async () => {
            try {
                setWorks(null)
                const response = await workController.getWorks(worksActive)
                setWorks(response)
                setSearch(response)
            } catch (error) {
                console.error(error);
            }
        })()
    }, [worksActive, reload])

    if(!works) return <Loader active inline="centered" />
    if(size(works) === 0) return "No hay ningun trabajo"

  return map(search, (work) => <PostulationItem key={work._id} work={work} onReload={onReload} postulate={map(postulates,(postulate)=>{return postulate})} />)
}