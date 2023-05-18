import React, { useState, useEffect } from 'react'
import { Button, Confirm } from 'semantic-ui-react'
import { BasicModal } from '../BasicModal/BasicModal'
import { WorkForm } from '../WorkForm/WorkForm'
import { ENV } from '../../../utils'
import { Work, Postulate } from '../../../api'
import { useAuth } from '../../../hooks'
import { Anclas } from '../Anclas/Anclas'
import { map } from 'lodash'

const postulateController = new Postulate()
const workController = new Work()

export function WorkItem(props) {
    const { work, onReload, postulate, horaActual } = props
    const useAuth2 = useAuth()
    const { user } = useAuth()

    const [ postul, setPostul ] = useState(false)

    const { accessToken } = useAuth()

    const [ showModal, setShowModal ] = useState("modalProfile2")
    const [ titleModal, setTitleModal ] = useState("")

    const [ showConfirm, setShowConfirm ] = useState(false)
    const [ confirmMessage, setConfirmMessage ] = useState("")
    const [ isDelete, setIsDelete ] = useState(false)
    
    const [ postulates, setPostulates ] = useState(null)

    let x = map(postulate, (post)=>{
        if(post.id_Work===work._id){
            return true
        }else{
            return false
        }
    })

    useEffect(()=>{
        (async () => {
            let horaTrabajo = Number(work.date.replace("T", " ").split("-").join("").split(":").join("").split(" ").join(""));
            if(work.status === true){
                if(horaActual>=horaTrabajo){
                    await workController.deleteWork(accessToken, work._id)
                }
            }
        })()
    },[])

    useEffect(()=>{
        setPostul(x.includes(true))
    },[x])

    useEffect(()=>{
        (async ()=>{
            if(user !== null){
                setPostulates(null)
                const response = await postulateController.getPostulatesMe(accessToken, user)
                setPostulates(response)
            }
        })()
    },[postulate, onReload])

    const onOpenCloseModal = () => setShowModal(showModal === "modalProfile2" ? "modalProfile3" : "modalProfile2")
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState)

    let roleUser = false
    let view = false

    if(useAuth2.user == null){
        // console.log("No hay usuario");
    } else {
        if(user.email === work.userWork){
            view=true
        }
        const { user: { role } } = useAuth2
        const isAdmin = role === "admin"
        roleUser=isAdmin
    }

  const openUpdateUser = () => {
    setTitleModal(`Actualizar ${work.name}`)
    onOpenCloseModal()
  }

  const openPostulateConfirm = () => {
    setIsDelete(false)
    setConfirmMessage(`¿Desea postularse a ${work.name}?`)
    onOpenCloseConfirm()
  }

  const openDeleteConfirm = () => {
    setIsDelete(true)
    setConfirmMessage(`Eliminar trabajo ${work.name}`)
    onOpenCloseConfirm()
  }

  const onPostulate = async () => {
    let y = []
    let validation1 = 0
    let validation2 = 0
    let validation3 = 0
    try {
        if(postulates !== []){
            map(postulates, (post) => {
                let splitPost = (post.date.split(" "))[1]
                let splitWork = (work.date.split(" "))[1]
                if(splitPost!==undefined){
                    validation1=Number(splitPost[0]+splitPost[1]+splitPost[3]+splitPost[4])
                    validation2=Number(splitWork[0]+splitWork[1]+splitWork[3]+splitWork[4])-200
                    validation3=Number(splitWork[0]+splitWork[1]+splitWork[3]+splitWork[4])+200
                }
                if((post.date.split(" "))[0] === (work.date.split(" "))[0] && (validation1>=validation2 && validation1<=validation3)){
                    y.push("si")
                }else{
                    y.push("no")
                }
            })
        }
        if(y.includes("si")){
            console.log("No agrega");
            y = []
            alert("No se puede")
        }else{
            console.log("Agrega");
            await postulateController.createPostulates(accessToken, user, work)
            work.postulates=Number(work.postulates)-1
            await workController.updateWork(accessToken, work._id, work)
        }
        onReload()
        onOpenCloseConfirm()
    } catch (error) {
        console.error(error);
    }
  }

  const onDelete = async () => {
    try {
      await workController.deleteWork(accessToken, work._id)
      onReload()
      onOpenCloseConfirm()
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  }

  function pathWork(){
    window.location.href=`${ENV.BASE_PATH}/trabajos/${work._id}`
  }

  return (
    <>
        <div className='CartaT'>
            <div className='work-item-info' onClick={pathWork}>
                <div className='work-image'>
                    <img className='imageWork' src={work.imageWork ? `${ENV.BASE_PATH}/${work.imageWork}` : "https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0"} alt="" />
                </div>
                <div className='work-text'>
                    <p>{work.name}</p>
                    <p>{work.description}</p>
                    <p>{work.date}</p>
                    <p>{work.address}</p>
                    <p>{work.price}</p>
                    <p>{work.postulates}</p>
                    <p>{work.userWork}</p>
                </div>
            </div>
            <div className='work-buttons'>
                {!user ? (
                    <>
                        {/* <Anclas estilos="anclaWorks" enlace="/auth/register" textoAncla="Registrate" /> */}
                    </>
                ) : (
                    <>
                    {roleUser ? (
                        <>
                            <Button onClick={openUpdateUser}>Editar</Button>
                            <Button onClick={openDeleteConfirm}>Eliminar</Button>
                        </>
                    ):(
                        <>
                        {view ? (
                                <>
                                <Button onClick={openUpdateUser}>Editar</Button>
                                <Anclas estilos="buttonPostulates" textoAncla="Postulados" enlace={`/trabajo/postulados/${work._id}`}></Anclas>
                                <Button onClick={openDeleteConfirm}>Eliminar</Button>
                                </>
                            ):(
                                <>
                                {postul ? (
                                    <>
                                    <p>Ya estas postulado</p>
                                    </>
                                ) : (
                                    <>
                                    {work.postulates > 0 ? <Button onClick={openPostulateConfirm}>Postularme</Button> : <p>Alcanzo el maximo de postulaciones</p>}
                                    </>
                                )}
                                </>
                            )}
                        </>
                    )}
                    </>
                )}
            </div>
        </div>
        <BasicModal show={showModal} title="Editar trabajo">
            <WorkForm close={onOpenCloseModal} onReload={onReload} work={work} />
        </BasicModal>
        <Confirm className='confirmModal' open={showConfirm} onCancel={onOpenCloseConfirm} 
            onConfirm={isDelete ? onDelete : onPostulate} 
            content={confirmMessage} size='mini' 
        />
    </>
  )
}
