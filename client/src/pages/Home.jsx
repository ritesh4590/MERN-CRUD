import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Table, Tooltip } from "reactstrap"
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchUser } from '../redux/features/userSlice'
import Loader from './components/Loader'
import { Eye, Pencil, Trash2 } from "lucide-react"
import { nanoid } from '@reduxjs/toolkit'

const Home = () => {
  const { user } = useSelector(state => state.user.users)
  const [isData, setIsdata] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getAllUser = async () => {
    const response = await dispatch(fetchUser())
    if (response.payload.success === true) {
      setIsdata(true)
    }
  }

  const handleUserById = async (id) => {
    navigate(`/user/${id}`)
  }

  const deleteUserById = async (id) => {
    const resp = await dispatch(deleteUser(id))
    getAllUser()
  }

  const updateUserById = async (id) => {
    const dataToSend = { title: "Update User" }
    navigate(`/update/${id}`, { state: dataToSend })
  }

  useEffect(() => {
    getAllUser()
  }, [dispatch])

  return (
    <div className='page-container'>
      <Link to={'/add'} className='addBtn'>
        <Button
          color="primary"
        >
          Add
        </Button>
      </Link>
      {
        isData === true ?

          <Table hover bordered>
            <thead>
              <tr style={{ textAlign: 'center', backgroundColor: "tomato", color: "#fff" }}>
                <th>
                  SL No
                </th>
                <th>
                  Name
                </th>
                <th>
                  Email
                </th>
                <th>
                  Phone No
                </th>
                <th>
                  Roll No
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                user && user.map((res, index) => {
                  return (
                    <>
                      <tr style={{ textAlign: 'center' }} key={nanoid}>
                        <td>{index + 1}</td>
                        <td>{res.name}</td>
                        <td>{res.email}</td>
                        <td>{res.phoneNo}</td>
                        <td>{res.rollNo}</td>
                        <th className='key-action'>
                          <p onClick={() => handleUserById(res._id)}><Eye /></p>
                          <p onClick={() => deleteUserById(res._id)}><Trash2 /></p>
                          <p onClick={() => updateUserById(res._id)}><Pencil /></p>
                        </th>
                      </tr>
                    </>
                  )
                })
              }

            </tbody >
          </Table>
          :
          <Loader />
      }
    </div >

  )
}

export default Home
