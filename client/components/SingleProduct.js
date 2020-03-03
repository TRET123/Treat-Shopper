import React from 'react'

export const SingleProduct = ({product}) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} />
      <p>{product.description}</p>
    </div>
  )
}
