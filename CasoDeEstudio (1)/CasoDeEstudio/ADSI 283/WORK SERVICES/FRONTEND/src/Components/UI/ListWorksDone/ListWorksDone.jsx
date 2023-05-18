import React from 'react'
import { Loader } from 'semantic-ui-react'
import { size, map } from "lodash"
import { WorksDoneItem } from '../WorksDoneItem/WorksDoneItem'

export function ListWorksDone(props) {
    const { works, onReload } = props

    if(!works) return <Loader active inline="centered" />
    if(size(works) === 0) return "No hay ningun trabajo"

  return map(works, (work) => <WorksDoneItem key={work._id} work={work} onReload={onReload} />)
}