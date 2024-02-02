import React, { useEffect, useState, useRef } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserById, updateUserById } from '../redux/features/userSlice'

const UpdateUser = () => {
  const [name, setname] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [rollNo, setRollNo] = useState("")
  const [isData, setIsdata] = useState(false)

  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { id } = useParams()

  const { user } = useSelector(state => state.user.users)

  const getUser = async () => {
    try {
      const userData = await dispatch(fetchUserById(id))
      let data = userData.payload.user
      if (userData.payload.success === true) {
        setIsdata(true)
        setname(data.name)
        setEmail(data.email)
        setPhoneNo(data.phoneNo)
        setRollNo(data.rollNo)
      }
    } catch (error) {
      throw (error)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const updatedData = {
      name, email, rollNo, phoneNo
    }
    const dispatchresp = await dispatch(updateUserById({ id, updatedData }))
    if (dispatchresp.payload.data.success === true) {
      navigate('/')
    }
  }

  useEffect(() => {
    getUser()
    if (inputRef.current) {
      inputRef.current.focus
    }
  }, [id])

  return (
    <div className='page-container adduser-container'>
      <h1>{state.title}</h1>
      {
        isData === true ?
          <Form>
            <FormGroup>
              <Label for="exampleName">
                Name
              </Label>
              <Input
                id="exampleName"
                name="text"
                placeholder="Enter Name"
                type="text"
                ref={inputRef}
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">
                Email
              </Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Enter Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleRollNo">
                Roll No
              </Label>
              <Input
                id="exampleRollNo"
                name="rollNo"
                placeholder="Enter Roll No"
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePhoneNo">
                Phone No
              </Label>
              <Input
                id="examplePhoneNo"
                name="phoneNo"
                placeholder="Enter Phone No"
                type="text"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </FormGroup>

            <div className='btn-wrapper'>
              <Button color='primary' className='addBtn' onClick={() => navigate('/')}>
                Back
              </Button>
              <Button color='primary' className='addBtn' onClick={handleUpdate}>
                Update
              </Button>
            </div>
          </Form>
          : "Loading.."
      }
    </div>
  )
}

export default UpdateUser
