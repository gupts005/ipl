import classes from './UserProfile.module.scss';
import { ManageAccounts, Password } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import { useDispatch, useSelector } from 'react-redux';
import { usersBaseURL } from '../../common/http-urls';
import axios from 'axios';
import UpdateProfile from './components/UpdateProfile';
import UpdatePassword from './components/UpdatePassword';
import AuthContext from '../../API/auth-context';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { userProfile } from '../common/constants/data';

const UserProfile = (props) => {

  // const authCtx = useContext(AuthContext);
  // const dispatch = useDispatch();
  const userByIdData = useSelector((state) => state.userById.items);
  const userWLP = useSelector((state) => state.userWLP.items);
  const [userWinningLossingPoints, setUserWinningLossingPoints] = useState(userWLP);
  const [openCrudModal, setCrudModal] = useState(false);
  const [openPasswordModal, setPasswordModal] = useState(false);
  const [selectedData, setSelectedData] = useState();
  // console.log(userWLP);

  return (
    <div className={classes.parent}>
      <div className={classes.child} style={{backgroundImage: 'url(' + userProfile + ')'}}>

        <div className={classes.wrapper}>
          <div className={classes.left}>
            <img src={userByIdData.profilePicture} alt='please upload a pic' />
            <div>
              {/* <i className={'fas fa-trash-alt ' + classes.remove} title='Remove Profile Picture' ></i> */}
              <IconButton onClick={()=> { setSelectedData(false); setCrudModal(true);}}>
                <DeleteForeverIcon sx={{ color: 'red' }}/>
              </IconButton>
              </div>
            <h4> {userByIdData.firstName} {userByIdData.lastName} </h4>
            <p> @{userByIdData.username} </p>
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
                <Fab color='secondary' className={classes.btn} onClick={() => { setSelectedData(userByIdData); setCrudModal(true); }} >
                  <ManageAccounts />
                </Fab>
                <Fab color='secondary' className={classes.btn} onClick={() => setPasswordModal(true)}>
                  <Password />
                </Fab>
              </ul>
            </div>
          </div>
        </div>
        <UpdateProfile delete={userByIdData} update={selectedData} open={openCrudModal} handleClose={() => setCrudModal(false)} />
        <UpdatePassword open={openPasswordModal} handleClose={() => setPasswordModal(false)} />
      </div>
    </div>
  )
}

export default UserProfile;