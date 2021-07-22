import React, { useContext, useEffect } from 'react'
import { FormContext } from './Form'
import axios from 'axios'
import tw from 'twin.macro'
import styled from 'styled-components'
import { css } from 'styled-components/macro' //eslint-disable-line

// The componenent utilizes data saved at Form to render the input along with the attributes
// through use of context. Rather than passing each event individually, an events prop has
// been added, this means that all native input events will be passed as-is and spread to
// the input element, but you can still alter specific events.

// 1. Accepts initial value and configurations from the developer and registers itself to the Form
// 2. Renders the component as a text-input or textarea based on the props value
// 3. Calls custom onChange value after saving its value to the form
// 4. Validate itself on the field value change

const TextInput = (props) => {
  // accesses the id from props
  const { id } = props

  const { sendEmail } = props

  // accesses the setField and addField function from the Form context, these allow for
  // the addition of fields to the form and the updating of field values
  const {
    setFields,
    addField,
    fields,
    validateField,
    errors,
    getResults,
    listenForSearch,
    sendEmailWithResponse,
  } = useContext(FormContext)

  // extracts the field data from context based on the id of the field, found inside props
  const field = fields[id] || {}

  //   destructures the input fields basic configurations from the field inside context
  const {
    name,
    rows,
    value,
    validate,
    placeholder,
    label = '',
    type = 'text',
    events = {},
    classes = {},
  } = field

  //   accesses all errors related to this field by running the id passed in via props, through
  // the errors dictionary in the Form state -- accessed from context
  const fieldError = errors[id]

  //   extracts the onChange function, and the rest of the events, from the events object
  // inside the field's data
  const { onChange, ...restEvents } = events

  // destructers the classes from the overriding classes configuration extracted via props
  const { contClass, fieldClass, errorClass } = classes
  console.log('CONTCLASS', contClass)
  //   the data is saved to the Form state, and if there is no error in the process,
  // then a custom onChange function is called
  const handleChange = (event) => {
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
  const handleSearch = (event) => {
    // if the key called is the enter key then the listenForSearch
    // function is called to set the field's hasSearched value to
    // true
    if (event.key === 'Enter') {
      // this blocks any normal behaviour e.g. a page refreshing
      event.preventDefault()

      // the function takes in the event to double check
      // that it is enter, and also the id to validate
      // which field is calling the function
      listenForSearch(event, field)
      // checks props to see if an email is meant to be sent or not
      if (sendEmail) {
        sendEmailWithResponse(event, field)
      }
    }
  }

  // if the value or id change this hook is called
  useEffect(() => {
    //   as long as the value is not undefined i.e., there is one, the field is validated
    // using the validate field function, the id is passed in to the function to ensure
    // that it is being validated against the right field type rules
    if (value !== undefined) {
      validateField(id)
    }
  }, [value, id])

  useEffect(() => {
    // adds this field to the Form, taking field and value from props
    // -- this only occurs once upon component rendering
    addField({
      field: props,
      value,
    })
  }, [])

  //this is some tw styling used to create styled components
  const tailwindInputStyling = ' focus:outline-none p-0.5 rounded-xl '
  const tailwindTextAreaStyling =
    'h-24 mt-3 first:mt-0 border-b-2 py-1 focus:outline-none font-medium transition duration-300 hover:border-primary-500 focus:border-primary-500'

  //   these are not component props but props that will be passed in to the input fields
  // rather than individually stating the field attributes in each element
  const fieldProps = {
    ...restEvents,
    id,
    name,
    type,
    value,
    validate,
    placeholder,
    className: `${fieldClass} ${tailwindInputStyling} `,
    onChange: handleChange,
    onKeyDown: handleSearch,
  }

  // based on the type passed in in props, if the type is a textarea, then
  // the field props type is deleted and so is the value. When a text area is present
  //   then the value prop name is changed to defaultValue, so that we can still keep track of both
  //  Also, rows are set so that the text area has a defined number of rows,
  // and the textarea element does  not require any type attribute so it is not redefined
  if (type === 'textarea') {
    delete fieldProps.type
    delete fieldProps.value

    fieldProps.defaultValue = value
    fieldProps.rows = rows || 2
    fieldProps.className = `${tailwindTextAreaStyling} `
  }

  // the value field is used for conditional rendering, if there is no field present, i.e.,
  // the main form does not contain a field in its props corresponding to the id passed in,
  // then nothing is rendered
  return field && field.value !== undefined ? (
    <>
      {/* if the type is text area, then a text area element is rendered, otherwise an 
      input element is rendered.
      */}
      {console.log('CLASSSSSSSS NAMEEE', fieldProps.className)}
      {type === 'textarea' ? (
        <textarea {...fieldProps} />
      ) : (
        <input {...fieldProps} />
      )}
    </>
  ) : (
    ''
  )
}

export default TextInput
