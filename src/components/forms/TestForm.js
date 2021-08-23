import React from 'react'
import Input from './Input'
import Form from './Form'
import Select from './Select'
import TestNestedInput from './TestNestedInput'
import { useForm } from 'react-hook-form'

const TestForm = () => {
  const onSubmit = (data) => console.log(data)

  const { register, handleSubmit } = useForm()

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input name='firstName' placeholder='first name' />
        <Select name='gender' options={['female', 'male', 'other']} />
        <div>
          <Input name='nested-one' placeholder='nested one' />
        </div>
        <div>
          <div>
            <Input name='nested-two' placeholder='nested two' />
          </div>
        </div>
        {/* <Input type='submit' value='submit' /> */}
      </Form>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstNameTwo')} placeholder='first name two' />
        <div>
          <input {...register('nested-one-two')} placeholder='nested one two' />
        </div>
        <div>
          <div>
            <input
              {...register('nested-two-two')}
              placeholder='nested two two'
            />
          </div>
        </div>
        <input type='submit' value='submit' />
      </form>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstNameThree')} placeholder='first name three' />
        <div>
          <input
            {...register('nested-one-three')}
            placeholder='nested one three'
          />
        </div>
        <div>
          <div>
            <input
              {...register('nested-two-three')}
              placeholder='nested two two'
            />
          </div>
        </div>
        <input type='submit' value='submit' />
      </form>
    </>
  )
}

export default TestForm
