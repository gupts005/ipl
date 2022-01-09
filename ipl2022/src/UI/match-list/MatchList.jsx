import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BackGroundImage, Matches, TeamFontColor, BorderTop, Token,TeamColor } from '../common/constants/data';
import { matchBaseURL } from '../common/constants/http-urls';
import classes from './MatchList.module.scss';

const MatchList = (props) => {

  return (
    <div className={classes.parent}>

      <div className={classes.match_list} style={{ backgroundImage: `url(${BackGroundImage})` }}>
        {Matches.map((item) => (
          <div className={classes.card} key={item.matchId}>
            <div
              className={classes.left}
              style={{ background: item.team1Id ? TeamColor[item.team1Id] : TeamColor.t1,
                borderTop: item.team1Id ? BorderTop[item.team1Id] : BorderTop.t1 }}>
            </div>
            <div
              className={classes.right}
              style={{ background: item.team2Id ? TeamColor[item.team2Id] : TeamColor.t2,
              borderTop: item.team2Id ? BorderTop[item.team2Id] : BorderTop.t2 }}>
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
    </div>
  );
};

export default MatchList;