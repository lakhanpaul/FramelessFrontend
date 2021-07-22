import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import FacebookIcon from '../../images/icons/facebook-icon.svg'
import TwitterIcon from '../../images/icons/twitter-icon.svg'
import YoutubeIcon from '../../images/icons/youtube-icon.svg'

import { Link } from 'react-router-dom'

const Container = styled.div`
  ${tw`relative -mb-2 text-gray-100 bg-gradient-to-tr from-red-700 to-gray-300`}
`

// const Container = tw.div`relative bg-gray-900 text-gray-100 -mx-2 -mb-2`
const Content = tw.div`w-full mx-auto py-3 lg:py-5 backdrop-filter backdrop-blur-sm`

const Row = tw.div`flex items-center justify-center flex-col px-2`

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`
const LogoImg = tw.img`w-3`
const LogoText = tw.h5`ml-0.5 text-2xl font-black tracking-wider`

const LinksContainer = tw.div`mt-2 font-medium flex flex-wrap justify-center items-center flex-col sm:flex-row`
const StyledLink = tw(
  Link
)`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-300 pb-0.125 transition duration-300 mt-0.5 mx-1`

const SocialLinksContainer = tw.div`mt-2`
const SocialLink = styled(Link)`
  ${tw`inline-block mx-1 text-gray-100 transition duration-300 cursor-pointer hover:text-gray-500`}
  svg {
    ${tw`w-1 h-1`}
  }
`

const CopyrightText = tw.p`text-center mt-2 font-medium tracking-wide text-sm text-gray-600`
export default () => {
  return (
    <Container>
      <Content>
        <Row>
          <LogoContainer>
            <LogoImg src='https:://source.unsplash.com' />
            <LogoText>Frameless</LogoText>
          </LogoContainer>
          <LinksContainer>
            <StyledLink to='/'>Home</StyledLink>
            <StyledLink to='/components/innerPages/AboutUsPage'>
              About
            </StyledLink>
            <StyledLink to='/components/blocks/Form/TwoColContactUsFull'>
              Contact Us
            </StyledLink>
          </LinksContainer>
          <SocialLinksContainer>
            <SocialLink to='https://facebook.com'>
              <FacebookIcon />
            </SocialLink>
            <SocialLink to='https://twitter.com'>
              <TwitterIcon />
            </SocialLink>
            <SocialLink to='https://youtube.com'>
              <YoutubeIcon />
            </SocialLink>
          </SocialLinksContainer>
          <CopyrightText>
            &copy; Copyright 2021, Frameless Inc. All Rights Reserved.
          </CopyrightText>
        </Row>
      </Content>
    </Container>
  )
}
