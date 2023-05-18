import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HeaderHome } from '../HeaderHome/HeaderHome';
import { MenuLateral } from '../MenuLateral/MenuLateral';
import { Work } from '../../../api';
import { TextWork } from '../../UI/TextWork/TextWork';

const workController = new Work()

export function WorksPath() {
    const { path } = useParams()
    const [ work, setWork ] = useState(null)

    useEffect(()=>{
        (async()=>{
            const response = await workController.getWorkPath(path)
            setWork(response)
        })()
    },[])

  return (
    <div id="Chat">
      <HeaderHome></HeaderHome>
      <div className="containerChat">
        <div className="containMenuLateral">
          <MenuLateral />
        </div>
        <div className='worksPath'>
          <div className='containerWork'>
            {/* <img src={work ? `${work.imageWork}` : ""} alt="" /> */}
            <img className='imgWork' src={work ? `http://www.mactualidad.com/wp-content/uploads/2013/06/fondo-pantalla-mac-03.jpg` : ""} alt="" />
            <h2>{work ? `${work.name}` : ""}</h2>
            <div className='workText'>
              <TextWork className="textWork1" content={work ? `Ofertador` : ""}/>
              <TextWork className="textWork2" content={work ? `: ${work.userWork}` : ""}/>
            </div>
            <div className='workText'>
              <TextWork className="textWork1" content={work ? `Categoria` : ""}/>
              <TextWork className="textWork2" content={work ? `: ???` : ""}/>
            </div>
            <div className='workText'>
              <TextWork className="textWork1" content={work ? `Direccion` : ""}/>
              <TextWork className="textWork2" content={work ? `: ${work.address}` : ""}/>
            </div>
            <div className='workText'>
              <TextWork className="textWork1" content={work ? `Fin de la publicacion` : ""}/>
              <TextWork className="textWork2" content={work ? `: ${work.date}` : ""}/>
            </div>
            <div className='workText'>
              <TextWork className="textWork1" content={work ? `Cantidad de postulados` : ""}/>
              <TextWork className="textWork2" content={work ? `: ${work.postulates}` : ""}/>
            </div>
            <div className='workText'>
              <div className='priceWork'>PAGO:</div>
              <p className='numberPriceWork'>{work ? `$${work.price}` : ""}</p>
            </div>
            <div>
              <img className='imgWork2' src="http://www.mactualidad.com/wp-content/uploads/2013/06/fondo-pantalla-mac-03.jpg" alt="" />
              <img className='imgWork2' src="http://www.mactualidad.com/wp-content/uploads/2013/06/fondo-pantalla-mac-03.jpg" alt="" />
              <img className='imgWork2' src="http://www.mactualidad.com/wp-content/uploads/2013/06/fondo-pantalla-mac-03.jpg" alt="" />
              <img className='imgWork2' src="http://www.mactualidad.com/wp-content/uploads/2013/06/fondo-pantalla-mac-03.jpg" alt="" />
            </div>
            <h2>Descripcion</h2>
            <TextWork className="textWork2" content={work ? `${work.description}
            También puede ser necesario reorganizar la estructura del componente para asegurarse de que los componentes se actualicen correctamente en el orden adecuado.
            En general, es una buena práctica evitar actualizar el estado de un componente mientras se está renderizando otro componente.
            Si Dios sabe todo lo que va a suceder, ¿es realmente posible que tengamos libre albedrío?
            Si todas las personas son diferentes, ¿qué significa ser normal?` : ""}/>
            <h2>Opiniones del ofertador</h2>
            <div className='containUserCalification'>
              <div className='containerCalification'>
                <p className=''>4</p>
                <div className='calification'>
                  <p>⭐⭐⭐⭐</p>
                  <p>4 calificaciones</p>
                </div>
              </div>
              <div className='userCalification'>
                <div className='descCalificacion'>
                  <p>Luis Alejandro Contreras</p>
                  <p>⭐⭐⭐⭐⭐</p>
                </div>
                <p>Trabaja bien la sapa</p>
              </div>
              <div className='userCalification'>
                <div className='descCalificacion'>
                  <p>Jeyson Stiv Grisales</p>
                  <p>⭐⭐</p>
                </div>
                <p>Mocho de mrda</p>
              </div>
              <div className='userCalification'>
                <div className='descCalificacion'>
                  <p>Jackson Alexis</p>
                  <p>⭐⭐⭐⭐⭐</p>
                </div>
                <p>Muy panzona la lok pero eficiente</p>
              </div>
              <div className='userCalification'>
                <div className='descCalificacion'>
                  <p>Miguel Ibarra</p>
                  <p>⭐⭐⭐⭐</p>
                </div>
                <p>Nico</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
