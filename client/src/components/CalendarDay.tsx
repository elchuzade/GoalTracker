import React, { FC } from 'react'
import { Row, Col } from 'reactstrap'
interface CalendarDayProps {
  date: string;
  goals: Array<Goal>
}

const CalendarDay: FC<CalendarDayProps> = (props) => {
  return (
    <div>
      <Row className='calendar-day-header'>
        {/* Use react moment in future */}
        <Col className='calendar-day-header-date'>{props.date}</Col>
        <Col className='calendar-day-header-weekday'>Wednesday</Col>
      </Row>
      <Row className='calendar-day-body'>
        {props.goals.map((goal, index) => 
          <Col key={index} className='calendar-goal-container'>
            <div className='calendar-goal calendar-goal-hidden'>
              <img src={`https://picsum.photos/24?random=${index}`} alt='goal-img' />
            </div>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default CalendarDay
