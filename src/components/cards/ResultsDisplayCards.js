import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line
import { blue } from '@ant-design/colors'
import 'antd/dist/antd.css'
import axios from 'axios'
import tailwind from 'tailwind-rn'
import {
  CalendarOutlined,
  EnvironmentOutlined,
  ControlOutlined,
  ShopOutlined,
  ProjectOutlined,
} from '@ant-design/icons'
import { Row, Col, Card, Space, Typography } from 'antd'

const { Text, Title } = Typography

const MetaContainer = tw.div`flex items-center gap-0.125 justify-center`
const TitleContainer = tw.div`flex items-center gap-0.125 justify-center`
const StyledCardImage = styled.div(() => [
  tw`w-full h-10 bg-cover md:h-15`,
  ({ image }) => `background-image: url(${image})`,
])

const ItemSpacing = tw.div`flex flex-wrap w-full flex-col justify-start items-center md:flex-row gap-0.125 md:gap-0.5`
const Container = styled.div`
  ${tw`relative w-full bg-top bg-repeat-x bg-cover bg-opacity-40`}
  bg-${blue[6]}
`
const Content = tw.div`max-w-screen-xl bg-transparent mx-auto py-2 lg:py-6`
const Column = tw.div`flex mx-1 md:mx-0 flex-wrap justify-evenly`
const StyledCard = tw(Card)`w-15 md:w-20 m-1`
const StyledCardMeta = tw(Card.Meta)``
const StyledText = tw(Text)`whitespace-normal`
const StyledTitle = tw(Text)`w-10`

const ResultsDisplayCards = ({ cardsToDisplay }) => {
  function capitalizeSentence(sentence) {
    const arrayOfWords = sentence.split(' ')
    const arrayOfCapitalizedWords = arrayOfWords.map((word) => {
      let lowerCaseWord = word.toLowerCase()
      let upperCaseFirstLetterWord =
        lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1)
      return upperCaseFirstLetterWord
    })
    const capitalizedSentence = arrayOfCapitalizedWords.join(' ')
    return capitalizedSentence
  }

  const CardDescription = (
    <ItemSpacing direction='horizontal' size='large'>
      <MetaContainer>
        <CalendarOutlined />
        <StyledText>duration</StyledText>
      </MetaContainer>
      <MetaContainer>
        <EnvironmentOutlined />
        <StyledText>Location</StyledText>
      </MetaContainer>
      <MetaContainer>
        <ControlOutlined />
        <StyledText>Type</StyledText>
      </MetaContainer>
    </ItemSpacing>
  )

  const CardTitle = (
    <ItemSpacing direction='horizontal' size='large'>
      <StyledText type='strong'>Title</StyledText>
      <StyledText type='strong'>Company</StyledText>
    </ItemSpacing>
  )

  const cardCover = (
    <img src='https://images.unsplash.com/photo-1630070777845-600d3bc44b7c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80' />
  )

  return (
    <Container>
      <Content>
        <Column>
          {cardsToDisplay ? (
            cardsToDisplay.map((card, key) => {
              const { title, type, company, duration, location, image } = card
              const CardDescription = (
                <ItemSpacing>
                  <MetaContainer>
                    <CalendarOutlined />
                    <StyledText type='secondary'>
                      {capitalizeSentence(duration)}
                    </StyledText>
                  </MetaContainer>
                  <MetaContainer>
                    <EnvironmentOutlined />
                    <StyledText type='secondary'>
                      {capitalizeSentence(location)}
                    </StyledText>
                  </MetaContainer>
                  <MetaContainer>
                    <ControlOutlined />
                    <StyledText type='secondary'>
                      {capitalizeSentence(type)}
                    </StyledText>
                  </MetaContainer>
                </ItemSpacing>
              )

              const CardTitle = (
                <ItemSpacing>
                  <TitleContainer>
                    <ProjectOutlined />
                    <StyledText strong>{capitalizeSentence(title)}</StyledText>
                  </TitleContainer>
                  <TitleContainer>
                    <ShopOutlined />
                    <StyledText strong>
                      {capitalizeSentence(company)}
                    </StyledText>
                  </TitleContainer>
                </ItemSpacing>
              )

              const cardCover = <StyledCardImage image={image} />
              return (
                <StyledCard
                  cover={cardCover}
                  loading={false}
                  key={key}
                  hoverable={true}
                >
                  <StyledCardMeta
                    title={CardTitle}
                    description={CardDescription}
                  />
                </StyledCard>
              )
            })
          ) : (
            <></>
          )}
        </Column>
      </Content>
    </Container>
  )
}

export default ResultsDisplayCards
