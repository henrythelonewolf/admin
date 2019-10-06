import React from 'react';
import { Container, Grid, Card } from 'semantic-ui-react';
import uuidv4 from 'uuid/v4';

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
const DnDCalendar = withDragAndDrop(Calendar);

export default class CalendarIndex extends React.Component {
  state = {
    events: [
      {
        id: uuidv4(),
        start: new Date(),
        end: new Date(),
        title: "First title",
        isAllDay: false,
      },
      {
        id: uuidv4(),
        start: new Date(),
        end: new Date(),
        title: "Second title",
        isAllDay: true,
      },
    ],
    draggedEvent: null,
  }

  handleDragStart = event => {
    this.setState({ draggedEvent: event })
  }

  dragFromOutsideItem = () => {
    const { draggedEvent } = this.state;
    return draggedEvent;
  }

  onDropFromOutside = ({ start, end, allDay }) => {
    const { draggedEvent } = this.state;
    const event = {
      title: "DnD Title",
      start,
      end,
      isAllDay: allDay,
    }
    this.setState({ draggedEvent: null });
    this.newEvent(event);
  }

  newEvent(event){
    const { events } = this.state;

    let newEvt = {
      id: uuidv4(),
      title: event.title,
      start: event.start,
      end: event.end,
      isAllDay: event.isAllDay,
    }

    this.setState({
      events: events.concat([newEvt])
    })
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

  onSelectSlot = (event) => {
    alert('Slot selected: ' + event.start)
    console.log(event.start);
  }

  onDoubleClickEvent = (event) => {
    alert('Double clicked: '
    + 'ID: ' + event.id
    + ' Title: ' + event.title
    + ' Start at: ' + event.start
    + ' End at: ' + event.end
    + ' isAllDay?: ' + event.isAllDay
    )
  }

  render(){
    const { events } = this.state;

    return (
      <Container fluid style={styles.container}>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
            <div>Agenda</div>
            </Grid.Column>
            <Grid.Column>
            <Card className="examples--header" style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <h4 style={{ color: 'gray', width: '100%' }}>
            Outside Drag Sources
          </h4>
            <div
              style={{
                border: '2px solid gray',
                borderRadius: '4px',
                width: '100px',
                margin: '10px',
              }}
              draggable="true"
              key={'id'}
              onDragStart={() =>
                this.handleDragStart({ title: 'DnD Outside' })
              }
            >
              Test DnD Outside
            </div>

        </div>

      </Card>
              <DnDCalendar
                selectable
                localizer={localizer}
                events={events}
                onEventDrop={this.onEventDrop}
                dragFromOutsideItem={this.dragFromOutsideItem}
                onDropFromOutside={this.onDropFromOutside}
                onSelectSlot={this.newEvent}
                onDoubleClickEvent={this.onDoubleClickEvent}
                onDragStart={console.log}
                defaultView={Views.MONTH}
                defaultDate={new Date()}
                style={{ height: '71vh'}}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Container>
    )
  }
}

const styles = {
  container: {
    paddingRight: 50,
    paddingLeft: 50,
  },
}
