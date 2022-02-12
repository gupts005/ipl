import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import GroupIcon from '@mui/icons-material/Group';
import classes from './component.module.scss';
import { Avatar } from '@mui/material';
import { stringAvatar } from '../../common/components/Utils';

export default function SwipeableTemporaryDrawer(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        sx={{background: 'rgb(111,45,168)'}}
      >
        <div className={classes.heading}>
          <h4>Online Users</h4>
        </div>
      </List>
      <Divider />
      <List
        sx={{background: 'rgb(91,59,140)', minHeight: '87vh', height: 'auto'}}
      >
        {props.onlineUsers.map((ou,index) => {
          return (
            <div className={classes.online} key={index}>
              {ou.userId &&
                <div className={classes.onlineInner}>
                  <Avatar {...stringAvatar(`${ou.firstName} ${ou.lastName}`)} src={ou.profilePicture} />
                  <span>{ou.firstName} {ou.lastName}</span>
                </div>}
            </div>
          )
        })}
      </List>
    </Box>
  );

  return (
    <div style={{ position: 'absolute', left: '10px', height: '100%' }}>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Fab color='secondary'>
            <GroupIcon onClick={toggleDrawer(anchor, true)}>{anchor}</GroupIcon>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </Fab>
        </React.Fragment>
      ))}
    </div>
  );
}
