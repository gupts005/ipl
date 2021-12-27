import React from 'react';
import { BackGroundImage } from '../common/constants';
import './MatchList.scss';

const MatchList = (props) => {

  return (
    <div className='parent'>
      <div className='match_list' style={{backgroundImage: `url(${BackGroundImage})`}}>
        <div className="card">
          <div className="left">
          </div>
          <div className="right">
          </div>
          <h2>name</h2>
          <div className="match-details">
            <div className="team1">
              <img src={''} alt='1' />
              <h3 className="team-name"> team1 </h3>
            </div>
            <div className="details">
              <h3 className="date"> date</h3>
              <h1 className="versus">VS</h1>
              <h4 className="venue">venue </h4>
            </div>
            <div className="team2">
              <img src={''} alt='2' />
              <h3 className="team-name" >team2</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchList;