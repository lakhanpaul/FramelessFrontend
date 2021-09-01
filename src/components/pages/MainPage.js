import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
//eslint-disable-next-line
import { css } from 'styled-components/macro'

import Navbar from '../partials/navigation/Navbar'
import SearchBar from '../search/SearchBar'

const Container = tw.div`relative h-screen w-screen overflow-x-hidden`

const MainPage = () => {
  return (
    <Container>
      <SearchBar />
    </Container>
  )
}

export default MainPage
