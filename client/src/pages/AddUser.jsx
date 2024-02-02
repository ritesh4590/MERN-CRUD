import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNewUser } from '../redux/features/userSlice'

const AddUser = () => {
  const [name, setname] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [rollNo, setRollNo] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dispatchresp = await dispatch(addNewUser({ name, email, rollNo, phoneNo }))
    if (dispatchresp.payload.data.success === true) {
      navigate('/')
    }
  }

  return (
    <div className='page-container adduser-container'>
      <h1>Add User</h1>
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

        <Button color='primary' className='addBtn' onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default AddUser
