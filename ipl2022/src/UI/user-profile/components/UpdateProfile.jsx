import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { userByIdActions } from '../../../API/user-by-id/userById-slice';
import { sendUpdatedUserData } from '../../../API/users/user-actions';
import AuthContext from '../../../API/auth-context';
import axios from 'axios';
import { usersBaseURL } from '../../../common/http-urls';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ParentDiv = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
`;

const validationSchema = yup.object({
  // username: yup.string().min(3, 'atleast 3 char is required').required('Username is required'),
  firstName: yup.string().min(3, 'minimum 3 digits').required(),
  lastName: yup.string().min(3, 'name should be of minimum 2 characters length').required(),
  genderId: yup.date().required(),
  availablePoints: yup.number().required(),
  mobileNumber: yup.number().required(),
  email: yup.string().email().required(),
});

const genderId = [{ genderId: 1, name: "Male" }, { genderId: 2, name: "Female" }];

export default function UpdateProfile(props) {

  const dispatch = useDispatch();
  const authCtx = React.useContext(AuthContext);
  const userByIdData = useSelector((state) => state.userById.items);
  console.log(props);
  // const [isProfilePictureChanged, setIsProfilePictureChanged] = React.useState(false);

  const [selected, setSelected] = React.useState({
    userId: '',
    firstName: '',
    lastName: '',
    genderId: '',
    genderName: '',
    username: '',
    profilePicture: '',
    roleId: '',
    roleName: '',
    availablePoints: '',
    status: '',
    mobileNumber: '',
    email: ''
  });

  React.useEffect(() => {
    setSelected(props.update);
  }, [props.update]);

  const formik = useFormik({
    initialValues: {
      userId: selected?.userId,
      // username: selected?.username,
      firstName: selected?.firstName,
      lastName: selected?.lastName,
      genderId: selected?.genderId,
      availablePoints: selected?.availablePoints,
      profilePicture: selected?.profilePicture,
      mobileNumber: selected?.mobileNumber,
      email: selected?.email,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (selected, { resetForm }) => {
      console.log(selected, ' selected data');
      if (selected.profilePicture !== '') {
        // setIsProfilePictureChanged(true);
      }
      var formData = new FormData();
      // dispatch(
      //   userByIdActions.updateUserDetails({
      //     userId: formik.values.userId,
      //     username: userByIdData.username,
      //     firstName: selected.firstName,
      //     lastName: selected.lastName,
      //     email: selected.email,
      //     mobileNumber: selected.mobileNumber,
      //     genderId: selected.genderId,
      //     profilePicture: userByIdData.profilePicture,
      //     availablePoints: formik.values.availablePoints
      //   })
      // );
      // formData.append("username", selected.username);
      formData.append("firstName", selected.firstName);
      formData.append("lastName", selected.lastName);
      formData.append("genderId", selected.genderId);
      formData.append("email", selected.email);
      formData.append("mobileNumber", selected.mobileNumber);
      // if (isProfilePictureChanged && selected.profilePicture !== '') {
      formData.append("profilePicture", selected.profilePicture);
      // }
      // formData.append('updateProfilePicture', isProfilePictureChanged);
      dispatch(sendUpdatedUserData(formik.values.userId, formData, authCtx.Header));
      resetForm();
      props.handleClose();
    },
  });

  const deleteUserPic = () => {
    axios.delete(usersBaseURL + `/${authCtx.userData.userId}/remove-profile-picture`, authCtx.Header)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          let t = userByIdData;
          let y = {...t,profilePicture:''}
          console.log(y);          
          dispatch(userByIdActions.updateUser({ items: y || [] }));
        }
      })
      .catch((error) => {
      })
      .finally(() => {
      })
    props.handleClose();
  };

  return (
    <React.Fragment >
      {props.update !== false &&

        <Dialog
          keepMounted
          onClose={props.handleClose}
          open={props.open}
          TransitionComponent={Transition}
        >
          <form onSubmit={formik.handleSubmit}>
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={props.handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Update your Details
                </Typography>
                <Button autoFocus color="inherit" type='submit' >
                  Update
                </Button>
              </Toolbar>
            </AppBar>
            <Box
              // component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <ParentDiv>

                {/* <TextField
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  name='username'
                  value={formik.values.username || ''}
                  label='Username'
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={formik.handleChange}
                /> */}

                <TextField
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  name='firstName'
                  label="First Name"
                  variant="outlined"
                  value={formik.values.firstName || ''}
                  onChange={formik.handleChange}
                />

                <TextField
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  name='lastName'
                  label="Last Name"
                  variant="outlined"
                  value={formik.values.lastName || ''}
                  onChange={formik.handleChange}
                />

                <TextField
                  label="Mobile No"
                  error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                  helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                  name='mobileNumber'
                  value={formik.values.mobileNumber || ''}
                  onChange={formik.handleChange}
                />

                <TextField
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  name='email'
                  value={formik.values.email || ''}
                  onChange={formik.handleChange}
                />

                <TextField
                  label="Profile Pic"
                  type='file'
                  name='profilePicture'
                  // value={formik.values.profilePicture || ''}
                  onChange={(event) => {
                    formik.setFieldValue("profilePicture", event.currentTarget.files[0]);
                  }}
                  focused={true}
                />

                <TextField
                  error={formik.touched.genderId && Boolean(formik.errors.genderId)}
                  helperText={formik.touched.genderId && formik.errors.genderId}
                  label="Gender"
                  select
                  name='genderId'
                  value={formik.values.genderId || ''}
                  onChange={formik.handleChange}
                >
                  {genderId.map((option) => (
                    <MenuItem
                      key={option.genderId}
                      value={option.genderId}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>

              </ParentDiv>
            </Box>
          </form>
        </Dialog>
      }

      {props.update === false &&

        <Dialog
          keepMounted
          onClose={props.handleClose}
          open={props.open}
          TransitionComponent={Transition}
        >
          <DialogTitle>{"Are you sure you want to delete?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Username: {props.delete.username} <br />
              {/* Name: {props.delete.name} */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose}>Disagree</Button>
            <Button onClick={deleteUserPic}>Agree</Button>
          </DialogActions>
        </Dialog>

      }
    </React.Fragment >
  );
}
