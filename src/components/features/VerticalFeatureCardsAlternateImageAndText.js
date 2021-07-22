import React, { useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = tw.div`relative bg-gray-100`
const HeadingContainer = styled.div`
  ${tw`relative w-screen h-screen pt-1 pb-2 bg-center bg-cover `}
  background-image: url('https://source.unsplash.com/collection/364956/${screenDimensions}');
`
const HeadingInfoContainer = tw.div`flex flex-col w-full h-full justify-center md:items-center items-start   `
const HeadingDescription = tw.p`mt-2 font-medium text-gray-600 text-center max-w-sm`
const SingleColumn = tw.div`max-w-screen-xl mx-auto rounded-lg shadow-lg bg-gray-100 py-5 lg:py-8`

const screenDimensions = screen.width + 'x' + screen.height

const Content = tw.div`mt-4`

const Card = styled.div((props) => [
  tw`items-center p-1 mt-5 rounded-md shadow md:flex`,
  props.reversed ? tw`flex-row-reverse` : 'flex-row',
])
const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`flex-shrink-0 h-20 mx-2 bg-center bg-cover rounded md:w-1/2 lg:w-5/12 xl:w-1/3 md:h-30 sm:mx-8 md:mx-4 lg:mx-8`,
])
const Details = tw.div`mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8`
const Subtitle = tw.div`font-bold text-center md:text-left tracking-wide text-gray-300`
const Title = tw.h4`md:text-3xl text-center md:text-left text-xl font-bold text-gray-900`
const Description = tw.p`mt-2 text-sm leading-loose`
const Link = tw.a`inline-block mt-4 text-sm text-gray-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-gray-500`

const Features = tw.div`mx-auto md:mx-0 flex flex-col  lg:max-w-none`
const Feature = tw.div`mt-1 lg:mt-2 flex items-center md:items-start flex-col md:mr-4 last:mr-0`

const FeatureHeadingContainer = tw.div`flex items-center`
const FeatureIconContainer = styled.div`
  ${tw`flex-shrink-0 inline-block p-0.125 rounded-full mx-auto text-center border rounded border-gray-500 text-gray-500`},
  svg {
    ${tw`w-2 h-2`}
  }
`
const FeatureHeading = tw.div` text-center md:text-left font-semibold text-base`

const FeatureDescription = tw.div`mt-0.5 text-center md:text-left text-gray-600  leading-snug`

// const SvgDotPattern1 = tw(
//   SvgDotPatternIcon
// )`absolute top-0 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`
// const SvgDotPattern2 = tw(
//   SvgDotPatternIcon
// )`absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`
// const SvgDotPattern3 = tw(
//   SvgDotPatternIcon
// )`absolute bottom-0 left-0 transform -translate-x-20 rotate-45 -translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`
// const SvgDotPattern4 = tw(
//   SvgDotPatternIcon
// )`absolute bottom-0 right-0 transform translate-x-20 rotate-90 -translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`
const MainTitle = tw.h1` md:text-5xl pl-1 text-white font-bold text-2xl`
const CompanyContainer = tw.div``
const Company = tw.h1` md:text-2xl font-bold text-white text-xl p-1`
const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-start text-xl font-semibold tracking-wide text-white uppercase sm:items-center`}
`
const CardMetaFeature = styled.div`
  ${tw`flex items-center m-1 text-white last:mr-0`}
  svg {
    ${tw`w-2 h-2 mr-0.125`}
  }
`

export default ({ opportunityInformation }) => {
  console.log('DATAAAA', opportunityInformation)

  const {
    image,
    company,
    type,
    title,
    duration,
    location,
    url,
    description_cards,
  } = opportunityInformation

  console.log(
    'DESCIPRIOTN',
    image,
    company,
    type,
    title,
    duration,
    location,
    url,
    description_cards
  )

  const defaultCards = [
    {
      imageSrc:
        'https://images.unsplash.com/photo-1550699026-4114bbf4fb49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80',
      subtitle: 'Paid',
      title: 'Loachella, NYC',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      url: 'https://timerse.com',
      features: [
        {
          title: 'Problem Solving',
          icon: 'SolidAirplaneIcon',
          description: 'Learn great problem solving skills',
        },
        {
          title: 'Problem Solving',
          icon: 'SolidAirplaneIcon',
          description: 'Learn great problem solving skills',
        },
        {
          title: 'Problem Solving',
          icon: 'SolidAirplaneIcon',
          description: 'Learn great problem solving skills',
        },
      ],
    },

    {
      imageSrc:
        'https://images.unsplash.com/photo-1543423924-b9f161af87e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      subtitle: 'Free',
      title: 'Rock In Rio, Upstate',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      url: 'https://timerse.com',
      features: [
        {
          title: 'Problem Solving',
          icon: 'SolidAirplaneIcon',
          description: 'Learn great problem solving skills',
        },
        {
          title: 'Problem Solving',
          icon: 'SolidAirplaneIcon',
          description: 'Learn great problem solving skills',
        },
        {
          title: 'Problem Solving',
          icon: 'SolidAirplaneIcon',
          description: 'Learn great problem solving skills',
        },
      ],
    },

    {
      imageSrc:
        'https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80',
      subtitle: 'Exclusive',
      title: 'Lollapalooza, Manhattan',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      url: 'https://timerse.com',
      features: [
        {
          title: 'Problem Solving',
          icon: 'SolidAirplaneIcon',
          description: 'Learn great problem solving skills',
        },
        {
          title: 'Problem Solving',
          icon: 'SolidAirplaneIcon',
          description: 'Learn great problem solving skills',
        },
        {
          title: 'Problem Solving',
          icon: 'SolidAirplaneIcon',
          description: 'Learn great problem solving skills',
        },
      ],
    },
  ]

  console.log('DESCIPRIOTN', description_cards)

  return (
    <Container>
      <HeadingContainer>
        <HeadingInfoContainer>
          <MainTitle>{title}</MainTitle>
          <CompanyContainer>
            <Company>{company}</Company>
          </CompanyContainer>
          <HeadingDescription></HeadingDescription>
          <CardMeta>
            <CardMetaFeature>{location}</CardMetaFeature>
            <CardMetaFeature>{duration}</CardMetaFeature>
            <CardMetaFeature>{type}</CardMetaFeature>
          </CardMeta>
        </HeadingInfoContainer>
      </HeadingContainer>
      <SingleColumn>
        <Content>
          {description_cards.map((description_card, i) => (
            <Card key={i} reversed={i % 2 === 1}>
              <Image imageSrc={description_card.image} />
              <Details>
                <Subtitle>{description_card.subtitle}</Subtitle>
                <Title>{description_card.title}</Title>
                <Features>
                  {description_card.features.map((feature, index) => (
                    <Feature key={index}>
                      <FeatureHeadingContainer>
                        {/* <FeatureIconContainer>
                          <Image imageSrc={feature.icon} />
                        </FeatureIconContainer> */}
                        <FeatureHeading>{feature.title}</FeatureHeading>
                      </FeatureHeadingContainer>
                      <FeatureDescription>
                        {feature.description}
                      </FeatureDescription>
                    </Feature>
                  ))}
                </Features>
                <Link href={description_card.url}>See Event Details</Link>
              </Details>
            </Card>
          ))}
        </Content>
      </SingleColumn>
    </Container>
  )
}
