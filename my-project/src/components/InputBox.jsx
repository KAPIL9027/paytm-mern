import React from 'react'

const InputBox = ({label,type,placeholder,onChange}) => {
    
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium">{label}</label>
      <input className="p-1 border" type={type} placeholder={placeholder} onChange={onChange}/>
    </div>
  )
}

export default InputBox
