import React, { Component } from 'react'

// В этом компоненте сравниваются id'шники массива tasks и users
// при совпадении отдается имя и фамилия исполнителя

class Executor extends Component {
  render() {
    return (
      <td align = 'center'>
        {
          this.props.users.map(user => {
            if (this.props.task.contractor_id == user.id) {
              return `${user.first_name} ${user.last_name}`
            }
          })
        }
      </td>
    )
  }
}

export default Executor