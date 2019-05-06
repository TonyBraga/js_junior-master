import React, { Component } from 'react'
import Executor from './Executor'
import Status from './Status'
import Action from './Action'
import SelectExecutor from './SelectExecutor'
import SelectStatus from './SelectStatus'
import SearchTasks from './SearchTasks'
import '../styles/App.css'

// Главный компонент, который отрисовывает таблицу.
// Вся математика, по возможности, перенесена в дочерние компоненты,
// в этом же только логика отрисовки списка, в зависимости от выбранного селектора 
// и логика поведения localStorage'a. Пара слов про сервер в конце :)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      users: [],
      statuses: [],
      // Дополнительное свойство 'show' для работы функции 'showList'
      show: { 
        filter: null,
        flag: null
      }
    }
  }

  // Асинхронность этой функции обусловленна тем, что последнее действие
  // не успевало попадать в хранилище. 
  async changeStatus(tasks) {
    await this.setState({tasks})
    this.actionsLocalStorage('save')
  }

  actionsLocalStorage(command) {
    switch(command) {
      case 'save':
        let state = JSON.stringify(this.state.tasks)
        localStorage.setItem('state', state)
        break 
      case 'clear':
        localStorage.clear()
        break
      case 'set':
        this.setState({tasks: JSON.parse(localStorage.getItem('state'))})
        break
    }
  }

  changeFilter(flag, event) {
    this.setState({show: {
      flag: null,
      filter: null
    }})

    if(event.target.value == 'null') {
      this.setState({show: {
        flag: null,
        filter: null
      }})
    } else {
      this.setState({show: {
        flag: flag,
        filter: event.target.value
      }})
    }
  }

  showList(condition) {
    if(condition.filter == null && condition.flag == null) {
      return this.state.tasks
    } else {
      switch(condition.flag) {
        case 'executor':
          return this.state.tasks.filter(task => task.contractor_id == condition.filter)
        case 'status':
          return this.state.tasks.filter(task => task.status == condition.filter)
        case 'title':
          let value = new RegExp(`${condition.filter}`, 'i')
          return this.state.tasks.filter(task => value.test(task.title))
      }
    }
  }

  // Логика работы localStorage:
  // 1. При каждом изменении кнопками действия обновленный массив 'tasks' 
  // вносится в хранилище
  // 2. При перезагрузки страницы происходит проверка localStorage. Если он не пустой, 
  // то данные из него идут в state. Если пустой, то данные подгружаются с сервера
  // 3. Для очищения хранилища есть кнопка

  async componentDidMount() {
    if(localStorage.state) {
      this.actionsLocalStorage('set')
    } else {
      await fetch('http://localhost:3000/tasks')
        .then(res => res.json())
        .then(result => {
          let tasks = result.tasks
          this.setState({tasks})
        })
        .catch(e => console.error(e))
    }
    
    await fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(result => this.setState(result))
      .catch(e => console.error(e))

    await fetch('http://localhost:3000/statuses')
      .then(res => res.json())
      .then(result => this.setState(result))
      .catch(e => console.error(e))
  }

  render() {
    return (
      <>
        <table className = 'table table-hover table-sm'>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <span>Задачи  |  </span>
                <SearchTasks 
                  change = {this.changeFilter.bind(this, 'title')} 
                />
              </th>
              <th>
                <SelectExecutor 
                  executors = {this.state.users} 
                  change = {this.changeFilter.bind(this, 'executor')} 
                />
              </th>
              <th>
                <SelectStatus 
                  statuses = {this.state.statuses} 
                  change = {this.changeFilter.bind(this, 'status')} 
                />
              </th>
              <th>
                <span>Действие  |  </span>
                <button
                  className = 'btn btn-outline-warning btn-sm'
                  onClick = {this.actionsLocalStorage.bind(this, 'clear')}
                >Очистка localStorage</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.showList(this.state.show).map(task => (
              <tr key = {task.id}>
                <td>{task.id}.</td>
                <td>{task.title}</td>
                <Executor users = {this.state.users} task = {task} />
                <Status statuses = {this.state.statuses} task = {task} />
                <Action 
                  tasks = {this.state.tasks} 
                  task = {task} 
                  change = {this.changeStatus.bind(this)}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }
}

// З.Ы. По собственной инициативе, вместо начальной подгрузки json напрямую в компонент
// написал простой dev/built-сервер, в котором и происходит получение первичных данных,
// путем запроса из компонента fetch'ем.
// Сам сервер сначала компелирует данные из src, затем разворачивается на dist'е

export default App