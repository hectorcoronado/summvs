import React from 'react'

const IngredientList = (props) => {
  const { ingredients } = props
  const listItems = ingredients.map((ingredient) =>
    <li key={performance.now()}>{ingredient}</li>
  )
  return (
    <div>
      <h6>Ingredients:</h6>
      <ul>{listItems}</ul>
    </div>
  )
}

export default IngredientList
