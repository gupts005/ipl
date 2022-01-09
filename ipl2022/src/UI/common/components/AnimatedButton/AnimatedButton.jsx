import React from 'react'
import classes from './animated-button.module.scss';

const AnimatedButton = () => {
  return (
    <React.Fragment>
      <div className={classes.xyz}>

        <button>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </button>
      </div>
    </React.Fragment>
  )
}

export default AnimatedButton;
