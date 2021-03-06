import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signedin: false
    }
  }

  render () {
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ marginTop: '20vh' }}>Welcome to Staffer <img src='https://cdn2.iconfinder.com/data/icons/25-free-ui-icons/40/folders-512.png' style={{ width: '40px' }}/></h1>
          <h3>Your one stop shop for manging your employees</h3>
          <br></br>
          <div>
            To begin, create an account and sign in
            <br></br>
            <br></br>
            Once logged in, you may:
            <ul style={{ width: '300px', margin: '0 auto', textAlign: 'left' }}>
              <li>Add New Employees</li>
              <li>Index Employees by Name</li>
              <li>Update Employee Info</li>
              <li>Remove Employees</li>
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Home)
