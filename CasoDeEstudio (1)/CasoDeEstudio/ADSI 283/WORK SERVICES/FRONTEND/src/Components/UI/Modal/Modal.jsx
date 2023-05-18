import React from 'react'
import ButtonForm from '../ButtonForm/ButtonForm'

const Modal = ({styleModal,btnModal}) => {

  return (
    <div className={`ModalMessage ${styleModal ===true ? "ModalShow" : "ModalHide"}`}>
        <ButtonForm onClick={btnModal} styleButton="btnDelete" content={"Eliminar mensaje"} />
    </div>
  )
}

export default Modal

