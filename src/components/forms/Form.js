import React from 'react'
import { useForm } from 'react-hook-form'

export default function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues })

  console.log('these are the default values', defaultValues)
  console.log('these are the methods', methods)
  const { handleSubmit } = methods

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child
      })}
    </form>
  )
}
