import React, { FC, useState, useEffect, FormEvent } from 'react'
import { signinAction } from '../redux/actions/user'
import { useDispatch } from 'react-redux'
import { Form, Input, Label, Button } from 'reactstrap'
import FormTitle from './builtin/FormTitle'

interface SigninProps {}

const Signin: FC<SigninProps> = () => {
  const [inputData, setInputData] = useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch()

  const handleSignin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newUser: SigninData = {
      email: inputData.email,
      password: inputData.password
    }
    dispatch(signinAction(newUser))
  }

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  return (
    <Form className='form-card-user' onSubmit={handleSignin}>
      <FormTitle title='Signin' />
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
      <Button className='form-button' type='submit' color='info'>Submit</Button>
    </Form>
  )
}

export default Signin
