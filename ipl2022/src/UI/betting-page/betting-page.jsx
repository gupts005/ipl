import React from 'react'
import { useLocation } from 'react-router-dom';
import classes from './betting-page.module.scss';

const BettingPage = (props) => {

  const location = useLocation();

  return (
    <div className={classes.parent}>
      <div className={classes.child}>
        betting page
      </div>
    </div>
  )
}

export default BettingPage;
