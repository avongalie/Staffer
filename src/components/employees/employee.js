import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { showEmployee, deleteEmployee } from '../../api/employee'

class Employee extends Component {
  constructor (props) {
    super(props)
    this.state = {
      employee: null
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    showEmployee(user, id)
      .then((response) => this.setState({ employee: response.data.employee }))
      .then(() => {
        console.log(this.state.employee.owner)
        console.log(user._id)
      })
      .catch(console.error)
  }

  deleteClick = () => {
    const id = this.props.match.params.id
    const { user, history } = this.props
    deleteEmployee(user, id)
      .then(() => history.push('/employees'))
      .catch(console.error)
  }

  updateClick = () => {
    const { history } = this.props
    history.push('/employees/' + this.props.match.params.id + '/update')
  }

  render () {
    const { employee } = this.state
    if (employee === null) {
      return 'Loading...'
    }

    return (
      <>
        <h4>{this.state.employee.firstName} {this.state.employee.lastName}</h4>
        <p>Department: {this.state.employee.department}</p>
        <p>Position: {this.state.employee.position}</p>
        <p>Employment Date: {this.state.employee.employDate}</p>
        <button onClick={this.deleteClick}>Delete Employee</button>
        <button onClick={this.updateClick}>Update</button>
      </>
    )
  }
}

export default withRouter(Employee)
