import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import classes from '../user-profile/UserProfile.module.scss';
import Fab from '@mui/material/Fab';
import axios from 'axios';
import { usersBaseURL } from '../../common/http-urls';
import { ManageAccounts } from '@mui/icons-material';
import AuthContext from '../../API/auth-context';
import { otherUser } from '../common/constants/data';

const ViewOtherUser = () => {

  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const [state, setState] = useState(location.state);
  const [userWinningLossingPoints, setUserWinningLossingPoints] = useState();

  console.log(location.state);

  useEffect(() => {
    getUserWinningLossingPoints(state.userId);
  }, [state.userId]);

  const getUserWinningLossingPoints = (userId) => {
    axios.get(usersBaseURL + `/${userId}/winning-losing-points`, authCtx.Header)
      .then((response) => {
        setUserWinningLossingPoints(response.data);
      })
      .catch((error) => {
      })
      .finally(() => {
      })
  }


  return (
    <React.Fragment>

      <div className={classes.parent}>
        <div className={classes.child} style={{backgroundImage: 'url(' + otherUser + ')'}}>

          <div className={classes.wrapper}>
            <div className={classes.left}>
              <img src={state.profilePicture} />
              {/* <div><i className={'fas fa-trash-alt ' + classes.remove} title='Remove Profile Picture' ></i></div> */}
              <h4> {state.firstName} {state.lastName} </h4>
              <p> @{state.userName} </p>
            </div>
            <div className={classes.right}>
              {/* <div className={classes.info}>
                <h3>information</h3>
                <div className={classes.info_data}>
                  <div className={classes.data}>
                    <i className={"fas fa-envelope-square " + classes.emicon}></i>
                    <p> {state.email} </p>
                  </div>
                  <div className={classes.data}>
                    <i className={"fas fa-mobile-alt " + classes.emicon}></i>
                    <p> {state.mobileNumber} </p>
                  </div>
                </div>
              </div> */}
              <div className={classes.projects}>
                <h3>Bet history</h3>
                <div className={classes.projects_data}>
                  <div className={classes.data}>
                    <h4>Available Points</h4>
                    <p className={classes.blue}> {state.availablePoints} </p>
                  </div>
                  <div className={classes.data}>
                    <h4>Winning Points</h4>
                    <p className={classes.green}> {userWinningLossingPoints?.winningPoints} </p>
                    <p className={classes.green + ' ' + classes.p_lower}> ({userWinningLossingPoints?.numberOfWinningMatches} Matches) </p>
                  </div>
                  <div className={classes.data}>
                    <h4>Loosing Points</h4>
                    <p className={classes.red}> {userWinningLossingPoints?.losingPoints} </p>
                    <p className={classes.red + ' ' + classes.p_lower} > ({userWinningLossingPoints?.numberOfLosingMatches} Matches) </p>
                  </div>
                </div>
              </div>
              {/* <div className={classes.social_media}>
                <ul>
                  <Fab color='secondary' className={classes.btn} >
                    <ManageAccounts />
                  </Fab>
                  <Fab color='secondary' className={classes.btn} >
                    <Password />
                  </Fab>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default ViewOtherUser;