import React from 'react'
import {
  Feed,
  Icon,
  Button,
  Segment,
  Rail,
  Grid,
  Card,
  Header,
  Divider
} from 'semantic-ui-react'
import { firebase } from './../../../../firebaseConfig';

export default class ProfileIndex extends React.Component {
  state = {
    activities: [
      {
        id: 1,
        name: 'Ali',
        summary: 'created new orders',
        date: '3 days ago',
        description: 'Hi hihihi hihi hihihihihih hihihih hih hi hi hi hih hih',
      },
      {
        id: 2,
        name: 'Ali',
        summary: 'changed order status from "Pending" to "Processed"',
        date: '3 days ago',
        description: 'Hi hihihi hihi hihihihihih hihihih hih hi hi hi hih hih',
      },
    ]
  }

  handleSignOutPress = async () => {
    await firebase.auth().signOut().catch( (error) => {
      alert(error.toString());
    });
  }

  renderEvents = (activity) => {
    return (
      <Feed.Event key={activity.id}>
        <Feed.Label>
          <Icon name='pencil' />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            {activity.name} {activity.summary}
            <Feed.Date>{activity.date}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            {activity.description}
          </Feed.Extra>
          <Feed.Meta />
        </Feed.Content>
      </Feed.Event>
    )
  }

  render(){
    const { activities } = this.state;

    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <Segment>
            <Rail position='left'>
              <Card raised image={'./logo512.png'} />
              <Card
                header={'Someone'}
                meta={'Head of Department'}
                description={'Handling stuff related to management'}
              />
            </Rail>

            <Feed>
              <Header as={'h3'}>Recent Activities</Header>
              <Divider />
              {activities.map( (activity) => this.renderEvents(activity) )}
            </Feed>

            <Rail position='right'>
              <Button onClick={this.handleSignOutPress} fluid>Sign Out</Button>
            </Rail>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}
