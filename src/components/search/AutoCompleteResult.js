import React from 'react'
import tw, { styled } from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line
import 'antd/dist/antd.css'
import axios from 'axios'
import { Card, Avatar, Typography, Space } from 'antd'

const CardStyle = tw.div`flex bg-red-900 text-6xl border-blue-900 border-4 shadow-xl`

const AutoCompleteResult = ({ cardData, key }) => {
  const { image, url, title, company, duration, type } = cardData
  const { Text, Link } = Typography

  const cardCover = <Avatar src={image} />

  const cardDescription = (
    <Space direction='horizontal'>
      <Text type='secondary'>Organization</Text>
      <Text>{company}</Text>
      <Text type='secondary'>Type</Text>
      <Text>{type}</Text>
      <Text type='secondary'>Duration</Text>
      <Text>{duration}</Text>
    </Space>
  )

  return (
    <Card hoverable={true} key={key} size='small'>
      <Card.Meta
        avatar={cardCover}
        title={title}
        description={cardDescription}
        key={key}
      />
    </Card>
  )
}

export default AutoCompleteResult
