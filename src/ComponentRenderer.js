import React, { useState } from 'react'
import tw from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line
import { useParams } from 'react-router-dom'
import AnimationRevealPage from './helpers/AnimationRevealPage.js'

// this component defines the url's for all pages and subcomponents inside the project
// so that they don't have to be defined within react router, and the path given to the
// router can instead just catch the values inside the url and match them to one of the
// urls here to display the correct component.

import IllustrationAndInputHero from './components/pages/MainPage.js'

const Container = tw.div`relative`

export const components = {
  blocks: {
    Hero: {
      type: 'Hero Section',
      elements: {
        IllustrationAndInput: {
          name: 'With Image Illustration and Input',
          component: IllustrationAndInputHero,
          url: '/components/blocks/Hero/IllustrationAndInput',
        },
      },
    },
  },
}

export default () => {
  const { type, subtype, name } = useParams()

  // the code below is responsible for handling the dark mode button
  // it simply adds dark mode to the containers classList
  const [isDark, setIsDark] = useState(false)
  const [darkModeInstruction, setDarkModeInstruction] =
    useState('Turn dark mode on')

  function handleDarkModeChange() {
    console.log('dark mode function called')
    if (isDark) {
      setDarkModeInstruction('Turn dark mode on')
      document.getElementById('PageContainer').classList.remove('dark')
      setIsDark(false)
    } else if (!isDark) {
      setDarkModeInstruction('Turn light mode on')

      document.getElementById('PageContainer').classList.add('dark')
      setIsDark(true)
    }
  }

  const DarkModeButton = tw.button`fixed z-50 top-1 px-8  py-3 font-bold rounded bg-gray-700 text-gray-100 hocus:bg-gray-900 hocus:text-gray-200  focus:outline-none transition duration-300`

  try {
    let Component = null
    if (type === 'blocks' && subtype) {
      Component = components[type][subtype]['elements'][name].component
      return (
        <Container id='PageContainer'>
          <DarkModeButton onClick={handleDarkModeChange}>
            {darkModeInstruction}
          </DarkModeButton>
          <Component />
        </Container>
      )
    } else Component = components[type][name].component

    if (Component)
      return (
        <Container id='PageContainer'>
          <DarkModeButton onClick={handleDarkModeChange}>
            {darkModeInstruction}
          </DarkModeButton>
          <Component />
        </Container>
      )

    throw new Error('Component Not Found')
  } catch (e) {
    console.log(e)
    return <div>Error: Component Not Found</div>
  }
}
