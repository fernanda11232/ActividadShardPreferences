import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import { useAuth } from '../../../hooks'

export function ChatItem(props) {
    const { work, onReload, click } = props
    const { user } = useAuth()
    const [ workSelect, setWorkSelect ] = useState("")

    let view = false
    if(user.email === work.userWork || user.email === work.userPostulate){
        view = true
    }
    function infoWork(){
        props.click(`${work._id}`, `${work.name}`)
        setWorkSelect(`${work._id}`)
    }

    if(view){
        return (
            <Button className="chatWorks" onClick={infoWork}>
                <p>{`${work.name} ${work.userWork} ${work.userPostulate}`}</p>
            </Button>
        )
    }else{
        return(
            <></>
        )
    }
}
