import React from 'react';
import { Statistic } from 'semantic-ui-react';

export default class Stats extends React.Component {
  render(){
    const { label, value } = this.props;

    return (
      <Statistic>
        <Statistic.Label>
          {label}
        </Statistic.Label>
        <Statistic.Value>
          {value}
        </Statistic.Value>
      </Statistic>
    )
  }
}
