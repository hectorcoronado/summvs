import React from 'react'
import { Jumbotron } from 'react-bootstrap'

import HeroSvg from '../svg/HeroSvg'

const HeroImage = () => {
  return (
    <Jumbotron style={JumbotronStyle}>
      <div style={SvgContainerStyle}>
        <HeroSvg style={SvgStyle} />
      </div>
    </Jumbotron>
  )
}

const JumbotronStyle = {
  'alignItems': 'center',
  'height': '100vh',
  'marginTop': '-24px'
}

const SvgContainerStyle = {
  'display': 'inline-block',
  'position': 'relative',
  'width': '100%',
  'paddingBottom': '100%',
  'verticalAlign': 'middle',
  'overflow': 'hidden'
}

const SvgStyle = {
  'top': '0',
  'left': '0',
  'display': 'inline-block',
  'position': 'absolute'
}

export default HeroImage
