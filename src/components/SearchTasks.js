import React, { Component } from 'react'

// Компонент для одного инпута :D
// Создавался для того, что бы попробовать новые Хуки React'a,
// но так и не решился сделать

class SearchTasks extends Component {
  render() {
    return(
      <input  type = 'text' 
              placeholder = 'Поиск по задачам' 
              onChange = {this.props.change}
              style = {{border: 'none'}}
      />
    )
  }
}

export default SearchTasks