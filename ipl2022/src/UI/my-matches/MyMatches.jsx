import React from 'react'
import classes from './MyMatches.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { BackGroundImage, BorderTop, Matches, TeamColor, TeamFontColor } from '../common/constants/data';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MyMatches = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.parent}>
      <div className={classes.child}>

        <Tabs value={value} onChange={handleChange} centered variant="fullWidth">
          <Tab className={classes.tab} label="Upcoming Matches"  {...a11yProps(0)} />
          <Tab className={classes.tab} label="Live Match" {...a11yProps(1)} />
          <Tab className={classes.tab} label="Results" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div className={classes.match_list} >
            {Matches.map((item) => (
              <div className={classes.card} key={item.matchId}>
                <div
                  className={classes.left}
                  style={{
                    background: item.team1Id ? TeamColor[item.team1Id] : TeamColor.t1,
                    borderTop: item.team1Id ? BorderTop[item.team1Id] : BorderTop.t1
                  }}>
                </div>
                <div
                  className={classes.right}
                  style={{
                    background: item.team2Id ? TeamColor[item.team2Id] : TeamColor.t2,
                    borderTop: item.team2Id ? BorderTop[item.team2Id] : BorderTop.t2
                  }}>
                </div>
                <h2> {item.name} </h2>
                <div className={classes.match_details}>
                  <div className={classes.team1}>
                    <img src={item.team1Logo} alt='1' />
                    <h3
                      className={classes.team_name}
                      style={{ color: item.team1Id ? TeamFontColor[item.team1Id] : TeamFontColor.t1 }}>
                      {item.team1}
                    </h3>
                  </div>
                  <div className={classes.details}>
                    <h3 className={classes.date}> {item.startDatetime}</h3>
                    <h1 className={classes.versus}>VS</h1>
                    <h4 className={classes.venue}>{item.venue} </h4>
                  </div>
                  <div className={classes.team2}>
                    <img src={item.team2Logo} alt='2' />
                    <h3
                      className={classes.team_name}
                      style={{ color: item.team2Id ? TeamFontColor[item.team2Id] : TeamFontColor.t2 }}
                    >
                      {item.team2}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <div className={classes.match_list} >
            {Matches.map((item) => (
              <div className={classes.card} key={item.matchId}>
                <div
                  className={classes.left}
                  style={{
                    background: item.team1Id ? TeamColor[item.team1Id] : TeamColor.t1,
                    borderTop: item.team1Id ? BorderTop[item.team1Id] : BorderTop.t1
                  }}>
                </div>
                <div
                  className={classes.right}
                  style={{
                    background: item.team2Id ? TeamColor[item.team2Id] : TeamColor.t2,
                    borderTop: item.team2Id ? BorderTop[item.team2Id] : BorderTop.t2
                  }}>
                </div>
                <h2> {item.name} </h2>
                <div className={classes.match_details}>
                  <div className={classes.team1}>
                    <img src={item.team1Logo} alt='1' />
                    <h3
                      className={classes.team_name}
                      style={{ color: item.team1Id ? TeamFontColor[item.team1Id] : TeamFontColor.t1 }}>
                      {item.team1}
                    </h3>
                  </div>
                  <div className={classes.details}>
                    <h3 className={classes.date}> {item.startDatetime}</h3>
                    <h1 className={classes.versus}>VS</h1>
                    <h4 className={classes.venue}>{item.venue} </h4>
                  </div>
                  <div className={classes.team2}>
                    <img src={item.team2Logo} alt='2' />
                    <h3
                      className={classes.team_name}
                      style={{ color: item.team2Id ? TeamFontColor[item.team2Id] : TeamFontColor.t2 }}
                    >
                      {item.team2}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <div className={classes.match_list} >
            {Matches.map((item) => (
              <div className={classes.card} key={item.matchId}>
                <div
                  className={classes.left}
                  style={{
                    background: item.team1Id ? TeamColor[item.team1Id] : TeamColor.t1,
                    borderTop: item.team1Id ? BorderTop[item.team1Id] : BorderTop.t1
                  }}>
                </div>
                <div
                  className={classes.right}
                  style={{
                    background: item.team2Id ? TeamColor[item.team2Id] : TeamColor.t2,
                    borderTop: item.team2Id ? BorderTop[item.team2Id] : BorderTop.t2
                  }}>
                </div>
                <h2> {item.name} </h2>
                <div className={classes.match_details}>
                  <div className={classes.team1}>
                    <img src={item.team1Logo} alt='1' />
                    <h3
                      className={classes.team_name}
                      style={{ color: item.team1Id ? TeamFontColor[item.team1Id] : TeamFontColor.t1 }}>
                      {item.team1}
                    </h3>
                  </div>
                  <div className={classes.details}>
                    <h3 className={classes.date}> {item.startDatetime}</h3>
                    <h1 className={classes.versus}>VS</h1>
                    <h4 className={classes.venue}>{item.venue} </h4>
                  </div>
                  <div className={classes.team2}>
                    <img src={item.team2Logo} alt='2' />
                    <h3
                      className={classes.team_name}
                      style={{ color: item.team2Id ? TeamFontColor[item.team2Id] : TeamFontColor.t2 }}
                    >
                      {item.team2}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

      </div>
    </div>
  );
}

export default MyMatches;