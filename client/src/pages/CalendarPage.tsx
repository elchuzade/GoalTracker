import React, { FC } from 'react'
import { Container } from 'reactstrap'
import Calendar from '../components/Calendar'

interface SigninPageProps {}

const CalendarPage: FC<SigninPageProps> = () => {
  return (
    <div>
      <Container className='text-center'>
        <Calendar />
      </Container>
    </div>
  )
}

export default CalendarPage
