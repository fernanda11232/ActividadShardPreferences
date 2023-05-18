import React from 'react'
import { HeaderHome } from '../../../Layouts/HeaderHome/HeaderHome'
import { MenuLateral } from '../../../Layouts/MenuLateral/MenuLateral'

export function Reports() {
  return (
    <div id='reportsAdmin'>
        <HeaderHome></HeaderHome>
        <div className='containerReports'>
            <div className='containMenuLateral'>
                <MenuLateral />
            </div>
            <div className='reports'>
                <h2>Aqui van los reports</h2>
            </div>
        </div>
    </div>
  )
}
