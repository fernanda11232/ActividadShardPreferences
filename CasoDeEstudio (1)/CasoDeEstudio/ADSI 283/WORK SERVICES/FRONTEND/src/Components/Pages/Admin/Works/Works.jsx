import React from 'react'
import { HeaderHome } from '../../../Layouts/HeaderHome/HeaderHome'
import { MenuLateral } from '../../../Layouts/MenuLateral/MenuLateral'

export function Works() {
  return (
    <div id='worksAdmin'>
        <HeaderHome></HeaderHome>
        <div className='containerWorks'>
            <div className='containMenuLateral'>
                <MenuLateral />
            </div>
            <div className='works'>
                <h2>Aqui van los works</h2>
            </div>
        </div>
    </div>
  )
}
