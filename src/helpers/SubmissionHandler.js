import React, { useContext, useEffect, useState } from 'react'
import { FormContext } from './Form'
import axios from 'axios'
import tw from 'twin.macro'
import styled from 'styled-components'
import { css } from 'styled-components/macro' //eslint-disable-line

// This component will amalgamate the values of numerous different text input components
// in order to send them off as one either via email or ajax.

const SubmissionHandler = (props) => {
  // accesses the id from props
  const { ids } = props

  // some tw styling for the submit button
  const SubmitButton = tw.div`inline-block mt-8`

  // accesses the fields, errors, listenforsearch and send email from context
  //   so that those actions can be executed
  const {
    fields,
    errors,
    listenForSearch,
    sendEmailWithResponse,
    submitOpportunity,
  } = useContext(FormContext)

  // this creates an array where the name and value of the target fields will be stored as objects
  let targetFields = []

  //   this provides a template for how the fields and their values will be stored as objects
  // within the array
  class targetField {
    constructor(fieldName, fieldValue) {
      this.fieldName = fieldName
      this.fieldValue = fieldValue
    }
  }

  // here we map over all the ids passed in and extract their related field and value
  ids.map((id) => {
    const field = fields[id]
    console.log(
      'these are the fields that the submission handler can access',
      fields
    )
    console.log(field, 'this is the field passed into the submission handler')
    const { value } = field || ''

    console.log('when value is inside the mapper', value)
    // ensures that field is not undefined to prevent errors, as it may load before
    // the component containing the fields has loaded
    if (field) {
      // create a new object holding the field and value
      const fieldObject = new targetField(field.id, value)

      // stores the created object in the array
      targetFields.push(fieldObject)
    }
  })

  //   the data is saved to the Form state, and if there is no error in the process,
  // then a custom onChange function is called
  const handleChange = (event) => {
    // eslint-disable-next-line no-useless-catch
    event.preventDefault()
    // eslint-disable-next-line no-useless-catch
    try {
      // when a change occurs, the value of the field is updated, based on the event and the field
      setFields(event, field)
      getResults(event, field)
    } catch (error) {
      throw error
    }

    // validates that onChange is a function
    if (typeof onChange === 'function') {
      // if onChange is a function then all the field data is passed in as is,
      // along with the updated value, set to the value of the event itself
      onChange({
        ...field,
        value: event.target.value,
      })
    }
  }

  // this is called when a key is pressed inside the input field
  const handleSubmit = (event) => {
    // when the button is clicked the send email is invoked
    // this blocks any normal behaviour e.g. a page refreshing
    event.preventDefault()

    // the function takes in the event to double check
    // that it is valid, and also the targetfields to pass
    // the necessary data to the email sending funtion
    submitOpportunity(event, targetFields)
    sendEmailWithResponse(event, targetFields)
  }

  //   useEffect(() => {
  //     // adds this field to the Form, taking field and value from props
  //     // -- this only occurs once upon component rendering
  //     addField({
  //       field: props,
  //       value,
  //     })
  //   }, [])

  // this contains the tailwind styling for the input field and will be attached to the classname in the field props
  // TODO: create styling for the text area, update the classname field prop to match the specific styling based on field type
  const tailwindInputStyling =
    'bg-blue-lightbackground border-b-2  focus:outline-none cursor-text hover:shadow-xl  border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-300'

  //   these are not component props but props that will be passed in to the input fields
  // rather than individually stating the field attributes in each element
  const fieldProps = {
    onChange: handleChange,
    onKeyDown: handleSubmit,
    onClick: handleSubmit,
    className: tailwindInputStyling,
  }

  // the value field is used for conditional rendering, if there is no field present, i.e.,
  // the main form does not contain a field in its props corresponding to the id passed in,
  // then nothing is rendered
  return (
    <div>
      {/* if the type is text area, then a text area element is rendered, otherwise an 
      input element is rendered.
      */}
      <SubmitButton {...fieldProps}>submit</SubmitButton>
    </div>
  )
}

export default SubmissionHandler
