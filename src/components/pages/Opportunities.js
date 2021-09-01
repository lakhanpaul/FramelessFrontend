import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line
import 'antd/dist/antd.css'
import { blue } from '@ant-design/colors'
import axios from 'axios'
import { Affix, Menu, Typography, Divider } from 'antd'
import { useHistory } from 'react-router-dom'
import ResultsDisplayCards from '../cards/ResultsDisplayCards'
import BasicSearch from '../search/BasicSearch'
import SearchWithFilter from '../search/SearchWithFilter'
import NewNavbar from '../partials/navigation/NewNavbar'

const { Title, Text } = Typography

const PrimaryContainer = tw.div`relative`
const SecondaryContainer = tw.div`relative flex flex-col items-center overflow-x-hidden`
const AllContainer = tw.div`flex flex-col items-center max-w-screen-xl`

const Opportunities = () => {
  const [results, setResults] = useState([])

  const getAll = () => {
    const fetchResponse = async () => {
      console.log(
        `https://frameless-backend-production.herokuapp.com/api/search/opportunity/`
      )
      try {
        const res = await axios.get(
          `https://frameless-backend-production.herokuapp.com/api/search/opportunity/`
        )
        console.log('this is the results', res.data)
        setResults(res.data)
        return res.data
      } catch (error) {
        console.log('there was an error', error)
      }
    }

    fetchResponse()
  }

  function getResults(searchQuery) {
    const query = searchQuery

    const fetchResponse = async () => {
      console.log(
        `https://frameless-backend-production.herokuapp.com/api/search/opportunity/?search=${query}`
      )
      try {
        const res = await axios.get(
          `https://frameless-backend-production.herokuapp.com/api/search/opportunity/?search=${query}`
        )
        console.log('this is the results', res.data)
        setResults(res.data)
        return res.data
      } catch (error) {
        console.log('there was an error', error)
      }
    }

    fetchResponse()
  }

  useEffect(() => {
    getAll()
    console.log('getting all results')
  }, [])

  return (
    <PrimaryContainer>
      <NewNavbar />
      <SecondaryContainer>
        <BasicSearch />
        <AllContainer>
          <Divider orientation='left'>
            <Title level={3}>All Opportunities</Title>
          </Divider>
          <ResultsDisplayCards cardsToDisplay={results} />
        </AllContainer>
      </SecondaryContainer>
    </PrimaryContainer>
  )
}

export default Opportunities
