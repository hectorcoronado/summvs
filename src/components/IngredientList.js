import React from 'react'
import uniqid from 'uniqid'

const IngredientList = (props) => {
  const { ingredients } = props
  const listItems = (ingredients) => {
    if (ingredients) {
      return ingredients.map((ingredient) =>
        <li key={uniqid()}>{ingredient}</li>
      )
    }
  }
  return (
    <div>
      <h6>ingredients:</h6>
      <ul>{listItems(ingredients)}</ul>
    </div>
  )
}

export default IngredientList
