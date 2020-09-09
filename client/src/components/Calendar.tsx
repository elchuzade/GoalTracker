import React, { FC } from 'react'
import { Row, Col } from 'reactstrap'
import CalendarDay from './CalendarDay'

const Calendar: FC = () => {
  const days = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  const dailyGoals = [
    {
      title: 'Thesis',
      description: 'Read or / and Write something about thesis',
      status: {
        date: 'datestring',
        completed: false
      }
    },
    {
      title: 'Walking',
      description: 'Walk at least 1000 steps checking on your MiWatch',
      status: {
        date: 'datestring',
        completed: false
      }
    },
    {
      title: 'Books',
      description: 'Read at least one page of any given book',
      status: {
        date: 'datestring',
        completed: false
      }
    },
    {
      title: 'Unity',
      description: 'Complete anything on the way to developing your own game',
      status: {
        date: 'datestring',
        completed: false
      }
    },
    {
      title: 'Linkedin',
      description: 'like at least 1 post on linkedin, add some new connections',
      status: {
        date: 'datestring',
        completed: false
      }
    },
    {
      title: 'Coding',
      description: 'Write any code to improve your frontend skills',
      status: {
        date: 'datestring',
        completed: false
      }
    },
    {
      title: 'Duolingo',
      description: 'Complete at least a daily Duolingo German Language goal',
      status: {
        date: 'datestring',
        completed: false
      }
    },
    {
      title: 'Meditation',
      description: 'Do at least 5 minutes of mindful meditation',
      status: {
        date: 'datestring',
        completed: false
      }
    },
    {
      title: 'Water',
      description: 'Drink at least 1L of water, ideally 2L',
      status: {
        date: 'datestring',
        completed: false
      }
    },
    {
      title: 'Weight',
      description: 'Do at least 50 repetitions of any exercise for losing weight, ideally 200 repetitions',
      status: {
        date: 'datestring',
        completed: false
      }
    },
    {
      title: 'Muscle>',
      description: 'Do at least 50 repetitions of any exercise for gaining muscles, ideally 200 repetitions',
      status: {
        date: 'datestring',
        completed: false
      }
    }
  ]
  return (
    <div>
      <Row className='calendar-container'>
        {days.map((day, index) => 
          <Col key={index} className='calendar-day-container'>
            <CalendarDay date={(index + 1).toString()} goals={dailyGoals} />
          </Col>
        )}
      </Row>
    </div>
  )
}

export default Calendar
