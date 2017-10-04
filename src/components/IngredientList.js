import React from 'react'
import uniqid from 'uniqid'

const IngredientList = (props) => {
  const { ingredients } = props
  const listItems = (ingredients) => {
    if (ingredients) {
      return ingredients.map((ingredient) =>
        <li style={liStyle} key={uniqid()}>{ingredient}</li>
      )
    }
  }
  return (
    <div>
      <h6>ingredients:</h6>
      <ul><h6>{listItems(ingredients)}</h6></ul>
    </div>
  )
}

const liStyle = {
  marginTop: '.1em'
}

export default IngredientList
