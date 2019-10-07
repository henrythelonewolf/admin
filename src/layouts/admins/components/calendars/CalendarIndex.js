import React from 'react';
import { Container } from 'semantic-ui-react';
import uuidv4 from 'uuid/v4';
import { firebase } from './../../../../firebaseConfig';
import { getCurrentUser, snapshotToArray } from './../../../../Utils';
import store from './../../../../store';

// react big calendar import
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
  constructor(props){
    super(props);

    this.state = {
      events: []
    };

    // for cancel subscription or asyncronous task in componentDidMount
    this._isMounted = false;
  }

  initializer = async () => {
    getCurrentUser();
    const currentUser = store.getState().currentUser;

    // uncomment below if in production
    this.setState({ loading: true });
    await firebase
    .database()
    .ref('users/' + currentUser.uid + '/orders/')
    .on('value', (snapshot) => {
      const processedOrders = snapshotToArray(snapshot).filter(
        (order) => order.status === 'Pending'
      );

      const createEventItem = (eventItem) => {
        const date = new Date(eventItem.chosenDate);
        const item = {
          title: eventItem.id,
          start: date,
          end: date,
          allDay: true,
        }
        return item;
      }

      let eventItems = [];
      processedOrders.map( (order) => {
        return eventItems.push(createEventItem(order));
      });

      if (eventItems === null || eventItems.length === 0) {
        this._isMounted && this.setState({
          events: [],
        });
      } else {
        this._isMounted && this.setState({
          events: eventItems,
        })
      }
    })
  }

  componentDidMount(){
    this._isMounted = true;
    this._isMounted && this.initializer();
  }

  componentWillUnmount(){
    this._isMounted = false;
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

  render(){
    const { events } = this.state;
    return (
      <Container>
        <DnDCalendar
          selectable
          events={events}
          onEventDrop={this.onEventDrop}

          localizer={localizer}
          defaultView={Views.MONTH}
          defaultDate={new Date()}

          style={{ height: '65vh'}}
        />
      </Container>
    )
  }
}
