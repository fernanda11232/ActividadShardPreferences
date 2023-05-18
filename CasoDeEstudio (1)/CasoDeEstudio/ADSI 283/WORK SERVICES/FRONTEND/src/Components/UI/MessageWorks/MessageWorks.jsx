import React, { useState } from 'react'
import ButtonForm from '../../UI/ButtonForm/ButtonForm'
import Modal from '../../UI/Modal/Modal'
import { Chat } from '../../../api'
import { useAuth } from '../../../hooks'

const chatController = new Chat()

export const MessageWorks = ({ content, style, dateTime, idMessage, statusMessage},props) => {
  const { accessToken } = useAuth()
  const [openModal, setOpenModal] = useState(false)

  const MessageButton = () => {
    openModal===false ? setOpenModal(true) : setOpenModal(false)
  }

  const btnDelete = async ()=>{
    await chatController.deleteMessages(accessToken, idMessage)
    statusMessage()
  }

  return (
    <div className={style}>

      <p className='message textMessage'>{content}</p>

      <div id='DateOptions'>
        <ButtonForm onClick={MessageButton} styleButton="arrowMessage" content={<span className="material-symbols-outlined">
          expand_more
        </span>} />

        <Modal styleModal={openModal} btnModal={btnDelete}/>

        <p className='message' id='dateText'>{dateTime}</p>
      </div>

    </div>
  )
}