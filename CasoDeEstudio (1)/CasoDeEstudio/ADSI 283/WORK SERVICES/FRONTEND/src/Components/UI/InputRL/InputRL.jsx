import React from 'react'

const InputRL = ({type,style2,onChange,textSpan}) => {
  return (
    <div id='inputContainer'>
        <input onChange={onChange} className={style2} type={type} required/>
        <label htmlFor="" className='LabelInput'>
            <span className='SpanInput'>
                {textSpan}
            </span>
        </label>
    </div>
    
  )
}

export default InputRL