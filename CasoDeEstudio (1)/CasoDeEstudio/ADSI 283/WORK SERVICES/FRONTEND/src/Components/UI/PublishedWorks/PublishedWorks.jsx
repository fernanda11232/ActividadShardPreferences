import React from 'react'
import { Loader } from 'semantic-ui-react'
import { size, map } from "lodash"
import { PublishedWorksItem } from '../PublishedWorksItem/PublishedWorksItem'

export function PublishedWorks(props) {
    const { works, onReload } = props

    if(!works) return <Loader active inline="centered" />
    if(size(works) === 0) return "No hay ningun trabajo"

  return map(works, (work) => <PublishedWorksItem key={work._id} work={work} onReload={onReload} />)
}