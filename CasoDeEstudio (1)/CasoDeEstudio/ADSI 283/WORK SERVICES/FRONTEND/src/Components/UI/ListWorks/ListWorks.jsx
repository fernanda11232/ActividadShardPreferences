import React, { useState, useEffect } from 'react'
import { Loader } from 'semantic-ui-react'
import { size, map } from "lodash"
import { Work, Postulate } from '../../../api'
import { WorkItem } from '../WorkItem/WorkItem'
import { useAuth } from '../../../hooks'

const workController = new Work()
const postulateController = new Postulate()

export function ListWorks(props) {
    const { worksActive, reload, onReload, datos} = props
    const [ works, setWorks ] = useState(null)
    const [ postulates, setPostulates ] = useState(null)
    const [ search, setSearch] = useState([])
    const { user, accessToken } = useAuth()

    useEffect(() => {
        (async () => {
            try {
                if(user === null){
                    console.log("No hay usuario");
                } else {                    
                    setPostulates(null)
                    const response = await postulateController.getPostulatesMe(accessToken, user)
                    setPostulates(response)
                }
            } catch (error) {
                console.error(error);
            }
        })()
    }, [worksActive, reload])

    useEffect(() => {
        (async () => {
            try {
                setWorks(null)
                const response = await workController.getWorks(worksActive)

                if(user !== null){
                    const sortedJobs = response.sort((jobA, jobB) => {
                        if (jobA.userWork === user.email) {
                            return -1;
                        } else if (jobB.userWork === user.email) {
                            return 1;
                        }
                        return 0;
                    });
                    
                    setWorks(sortedJobs)
                    setSearch(sortedJobs)
                }else{
                    setWorks(response)
                    setSearch(response)
                }
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    //Filtro

    useEffect(()=>{
        if(works!==null){
            filterWorks(datos)
        }
    },[datos])

    let result = ""

    const filterWorks = (datos) =>{
        if(datos!==""){
            result = works.filter((Element)=>{
                // console.log(works);
                let Names = Element.name || ""
                let Users = Element.userWork || ""
                if(Names.toLowerCase().includes(datos.toLowerCase()) || Users.toLowerCase().includes(datos.toLowerCase())){
                    return Element
                }
            })
            setSearch(result)
        }else{
            setSearch(works)
        }
    }

    const [showResult,setShowResult] = useState(false)

    //si el array result esta vacio es true
    useEffect(()=>{
        if(result === ""){
            if(search.length === 0){
                setShowResult(true)
            }else if(search.length >=1){
                setShowResult(false)
            }
        }
    },[search])

    if(!works) return <Loader active inline="centered" />
    if(size(works) === 0) return "No hay ningun trabajo"

    let dateActuality = new Date()
    let horaActual = Number(dateActuality.toISOString().slice(0, 16).split("-").join("").split(":").join("").split("T").join(""))-500;

  return (
    <>
        {showResult ? <p id='noResults'>No se han encontrado resultados por {datos}</p> : 
        map(search, (work) => <WorkItem horaActual={horaActual} key={work._id} work={work} onReload={onReload} postulate={map(postulates,(postulate)=>{return postulate})} />)
        }
    </>
  )
}