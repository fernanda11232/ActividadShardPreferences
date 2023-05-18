import React from 'react'

const InputName = ({content,type,style2,onChange}) => {
  return (
    <input onChange={onChange} className={style2} type={type} placeholder={content}/>
  )
}

export default InputName
