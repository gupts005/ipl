import React from 'react'
import classes from './registration.module.scss';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const gotoLogin = () => {
    navigate('/login');
  };

  return (
    <div className={classes.parent}>
      <div className={classes.left}>
        <div className={classes.left_inner}>
          <h2>Sign up to start winning Big</h2>
          <p>Place Bets on your favourite team</p>
        </div>
      </div>
      <div className={classes.right}>
        <p className={classes.right_p}>
          Sign Up
        </p>
        <form>
          <div className={classes.right_form}>
            <div className={classes.textfield}>

              <TextField id="filled-basic" variant="filled" label='First Name' color="secondary" />

            </div>
            <div className={classes.textfield}>

              <TextField  id="filled-basic" variant="filled"  label='Last Name' color="secondary" />
            </div>
            <div className={classes.textfield}>

              <TextField  id="filled-basic" variant="filled"  label='Email' color="secondary" />

            </div>
            <div className={classes.textfield}>

              <TextField  id="filled-basic" variant="filled"  label='Phone no.' color="secondary" />
            </div>
            <div className={classes.textfield}>

              <TextField  id="filled-basic" variant="filled"  label='Profile Pic' color="secondary" />
            </div>
            <div className={classes.textfield}>

              <TextField  id="filled-basic" variant="filled"  label='Username' color="secondary" />
            </div>
            <div className={classes.textfield}>

              <TextField  id="filled-basic" variant="filled"  label='Password' color="secondary" />
            </div>
            <div className={classes.textfield}>

              <TextField  id="filled-basic" variant="filled"  label='Confirm Password' color="secondary" />
            </div>
            <div>

              <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </div>
          </div>
          <div className={classes.btn}>
            <button className={classes.btn_sub}>Submit</button>
            <p className={classes.btn_p}>already signed up? <a onClick={gotoLogin}>Login Now</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
