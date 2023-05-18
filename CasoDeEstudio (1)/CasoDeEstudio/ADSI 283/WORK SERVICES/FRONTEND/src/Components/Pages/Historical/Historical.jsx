import React, { useState, useEffect } from 'react'
import { HeaderHome } from '../../Layouts/HeaderHome/HeaderHome'
import { MenuLateral } from '../../Layouts/MenuLateral/MenuLateral'
import { Tab } from 'semantic-ui-react'
import { Work } from '../../../api'
import { ListWorksDone } from '../../UI/ListWorksDone/ListWorksDone'
import { PublishedWorks } from '../../UI/PublishedWorks/PublishedWorks'

const workController = new Work()

export function Historical() {
    const [ reload, setReload ] = useState(false)
    const onReload = () => setReload((prevState) => !prevState)
    const [ works, setWorks ] = useState(null)

    const [activeIndex, setActiveIndex] = useState(0)
    const [data, setData] = useState("");

    useEffect(() => {
        (async () => {
            try {
                setWorks(null)
                const response = await workController.getWorks(false)
                setWorks(response)
            } catch (error) {
                console.error(error);
            }
        })()
    }, [reload])
  
    const catchValue = (valueHeaderHome) => {
      setData(valueHeaderHome);
    };
    const panes = [
        {
          menuItem: "Trabajos publicados",
          render: () => (
            <Tab.Pane>
                <div className='workDone'>
                    <ListWorksDone works={works} onReload={onReload} />
                </div>
            </Tab.Pane>
          )
        },
        {
            menuItem: "Trabajos realizados",
            render: () => (
                <Tab.Pane>
                <div className='workDone'>
                    <PublishedWorks works={works} onReload={onReload} />
                </div>
            </Tab.Pane>
          )
        },
      ]

  return (
    <div className='viewPostulation'>
      <HeaderHome sendValue={catchValue}></HeaderHome>
      <div className="containPostulation">
        <div className='containMenuLateral'>
          <MenuLateral />
        </div>
        <div className='peoplePostulated'>
            <Tab 
                panes={panes} 
                className="auth__forms" 
                activeIndex={activeIndex}
                onTabChange={(_, data)=>setActiveIndex(data.activeIndex)}
            />
        </div>
      </div>
    </div>
  )
}
