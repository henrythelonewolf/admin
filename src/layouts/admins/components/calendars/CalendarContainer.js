import PropTypes from 'prop-types'
import React from 'react'
import { Responsive } from 'semantic-ui-react';

import CalendarIndex from './CalendarIndex';
import DesktopContainer from './../../DesktopContainer';
import MobileContainer from './../../MobileContainer';

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer getWidth={getWidth}>{children}</DesktopContainer>
    <MobileContainer getWidth={getWidth}>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const MainLayout = () => (
  <ResponsiveContainer>
    <CalendarIndex />
  </ResponsiveContainer>
)

export default MainLayout;
