import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { css } from 'styled-components/macro' //eslint-disable-line
import { Link } from 'react-router-dom'

const Container = styled.div`
  ${tw`relative bg-gray-300 bg-top bg-repeat-x bg-cover bg-opacity-40`}
`
const Content = tw.div`max-w-screen-xl bg-transparent mx-auto py-2 lg:py-6`

const ThreeColumn = tw.div`flex mx-1 md:mx-0 flex-wrap justify-evenly`

const CardContainer = tw(
  Link
)`w-full md:w-1/2 xl:w-3/12 rounded-md shadow-md bg-gray-100 mt-6 xl:mt-2 xl:mr-2 xl:last:mr-0`

const Card = tw.div`mx-auto p-0.125  rounded-md  hocus:ring-4 hocus:ring-offset-2 hocus:ring-red-300  xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`
const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-24 bg-center bg-cover rounded`,
])

const CardText = tw.div`mt-1 p-1`

const CardHeader = tw.div`flex justify-between items-center`
const CardCompany = tw.div`text-gray-500 font-bold text-lg`
const CardType = tw.div`font-semibold text-sm text-gray-600`

const CardTitle = tw.h5`text-xl text-gray-600 mt-1 font-bold`

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-center text-xs font-semibold tracking-wide text-white uppercase sm:items-center`}
`

const CardMetaFeature = styled.div`
  ${tw`flex items-center m-1 text-gray-400 last:mr-0`}
  svg {
    ${tw`w-2 h-2 mr-0.125`}
  }
`

const CardAction = tw(Link)`w-full mt-3`

const ResultsDisplayCardsWithImage = ({
  cardLinkText = 'Learn more',

  cards = false,
}) => {
  const defaultCards = [
    {
      image:
        'https://images.unsplash.com/photo-1563461660947-507ef49e9c47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80',
      company: 'Tesla Inc.',
      type: 'Ad Campaign',
      title: 'Personalized Ad Campaign using Google AdWords',
      duration: '90 Days Campaign',
      location: 'New York',
    },
    {
      image:
        'https://images.unsplash.com/photo-1573165231977-3f0e27806045?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80',
      company: 'Nestle',
      type: 'SEO Marketing',
      title: 'Ranking #1 for keywords like Chocolate, Snack',
      duration: '180 Day Campaign',
      location: 'Palo Alto',
    },
  ]
  if (cards === false) {
    cards = defaultCards
  }
  return (
    <Container>
      <Content>
        <ThreeColumn>
          {cards.map((card, index) => {
            const linkTarget = `opportunity/details/${card.slug}`
            return (
              <CardContainer key={index} to={linkTarget}>
                <Card>
                  <CardImage imageSrc={card.image} />
                  <CardText>
                    <CardHeader>
                      <CardCompany>{card.company}</CardCompany>
                      <CardType>{card.type}</CardType>
                    </CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                    <CardMeta>
                      <CardMetaFeature>{card.duration}</CardMetaFeature>
                      <CardMetaFeature>{card.location}</CardMetaFeature>
                    </CardMeta>
                    <CardAction to={linkTarget}>{cardLinkText}</CardAction>
                  </CardText>
                </Card>
              </CardContainer>
            )
          })}
        </ThreeColumn>
      </Content>
    </Container>
  )
}

export default ResultsDisplayCardsWithImage
