import React, { useState, useEffect } from 'react'
import { Anclas } from '../../UI/Anclas/Anclas'
import { Button } from "semantic-ui-react"
import { User } from "../../../api";
import { useAuth } from "../../../hooks"
import { BasicModal } from '../../UI/BasicModal/BasicModal';
import { UserForm } from '../../UI/UserForm/UserForm';
import { ENV } from '../../../utils';

const userController = new User()

export const ContainerProfile = () => {
  const [ user, setUser ] = useState(null)
  const { accessToken } = useAuth()

  const [ reload, setReload ] = useState(false)
  const onReload = () => setReload((prevState) => !prevState)

  const [ showModal, setShowModal ] = useState("modalProfile2")
  const [ titleModal, setTitleModal ] = useState("")

  const onOpenCloseModal = () => setShowModal(showModal === "modalProfile2" ? "modalProfile3" : "modalProfile2")

  useEffect(() => {
    (async () => {
      try {
        setUser(null)
        const response = await userController.getMe(accessToken)
        setUser(response)
      } catch (error) {
        console.error(error);
      }
    })()
  },[reload])

  const openUpdateUser = () => {
    setTitleModal(`Actualizar ${user.email}`)
    onOpenCloseModal()
  }

  return (
    <>
      <div id='ProfileMain'>
      {/* Perfil parte Izquierda */}
      <section id='ProfileLeft'>
        <div id='UserProfileUp'>
          <img id='imgUser' src={user ? `${ENV.BASE_PATH}/${user.avatar}` : "https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0"} alt="" />
          <p>{user ? `${user.firstname} ${user.lastname}` : ""}</p>
        </div>
        <div id='UserProfileDown'>
          <div id='anchorsInfo'>
            <Anclas
              estilos="AnInfo"
              enlace=""
              textoAncla="⭐⭐⭐⭐⭐"
            />
          </div>
        </div>
      </section>

      {/* Perfil parte Derecha */}
      <section id='ProfileRight'>
        <Button className="AnOptions" onClick={openUpdateUser} >Mis Datos</Button>
        <Anclas
          estilos="AnOptions"
          enlace=""
          textoAncla="Configuracion"
        />
        <Anclas
          estilos="AnOptions"
          enlace=""
          textoAncla="Seguridad"
        />
        <Anclas
          estilos="AnOptions"
          enlace=""
          textoAncla="Otros..."
        />
      </section>
      </div>
      <BasicModal show={showModal} title="Editar perfil">
        <UserForm close={onOpenCloseModal} onReload={onReload} user={user} />
      </BasicModal>
    </>
  )
}
