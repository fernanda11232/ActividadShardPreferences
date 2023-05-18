import React, { useState, useEffect } from 'react'
import { Image, Button, Confirm } from 'semantic-ui-react'
import { ENV } from '../../../utils'
import { User } from '../../../api'
import { useAuth } from '../../../hooks'

const userController = new User()

export function UserItem(props) {
    const { user, onReload } = props
    const { accessToken } = useAuth()

    const [ showConfirm, setShowConfirm ] = useState(false)
    const [ confirmMessage, setConfirmMessage ] = useState("")
    const [ isDelete, setIsDelete ] = useState(false)

    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState)

    // useEffect(()=>{
    //     if(showConfirm){
    //         const x = document.getElementById("usersAdmin")
    //         x.style.opacity=0.5
    //     }else{
    //         const x = document.getElementById("usersAdmin")
    //         x.style.opacity=10
    //     }
    // },[showConfirm])

  const openDesactivateActivateConfirm = () => {
    setIsDelete(false)
    setConfirmMessage(user.active ? `Desactivar usuario ${user.email}` : `Activar usuario ${user.email}`)
    onOpenCloseConfirm()
  }

  const onActivateDesactivate = async () => {
    try {
      await userController.updateUser(accessToken, user._id, {
        active: !user.active
      })
      onReload()
      onOpenCloseConfirm()
    } catch (error) {
      console.error(error);
    }
  }

  const openDeleteConfirm = () => {
    setIsDelete(true)
    setConfirmMessage(`Eliminar usuario ${user.email}`)
    onOpenCloseConfirm()
  }

  const onDelete = async () => {
    try {
      await userController.deleteUser(accessToken, user._id)
      onReload()
      onOpenCloseConfirm()
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
        <div className='user-item'>
            <div className='user-item__info'>
                <Image avatar src={user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : "https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0"} />
                <div>
                    <p>{user.firstname} {user.lastname}</p>
                    <p>{user.email}</p>
                </div>
            </div>
            <div className='btnIcon'>
                <Button icon onClick={openDesactivateActivateConfirm}>
                    <span title={user.active ? "Desactivar Usuario" : "Activar Usuario"} id={user.active ? "spanEdit1" : "spanEdit2"} 
                        className="material-symbols-outlined">{user.active ? "toggle_on" : "toggle_off"}
                    </span>
                </Button>
                <Button icon onClick={openDeleteConfirm}>
                    <span title='Eiminar Usuario' id='spanDrop' className="material-symbols-outlined">close</span>
                </Button>
            </div>
        </div>
        <Confirm className='confirmModal' open={showConfirm} onCancel={onOpenCloseConfirm} 
            onConfirm={isDelete ? onDelete : onActivateDesactivate} 
            content={confirmMessage} size='mini' 
        />
    </>
  )
}
