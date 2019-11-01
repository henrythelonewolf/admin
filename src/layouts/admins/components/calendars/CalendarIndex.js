import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import classNames from 'clsx';
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';
import Grid from '@material-ui/core/Grid';

import Lens from '@material-ui/icons/Lens';
import AccessTime from '@material-ui/icons/AccessTime';

import { withStyles } from '@material-ui/core/styles';
import { owners } from './tasks';

import PageContainer from './../shared/PageContainer';

const appointments = [
  {
    id: 0,
    title: 'Watercolor Landscape Ali',
    startDate: new Date(2019, 10, 11, 11, 11),
    endDate: new Date(2019, 10, 12, 11, 11),
    ownerId: 1,
  }
];

const getBorder = theme => (`1px solid ${
  theme.palette.type === 'light'
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.68)
}`);

const DayScaleCell = props => (
  <MonthView.DayScaleCell {...props} style={{ textAlign: 'center', fontWeight: 'bold' }} />
);

const getPriorityById = ownerId => owners.find(({ id }) => id === ownerId);

const createClassesByPriorityId = (
  priorityId, classes,
  { background = false, color = false },
) => {
  const ownerData = getPriorityById(priorityId);
  const result = [];
  if (background) result.push(classes[`${ownerData.id}PriorityBackground`]);
  if (color) result.push(classes[`${ownerData.id}PriorityColor`]);
  return result.join(' ');
};

const styles = theme => ({
  cell: {
    color: '#78909C!important',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    '&:first-child': {
      borderLeft: 'none',
    },
    '&:last-child': {
      paddingRight: 0,
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  text: {
    padding: '0.5em',
    textAlign: 'center',
  },
  sun: {
    color: '#FFEE58',
  },
  cloud: {
    color: '#90A4AE',
  },
  rain: {
    color: '#4FC3F7',
  },
  sunBack: {
    backgroundColor: '#FFFDE7',
  },
  cloudBack: {
    backgroundColor: '#ECEFF1',
  },
  rainBack: {
    backgroundColor: '#E1F5FE',
  },
  opacity: {
    opacity: '0.5',
  },
  appointment: {
    borderRadius: '10px',
    '&:hover': {
      opacity: 0.6,
    },
  },
  apptContent: {
    '&>div>div': {
      whiteSpace: 'normal !important',
      // max-height: 28px;
      lineHeight: 1.2,
    },
  },
  flexibleSpace: {
    flex: 'none',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  ...owners.reduce((acc, { id, color }) => {
    acc[`${id}PriorityColor`] = { color };
    return acc;
  }, {}),
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
  },
  tooltipText: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: 'middle',
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
});

const CellBase = React.memo(({
  classes,
  startDate,
  formatDate,
  otherMonth,
}) => {
  const isFirstMonthDay = startDate.getDate() === 1;
  const formatOptions = isFirstMonthDay
    ? { day: 'numeric', month: 'long' }
    : { day: 'numeric' };
  return (
    <TableCell
      tabIndex={0}
      className={classNames({
        [classes.cell]: true,
      })}
    >
      <div className={classes.text}>
        {formatDate(startDate, formatOptions)}
      </div>
    </TableCell>
  );
});

const TimeTableCell = withStyles(styles, { name: 'Cell' })(CellBase);

const Appointment = withStyles(styles, { name: 'Appointment' })(({ data, classes, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    className={classes.appointment}
    style={{ backgroundColor: owners.find(item => item.id === data.ownerId).color }}
    data={data}
  />
));

const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(({ classes, ...restProps }) => (
  <Appointments.AppointmentContent {...restProps} className={classes.apptContent} />
));

const TooltipContent = withStyles(styles, { name: 'TooltipContent' })(
  ({ classes, appointmentData, formatDate }) => {
    const priorityClasses = createClassesByPriorityId(
      appointmentData.ownerId, classes, { color: true },
    );
    return (
      <div className={classes.tooltipContent}>
        <Grid container alignItems="center" className={classes.titleContainer}>
          <Grid item xs={2} className={classNames(classes.textCenter, priorityClasses)}>
            <Lens className={classes.circle} />
          </Grid>
          <Grid item xs={10}>
            <div>
              <div className={classNames(classes.title, classes.dateAndTitle)}>
                {appointmentData.title}
              </div>
              <div className={classNames(classes.tooltipText, classes.dateAndTitle)}>
                {formatDate(appointmentData.startDate, { day: 'numeric', weekday: 'long' })}
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={2} className={classes.textCenter}>
            <AccessTime className={classes.icon} />
          </Grid>
          <Grid item xs={10}>
            <div className={classes.tooltipText}>
              {`${formatDate(appointmentData.startDate, { hour: 'numeric', minute: 'numeric' })}
              - ${formatDate(appointmentData.endDate, { hour: 'numeric', minute: 'numeric' })}`}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  },
);

export default class CalendarIndex extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data } = this.state;

    return (
      <PageContainer name="Calendar">
      <Paper>
        <Scheduler
          data={data}
        >
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <ViewState
            defaultCurrentDate={new Date()}
          />
          <MonthView
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />

          <Toolbar />
          <DateNavigator />

          <Appointments
            appointmentComponent={Appointment}
            appointmentContentComponent={AppointmentContent}
          />

          <EditRecurrenceMenu />
          <AppointmentTooltip
            showCloseButton
            showDeleteButton
            showOpenButton
            contentComponent={TooltipContent}
          />
          <AppointmentForm
            readOnly
          />
        </Scheduler>
      </Paper>
      </PageContainer>
    );
  }
}
