import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { updateEmployee, showEmployee } from '../../api/employee'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UpdateEmployee extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      department: '',
      position: '',
      employDate: ''
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    showEmployee(user, id)
      .then((res) => this.setState({ firstName: res.data.employee.firstName, lastName: res.data.employee.lastName, department: res.data.employee.department, position: res.data.employee.position, employDate: res.data.employee.employDate }))
      .catch(console.error)
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onUpdateEmployee = (event) => {
    event.preventDefault()
    const id = this.props.match.params.id
    const { user, history } = this.props
    updateEmployee(this.state, user, id)
      .then(() => history.push('/employees/' + this.props.match.params.id))
  }

  test = () => {
    this.setState({ questions: true })
  }

  render () {
    if (this.state.firstName === '') {
      return 'Loading...'
    }

    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <h3>Update Employee</h3>
            <Form onSubmit={this.onUpdateEmployee}>
              <Form.Group controlId='firstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type='firstName'
                  name='firstName'
                  value={this.state.firstName}
                  placeholder='Enter First Name'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId='lastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  name='lastName'
                  value={this.state.lastName}
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
                  value={this.state.department}
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
                  value={this.state.position}
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
                  value={this.state.employDate.split('T', 1)}
                  type='date'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant='primary' type='submit'>Submit</Button>
            </Form>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(UpdateEmployee)
