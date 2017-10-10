import React, { Component } from 'react'

class About extends Component {
  render () {
    return (
      <div className='row'>
        <h6 className='col-xs-4 col-xs-offset-4'>
          built in summer 2017.
          <br />
          <br />
          <br />
          this project combines two things i like very much: making tangible objects and coding.
          <br />
          <br />
          <br />
          the code for this project can be found <a
            href='https://github.com/hectorcoronado/summvs'
            rel='noopener noreferrer'
            target='_blank'
          >
            here
          </a>.
          <br />
          <br />
          <br />
          other things i've built can be found <a
            href='http://www.hectorcoronado.codes'
            rel='noopener noreferrer'
            target='_blank'
          >
            here
          </a>.
        </h6>
      </div>
    )
  }
}

export default About
