import React, { Component } from 'react'

class SelectStatus extends Component {
  render() {
    return(
      <select onChange = {this.props.change} className = 'form-control form-control-sm'>
        <option value = {'null'}>Статус</option>
        {this.props.statuses.map(status => (
          <option value = {status.id}>{status.title}</option>
        ))}
      </select>
    )
  }
}

export default SelectStatus