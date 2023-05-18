import React, { useState} from 'react'
import { Lupa } from '../../Iconos/Lupa/Lupa'
import { useNavigate } from 'react-router-dom';
import ButtonForm from '../../UI/ButtonForm/ButtonForm'

export const ContenedorBuscador = ({onMensajeCambiado}) => {

  //Captura el valor del input para enviarlo al contenedor padre

  const [inputValue, setInputValue] = useState('')
  // const [InputFocused, setInputFocused] = useState(false);
  const navigate = useNavigate()

  const handleInputChange = (e)=>{
    setInputValue(e.target.value)
  }

  const handleInput = (event)=>{
    navigate("/")
    event.preventDefault()
    setInputValue(inputValue)
    onMensajeCambiado(inputValue)
  }

  const keyDown =(e)=>{
    if(e.key === 'Enter'){
      navigate("/")
      setInputValue(inputValue)
      onMensajeCambiado(inputValue)
    }
  }

  // const handleInputFocus = () => {
  //   setInputFocused(true);
  // };

  // useEffect(()=>{
  //   if(InputFocused === true){
  //     navigate("/")   
  //   }
  // },[InputFocused])

  return (
    <div className='ContenedorBuscador'>
      <input type="text" id='inputBuscador' placeholder='Buscar' onChange={handleInputChange} onKeyDown={keyDown}/>
      <div id='contenedorLupa'>
        <ButtonForm onClick={handleInput} styleButton="bntLupa" content={<Lupa />}/>    
      </div>
    </div>
  )
}