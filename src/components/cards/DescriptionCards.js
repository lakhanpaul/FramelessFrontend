import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line
import { blue } from '@ant-design/colors'
import 'antd/dist/antd.css'
import axios from 'axios'
import tailwind from 'tailwind-rn'
import { useHistory, Link, Redirect } from 'react-router-dom'
import { Card, Typography, Image, List } from 'antd'

const { Text, Paragraph } = Typography

const CardContainer = tw(a)`flex flex-col md:flex-row w-full border`
const MetaContainer = tw.div`flex flex-col items-center gap-0.125 justify-center`
const TitleContainer = tw.div`flex items-center gap-0.125 justify-center`
const StyledCardImage = styled.div(() => [
  tw`w-full h-20 bg-cover `,
  ({ image }) => `background-image: url(${image})`,
])
const StyledImage = tw(Image)`h-full w-full md:w-40  p-0.5`
const TitleSpacing = tw.div`flex flex-col gap-0.125`
const Container = styled.div`
  ${tw`relative w-full bg-top bg-repeat-x bg-cover bg-opacity-40`}
  bg-${blue[6]}
`
const Content = tw.div`max-w-screen-xl bg-transparent mx-auto`
const Column = tw.div`flex flex-col p-1 gap-1 justify-center items-center`

const StyledList = tw(List)``
const ListItem = tw(List.Item)``

const StyledCard = tw(Card)`w-full`
const StyledCardMeta = tw(Card.Meta)``

const StyledParagraph = tw(Paragraph)`whitespace-normal`
const StyledText = tw(Text)`whitespace-normal`

const DescriptionCards = () => {
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

  const history = useHistory()

  const descriptionCardsToDisplay = [
    {
      title: 'How it works',
      subtitle: 'A deep-dive into the scholarship',
      description: '',
      image:
        'https://lesbianswhotech.org/wp-content/uploads/2018/06/codingscholarship-how-it-works-V2-1.png',
      url: 'https://lesbianswhotech.org/codingscholarship/#about',
      features: [
        {
          title: 'Graduate',
          description: 'Graduate with honors from our program',
        },
        {
          title: 'Scheduled check-ins',
          description: 'Talk regularly to our professional coders',
        },
        {
          title: 'Find a job',
          description: 'Use our network of people to find employment',
        },
      ],
    },
    {
      title: 'About the Edie Windsor Scholarship',
      subtitle: 'A brief background',
      description:
        'Learning how to code is more than education — It’s economic opportunity. Our community, like many underrepresented groups, are turning to coding schools because they are more accessible than four-year, computer science degrees.\r\nWe named our scholarship after LGBTQ and technology legend, Edie Windsor, to recognize her heroic victory over the Defense of Marriage Act (DOMA) and to celebrate her technical leadership as a computer programming pioneer at IBM. In love and work, Edie Windsor is one of our community’s greatest role models. We want to be a part of telling her story and helping inspire future generations of LGBTQ, technical women and non-binary individuals.',
      image:
        'https://lesbianswhotech.org/wp-content/uploads/2018/04/codingscholarship-about.png',
      url: 'https://lesbianswhotech.org/codingscholarship/',
      features: [],
    },
  ]

  function followLink(path) {
    console.log('follwing the path', path)
  }

  return (
    <Container>
      <Content>
        <Column>
          {descriptionCardsToDisplay ? (
            descriptionCardsToDisplay.map((card, key) => {
              const { title, subtitle, description, image, url, features } =
                card

              const CardTitle = (
                <TitleSpacing>
                  <StyledText strong>{capitalizeSentence(title)}</StyledText>
                  <StyledText type='secondary'>
                    {capitalizeSentence(subtitle)}
                  </StyledText>
                </TitleSpacing>
              )

              const ellipsis = {
                rows: 4,
                expandable: true,
                onExpand: console.log('dave'),
              }

              const cardDescription = (
                <>
                  <StyledParagraph ellipsis={ellipsis}>
                    {description}
                  </StyledParagraph>
                  <StyledList
                    itemLayout='horizontal'
                    dataSource={features}
                    renderItem={(feature) => (
                      <ListItem>
                        <List.Item.Meta
                          title={feature.title}
                          description={feature.description}
                        />
                      </ListItem>
                    )}
                  />
                </>
              )

              return (
                <CardContainer
                  key={key}
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <StyledImage src={image} />
                  <StyledCard loading={false} key={key} hoverable={true}>
                    <StyledCardMeta
                      title={CardTitle}
                      description={cardDescription}
                    />
                  </StyledCard>
                </CardContainer>
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

export default DescriptionCards
