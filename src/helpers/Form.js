import React, { createContext, Component } from 'react'

import validations from './validations'
import axios from 'axios'
import emailjs from 'emailjs-com'
import tw from 'twin.macro'
import styled from 'styled-components'
import { css } from 'styled-components/macro' //eslint-disable-line

// This is a HOC which renders its children and is responsible for updating
// and maintaining the values of the data inside the children's input fields
// 1. It renders all its children
// 2. Maintain form state to store input field data
// 3. Provide the field and form data through the context api
// 4. Provide a function to add new fields to its state
// 5. Provide a method to validate field values

// RESPONSE is the answer from the server
// RESULTS is how it will be stored in the field

// Here a form context is created, this context allows the fields and errors props
// to be implicitly passed down through the component tree, so that they don't have to be
// stated in the props of the whole tree, making them implicitly accessible to the whole tree

export const FormContext = createContext({
  fields: {},
  errors: {},
})

// A class components has been chosen here to make the updating and
// maintaining of form values of the fields easier, rather than using
// a custom hook
export default class Form extends Component {
  // fields is an object and will contain all fields data e.g. field value, id, classes etc.
  // the errors field is a dictionary and will contain key-value pairs of the field id and related errors
  //      if there are no errors an empty string will be used
  state = {
    fields: {},
    errors: {},
  }

  render() {
    const { fields, errors } = this.state
    // these are the values which will be shared via context
    // the fields and values objects have been shared, so that the children's fields
    // and their values can be tracked, furthermore, upon component rendering, the addField
    // function will be invoked to add any necessary fields to the fields state
    // The setFields function has also been passed down so that the children can update and
    // assign values to their fields
    const formContext = {
      fields,
      errors,

      addField: (data) => {
        this.addField(data)
      },
      setFields: this.setFields,
      validateField: this.validateField,
      getResults: this.getResults,
      listenForSearch: this.listenForSearch,
      sendEmailWithResponse: this.sendEmailWithResponse,
      submitOpportunity: this.submitOpportunity,
    }

    return (
      <form action='' className='w-full h-full'>
        {/* This context provider gives all the children access to the context
                , the fields, setFields and errors are being shared.
            */}

        <FormContext.Provider value={formContext}>
          {this.props.children}
        </FormContext.Provider>
      </form>
    )
  }

  //   the purpose of this function is to set or update the value of the fields
  // this can be used on an event trigger or programmatically
  setFields = (event, { id }) => {
    // this persist function ensures that the event which occurred in the children is
    // stored, because React uses synthetic events when the user interacts with the UI
    // these may be reused across the application, and as this happens, the values are lost
    // so this persist method ensures that the event is not lost and remains reachable
    event.persist()

    // takes the fields which have been defined inside the component's state
    const { fields } = this.state
    // extracts the specific field to be altered based on the id passed in as a parameter
    const field = fields[id]
    console.log(
      'this is the event passed to setfields',
      event,
      'this is the field passed',
      field
    )

    // invokes the add field function to add any new field
    this.addField({
      // this leaves all attributes of the field, apart from the value unaltered,
      // if the event is not defined, the value is considered to be the value parameter
      // passed in rather than the value of the event, as it does not exist
      field: {
        ...field,
        value: event.currentTarget.value,
      },
    })
  }

  storeFieldResponseInResults = (response, id) => {
    const { fields } = this.state
    // const { response, id } = props
    console.log('the reponse is inside the result function', response)
    const field = fields[id]
    // invokes the add field function to add any new field
    console.log('is the add field not working')
    // invokes the add field function to add any new field
    this.addField({
      // this leaves all attributes of the field, apart from the value unaltered,
      // if the event is not defined, the value is considered to be the value parameter
      // passed in rather than the value of the event, as it does not exist
      field: {
        ...field,
        results: response,
      },
    })
    console.log('the results have been stored')
  }

  // storeFieldResponseInResults = (props) => {
  //   console.log(
  //     'if this works then there is something wrong with the function logic'
  //   )
  // }

  // the purpose of this function is to call the backend server based on the value inside the field, and then
  // store the results in the results state
  getResults = (event, { id }) => {
    const { fields } = this.state
    const field = fields[id]
    const { value } = field

    const query = event.currentTarget.value || value

    const fetchResponse = async () => {
      console.log(
        `https://frameless-backend-production.herokuapp.com/api/search/opportunity/?search=${query}`
      )
      try {
        const res = await axios.get(
          `https://frameless-backend-production.herokuapp.com/api/search/opportunity/?search=${query}`
        )
        console.log('this is the results', res.data)
        const response = res.data
        console.log('Attempting to call store results')
        console.log(
          'the response is trying to be passed into the resulst function',
          response
        )
        this.storeFieldResponseInResults(response, id)
      } catch (error) {}
    }

    fetchResponse()
  }

