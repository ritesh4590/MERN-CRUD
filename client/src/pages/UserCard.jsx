import React, { useEffect, useState } from 'react'
import { Button, Card, CardText, CardTitle } from 'reactstrap'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserById } from '../redux/features/userSlice'
import Loader from './components/Loader'

const UserCard = () => {
  const [isData, setIsdata] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user.users)

  const getUserById = async () => {
    const response = await dispatch(fetchUserById(id))
    if (response.payload.success === true) {
      setIsdata(true)
    }

  }

  useEffect(() => {
    getUserById()
  }, [])

  return (
    <div>
      {
        !isData ? <Loader /> :
          <Card
            body
            className="my-2"
            style={{
              width: '18rem'
            }}
          >
            <CardTitle tag="h5">
              Name: {user.name}
            </CardTitle>
            <CardText>
              Email: {user.email}
            </CardText>
            <CardText>
              Roll No:  {user.rollNo}
            </CardText>
            <CardText>
              Phone No: {user.phoneNo}
            </CardText>
            <Link to={'/'}>
              <Button color="primary">
                Home
              </Button>
            </Link>
          </Card>
      }
    </div>
  )
}

export default UserCard
