import React, { useEffect, useRef } from 'react'
import tw, { styled } from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line

import Form from '../../helpers/Form'
import TextInput from '../../helpers/TextInput'
import ResultsDisplay from '../../helpers/ResultsDisplay'
import Navbar from '../partials/navigation/Navbar'
import MinimalCenteredFooter from '../footers/MinimalCenteredFooter'
import NewSearchBar from './NewSearchBar'

// const HeaderContainer = tw.div`relative flex flex-col w-full h-full`

const InputContainer = styled.div``

const ResultsContainer = styled.div`
  ${tw`relative bg-left-bottom bg-repeat-x bg-cover bg-opacity-40 `}
`

const screenDimensions = screen.width + 'x' + screen.height

const HeaderContainer = styled.div`
  ${tw`relative flex flex-col items-center w-full h-full pt-1 pb-2 bg-center bg-cover justify-evenly`}
  background-image: url('https://source.unsplash.com/collection/364956/${screenDimensions}');
`

const HeaderContentContainer = tw.div`  flex flex-col gap-3 px-0.5`

const HeaderTitleContainer = tw.div`pb-5 text-white flex flex-col `
const HeaderTitle = tw.h1`mb-0.5 text-3xl md:text-8xl font-bold`
const HeaderSubtitle = tw.h2`mb-0.5 text-2xl md:text-7xl font-bold`

const SearchBar = ({}) => {
  const inputSendEmail = false

  return (
    <>
      {/* <Form>
        <HeaderContainer>
          <Navbar />
          <HeaderContentContainer>
            <HeaderTitleContainer>
              <HeaderTitle>Frameless</HeaderTitle>
              <HeaderSubtitle>Think big, go further</HeaderSubtitle>
            </HeaderTitleContainer>
            <InputContainer id='searchBarContainer'>
              <TextInput id='search test' sendEmail={inputSendEmail} />
            </InputContainer>
          </HeaderContentContainer>
        </HeaderContainer>
        <ResultsContainer id='results'>
          <ResultsDisplay id='search test' />
        </ResultsContainer>
        <MinimalCenteredFooter />
      </Form> */}
      <NewSearchBar />
    </>
  )
}

export default SearchBar
