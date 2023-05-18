import React, { useState } from 'react'
import { HeaderHome } from '../../Layouts/HeaderHome/HeaderHome'
import { Principal } from '../../Layouts/Principal/Principal'

export const Home = () => {
  const [data, setData] = useState("");

  const catchValue = (valueHeaderHome) => {
    setData(valueHeaderHome);
  };

  return (
    <div className='body'>
        <HeaderHome sendValue={catchValue}/>
        <Principal datos={data}/>
    </div>
  )
}