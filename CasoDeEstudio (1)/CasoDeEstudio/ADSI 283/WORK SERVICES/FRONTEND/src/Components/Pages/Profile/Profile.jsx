import React from 'react'
import { ContainerProfile } from '../../Layouts/ContainerProfile/ContainerProfile'
import { HeaderHome } from '../../Layouts/HeaderHome/HeaderHome'
import { MenuLateral } from '../../Layouts/MenuLateral/MenuLateral'

export const Profile = () => {
  return (
    <div className='Profile'>
        <HeaderHome />
        <div className='containPerfil'>
          <div className='containMenuLateral'>
              <MenuLateral />
          </div>
          <ContainerProfile/>
        </div>
    </div>
  )
}
