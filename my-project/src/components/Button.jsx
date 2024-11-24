import React from 'react'

const Button = ({text,onClick}) => {
  return (
    
      <button onClick={onClick} className="bg-black text-white p-2">{text}</button>
  )
}

export default Button
