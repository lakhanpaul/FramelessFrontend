import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line
import 'antd/dist/antd.css'
import { Affix, Menu, Typography, Space } from 'antd'
import { useHistory } from 'react-router-dom'

const MenuItem = tw(Menu.Item)`flex flex-col justify-center items-center`
const PrimaryMenuItem = tw(Menu.Item)`px-2`
const StyledMenu = tw(Menu)`flex justify-center px-0.5`
const { Title } = Typography
const StyledTitle = tw(Title)`mt-0.5`

const NewNavbar = () => {
  const [activePage, setActivePage] = useState('')

  function handleClick(e) {
    console.log('click ', e)
    setActivePage({ current: e.key })
  }

  let history = useHistory()

  function navigateToPage({ keyPath }) {
    console.log('keying', keyPath)
    history.push(keyPath[0])
  }

  return (
    <Affix>
      <StyledMenu
        onSelect={navigateToPage}
        onClick={handleClick}
        selectedKeys={[activePage]}
        mode='horizontal'
      >
        <PrimaryMenuItem key='/'>
          <StyledTitle level={4}>Frameless</StyledTitle>
        </PrimaryMenuItem>
        <MenuItem key='about'>About</MenuItem>
        <MenuItem key='search'>Search</MenuItem>
        <MenuItem key='opportunities'>All Opportunities</MenuItem>
      </StyledMenu>
    </Affix>
  )
}

export default NewNavbar
