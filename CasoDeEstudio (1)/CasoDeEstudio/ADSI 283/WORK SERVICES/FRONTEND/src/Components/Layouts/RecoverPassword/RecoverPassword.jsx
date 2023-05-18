import React, { useState, useEffect } from 'react'
import ImageBottomless from '../../UI/ImageBottomless/ImageBottomless'
import TitleWorkServices from '../../UI/TitleWorkServices/TitleWorkServices'
import TitleRegister from '../../UI/TitleRegister/TitleRegister'
import InputName from '../../UI/InputName/InputName'
import ButtonForm from '../../UI/ButtonForm/ButtonForm'
import { Anclas } from '../../UI/Anclas/Anclas'
import { Auth } from '../../../api'
import { useNavigate } from 'react-router-dom'
import { ENV } from '../../../utils'

const authController = new Auth()

export function RecoverPassword() {
    const navigate = useNavigate()
    const [ email, newEmail ] = useState("")
    const [error, newError] = useState("")
  
    let user = {
      email: email,
    }
  
    async function sendForm(){
        alert("Work Services te enviara un correo para que recuperes tu contraseña")
      try {
        newError("")
        await authController.recoverPassword(user.email)
        window.location.href = `${ENV.BASE_PATH}/auth?#`;
      } catch (error) {
        newError(`${error.msg}`)
      }
    }
  
    return (
        <div id='Login'>
            <div className='containerLogin'>
                <div className='LoginCard'>
                <div className="logoCompany">
                    <ImageBottomless />
                    <TitleWorkServices />
                </div>
                <div className='formLogin'>
                    <TitleRegister content="Recuperar contraseña"/>
                    <InputName value={email} style2="inputLogin" type="email" content="E-mail"
                    onChange={(e)=>{newEmail(e.target.value)}}
                    />
                    <ButtonForm onClick={sendForm} styleButton="btnLogin" content="Recuperar" />
                    <p>{error}</p>
                    <div className='informationLogin'>
                    <Anclas
                        estilos="Ancla" 
                        textoAncla="Ingresar"
                        enlace="/auth"
                    />
                    </div>
                </div>
                </div>
                <div className='containImgLogin'>
                <img className='imgLogin' src="" alt="" />
                </div>
            </div>
        </div>
    )
}
