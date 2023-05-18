import React, { useState } from 'react'
import { Button } from "semantic-ui-react"
import { ListWorks } from '../../UI/ListWorks/ListWorks'
import { WorkForm } from '../../UI/WorkForm/WorkForm'
import { BasicModal } from '../../UI/BasicModal/BasicModal'

export const ContenidoCentral = (props) => {
  const [ showModal, setShowModal ] = useState("modalProfile2")
  const [ reload, setReload ] = useState(false)

  // const [ reload, setReload ] = useState("modalProfile")

  const onOpenCloseModal = () => setShowModal(showModal === "modalProfile2" ? "modalProfile3" : "modalProfile2")
  const onReload = () => setReload((prevState) => !prevState)

  return (
    <div className='PContainer'>
      <section className='ContenidoCentral'>
        {/* <Button className='btnCreateWork' onClick={onOpenCloseModal}>
        Nuevo trabajo</Button> */}
        <ListWorks datos={props.datos} worksActive={true} reload={reload} onReload={onReload} />
      </section>
      <BasicModal show={showModal} title="Publicar trabajo">
        <WorkForm close={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </div>
  )
}