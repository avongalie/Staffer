import apiUrl from '../apiConfig'
import axios from 'axios'

export const createEmployee = (employee, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/employees/',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      employee: {
        firstName: employee.firstName,
        lastName: employee.lastName,
        department: employee.department,
        position: employee.position,
        employDate: employee.employDate
      }
    }
  })
}

export const indexEmployees = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/employees/',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showEmployee = (user, id) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/employees/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deleteEmployee = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/employees/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updateEmployee = (employee, user, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/employees/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      employee: {
        firstName: employee.firstName,
        lastName: employee.lastName,
        department: employee.department,
        position: employee.position,
        employDate: employee.employDate
      }
    }
  })
}
