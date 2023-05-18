import React from 'react'
import { Modal } from "semantic-ui-react"

export function BasicModal(props) {
    const { show, title, children } = props
  return (
    <div className={show}>
        {title && <h2>{title}</h2>}
        <div className='dateModal'>{children}</div>
    </div>
  )
}