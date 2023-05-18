import React from 'react'
import { ENV } from '../../../utils'
import { useAuth } from '../../../hooks'

export function PublishedWorksItem(props) {
    const { work, onReload, search } = props
    const { user } = useAuth()
  return (
    <>
        {work.userPostulate === user.email ? 
        <div className='CartaT'>
            <div className='work-item-info'>
                <div className='work-image'>
                    <img className='imageWork' src={work.imageWork ? `${ENV.BASE_PATH}/${work.imageWork}` : "https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0"} alt="" />
                </div>
                <div className='work-text'>
                    <p>{work.name}</p>
                    <p>{work.description}</p>
                    <p>{work.date}</p>
                    <p>{work.address}</p>
                    <p>{work.price}</p>
                    <p>{work.postulates}</p>
                    <p>{work.userWork}</p>
                </div>
            </div>
        </div>: ""}
    </>
  )
}
