import PropTypes from 'prop-types'
import React from 'react'
import { Responsive } from 'semantic-ui-react';

import ProfileIndex from './ProfileIndex';
import DesktopContainer from './../../DesktopContainer';

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer getWidth={getWidth}>{children}</DesktopContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const MainLayout = () => (
  <ResponsiveContainer>
    <ProfileIndex />
  </ResponsiveContainer>
)

export default MainLayout;
