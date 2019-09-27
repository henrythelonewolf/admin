import React from 'react';
import { Container } from 'semantic-ui-react';

import {
  Calendar,
  momentLocalizer,
  Views,
} from 'react-big-calendar';

import moment from 'moment';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar)

export default class CalendarIndex extends React.Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment()),
        title: "Some title"
      }
    ]
  }

  onEventDrop = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = this.state;

    const idx = events.indexOf(event);
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, allDay };

    const nextEvents = [ ...events ];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({ events: nextEvents });
  };

  onEventResize = ({ event, start, end }) => {
    const { events } = this.state;

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id ? { ...existingEvent, start, end } : existingEvent
    })

    this.setState({ events: nextEvents });
  }

  newEvent = (event) => {

  }

  render(){
    const { events } = this.state;

    return (
      <Container>
        <DnDCalendar
          selectable
          resizable
          localizer={localizer}
          events={events}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          onSelectSlot={this.newEvent}
          onDragStart={console.log}
          defaultView={Views.MONTH}
          defaultDate={new Date()}
          style={{ height: '70vh'}}
        />
      </Container>
    )
  }
}
