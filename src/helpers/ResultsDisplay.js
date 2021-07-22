import React, { useContext, useEffect, useState } from 'react'
import { FormContext } from './Form'

import tw from 'twin.macro'
import styled from 'styled-components'
import { css } from 'styled-components/macro' //eslint-disable-line

import ResultsDisplayCardsWithImage from '../components/cards/ResultsDisplayCardsWithImage'
// import Alert from '../components/cards/Alert'
// This component utilizes the data returned as the resultsDisplay of a particular field
// to display the resultsDisplay to the user. It accesses the Form context, thus gaining
// access to all fields and errors, furthermore, it will take id from props to
// allow it to determine specifically what field it is and also what resultsDisplay it
// should display

// The results

const resultsDisplay = (props) => {
  //   accesses id from props
  const { id } = props

  // accesses the fields from the Form's context, so that the specific field
  // making the hits can be determined
  const { fields } = useContext(FormContext)

  // extracts the field data from the form context based on the id of the field, found inside props
  const field = fields[id] || {}
  console.log('This is the field being passed to resultsToDisplay', field)
  //   accesses the field's value, so that it knows when the value updates and hasSearched for conditional
  // rendering dependent on whether or not enter was pressed
  const { value, hasSearched } = field

  // defines a state which will hold the resultsToDisplay in an array
  const [resultsToDisplay, setResultsToDisplay] = useState([])

  // defines a state which will hold the display states of the resultsToDisplay in an array
  const [listOfResultsDisplay, setListOfResultsToDisplay] = useState([])

  // maps over the resultsToDisplay inside hits and displays them nicely,
  // these displays are then stored inside the listOfHits state array
  const createListOfResultsDisplay = () => {
    // this array will be pushed to state, and is only declared so that the state is not directly
    // altered, which may cause errors
    const resultsDetailsToDisplay = []

    //   this provides a template for how the display details and their values will be stored as objects
    // within the array
    class displayCardDetails {
      constructor(
        displayCardImage,
        displayCardCompany,
        displayCardType,
        displayCardTitle,
        displayCardDurationText,
        displayCardLocationText
      ) {
        this.displayCardImage = displayCardImage
        this.displayCardCompany = displayCardCompany
        this.displayCardType = displayCardType
        this.displayCardTitle = displayCardTitle
        this.displayCardDurationText = displayCardDurationText
        this.displayCardLocationText = displayCardLocationText
      }
    }

    resultsToDisplay.map((result) => {
      // destructure the title and description from each result in the hit array
      const { image, company, type, title, duration, location } = result

      // creates a stylized display with the response's data to return
      resultsDetailsToDisplay.push(
        new displayCardDetails(image, company, type, title, duration, location)
      )
    })

    //   places the array of stylized data as the listOfHit state
    setListOfResultsToDisplay(resultsDetailsToDisplay)
  }

  useEffect(() => {
    // accesses the results returned from the field
    const { results } = field

    // place the results inside the resultsToDisplay array
    setResultsToDisplay(results)
    console.log('results have been displayed', resultsToDisplay)
    // the following if statement ensures that there are responses to show
    // before the list of hit display is created
    if (resultsToDisplay !== undefined) {
      // calls the mapping function to create the displays for the hits
      createListOfResultsDisplay()
    } else {
      console.log('no results to show yet')
    }
  }, [value, id])

  // this hook checks if the hasSearched property has changed
  // , it then determines if it is true with an if statement, before
  // retrieving the coordinates of the results display's div
  // then the window scrolls to this position
  useEffect(() => {
    if (hasSearched) {
      // accesses the a major parent div of the results display
      const resultsDiv = document.getElementById('results')

      // extracts its coordinates relative to the window
      const resultsRectangle = resultsDiv.getBoundingClientRect()
      console.log('this is the rectangle', resultsRectangle)

      // defines the intended location and behavior of the scroll
      const scrollToOptions = {
        left: resultsRectangle.left,
        top: resultsRectangle.top,
        behavior: 'smooth',
      }

      // scrolls to the specified position where the results start
      window.scrollTo(scrollToOptions)
    }
  }, [hasSearched])

  // styled components

  return hasSearched ? (
    resultsToDisplay.length ? (
      <ResultsDisplayCardsWithImage cards={resultsToDisplay} />
    ) : (
      // <Alert text='Looks like there are no matches for that, think there should be, why not add it yourself below' />
      <div>yes</div>
    )
  ) : (
    <h1></h1>
  )
}

export default resultsDisplay
