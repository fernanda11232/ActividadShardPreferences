import React from 'react'
import { Link } from "react-router-dom"

export const Anclas = ({title,estilos,enlace,textoAncla}) => {
  return (
    <Link title={title} to={enlace} className={estilos}>{textoAncla}</Link>
  )
}
