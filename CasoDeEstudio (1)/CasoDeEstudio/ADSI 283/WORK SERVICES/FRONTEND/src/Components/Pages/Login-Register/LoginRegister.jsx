import React, { useState, useEffect } from 'react'
import ButtonForm from '../../UI/ButtonForm/ButtonForm'
import { Anclas } from '../../UI/Anclas/Anclas'
import InputRL from '../../UI/InputRL/InputRL'
import ImageBottomless from '../../UI/ImageBottomless/ImageBottomless'
import TitleWorkServices from '../../UI/TitleWorkServices/TitleWorkServices'
import { Auth } from "../../../api"
import { useAuth } from "../../../hooks"
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../UI/Loader/Loader'
import { ENV } from '../../../utils'

const authController = new Auth()

export const LoginRegister = () => {
    const [rotate, setRotate] = useState('container')
    const [animation, setAnimation] = useState('inputEmailLR')

    const btnRegister = () => {
        setRotate('container')
    }

    useEffect(()=>{
        window.location.href=`${ENV.BASE_PATH}/auth?#`
    },[])

    const btnLogin = () => {
        setRotate('container right-panel-active')
    }

    // useEffect(()=>{

    // },[value])

    // Login

    const navigate = useNavigate()
    const [emailLogin, newEmailLogin] = useState("")
    const [passwordLogin, newPasswordLogin] = useState("")
    const [loaderLogin, setLoaderLogin] = useState(null)

    const { login } = useAuth()
    const [errorLogin, newErrorLogin] = useState(null)

    let userLogin = {
        email: emailLogin,
        password: passwordLogin,
    }

    async function sendFormLogin() {
        try {
            if (userLogin.email === '') {
                newErrorLogin('Llene el campo "E-mail"')
            }
            else if (userLogin.password === '') {
                newErrorLogin('Llene el campo "contraseña"')
            } else {
                newErrorLogin(null)
                setLoaderLogin(true)
                const response = await authController.login(userLogin)
                console.log(response);

                authController.setAccessToken(response.access)
                authController.setRefreshToken(response.refresh)

                login(response.access)

                console.log("ENTRA");

                navigate("/")
                window.location.reload(false);
            }

        } catch (error) {
            setLoaderLogin(null)
            console.log(error);
            newErrorLogin(`${error.msg}`)
        }
    }

    //Register

    const [name, newName] = useState("")
    const [lastName, newLastName] = useState("")
    const [email, newEmail] = useState("")
    const [password, newPassword] = useState("")

    const [loaderRegister, setLoaderRegister] = useState(null)
    const [errorRegister, newErrorRegister] = useState(null)

    let userRegister = {
        firstname: name,
        lastname: lastName,
        email: email,
        password: password,
    }

    async function sendFormRegister() {
        try {
            if (userRegister.firstname === '') {
                newErrorRegister('Llene el campo "Nombre"')
            } else if (userRegister.lastname === '') {
                newErrorRegister('Llene el campo "Apellido"')
            } else if (userRegister.email === '') {
                newErrorRegister('Llene el campo "E-mail"')
            } else if(!userRegister.email.includes("@" && ".")){
                newErrorRegister("EL campo E-mail debe incluir '@' y '.'")
                console.log(errorRegister);
            } else if (userRegister.password === '') {
                newErrorRegister('Llene el campo "Contraseña"')
            } else {
                newErrorRegister(null)
                setLoaderRegister(true)
                await authController.register(userRegister)
                navigate("/auth")
            }
        } catch (error) {
            setLoaderRegister(null)
            newErrorRegister(`${error.msg}`)
        }
    }

    return (
        <div className={rotate} id="container">
            <div className="form-container register-container">
                <div className="logoCompany">
                    <ImageBottomless />
                    <TitleWorkServices />
                </div>
                <form action="#" className='formLR'>
                    <h1 className='titleLR'>Register here.</h1>
                    <InputRL value={name} type="text" style2='inputLR' textSpan="Nombre"
                        onChange={(e) => { newName(e.target.value) }}
                    />
                    <InputRL value={lastName} type="text" style2='inputLR' textSpan="Apellido"
                        onChange={(e) => { newLastName(e.target.value) }}
                    />
                    <InputRL value={email} type="text" style2='inputEmailLR' textSpan="E-mail"
                        onChange={(e) => { newEmail(e.target.value) }}
                    />
                    <InputRL value={password} type="password"  style2='inputLR' textSpan="Contraseña"
                        onChange={(e) => { newPassword(e.target.value) }}
                    />
                    <ButtonForm onClick={sendFormRegister} styleButton="buttonLR" content="Registrarse" />
                    <div id='loadLogin'>
                    {loaderRegister != null && <Loader />}
                    <p id='error'>{errorRegister}</p>
                </div>
                <div className='anclasRegister'>
                    <button className='Ancla' onClick={btnRegister}>¿Ya tienes cuenta?</button>
                </div>
                </form>
            </div>

            <div className="form-container login-container">
            <div className="logoCompany">
                        <ImageBottomless />
                        <TitleWorkServices />
                    </div>
                <form action="#" className='formLR'>
                    <h1 className='titleLR'>Login</h1>
                    <InputRL value={emailLogin} type="text" style2='inputEmailLR' textSpan="E-mail"
                        onChange={(e) => { newEmailLogin(e.target.value) }}
                    />
                    <InputRL value={passwordLogin} type="password" style2='inputLR' textSpan="Contraseña"
                        onChange={(e) => { newPasswordLogin(e.target.value) }}
                    />
                    <ButtonForm onClick={sendFormLogin} styleButton="buttonLR" content="Ingresar" />
                    <div id='loadLogin'>
                        {loaderLogin != null && <Loader />}
                        <p id='error'>{errorLogin}</p>
                    </div>
                    <div className='informationLogin'>
                        <button className='Ancla' onClick={btnLogin}>Crear Cuenta</button>
                        <Anclas
                            estilos="Ancla"
                            textoAncla="Recuperar contraseña"
                            enlace="/auth/recoverPassword"
                        />
                    </div>
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1 className="titleGhost">Descubre tu camino ahora</h1>
                        <p className='textLR'>Si tienes una cuenta, inicia sesión aquí</p>
                        <button className="ghost" onClick={btnRegister}>Iniciar Sesión</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1 className="titleGhost">Hola de nuevo</h1>
                        <p className='textLR'>Si aún no tienes cuenta, Únete a nosotros y comienza tu viaje</p>
                        <button className="ghost" onClick={btnLogin}>Registrarse</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
