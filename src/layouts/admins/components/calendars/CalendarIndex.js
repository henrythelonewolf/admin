import React from 'react';
import { Container } from 'semantic-ui-react';

import {
  Calendar,
  momentLocalizer,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

export default class CalendarIndex extends React.Component {
  state = {
    events: []
  }
  render(){
    const { events } = this.state;

    return (
      <Container>
        <Calendar
          localizer={momentLocalizer(moment)}
          events={events}
          startAccessor={'start'}
          endAccessor={'end'}
          style={{ height: '70vh' }}
        />
      </Container>
    )
  }
}
