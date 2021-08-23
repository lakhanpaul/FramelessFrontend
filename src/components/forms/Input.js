import React from 'react'

function Input({ register, name, ...rest }) {
  console.log('this is register inside input', register)
  console.log('this is name inside input', name)
  return register ? (
    <input {...register(name)} {...rest} />
  ) : (
    <input {...rest} />
  )
}

export default Input
