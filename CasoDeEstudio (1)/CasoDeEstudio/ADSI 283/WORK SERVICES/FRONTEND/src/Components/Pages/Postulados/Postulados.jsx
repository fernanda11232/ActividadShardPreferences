import React, { useState, useEffect } from 'react'
import { HeaderHome } from '../../Layouts/HeaderHome/HeaderHome'
import { MenuLateral } from '../../Layouts/MenuLateral/MenuLateral'
import TitleRegister from '../../UI/TitleRegister/TitleRegister'
import { ListPostulates } from '../../UI/ListPostulates/ListPostulates'
import { useParams } from 'react-router-dom'
import { Postulate, User } from '../../../api'
import { useAuth } from '../../../hooks'

const postulateController = new Postulate()
const userController = new User()

export const Postulados = () => {
    const [ postulates, setPostulates ] = useState(null)
    const [ users, setUsers ] = useState(null)
    const { path } = useParams()
    const { accessToken } = useAuth()

    useEffect(() => {
        ((async () => {
            try {
                const response = await postulateController.getPostulationPath(accessToken, path)
                setPostulates(response)
            } catch (error) {
                console.error(error);
            }
        }))()
    },[path])

    useEffect(()=>{
        ((async () => {
            try {
                const response = await userController.getUsers(accessToken, true)
                setUsers(response)
            } catch (error) {
                console.error(error);
            }
        }))()
    }, [path])
    
    return (
        <div className="principalPostulados">
            <HeaderHome />
            <div className="contenido">
                <div className='containMenuLateral'>
                    <MenuLateral />
                </div>
                <div className="centralPostulados">
                <TitleRegister content={"Personas Postuladas"}/>
                <ListPostulates postulates={postulates} users={users} path={path} />
                </div>
            </div>
        </div>
    )
}
