import React from 'react'
import {Link} from 'react-router-dom'
const RedirectionText = ({text,to}) => {
  return (
    <div className="flex gap-1 justify-center">
      <p>Already have an account?</p>
      <Link to={to}>{text}</Link>
    </div>
  )
}

export default RedirectionText
