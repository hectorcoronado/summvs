import React from 'react'
import { Jumbotron } from 'react-bootstrap'

const HeroImage = () => {
  return (
    <Jumbotron style={HeroImageStyle}>
      <div>
        a jumbotron.
      </div>
    </Jumbotron>
  )
}

const HeroImageStyle = {
  'height': '100vh',
  'marginTop': '-24px'
}

export default HeroImage
