import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

class HeroImage extends Component {
  canvasFunction () {
    document.addEventListener('touchmove', function (e) {
      e.preventDefault()
    })
    let c = document.getElementsByTagName('canvas')[0]
    let rect = c.parentNode.getBoundingClientRect()
    console.log('rect:')
    console.log(rect)
    let x = c.getContext('2d')
    let pr = 1 // TODO: figure out how to set pr to window.devicePixelRatio || 1 to make it responsive.
    let w = rect.width
    let h = rect.height
    let f = 90
    let q
    let m = Math
    let r = 0
    let u = m.PI * 2
    let v = m.cos
    let z = m.random

    c.width = w * pr
    c.height = h * pr
    x.scale(pr, pr)
    x.globalAlpha = 0.6
    function i () {
      x.clearRect(0, 0, w, h)
      q = [{ x: 0, y: h * 0.7 + f }, { x: 0, y: h * 0.7 - f }]
      while (q[1].x < w + f) d(q[0], q[1])
    }
    function d (i, j) {
      x.beginPath()
      x.moveTo(i.x, i.y)
      x.lineTo(j.x, j.y)
      let k = j.x + (z() * 2 - 0.25) * f
      let n = y(j.y)
      x.lineTo(k, n)
      x.closePath()
      r -= u / -50
      x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
      x.fill()
      q[0] = q[1]
      q[1] = { x: k, y: n }
    }
    function y (p) {
      let t = p + (z() * 2 - 1.1) * f
      return (t > h || t < 0) ? y(p) : t
    }
    document.onclick = i
    document.ontouchstart = i
    i()
  }

  componentDidMount () {
    this.canvasFunction()
  }

  render () {
    return (
      <Jumbotron className='jumbotron' style={JumbotronStyle}>
        <div>
          <h1>s u m m v s</h1>
          <canvas>
            {this.canvasFunction.bind(this)}
          </canvas>
        </div>
      </Jumbotron>
    )
  }
}

const JumbotronStyle = {
  'height': '90vh',
  'marginTop': '-24px'
}

export default HeroImage
