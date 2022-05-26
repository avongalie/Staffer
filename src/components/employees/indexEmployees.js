import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexEmployees } from '../../api/employee'
import { Card } from 'react-bootstrap'
import './../../index.scss'

class IndexEmployees extends Component {
  constructor (props) {
    super(props)
    this.state = {
      employees: null,
      search: ''
    }
  }

  componentDidMount = () => {
    const { user } = this.props
    indexEmployees(user)
      .then((res) => res.data.employees.filter((employee) => employee.owner === this.props.user._id))
      .then((res) => this.setState({ employees: res, show: true, owned: true }))
      .catch(console.error)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidUpdate = () => {
    const { employees, search } = this.state
    if (employees != null) {
      const searchResults = employees.filter((employee) => {
        return employee.firstName.toLowerCase().includes(search.toLowerCase()) || employee.lastName.toLowerCase().includes(search.toLowerCase())
      })
      const searchJSX = searchResults.map(employee => {
        return (
          <>
            <Card id={employee._id} key={employee._id} style={{ width: '50vw' }}>
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
      })
      return searchJSX
    }
  }

  render () {
    const { employees } = this.state
    if (employees === null) {
      return 'Loading...'
    } else {
      const JSX = this.componentDidUpdate()
      return (
        <>
          <div id='searchbar'>
            <h2>All Employees</h2>
            <p>Search Employess by name below</p>
            <input id='search' name='search' onChange={this.handleChange}></input>
          </div>
          <div>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
              {JSX}
            </div>
          </div>
        </>
      )
    }
  }
}

export default withRouter(IndexEmployees)
