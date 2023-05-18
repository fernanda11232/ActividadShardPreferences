import React, { useState } from 'react'
import { HeaderHome } from '../HeaderHome/HeaderHome'
import { MenuLateral } from '../MenuLateral/MenuLateral'
import { ListPostulation } from '../../UI/ListPostulation/ListPostulation'

export const Postulation = () => {
  const [ reload, setReload ] = useState(false)
  const onReload = () => setReload((prevState) => !prevState)

  const [data, setData] = useState("");

  const catchValue = (valueHeaderHome) => {
    setData(valueHeaderHome);
  };

  return (
    <div className='viewPostulation'>
      <HeaderHome sendValue={catchValue}></HeaderHome>
      <div className="containPostulation">
        <div className='containMenuLateral'>
          <MenuLateral />
        </div>
        <div className='peoplePostulated'>
          <ListPostulation datos={data} worksActive={true} reload={reload} onReload={onReload} />
        </div>
      </div>
    </div>
  )
}