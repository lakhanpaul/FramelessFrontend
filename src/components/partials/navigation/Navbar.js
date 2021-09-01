import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { css } from 'styled-components/macro' //eslint-disable-line
import { Link, NavLink } from 'react-router-dom'

const SecondaryContainer = tw.div`w-screen fixed inset-x-0 top-0 z-40  text-blue-700 transition   duration-500 ease-in-out transform bg-transparent backdrop-filter backdrop-blur-md rounded-lg`
const TertiaryContainer = tw.div`flex gap-0.5 md:gap-0 flex-wrap items-center justify-center px-2 pt-1 pb-0.5  md:items-center md:flex-row`
const NavLinksContainer = tw.nav`flex flex-wrap items-center justify-start text-base `
const NavListContainer = tw.ul`items-center gap-1  list-none inline-flex`
const StyledNavLink = tw(
  NavLink
)`tracking-wide font-semibold py-0.125 mr-0.125 text-base text-blue-500 transition duration-500 ease-in-out transform rounded-md focus:shadow-sm focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black`
const LogoContainer = tw(
  Link
)`justify-center mr-1 md:mt-0 focus:outline-none md:ml-auto md:mr-auto inline-flex items-center`
const MainTitle = tw.h1`block px-0.125 md:p-2 text-xl font-medium tracking-tighter text-black transition duration-500 ease-in-out transform cursor-pointer hover:text-blue-500 lg:text-xl `
const PrimaryButton = tw(
  Link
)`w-auto md:px-2 px-0.125 md:mt-1 md:py-0.5 py-0.5 md:my-0.5 md:text-base text-xs font-medium text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md lg:ml-auto focus:shadow-sm focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-700`

const Navbar = () => {
  return (
    <SecondaryContainer>
      <TertiaryContainer>
        <NavLinksContainer>
          <NavListContainer>
            <li>
              <StyledNavLink to='#'>About</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to='#'>Search</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to='#'>Opportunities</StyledNavLink>
            </li>
          </NavListContainer>
        </NavLinksContainer>
        <LogoContainer to='/'>
          <div className='hidden w-1 h-1 p-2 mr-2 rounded-full lg:inline-block bg-gradient-to-tr to-red-700 from-gray-300'></div>
          <MainTitle> Frameless</MainTitle>
        </LogoContainer>
        <PrimaryButton to='/submission/opportunity'>
          Submit Opportunity
        </PrimaryButton>
      </TertiaryContainer>
    </SecondaryContainer>
  )
}

export default Navbar
