import React from 'react'
import classes from './MyMatches.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { BorderShortTop, TeamShortColor, TeamShortFontColor } from '../common/constants/data';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

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

const MyMatches = (props) => {

  const navigate = useNavigate();

  const upcomingMatchesByUserId = useSelector((state) => state.upcomingMatchesByUserId.items);
  const liveMatches = useSelector((state) => state.liveMatch.items);
  const allMatchResult = useSelector((state) => state.allMatchResult.items);
  const [value, setValue] = React.useState(0);
  console.log(liveMatches);
  
  const upcomingMatchData = useSelector((state) => state.upcomingMatches.items);

  const gotoBettingPage = (item) => {
    const selectedData = upcomingMatchData.find(d => d.matchId === item.matchId);
    navigate(`/match-list/${item.matchId}`,{state:selectedData});
  };

  const gotoLiveMatches = (item) => {
    const selectedData = liveMatches.find(d => d.matchId === item.matchId);
    navigate(`/live-match/${item.matchId}`,{state:selectedData});
  };

  const gotoResult = (item) => {
    const selectedData = allMatchResult.find(d => d.matchId === item.matchId);
    console.log(selectedData);
    navigate(`/match-result/${item.matchId}`,{state:selectedData});
  };

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
            {upcomingMatchesByUserId.map((item) => (
              <div className={classes.card} key={item.matchId} onClick={()=>gotoBettingPage(item)}>
                <div
                  className={classes.left}
                  style={{
                    background: item.team1Short ? TeamShortColor[item.team1Short] : TeamShortColor.t1,
                    borderTop: item.team1Short ? BorderShortTop[item.team1Short] : BorderShortTop.t1
                  }}>
                </div>
                <div
                  className={classes.right}
                  style={{
                    background: item.team2Short ? TeamShortColor[item.team2Short] : TeamShortColor.t2,
                    borderTop: item.team2Short ? BorderShortTop[item.team2Short] : BorderShortTop.t2
                  }}>
                </div>
                <h2> {item.team1Short} vs {item.team2Short} </h2>
                <div className={classes.match_details}>
                  <div className={classes.team1}>
                    <img src={item.team1Logo} alt='1' />
                    <h3
                      className={classes.team_name}
                      style={{ color: item.team1Short ? TeamShortFontColor[item.team1Short] : TeamShortFontColor.t1 }}>
                      {item.team1Short}
                    </h3>
                  </div>
                  <div className={classes.details}>
                    <h3 className={classes.date}> {moment(item.startDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h3>
                    <h1 className={classes.versus}>VS</h1>
                    <h4 className={classes.venue}>{item.venue} </h4>
                  </div>
                  <div className={classes.team2}>
                    <img src={item.team2Logo} alt='2' />
                    <h3
                      className={classes.team_name}
                      style={{ color: item.team2Short ? TeamShortFontColor[item.team2Short] : TeamShortFontColor.t2 }}
                    >
                      {item.team2Short}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <div className={classes.match_list} >
            {liveMatches.map((item) => (
              <div className={classes.card} key={item.matchId} onClick={()=> gotoLiveMatches(item)}>
                <div
                  className={classes.left}
                  style={{
                    background: item.team1Short ? TeamShortColor[item.team1Short] : TeamShortColor.t1,
                    borderTop: item.team1Short ? BorderShortTop[item.team1Short] : BorderShortTop.t1
                  }}>
                </div>
                <div
                  className={classes.right}
                  style={{
                    background: item.team2Short ? TeamShortColor[item.team2Short] : TeamShortColor.t2,
                    borderTop: item.team2Short ? BorderShortTop[item.team2Short] : BorderShortTop.t2
                  }}>
                </div>
                <h2> {item.name} </h2>
                <div className={classes.match_details}>
                  <div className={classes.team1}>
                    <img src={item.team1Logo} alt='1' />
                    <h3
                      className={classes.team_name}
                      style={{ color: item.team1Short ? TeamShortFontColor[item.team1Short] : TeamShortFontColor.t1 }}>
                      {item.team1Short}
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
                      style={{ color: item.team2Short ? TeamShortFontColor[item.team2Short] : TeamShortFontColor.t2 }}
                    >
                      {item.team2Short}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <div className={classes.match_list} >
            {allMatchResult.map((item) => (
              <div  key={item.matchId}>
              <div className={classes.card} onClick={()=>gotoResult(item)}>
                <div
                  className={classes.left}
                  style={{
                    background: item.team1Short ? TeamShortColor[item.team1Short] : TeamShortColor.t1,
                    borderTop: item.team1Short ? BorderShortTop[item.team1Short] : BorderShortTop.t1
                  }}>
                </div>
                <div
                  className={classes.right}
                  style={{
                    background: item.team2Short ? TeamShortColor[item.team2Short] : TeamShortColor.t2,
                    borderTop: item.team2Short ? BorderShortTop[item.team2Short] : BorderShortTop.t2
                  }}>
                </div>
                <h2> {item.team1Short} vs {item.team2Short} </h2>
                <div className={classes.match_details}>
                  <div className={classes.team1}>
                    <img src={item.team1Logo} alt='1' />
                    <h3
                      className={classes.team_name}
                      style={{ color: item.team1Short ? TeamShortFontColor[item.team1Short] : TeamShortFontColor.t1 }}>
                      {item.team1Short}
                    </h3>
                  </div>
                  <div className={classes.details}>
                    <h3 className={classes.date}> {moment(item.startDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h3>
                    <h1 className={classes.versus}>VS</h1>
                    <h4 className={classes.venue}>{item.venue} </h4>
                  </div>
                  <div className={classes.team2}>
                    <img src={item.team2Logo} alt='2' />
                    <h3
                      className={classes.team_name}
                      style={{ color: item.team2Short ? TeamShortFontColor[item.team2Short] : TeamShortFontColor.t2 }}
                    >
                      {item.team2Short}
                    </h3>
                  </div>
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