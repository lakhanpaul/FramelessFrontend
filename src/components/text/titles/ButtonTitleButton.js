import React from 'react'

import tw, { styled } from 'twin.macro'
//eslint-disable-next-line
import { css } from 'styled-components/macro'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
const titleTextSizeVariants = {
  tripleExtraLarge: tw`text-xl md:text-3xl`,
  doubleExtraLarge: tw`text-base md:text-2xl`,
  extraLarge: tw`text-sm md:text-xl`,
  normal: tw`text-xs md:text-base`,
  small: tw`text-sm tracking-tighter`,
  extraSmall: tw`text-xs tracking-tighter`,
}

const Container = tw.div`flex w-full m-1 justify-center items-center`
const DirectionalButton = tw(Link)`  `

const Title = styled.h1(() => [
  // Return a function here
  tw`px-2 font-semibold md:px-3 `,
  ({ titleTextSize }) => titleTextSizeVariants[titleTextSize], // Grab the variant style via a prop
])

const IconContainer = tw.div`lg:h-2 lg:w-2 h-1 w-1`

const ButtonTitleButton = ({
  title,
  primaryButtonTarget,
  secondaryButtonTarget,
  primaryIcon,
  secondaryIcon,
  titleTextSize,
}) => {
  return (
    <Container>
      <DirectionalButton to={primaryButtonTarget}>
        <IconContainer>{primaryIcon}</IconContainer>
      </DirectionalButton>
      <Title {...{ titleTextSize }}>{title}</Title>
      <DirectionalButton to={secondaryButtonTarget}>
        <IconContainer>{secondaryIcon}</IconContainer>
      </DirectionalButton>
    </Container>
  )
}

ButtonTitleButton.propTypes = {
  title: PropTypes.string.isRequired,
  buttonTarget: PropTypes.string.isRequired,
}

export default ButtonTitleButton
