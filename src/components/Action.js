import React, { Component } from 'react' 

// Рендерятся 2 кнопки и, в зависимости от статуса, наполняются отличным
// функционалом. Клик по кнопке действия вызывает функцию, в которой происходит
// клонирование старого массива, добавление изменений в клон и замена старого массива
// на измененный дубликат

class Action extends Component {
  changeStatus(item, newStatus) {
    let i = this.props.tasks.indexOf(item, 0)
    let tasks = this.props.tasks.map(a => ({...a})) //клонирование массива
    tasks[i].status = newStatus 
    this.props.change(tasks)
  }

  render() {
    let button1
    let button2

    switch(this.props.task.status) {
      case 1: 
        button1 = <button onClick = {this.changeStatus.bind(this, this.props.task, 2)}
                          className = 'btn btn-outline-primary btn-sm'>Выполнить
                  </button>
        button2 = <button onClick = {this.changeStatus.bind(this, this.props.task, 4)}
                          className = 'btn btn-outline-danger btn-sm' >Отмнить
                  </button>
        break
      case 2:
        button1 = <button onClick = {this.changeStatus.bind(this, this.props.task, 3)}
                          className = 'btn btn-outline-secondary btn-sm'>Закрыть
                  </button>
        button2 = null
        break
      case 3 || 4:
        button1 = null
        button2 = null
        break
    }

    return (
      <td>{ button1 } { button2 }</td>
    )
  }
}

export default Action