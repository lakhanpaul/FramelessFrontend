import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
//eslint-disable-next-line
import { css } from 'styled-components/macro'

import { Link } from 'react-router-dom'

const Container = tw.div`flex relative flex-col md:ml-2 ml-1 h-auto md:h-3/4`
const TitleContainer = tw.div`flex items-center`
const Title = tw.h1`md:text-xl md:tracking-wide text-base tracking-normal`
const OptionsContainer = tw.div` flex justify-center`
const Option = tw.button`text-lg rounded-full p-0.5 m-1 bg-gray-200 focus:outline-none border-black focus:ring focus:border-blue-300 `
const ChatboxContainer = tw.div`flex flex-col`
const ChatContainer = tw.div`flex flex-col`
const ProfileContainer = tw.div`flex mt-1`
const ProfileName = tw.div`text-xs tracking-tighter`
const ChatMessage = tw.div`text-sm tracking-tight w-1/2 h-auto p-0.5 bg-gray-300 rounded-2xl`
const ProfilePicContainer = tw.img`rounded-full md:h-2 md:w-2 h-1 w-1 ml-1`
const InputContainer = tw.div`flex md:mt-0 mt-2 md:absolute md:bottom-0 self-stretch`
const InputBar = tw.input`appearance-none border-green-600 bg-white border-2`

const MainRight = () => {
  const fakeChats = [
    {
      name: 'David',
      message: 'Nice background',
      profilePic:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    },
    {
      name: 'Bob',
      message: 'What we looking at today?',
      profilePic:
        'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80',
    },
    {
      name: 'Mikal',
      message: 'Is my mic working?',
      profilePic:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Mikal',
      message: 'I found a fish',
      profilePic:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
  ]

  return (
    <Container>
      <TitleContainer>
        <Title>Group chat</Title>
        <OptionsContainer>
          <Option>Messages</Option>
          <Option>Participants</Option>
        </OptionsContainer>
      </TitleContainer>
      <ChatboxContainer>
        {fakeChats.map((chat, key) => {
          if (
            key === 0 ? true : fakeChats[key].name !== fakeChats[key - 1].name
          ) {
            return (
              <ChatContainer>
                <ProfileContainer>
                  <ProfileName>{chat.name}</ProfileName>
                  {/* <ProfilePicContainer>
                  <img src={chat.profilePic} />
                </ProfilePicContainer> */}
                  <ProfilePicContainer src={chat.profilePic} />
                </ProfileContainer>
                <ChatMessage>{chat.message}</ChatMessage>
              </ChatContainer>
            )
          } else {
            return (
              <ChatContainer>
                <ChatMessage>{chat.message}</ChatMessage>
              </ChatContainer>
            )
          }
        })}
      </ChatboxContainer>
      <InputContainer>
        <InputBar />
      </InputContainer>
    </Container>
  )
}

export default MainRight
