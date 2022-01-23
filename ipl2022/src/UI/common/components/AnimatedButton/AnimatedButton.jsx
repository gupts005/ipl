import React from 'react'
import classes from './animated-button.module.scss';

const AnimatedButton = (props) => {
  return (
    <React.Fragment>
      <div className={classes.xyz}>

        <button type='submit'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          {props.text}
        </button>
      </div>
    </React.Fragment>
  )
}

export default AnimatedButton;
