import { ContenedorBuscador } from '../../UI/ContenedorBuscador/ContenedorBuscador'
import { ContenedorLogo } from '../../UI/ContenedorLogo/ContenedorLogo'
import { NavHeader } from '../../UI/NavHeader/NavHeader'

export const HeaderHome = ({sendValue}) => {
  //Recibe el valor del input Hijo (contenedorBuscador)
  const handleMesajeCambiado = (nuevoMensaje)=>{
    //Envia el valor del input que recibio para enviarlo al contenedor padre
    console.log(nuevoMensaje);
    sendValue(nuevoMensaje)
  }

  return (
    <div className='Header'>
      <div id='contenedorHeader'>
          <ContenedorLogo />
          <ContenedorBuscador onMensajeCambiado={handleMesajeCambiado}/>
          <NavHeader />
        </div>
    </div>
  )
}
