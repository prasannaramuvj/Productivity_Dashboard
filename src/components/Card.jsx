import React from 'react'
import './Card.css'

const Card = ({ title , count }) => {
  return (
    <div className='card'>
      <h3>{title}</h3>
      <h2>{count}</h2>
    </div>
  )
}

export default Card