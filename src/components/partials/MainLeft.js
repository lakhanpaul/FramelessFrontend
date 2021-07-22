import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
//eslint-disable-next-line
import { css } from 'styled-components/macro'

import ButtonTitleButton from '../text/titles/ButtonTitleButton'
import IconWithTextButton from '../buttons/IconWithTextButton'
import SubtitleDisplay from '../text/information/SubtitleDisplay'
import VideoPlayer from './VideoPlayer'

import SolidArrowBackward from '../../images/icons/navigation/solidArrowBackward.svg'
import SolidGroupOfPeople from '../../images/icons/people/solidGroupOfPeople.svg'
import SolidAirplane from '../../images/icons/actions/solidAirplane.svg'
import SolidUserAdd from '../../images/icons/actions/solidUserAdd.svg'

const MainContainer = tw.div`flex flex-col`
const AttendeeStatisticsContainer = tw.div`flex `
// const AttendeeStatisticsContainer = tw.div`flex justify-center mx-2 md:mx-3`
const AttendeeAdditionContainer = tw.div`flex justify-end w-1/2`
const VideoSectionContainer = tw.div`flex`
const SubtitleContainer = tw.div`flex justify-center mt-2`
const HorizontalDivider = tw.hr`px-1 mx-1`

const MainLeft = () => {
  const a = true
  return (
    <MainContainer>
      {/* Main title */}
      <ButtonTitleButton
        title='Overview of new revision guide'
        primaryButtonTarget='/'
        primaryIcon={<SolidArrowBackward />}
        secondaryIcon={<SolidGroupOfPeople />}
        titleTextSize='extraLarge'
      />
      <HorizontalDivider />
      <AttendeeStatisticsContainer>
        {/* Secondary title with statistics */}
        <ButtonTitleButton
          title='Invited to the call'
          primaryButtonTarget='/'
          primaryIcon={<SolidAirplane />}
          titleTextSize='extraSmall'
        />
        {/* Invite button with icon */}
        <ButtonTitleButton
          title='Add new member'
          primaryButtonTarget='/'
          primaryIcon={<SolidUserAdd />}
          titleTextSize='extraSmall'
        />
      </AttendeeStatisticsContainer>
      <VideoSectionContainer>
        <VideoPlayer />
      </VideoSectionContainer>
      <SubtitleContainer>
        <SubtitleDisplay />
      </SubtitleContainer>
    </MainContainer>
  )
}

export default MainLeft
