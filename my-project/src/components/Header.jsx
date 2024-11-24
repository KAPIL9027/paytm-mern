import React from 'react'

const Header = ({title,text}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center md:text-3xl">{title}</h1>
      <p className="text-xs font-normal text-gray-400 text-center md:text-xl">{text}</p>
    </div>
  )
}

export default Header
