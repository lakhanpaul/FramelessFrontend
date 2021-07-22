import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
//eslint-disable-next-line
import { css } from 'styled-components/macro'

import { ReactVideo } from 'reactjs-media'

const VideoPlayer = () => {
  return (
    <div>
      <ReactVideo
        src='https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
        poster='https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
        primaryColor='green'
      />
    </div>
  )
}

export default VideoPlayer
