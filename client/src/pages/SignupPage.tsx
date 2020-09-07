import React from 'react'
import { Container } from 'reactstrap'

import Signup from '../components/Signup'

interface SignupPageProps {}

const SignupPage: React.FC<SignupPageProps> = () => {
  return (
    <div>
      <Container className='text-center'>
        <Signup />
      </Container>
    </div>
  )
}

export default SignupPage
