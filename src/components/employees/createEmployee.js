import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createEmployee } from '../../api/employee'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateEmployee extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      department: '',
      position: '',
      employDate: '',
      id: ''
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onCreateEmployee = (event) => {
    event.preventDefault()

    const { user, history } = this.props

    createEmployee(this.state, user)
      .then((res) => this.setState({ id: res.data.employee._id }))
      .then(() => history.push('/employees/' + this.state.id))
      .catch(console.error)
  }

  render () {
    const { firstName, lastName, department, position, employDate } = this.state

    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h3>Add New Employee</h3>
          <Form onSubmit={this.onCreateEmployee}>
            <Form.Group controlId='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type='firstName'
                name='firstName'
                value={firstName}
                placeholder='Enter First Name'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                name='lastName'
                value={lastName}
                type='lastName'
                placeholder='Enter Last Name'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='department'>
              <Form.Label>Department</Form.Label>
              <Form.Control
                required
                name='department'
                value={department}
                type='department'
                placeholder='Enter Department'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='position'>
              <Form.Label>Position</Form.Label>
              <Form.Control
                required
                name='position'
                value={position}
                type='position'
                placeholder='Enter Position'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='employDate'>
              <Form.Label>Employment Date</Form.Label>
              <Form.Control
                required
                name='employDate'
                value={employDate}
                type='date'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>Submit</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(CreateEmployee)
