import React, { FC } from 'react'
import { Container } from 'reactstrap'

import Signin from '../components/Signin'

interface SigninPageProps {}

const SigninPage: FC<SigninPageProps> = () => {
  return (
    <div>
      <Container className='text-center'>
        <Signin />
      </Container>
    </div>
  )
}

export default SigninPage
