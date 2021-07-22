import React, { useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { css } from 'styled-components/macro' //eslint-disable-line
import { Link } from 'react-router-dom'

const Container = tw.div``

const BackgroundImageCircleOne = styled.div`
  ${tw`absolute w-24 h-24 transform bg-center bg-cover rounded-full pointer-events-none bottom-10 left-15 `}
  background-image: url('https://source.unsplash.com/collection/364956/');
`

const BackgroundImageCircleTwo = styled.div`
  ${tw`absolute w-24 h-24 transform bg-center bg-cover rounded-full pointer-events-none bottom-23 left-8`}
  background-image: url('https://source.unsplash.com/collection/364956/');
`

const BackgroundImageCircleThree = styled.div`
  ${tw`absolute w-24 h-24 transform bg-center bg-cover rounded-full pointer-events-none bottom-35 left-28 `}
  background-image: url('https://source.unsplash.com/collection/364956/');
`

const BackgroundImageCircleFour = styled.div`
  ${tw`absolute w-24 h-24 transform bg-center bg-cover rounded-full pointer-events-none bottom-67 left-53`}
  background-image: url('https://source.unsplash.com/collection/364956/');
`

const BackgroundImageCircleFive = styled.div`
  ${tw`absolute w-24 h-24 transform bg-center bg-cover rounded-full pointer-events-none bottom-28 left-80`}
  background-image: url('https://source.unsplash.com/collection/364956/');
`

const BackgroundImageStyling = ({ numberOfBackgroundImages }) => {
  let backgroundImageStyles = numberOfBackgroundImages.map(
    (backgroundImage, key) => {
      const BackgroundImageCircle = styled.div` bottom-${Math.round(
        Math.random()
      )}
  ${tw`absolute w-24 h-24 transform bg-center bg-cover rounded-full pointer-events-none`}
  background-image: url('https://source.unsplash.com/collection/364956/')
`
    }
  )

  return (
    <>
      <Container>
        <BackgroundImageCircleOne />
        <BackgroundImageCircleTwo />
        <BackgroundImageCircleThree />
        <BackgroundImageCircleFour />
        <BackgroundImageCircleFive />
      </Container>
    </>
  )
}

export default BackgroundImageStyling
