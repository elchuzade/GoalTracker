import React, { useState, useEffect } from 'react'
import { signupAction } from '../redux/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Container, Row, Col, Input, Label, Button } from 'reactstrap'

interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const dispatch = useDispatch()

  const handleSignup = (data: SignupData) => {
    console.log(data)
    dispatch(signupAction(data))
  }

  return (
    <Form>
      <Input />
      <Input />
      <Input />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default Signup
