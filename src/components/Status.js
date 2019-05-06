import React, { Component } from 'react'

// Все тоже самое, что и компоненте Executor,
// но так же присутствует костыль на добавление разных
// Bootstrap классов в зависимости от id статуса
 
class Status extends Component {
  getClass(num) {
    let lastClass

    switch(num) {
      case 1:
        lastClass = 'primary'
        break
      case 2:
        lastClass = 'success'
        break
      case 3:
        lastClass = 'secondary'
        break
      case 4:
        lastClass = 'danger'
        break
    }

    return lastClass
  }

  render() {
    let statusClass = `badge badge-${this.getClass(this.props.task.status)}`

    return (
      <td align = 'center'>
        {
          this.props.statuses.map(status => {
            if (this.props.task.status == status.id) {
              return (
                <span className = {statusClass}>
                  {status.title}
                </span>
              ) 
            }
          })
        }
      </td>
    )
  }
}

export default Status