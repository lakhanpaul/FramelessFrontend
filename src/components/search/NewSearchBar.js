import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line
import 'antd/dist/antd.css'
import { blue } from '@ant-design/colors'
import axios from 'axios'
import { Input, Form, AutoComplete } from 'antd'
import AutoCompleteResult from './AutoCompleteResult'

import Navbar from '../partials/navigation/Navbar'
import MinimalCenteredFooter from '../footers/MinimalCenteredFooter'
import ResultsDisplayCards from '../cards/ResultsDisplayCards'

const InputContainer = styled.div``
const screenDimensions = screen.width + 'x' + screen.height
const HeaderContainer = styled.div`
  ${tw`relative flex flex-col items-center w-full h-full pt-1 pb-2 bg-center bg-cover justify-evenly`}
  background-image: url('https://source.unsplash.com/collection/364956/${screenDimensions}');
`
const HeaderContentContainer = tw.div`  flex flex-col gap-3 px-0.5`
const HeaderTitleContainer = tw.div`pb-5 text-white flex flex-col `
const HeaderTitle = tw.h1`mb-0.5 text-3xl md:text-8xl font-bold`
const HeaderSubtitle = tw.h2`mb-0.5 text-2xl md:text-7xl font-bold`
const Search = tw(Input)`shadow-lg border-4 border-transparent`

const NewSearchBar = ({}) => {
  const [form] = Form.useForm()
  const [searchValue, setSearchValue] = useState('')
  const [results, setResults] = useState([])
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    getResults(searchValue)
    setAutoCompleteOptions(createAutoCompleteOptions(results))
    console.log('here is the search value', searchValue)
  }, [searchValue])

  function showValues(fieldValues) {
    console.log('the values have changed', fieldValues)
    const searchFieldValue = fieldValues.searchBar
    setSearchValue(searchFieldValue)
    console.log('the updated search value', searchValue)
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

  function createAutoCompleteOptions(rawOptions) {
    if (rawOptions) {
      const optionsToDisplay = rawOptions.map((item, key) => {
        console.log('this is an item in the map', item)
        const displayComponent = (
          <AutoCompleteResult cardData={item} key={key} />
        )
        const displayObject = { value: displayComponent, key: key }
        return displayObject
      })
      return optionsToDisplay
    } else {
      const optionsToDisplay = []
      return optionsToDisplay
    }
  }

  function onPressEnter(e) {
    setShowResults(true)
    console.log('is show results', showResults)
  }

  return (
    <>
      {/* <Form> */}
      <HeaderContainer>
        <Navbar />
        <HeaderContentContainer>
          <HeaderTitleContainer>
            <HeaderTitle>Frameless</HeaderTitle>
            <HeaderSubtitle>Think big, go further</HeaderSubtitle>
          </HeaderTitleContainer>
          <InputContainer id='searchBarContainer'>
            <Form form={form} onValuesChange={showValues}>
              <Form.Item name='searchBar'>
                <AutoComplete options={autoCompleteOptions}>
                  <Search
                    placeholder='Find an opportunity now'
                    onPressEnter={onPressEnter}
                    size='large'
                  />
                </AutoComplete>
              </Form.Item>
            </Form>
          </InputContainer>
        </HeaderContentContainer>
      </HeaderContainer>
      {showResults ? (
        <>
          <ResultsDisplayCards cardsToDisplay={results} />{' '}
        </>
      ) : (
        <></>
      )}
      <MinimalCenteredFooter />
    </>
  )
}

export default NewSearchBar
