import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { showEmployee, deleteEmployee } from '../../api/employee'
import { Card } from 'react-bootstrap'

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
        <Card style={{ width: '30rem' }}>
          <Card.Body>
            <Card.Title>{employee.firstName} {employee.lastName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{employee.position}</Card.Subtitle>
            <Card.Text>
              Department: {employee.department}
              <br></br>
              Employed Date: {employee.employDate.split('T', 1)}
            </Card.Text>
            <Card.Text href="#"><button onClick={this.updateClick}>Update</button> <button onClick={this.deleteClick}>Delete</button></Card.Text>
          </Card.Body>
        </Card>
        <Link to='/employees'>Return to all Employees</Link>
      </>
    )
  }
}

export default withRouter(Employee)
