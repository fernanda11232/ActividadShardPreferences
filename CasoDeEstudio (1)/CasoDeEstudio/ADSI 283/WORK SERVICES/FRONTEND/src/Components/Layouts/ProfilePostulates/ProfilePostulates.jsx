import React, { useState, useEffect } from 'react'
import { HeaderHome } from '../HeaderHome/HeaderHome'
import { MenuLateral } from '../MenuLateral/MenuLateral'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../hooks'
import { User } from '../../../api'
import { ENV } from '../../../utils'

const userController = new User()

export function ProfilePostulates() {
    const [ user, setUser ] = useState(null)
    const { path } = useParams()
    const { accessToken } = useAuth()

    useEffect(() => {
        ((async () => {
            try {
                const response = await userController.getUserPath(accessToken, path)
                setUser(response)
            } catch (error) {
                console.error(error);
            }
        }))()
    },[path])

  return (
        <div id="Chat">
            <HeaderHome />
            <div className="containerChat">
                <div className='containMenuLateral'>
                    <MenuLateral />
                </div>
                <div className="profilePostulates">
                    <div className='cardProfile'>
                        <h2>{user ? `${user.firstname} ${user.lastname}` : ""}</h2>
                        <img className='imgProfilePostulate' src={user ? user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : "https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0" : ""} alt="" />
                        <p>{user ? `${user.email}` : ""}</p>
                        <p>Dato 3</p>
                        <p>Dato 4</p>
                    </div>
                </div>
            </div>
        </div>
  )
}
