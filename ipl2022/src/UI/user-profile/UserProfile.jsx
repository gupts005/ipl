import classes from './UserProfile.module.scss';
import { ManageAccounts, Password } from '@mui/icons-material';
import React from 'react'
import Fab from '@mui/material/Fab';

const UserProfile = (props) => {
  return (
    <div className={classes.parent}>
      <div className={classes.child}>

        <div className={classes.wrapper}>
          <div className={classes.left}>
            <img src={''} />
            <div><i className={'fas fa-trash-alt ' + classes.remove} title='Remove Profile Picture' ></i></div>
            <h4> </h4>
            <p> </p>
          </div>
          <div className={classes.right}>
            <div className={classes.info}>
              <h3>information</h3>
              <div className={classes.info_data}>
                <div className={classes.data}>
                  <i className={"fas fa-envelope-square " + classes.emicon}></i>
                  <p>suraj@gmail.com </p>
                </div>
                <div className={classes.data}>
                  <i className={"fas fa-mobile-alt " + classes.emicon}></i>
                  <p>9033481597</p>
                </div>
              </div>
            </div>
            <div className={classes.projects}>
              <h3>Bet history</h3>
              <div className={classes.projects_data}>
                <div className={classes.data}>
                  <h4>Available Points</h4>
                  <p className={classes.blue}> 500 </p>
                </div>
                <div className={classes.data}>
                  <h4>Winning Points</h4>
                  <p className={classes.green}>500 </p>
                  <p className={classes.green + ' ' + classes.p_lower}> (5) </p>
                </div>
                <div className={classes.data}>
                  <h4>Loosing Points</h4>
                  <p className={classes.red}>400 </p>
                  <p className={classes.red + ' ' + classes.p_lower} >(10) </p>
                </div>
              </div>
            </div>
            <div className={classes.social_media}>
              <ul>
                <Fab color='secondary'  className={classes.btn}> 
                  <ManageAccounts />
                </Fab>
                <Fab color='secondary' className={classes.btn}> 

                  <Password />
                </Fab>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserProfile;