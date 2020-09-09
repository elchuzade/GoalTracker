import React, { FC, useState, useEffect, FormEvent } from 'react'
import { signupAction } from '../redux/actions/auth'
import { useDispatch } from 'react-redux'
import { Form, Input, Label, Button } from 'reactstrap'
import FormTitle from './builtin/FormTitle'

interface SignupProps {}

const Signup: FC<SignupProps> = () => {
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
    password2: ''
  })

  const dispatch = useDispatch()

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newUser: SignupData = {
      email: inputData.email,
      password: inputData.password,
      password2: inputData.password2
    }
    dispatch(signupAction(newUser))
  }

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  return (
    <Form className='form-card-user' onSubmit={handleSignup}>
      <FormTitle title='Signup' />
      <Label className='form-input-label'>Email</Label>
      <Input
        className='form-input-field'
        type='text'
        name='email'
        value={inputData.email}
        onChange={handleChange}
      />
      <Label className='form-input-label'>Password</Label>
      <Input
        className='form-input-field'
        type='password'
        name='password'
        value={inputData.password}
        onChange={handleChange} 
      />
      <Label className='form-input-label'>Confirm Password</Label>
      <Input
        className='form-input-field'
        type='password'
        name='password2'
        value={inputData.password2}
        onChange={handleChange}
      />
      <Button className='form-button' type='submit' color='info'>Submit</Button>
    </Form>
  )
}

export default Signup
