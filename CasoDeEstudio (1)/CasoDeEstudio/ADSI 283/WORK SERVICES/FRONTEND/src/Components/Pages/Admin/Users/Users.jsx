import React, { useState } from 'react'
import { Tab } from 'semantic-ui-react'
import { HeaderHome } from '../../../Layouts/HeaderHome/HeaderHome'
import { MenuLateral } from '../../../Layouts/MenuLateral/MenuLateral'
import { ListUser } from '../../../UI/ListUser/ListUser'

export function Users() {
  const [ reload, setReload ] = useState(false)
  const onReload = () => setReload((prevState) => !prevState)

  const panes = [
    {
      menuItem: "Usuarios activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUser usersActive={true} reload={reload} onReload={onReload} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Usuarios inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUser usersActive={false} reload={reload} onReload={onReload} />
        </Tab.Pane>
      )
    },
  ]

  return (
    <div id='usersAdmin'>
        <HeaderHome></HeaderHome>
        <div className='containerUsers'>
            <div className='containMenuLateral'>
                <MenuLateral />
            </div>
            <div className='users'>
              <div className='stateUsers'>
                <Tab className="tabUsers" menu={{ secondary: true }} panes={panes} /> 
              </div>
            </div>
        </div>
    </div>
  )
}
