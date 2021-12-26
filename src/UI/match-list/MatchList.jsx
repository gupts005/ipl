import React from 'react';
import './MatchList.scss';

const MatchList = (props) => {
  return (
    <div className='match_list' id='match_list'>

<div class="card">
        <div class="left">
        </div>
        <div class="right">
        </div>
        {/* <h2>Upcoming Match No. {{matchData?.matchId}}</h2> */}
        <h2>MAtch name</h2>
        <div class="match-details">
            <div class="team1">
                <img loading="lazy" style="border-radius: 50%; " src={} />
                <h3 class="team-name">team1</h3>
                <h3 class="team-points">{{team1points}}</h3>
            </div>
            <div class="details">
                <h3 class="date"> date/time </h3>
                <h1 class="versus">VS</h1>
                <h4 class="venue">venue </h4>
            </div>
            <div class="team2">
                <img loading="lazy" style="border-radius: 50%; " src={} />
                <h3 class="team-name" >team2</h3>
                <h3 class="team-points">team2points</h3>
            </div>
        </div>
    </div>
      
    </div>
  )
}

export default MatchList;