  // this function is used to determine whether the user has or has not pressed
  // enter on their keyboard -- or the search button, it will set a variable
  // inside the field known as hasSearched to true upon the click.
  listenForSearch = (event, { id }) => {
    // accesses the specific field from the id
    const { fields } = this.state
    const field = fields[id]

    console.log(
      'the listen for search function is being called and this is the field passed in',
      field
    )
    // determines if the enter key was pressed, otherwise nothing happens
    if (event.key === 'Enter') {
      this.addField({
        // this leaves all attributes of the field, apart from the hasSearched property unaltered,
        // this switches the hasSearched property to true if the enter key is pressed
        field: {
          ...field,
          hasSearched: true,
        },
      })
      console.log('www', field)
      console.log(id, 'the id being passed to email thingy')
    }
  }

  // this is the logic needed to integrate with emailjs and send data as emails
  sendFeedback = (serviceID, templateId, variables) => {
    console.log('inside email.js')
    emailjs
      .send(serviceID, templateId, variables)
      .then((res) => {
        console.log('Email successfully sent!')
      })
      .catch((err) =>
        console.error(
          'There has been an error.  Here some thoughts on the error that occured:',
          err
        )
      )
  }

  // the purpose of this function is to send an email with the contents of the form to
  // a set email using the email.js program, it will be called when enter is pressed
  //   the event is what occurred e.g., pressed enter, the target fields are the fields
  // that the submission handler component is responsible for and it contains an array of objects
  sendEmailWithResponse = (event, targetFields) => {
    console.log('FIELDS target fields passed to send email', targetFields)

    const targetFieldsString = JSON.stringify(targetFields, null, 4)
    const templateParams = {
      form_response: targetFieldsString,
    }

    emailjs
      .send(
        'service_xjeq693',
        'template_j8f9hb9',
        templateParams,
        'user_e8d4uGNfaCvZcwIaPcOwY'
      )
      .then(
        (result) => {
          console.log('contact email test  ', result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  submitOpportunity = (event, targetFields) => {
    console.log('here are the target fields passed in', targetFields)

    let dataToSend = {}

    let descriptionCards = []

    for (var targetField of targetFields) {
      console.log('Here are is the target field', targetField)
      const cleanTargetField = {
        [targetField.fieldName]: targetField.fieldValue,
      }
      console.log('Here is the clean target field', cleanTargetField)

      Object.assign(dataToSend, cleanTargetField)
    }

    console.log('to SNENED', dataToSend)
  }

  // the purpose of this function is to add the the field to the form state,
  // this function should be called once upon component rendering
  addField = ({ field }) => {
    //   an id is extracted from the field object passed in
    const { id } = field

    // the field is initialized with the value of an empty string, all other field
    // attributes are left unaltered
    field = {
      value: '',
      results: [],
      hasSearched: false,
      ...field,
    }

    // if there was an id present in the field passed in as the parameter,
    // the state of the component is altered, specifically the fields object
    // the fields object is assigned a new field which is given the id extracted from it
    // , thus the new field is added to the state
    if (id) {
      this.setState((prevState) => {
        return {
          ...prevState,
          fields: {
            ...prevState.fields,
            [id]: field,
          },
        }
      })

      return
    }
    // if there is no id present in the field parameter an error is thrown
    throw new Error(`please add 'id' field to the input: ${field}`)
  }

  //   this function is used to determine if a field contains a valid value.
  // there are custom validation rules set in the formValidation file, these must be passed in
  // to the prop customRule as an object, unlike the predefined rules which are passed in to
  // the validate prop as a pipe operator separated string.
  validateField = (id) => {
    // initially the error is set to be an empty string
    let error = ''

    // the following variables are extracted from the field, the field itself is extracted from
    // the component's fields state, using the id passed in as a parameter. This allows the
    // function to determine which predefined rules that specific field should be validated by,
    // and if there are no predefined rules present, the input should provide a custom
    // validation function
    const {
      value: fieldValue,
      validate,
      displayName,
      customRules = {},
    } = this.state.fields[id]

    // this creates the predefined rules array, split by the pipe operator, if there are none
    // then an empty string is returned
    const rules = validate ? validate.split('|') : ''

    // if there are predefined rules, the followings statement determines if they are met
    if (rules.length) {
      // iterates over all the rules
      for (const rule in rules) {
        // extracts the rule name, and takes either its requirements from the predefined
        // rules in the validation prop or the custom rule object
        const ruleName = rules[rule]
        const validation = validations[ruleName] || customRules[ruleName]

        // the rule is satisfied only when it is not required and it is not present as the
        // value of the field i.e., it has not been input, and is not needed to be input,
        // if the rule is ont satisfied the field value is converted to a string and tested
        const isRuleSatisfied =
          ruleName !== 'required' && !fieldValue
            ? true
            : validation.rule().test(fieldValue.toString())

        // if the rule is not satisfied an error is raised and the validation file will
        // return a statement detailing why based on the display name of the field or its id
        if (!isRuleSatisfied) {
          error = validation.formatter.apply(null, [displayName || id])
        }

        // if an error exists in one of the rules the iteration is broken,
        if (error !== '') {
          break
        }
      }

      //   the state is set to the same as the previous state, apart from the errors
      // all the errors are added to the state, along with the id of the field in which
      //  they appeared - as a key:value pair, if there were no errors, then only an
      // empty string is added
      this.setState((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [id]: error,
        },
      }))
    }
  }
}
