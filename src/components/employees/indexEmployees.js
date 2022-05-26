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
      // console.log(searchResults)
      // let searchJSX = []
      // for (let i = 1; i < searchResults.length; i++){
      //   searchJSX.push(
      //     <>
      //     <Card id={employee._id} key={employee._id} style={{ width: '18rem' }}>
      //       <Card.Body>
      //         <Card.Title>{employee.firstName} {employee.lastName}</Card.Title>
      //         <Card.Subtitle className="mb-2 text-muted">{employee.position}</Card.Subtitle>
      //         <Card.Text>
      //           Department: {employee.department}
      //           <br></br>
      //           Employed Date: {employee.employDate.split('T', 1)}
      //         </Card.Text>
      //         <Card.Link><Link to={'/employees/' + employee._id}>More Information</Link></Card.Link>
      //       </Card.Body>
      //     </Card>
      //     <br></br>
      //     </>
      //   )
      // }
      const searchJSX = searchResults.map(employee => {
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
          <input name='search' onChange={this.handleChange}></input>
          <div className='row'>
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
