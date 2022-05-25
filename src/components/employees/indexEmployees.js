import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexEmployees } from '../../api/employee'

class IndexEmployees extends Component {
  constructor (props) {
    super(props)
    this.state = {
      employees: null
    }
  }

  componentDidMount = () => {
    const { msgAlert, user } = this.props
    indexEmployees(user)
      .then((res) => res.data.employees.filter((employee) => employee.owner === this.props.user._id))
      .then((res) => this.setState({ employees: res, show: true, owned: true }))
      .then(() =>
        msgAlert({
          heading: 'Index Survey Success',
          message: 'success',
          variant: 'success'
        })
      )
      .catch((error) => {
        msgAlert({
          heading: 'Error',
          message: 'Error:' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { employees } = this.state
    console.log(employees)
    if (employees === null) {
      return 'Loading...'
    } else {
      return (
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            {employees.map(employee => {
              // add filter to show only surveys by owner
              return <li id={employee._id} key={employee._id}><Link to={'/employees/' + employee._id}>{employee.firstName} {employee.lastName}</Link></li>
            })}
          </div>
        </div>
      )
    }
  }
}

export default withRouter(IndexEmployees)
