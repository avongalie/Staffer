import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexEmployees } from '../../api/employee'
import { Card } from 'react-bootstrap'

class IndexEmployees extends Component {
  constructor (props) {
    super(props)
    this.state = {
      employees: null,
      search: ''
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
    if (employees === null) {
      return 'Loading...'
    } else {
      return (
          <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
              {employees.map(employee => {
                return (
                  <>
                    <Card id={employee._id} key={employee._id} style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Title>{employee.firstName} {employee.lastName}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{employee.position}</Card.Subtitle>
                        <Card.Text>
                          Department: {employee.department}
                          <br></br>
                          Employed Date: {employee.employDate.split('T', 1)}
                        </Card.Text>
                        <Card.Link><Link to={'/employees/' + employee._id}>More Information</Link></Card.Link>
                      </Card.Body>
                    </Card>
                    <br></br>
                  </>
                )
              })}
            </div>
          </div>
      )
    }
  }
}

export default withRouter(IndexEmployees)
