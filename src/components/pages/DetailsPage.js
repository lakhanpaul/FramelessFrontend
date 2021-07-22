import React, { useState, useEffect } from 'react'
import tw, { styled } from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line

import { useParams } from 'react-router-dom'
import axios from 'axios'

import Navbar from '../partials/navigation/Navbar'
import VerticalFeatureCardsAlternateImageAndText from '../features/VerticalFeatureCardsAlternateImageAndText'
import MinimalCenteredFooter from '../footers/MinimalCenteredFooter'

// // the purpose of this function is to call the backend server based on the value inside the field, and then
// // store the results in the results state
// getResults = (event, { id }) => {
//   const { fields } = this.state
//   const field = fields[id]
//   const { value } = field

//   const query = event.currentTarget.value || value

//   const fetchResponse = async () => {
//     console.log(`https://frameless-backend-production.herokuapp.com/api/search/opportunity/?search=${query}`)
//     try {
//       const res = await axios.get(
//         `https://frameless-backend-production.herokuapp.com/api/search/opportunity/?search=${query}`
//       )
//       console.log('this is the results', res.data)
//       const response = res.data
//       console.log('Attempting to call store results')
//       console.log(
//         'the response is trying to be passed into the resulst function',
//         response
//       )
//       this.storeFieldResponseInResults(response, id)
//     } catch (error) {}
//   }

//   fetchResponse()
// }

// const Container = tw.div`relative`

const screenDimensions = screen.width + 'x' + screen.height
console.log(
  screenDimensions.width,
  screenDimensions.height,
  'DIMENOINOINSOINSOINSOISNOSIN'
)

const Container = styled.div`
  ${tw`relative bg-top bg-repeat-x bg-contain`}
`

const MainInformationContainer = tw.div`flex flex-col`
const TitleContainer = tw.div`flex p-1 w-full justify-center`
const Title = tw.h1` md:text-3xl text-xl`
const CompanyContainer = tw.div`flex w-full justify-start`
const Company = tw.h1` md:text-xl text-base pl-1`
const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-start text-xs font-semibold tracking-wide text-white uppercase sm:items-center`}
`
const CardMetaFeature = styled.div`
  ${tw`flex items-center m-1 text-gray-400 last:mr-0`}
  svg {
    ${tw`w-2 h-2 mr-0.125`}
  }
`

const DetailsPage = () => {
  // make axios request call using id

  const { slug } = useParams()

  const defaultOpportunity = {
    company: 'Nestle',
    title: 'Digital Marketing',
    duration: '5 days',
    type: 'In Situ',
    location: 'Virtual',
    description: '',
  }

  const fetchResponse = async (slug) => {
    try {
      const res = await axios.get(
        `https://frameless-backend-production.herokuapp.com/api/search/${slug}`
      )
      console.log('this is the results', res.data)
      return res.data
    } catch (error) {}
  }

  const [opportunityInformation, setOpportunityInformation] = useState({})

  useEffect(() => {
    fetchResponse(slug).then((data) => {
      setOpportunityInformation(data)
    })
  }, [])

  return Object.keys(opportunityInformation).length ? (
    <>
      <Container>
        <Navbar />
        <VerticalFeatureCardsAlternateImageAndText
          opportunityInformation={opportunityInformation}
        />
        <MinimalCenteredFooter />
      </Container>
    </>
  ) : (
    <div>NOt yet</div>
  )
}

export default DetailsPage
