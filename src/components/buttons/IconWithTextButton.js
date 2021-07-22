import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
//eslint-disable-next-line
import { css } from 'styled-components/macro'

import { Link } from 'react-router-dom'

const Container = tw.div`flex items-center`
const PrimaryButton = tw(Link)``
const TextContainer = tw.div`text-xs p-2`
const IconContainer = tw.div`h-2 w-2 lg:h-3 lg:w-3`

const IconWithTextButton = ({ iconSrc, buttonAction }) => {
  return (
    <Container>
      <PrimaryButton>
        <IconContainer>
          <img src={iconSrc} />
        </IconContainer>
      </PrimaryButton>
      <TextContainer>{buttonAction}</TextContainer>
    </Container>
  )
}

export default IconWithTextButton
