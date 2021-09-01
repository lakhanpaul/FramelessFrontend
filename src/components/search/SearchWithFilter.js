import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line
import 'antd/dist/antd.css'
import { blue } from '@ant-design/colors'
import axios from 'axios'
import {
  Input,
  Form,
  AutoComplete,
  Typography,
  Divider,
  Dropdown,
  Menu,
  Switch,
  Radio,
} from 'antd'
import AutoCompleteResult from './AutoCompleteResult'
import ResultsDisplayCards from '../cards/ResultsDisplayCards'

const { Text, Title } = Typography
const InputContainer = tw.div`w-full max-w-screen-xl mt-1  px-2 md:px-6`
const HeaderContainer = styled.div`
  ${tw`relative flex flex-col items-center justify-center w-screen h-full mt-0 md:mt-2`}
`
const ResultsContainer = tw.div`w-full max-w-screen-xl`
const Search = tw(Input)` border-2`
const StyledRadio = tw(Radio)``
const RadioGroup = tw(Radio.Group)``
const MenuItem = tw(Menu.Item)``
const StyledMenu = tw(Menu)`flex`
const StyledDropdown = tw(Dropdown)``
const StyledSwitch = tw(Switch)``

const NewSearchBar = ({}) => {
  const [form] = Form.useForm()
  const [searchValue, setSearchValue] = useState('')
  const [results, setResults] = useState([])
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [showFilterOptions, setShowFilterOptions] = useState()
  const [filterOption, setFilterOption] = useState('search')

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
        `https://frameless-backend-production.herokuapp.com/api/search/opportunity/?${filterOption}=${query}`
      )
      try {
        const res = await axios.get(
          `https://frameless-backend-production.herokuapp.com/api/search/opportunity/?${filterOption}=${query}`
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

  function showFilter(checked, event) {
    {
      checked ? setShowFilterOptions(true) : setShowFilterOptions(false)
      setFilterOption('search')
    }
  }

  function selectFilter(e) {
    setFilterOption(e.target.value)
  }

  // Create a menu which wraps a Dropdown
  // The content of the dropdown will be a radio list
  // There will be a state which holds a search key
  // On press, these radio buttons will alter the search key
  // The search key will be sent in as the search query for the backend

  return (
    <>
      <HeaderContainer>
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
            </Form.Item>{' '}
            <StyledSwitch defaultChecked={false} onClick={showFilter} />
            {showFilterOptions ? (
              <RadioGroup onChange={selectFilter} value={filterOption}>
                <Radio value={'title'}>Title</Radio>
                <Radio value={'company'}>Duration</Radio>
                <Radio value={'location'}>Location</Radio>
                <Radio value={'type'}>Type</Radio>
              </RadioGroup>
            ) : (
              <></>
            )}
          </Form>
        </InputContainer>
      </HeaderContainer>
      {showResults ? (
        <ResultsContainer>
          <Divider orientation='left'>
            <Title level={3}>Search Results</Title>
          </Divider>
          <ResultsDisplayCards cardsToDisplay={results} />{' '}
        </ResultsContainer>
      ) : (
        <></>
      )}
    </>
  )
}

export default NewSearchBar
