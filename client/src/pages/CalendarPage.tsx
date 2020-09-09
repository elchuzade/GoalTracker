import React, { FC } from 'react'
import Calendar from '../components/Calendar'

interface SigninPageProps {}

const CalendarPage: FC<SigninPageProps> = () => {
  return (
    <div>
      <Calendar />
    </div>
  )
}

export default CalendarPage
