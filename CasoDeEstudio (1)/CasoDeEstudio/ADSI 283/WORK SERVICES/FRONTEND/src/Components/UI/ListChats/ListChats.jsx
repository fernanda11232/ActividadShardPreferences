import React from 'react'
import { Loader } from 'semantic-ui-react'
import { size, map } from "lodash"
import { ChatItem } from '../ChatItem/ChatItem'

export function ListChats(props) {
    const { works, reload, onReload, click } = props

    if(!works) return <Loader active inline="centered" />
    if(size(works) === 0) return "No hay ningun trabajo"

  return map(works, (work) => <ChatItem click={click} key={work._id} work={work} onReload={onReload} />)
}