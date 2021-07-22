import React from 'react'
import { motion } from 'framer-motion'
import tw from 'twin.macro'
import styled from 'styled-components'
import { css } from 'styled-components/macro' //eslint-disable-line
import { NavLink } from 'react-router-dom'

import useAnimatedNavToggler from '../../../helpers/useAnimatedNavToggler'

import MenuIcon from 'feather-icons/dist/icons/menu.svg'
import CloseIcon from 'feather-icons/dist/icons/x.svg'

const HeaderContainer = tw.div`
fixed inset-x-0 text-blue-700 transition duration-500 border rounded-lg ease-in-out z-40 shadow-md top-0 pt-0.125 md:pt-1 
`

const Header = tw.header`
flex justify-between items-center
max-w-screen-xl mx-auto pt-1 pb-0.5 
`

export const NavLinks = tw.div`inline-block flex justify-start`

/* hocus: stands for "on hover or focus"
 * hocus:bg-blue-700 will apply the bg-blue-700 class on hover or focus
 */
export const StyledNavLink = tw(NavLink)`
  lg:text-base text-blue-500 my-1 text-xs lg:mx-2 lg:my-0
  font-medium tracking-wide transition duration-500 ease-in-out transform rounded-md
  pb-0.125 border-b-2 border-transparent hover:border-blue-500 hocus:text-blue-600
  focus:shadow-sm focus:outline-none  focus:ring-2 ring-offset-current ring-offset-2 
`

export const blueLink = tw(StyledNavLink)`
  lg:mx-0
  px-3 py-1 rounded bg-blue-500 text-gray-100
  hocus:bg-blue-700 hocus:text-gray-200 focus:shadow-sm
  border-b-0
`

export const LogoLink = styled(StyledNavLink)`
  ${tw`inline-flex justify-center focus:outline-none md:mx-auto items-center font-normal border-b-0 md:text-xl!  text-base!`};
`

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between `
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-blue-500 transition duration-300
`
export const MobileNavLinks = motion(styled.div`
  ${tw`fixed inset-x-0 top-0 z-10 p-2 mx-1 my-2 text-center text-gray-900 bg-white border rounded-lg lg:hidden`}
  ${NavLinks} {
    ${tw`flex flex-col items-center w-full`}
  }
`)

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-start items-center
`

export default ({
  roundedHeaderButton = false,
  logoLink,
  links,
  className,
  collapseBreakpointClass = 'lg',
}) => {
  /*
   * This header component accepts an optionals "links" prop that specifies the links to render in the navbar.
   * This links props should be an array of "NavLinks" components which is exported from this file.
   * Each "NavLinks" component can contain any amount of "StyledNavLink" component, also exported from this file.
   * This allows this Header to be multi column.
   * So If you pass only a single item in the array with only one NavLinks component as root, you will get 2 column header.
   * Left part will be LogoLink, and the right part will be the the NavLinks component you
   * supplied.
   * Similarly if you pass 2 items in the links array, then you will get 3 columns, the left will be "LogoLink", the center will be the first "NavLinks" component in the array and the right will be the second "NavLinks" component in the links array.
   * You can also choose to directly modify the links here by not passing any links from the parent component and
   * changing the defaultLinks variable below below.
   * If you manipulate links here, all the styling on the links is already done for you. If you pass links yourself though, you are responsible for styling the links or use the helper styled components that are defined here (StyledNavLink)
   */
  const defaultLinks = [
    <NavLinks key={1}>
      <StyledNavLink to='/components/innerPages/AboutUsPage'>
        About
      </StyledNavLink>
      <StyledNavLink to='/components/innerPages/MarketingProgramPage'>
        Marketing
      </StyledNavLink>
      <StyledNavLink to='/components/innerPages/TechnologyProgramPage'>
        Technology
      </StyledNavLink>
      <StyledNavLink to='/components/innerPages/OpportunityFinderPage'>
        Opportunity Finder
      </StyledNavLink>
      <StyledNavLink to='/components/blocks/Form/TwoColContactUsFull'>
        Contact Us
      </StyledNavLink>
    </NavLinks>,
  ]

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler()
  const collapseBreakpointCss =
    collapseBreakPointCssMap[collapseBreakpointClass]

  const defaultLogoLink = <LogoLink to='/'>Frameless</LogoLink>

  logoLink = logoLink || defaultLogoLink
  links = links || defaultLinks

  return (
    <HeaderContainer>
      <Header className={className || 'header-light'}>
        <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
          {logoLink}
          {links}
        </DesktopNavLinks>

        <MobileNavLinksContainer
          css={collapseBreakpointCss.mobileNavLinksContainer}
        >
          {logoLink}
          <MobileNavLinks
            initial={{ x: '150%', display: 'none' }}
            animate={animation}
            css={collapseBreakpointCss.mobileNavLinks}
          >
            {links}
          </MobileNavLinks>
          <NavToggle
            onClick={toggleNavbar}
            className={showNavLinks ? 'open' : 'closed'}
          >
            {showNavLinks ? (
              <CloseIcon tw='w-6 h-6' />
            ) : (
              <MenuIcon tw='w-6 h-6' />
            )}
          </NavToggle>
        </MobileNavLinksContainer>
      </Header>
    </HeaderContainer>
  )
}

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`,
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`,
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
}
