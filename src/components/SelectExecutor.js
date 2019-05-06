import React, { Component } from 'react'

// В обоих компонентах с селектом происходит рендер всплывающих
// опшинов в зависимости от массива users/statuses так, что бы при изменении этого
// массива (добавление новых исполнителей) не слетал скрипт.
// Так же, в зависимости от выбранного пункта происходит вызов функции, в агрументах 
// которой идет value пункта, для функции в компоненте App для сортировки списка таблицы

class SelectExecutor extends Component {
  render() {
    return(
      <select onChange = {this.props.change} className = 'form-control form-control-sm'>
        <option value = {'null'}>Исполнитель</option>
        {this.props.executors.map(user => (
          <option value = {user.id}>{`${user.first_name} ${user.last_name}`}</option>
        ))}
      </select>
    )
  }
}

export default SelectExecutor