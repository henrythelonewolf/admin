import React from 'react';
import {
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class DesktopContainer extends React.Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children, getWidth } = this.props
    const { fixed } = this.state
    const currentLocation = window.location.pathname;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            textAlign='center'
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
              <Menu.Item
              as={Link}
              to={'/orders'}
              active={currentLocation === '/orders' ? true : false}
              >Orders
              </Menu.Item>

              <Menu.Item
              as={Link}
              to={'/profiles'}
              active={currentLocation === '/profiles' ? true : false}
              >Profile
              </Menu.Item>

              {/*
                <Menu.Item
                as={Link}
                to={'/calendars'}
                active={currentLocation === '/calendars' ? true : false}
                >Calendar
                </Menu.Item>

                <Menu.Item
                as={Link}
                to={'/'}
                active={currentLocation === '/' ? true : false}
                >Dashboard
                </Menu.Item>



                <Menu.Item
                as={Link}
                to={'/creates'}
                active={currentLocation === '/creates' ? true : false}
                >Create
                </Menu.Item>


                */}

              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}
