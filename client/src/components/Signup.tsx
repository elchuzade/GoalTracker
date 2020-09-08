import React, { useState, useEffect } from 'react'
import { signupAction } from '../redux/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Container, Row, Col, Input, Label, Button } from 'reactstrap'
import FormTitle from './builtin/FormTitle'

interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
    password2: ''
  })

  const dispatch = useDispatch()

  const handleSignup = () => {
    const newUser: SignupData = {
      email: inputData.email,
      password: inputData.password,
      password2: inputData.password2
    }
    dispatch(signupAction(newUser))
  }

  return (
    <Form className='form-card-user'>
      <FormTitle title='Signup' />
      <Label className='form-input-label'>Email</Label>
      <Input
        className='form-input-field'
        type='text'
        value={inputData.email}
        onChange={e => setInputData({...inputData, email: e.target.value})}
      />
      <Label className='form-input-label'>Password</Label>
      <Input
        className='form-input-field'
        type='password'
        value={inputData.password}
        onChange={e => setInputData({...inputData, password: e.target.value})}  
      />
      <Label className='form-input-label'>Confirm Password</Label>
      <Input
        className='form-input-field'
        type='password'
        value={inputData.password2}
        onChange={e => setInputData({...inputData, password2: e.target.value})}
      />
      <Button className='form-button' type='button' color='info' onClick={handleSignup}>Submit</Button>
    </Form>
  )
}

export default Signup
