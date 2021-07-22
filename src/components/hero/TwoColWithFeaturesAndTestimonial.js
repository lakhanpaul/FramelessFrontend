import React from 'react'
import tw, { styled } from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line

import { Link } from 'react-router-dom'
// import { Container, ContentWithVerticalPadding } from '../misc/Layouts.js'
// import CheckboxIcon from 'feather-icons/dist/icons/check-circle.svg'
// import QuotesLeftIconBase from '../../images/quotes-l.svg'
import SvgDecoratorBlob1 from '../../images/icons/layeredWavesLong.svg'

export const Container = tw.div`relative`
export const ContentWithVerticalPadding = tw.div`py-5 lg:py-7`

const Row = tw.div`flex flex-col lg:flex-row justify-between items-center lg:pt-4 max-w-screen-2xl mx-auto sm:px-2`
const Column = tw.div``
const TextColumn = tw(Column)`mr-auto lg:mr-0 max-w-lg lg:max-w-xl xl:max-w-2xl`
const Heading = styled.div`text-left text-4xl sm:text-5xl font-black tracking-wide text-center leading-snug xl:text-6xl`
const Description = styled.p` text-sm   font-medium leading-relaxed  mt-4 lg:text-base text-gray-700 max-w-lg`
const PrimaryButton = tw(
  Link
)`px-3 py-1 font-bold rounded bg-red-500 text-gray-100  hocus:text-gray-200  focus:outline-none transition duration-300 mt-2 inline-block  tracking-wide text-center py-2`
const FeatureList = tw.ul`mt-3 leading-loose`
const Feature = tw.li`flex items-center`
// const FeatureIcon = tw(CheckboxIcon)`w-5 h-5 text-gray-500`
const FeatureText = tw.p`ml-1 font-medium text-gray-700`
const ImageColumn = tw(Column)`ml-auto lg:mr-0 relative mt-4 lg:mt-0 lg:ml-8`
const ImageContainer = tw.div`relative z-40 transform xl:-translate-x-24 xl:-translate-y-16`
const Image = tw.img`max-w-full w-24 rounded-t sm:rounded relative z-20`
const Offsetbackground = tw.div`absolute inset-0 bg-gray-300 rounded xl:-mb-8`
const ImageDecoratorBlob = styled(SvgDecoratorBlob1)`
  ${tw`absolute bottom-0 right-0 z-10 w-32 h-32 text-gray-900 transform translate-x-10 translate-y-10 opacity-25 pointer-events-none fill-current`}
`
const Testimonial = tw.div`max-w-sm rounded-b md:rounded-none relative sm:absolute bottom-0 inset-x-0 z-20 px-3 py-3 sm:px-10 sm:py-8 bg-red-900 text-gray-400 font-medium transform md:-translate-x-32 text-sm leading-relaxed md:-mr-16 xl:mr-0`
// const QuotesLeftIcon = tw(
//   QuotesLeftIconBase
// )`w-16 h-16 md:w-12 md:h-12 absolute top-0 left-0 text-gray-100 md:text-red-500 transform translate-x-1 md:-translate-x-1/2 md:-translate-y-5 opacity-10 md:opacity-100`
const Quote = tw.blockquote``
const CustomerName = tw.p`mt-2 font-bold`
const CustomerCompany = tw.p`mt-1 text-sm text-gray-500`

export default ({
  heading = 'Better, Faster and Cheaper Cloud.',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  imageSrc = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
  imageDecoratorBlob = true,
  primaryButtonUrl = 'https://google.com',
  primaryButtonText = 'Get Started',
  buttonRounded = true,
  features = [
    'Available in 7 Locations',
    'Premium Internet Backbone',
    '99.99% Uptime SLA',
  ],
  testimonial = {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    customerName: 'Charlotte Hale',
    customerCompany: 'Delos Inc.',
  },
}) => {
  const buttonRoundedCss = buttonRounded && tw`rounded-full`

  return (
    <>
      <Container>
        <ContentWithVerticalPadding>
          <Row>
            <TextColumn>
              <Heading>{heading}</Heading>
              <Description>{description}</Description>
              <PrimaryButton
                as='a'
                href={primaryButtonUrl}
                css={buttonRoundedCss}
              >
                {primaryButtonText}
              </PrimaryButton>
              <FeatureList>
                {features.map((feature, index) => (
                  <Feature key={index}>
                    {/* <FeatureIcon /> */}
                    <FeatureText>{feature}</FeatureText>
                  </Feature>
                ))}
              </FeatureList>
            </TextColumn>
            <ImageColumn>
              <ImageContainer>
                <Image src={imageSrc} />
                {imageDecoratorBlob && <ImageDecoratorBlob />}
                <Testimonial>
                  {/* <QuotesLeftIcon /> */}
                  <Quote>{testimonial.quote}</Quote>
                  <CustomerName>{testimonial.customerName}</CustomerName>
                  <CustomerCompany>
                    {testimonial.customerCompany}
                  </CustomerCompany>
                </Testimonial>
              </ImageContainer>
              <Offsetbackground />
            </ImageColumn>
          </Row>
        </ContentWithVerticalPadding>
      </Container>
    </>
  )
}
