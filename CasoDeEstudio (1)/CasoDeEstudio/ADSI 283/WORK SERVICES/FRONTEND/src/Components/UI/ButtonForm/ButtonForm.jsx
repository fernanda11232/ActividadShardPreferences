import React from 'react'

export default function ButtonForm({content, styleButton, onClick}) {
  return (
    <button onClick={onClick} className={styleButton}>{content}</button>
  )
}