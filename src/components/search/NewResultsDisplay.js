import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line
import 'antd/dist/antd.css'
import axios from 'axios'
import { Row, Col, Card, Space, Typography } from 'antd'
import ResultsDisplayCards from '../cards/ResultsDisplayCards'

const NewResultsDisplay = ({ cardsToDisplay }) => {
  return (
    <div>
      <ResultsDisplayCards cardsToDisplay={cardsToDisplay} />
    </div>
  )
}

export default NewResultsDisplay
