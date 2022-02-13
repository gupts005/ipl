import classes from './UserProfile.module.scss';
import { ManageAccounts, Password } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import { useDispatch, useSelector } from 'react-redux';
import { usersBaseURL } from '../../common/http-urls';
import axios from 'axios';
import UpdateProfile from './components/UpdateProfile';
import UpdatePassword from './components/UpdatePassword';

const userData = JSON.parse(localStorage.getItem('loginState'));
const Token = {
  headers: { Authorization: `Bearer ${userData?.token}` }
};

const UserProfile = (props) => {
  
  const dispatch = useDispatch();
  const userByIdData = useSelector((state) => state.userById.items);
  const [userWinningLossingPoints, setUserWinningLossingPoints] = useState();  
  const [openCrudModal, setCrudModal] = useState(false);
  const [openPasswordModal, setPasswordModal] = useState(false);
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    getUserWinningLossingPoints(userData.userId);
  },[userByIdData.userId]);

  const getUserWinningLossingPoints = (userId) => {
    axios.get(usersBaseURL + `/${userId}/winning-losing-points`, Token)
      .then((response) => {
        setUserWinningLossingPoints(response.data);
      })
      .catch((error) => {
      })
      .finally(() => {
      })
  }

  return (
    <div className={classes.parent}>
      <div className={classes.child}>

        <div className={classes.wrapper}>
          <div className={classes.left}>
            <img src={'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2020%2F11%2F13%2Fdwayne-johnson.jpg'} />
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
                  <p> {userByIdData.email} </p>
                </div>
                <div className={classes.data}>
                  <i className={"fas fa-mobile-alt " + classes.emicon}></i>
                  <p> {userByIdData.mobileNumber} </p>
                </div>
              </div>
            </div>
            <div className={classes.projects}>
              <h3>Bet history</h3>
              <div className={classes.projects_data}>
                <div className={classes.data}>
                  <h4>Available Points</h4>
                  <p className={classes.blue}> {userByIdData.availablePoints} </p>
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
            <div className={classes.social_media}>
              <ul>
                <Fab color='secondary' className={classes.btn} onClick={() => { setSelectedData(userByIdData); setCrudModal(true);}} > 
                  <ManageAccounts />
                </Fab>
                <Fab color='secondary' className={classes.btn} onClick={() => setPasswordModal(true)}> 
                  <Password />
                </Fab>
              </ul>
            </div>
          </div>
        </div>
        <UpdateProfile update={selectedData} open={openCrudModal} handleClose={() => setCrudModal(false)} />
        <UpdatePassword open={openPasswordModal} handleClose={() => setPasswordModal(false)} />
      </div>
    </div>
  )
}

export default UserProfile;