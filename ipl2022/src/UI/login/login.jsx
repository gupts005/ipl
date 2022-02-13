import React, { useState, useRef, useEffect, useContext } from 'react';
import classes from './login.module.scss';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../API/auth-context';
import MiniCarousel from '../MiniCarousel/MiniCrousel';
import { init } from "ityped";
import Particles from 'react-tsparticles';
import AnimatedButton from '../common/components/AnimatedButton/AnimatedButton';
import { useFormik } from 'formik';
import { authentication } from '../../API/authentication/authentication-actions';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { CircularProgress } from '@mui/material';

const validationSchema = yup.object({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required')
});

const Login = (props) => {

  const [state, setState] = useState({
    isLoading: false
  });
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.authentication.items);
  const loginChanged = useSelector((state) => state.authentication.changed);
  const notification = useSelector((state) => state.notification.notification);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (loginChanged) {
      setState({
        isLoading: false
      });
      if (JSON.stringify(loginData).toLowerCase().includes('400') ||
        JSON.stringify(loginData).toLowerCase().includes('401') ||
        JSON.stringify(loginData).toLowerCase().includes('sorry! you have been blocked by the admin.') ||
        JSON.stringify(loginData).toLowerCase().includes('invalid username or password!') ||
        JSON.stringify(loginData).toLowerCase().includes('500')) {
        return;
      }
      if (JSON.stringify(loginData).toLowerCase().includes('userid')) {
        authCtx.login(loginData);
        navigate('/');
      }
    }
  }, [loginChanged, loginData]);

  useEffect(() => {
    if (notification?.status === 'error') {
      setState({
        isLoading: false
      });
    }
  }, [notification]);

  const particlesInit = (main) => {
    // console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    // console.log(container);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  const gotoResetPassword = () => {
    navigate('/forgot-password');
  }

  const textRef = useRef();
  const textRef2 = useRef();

  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed: 60,
      strings: ['Sign in to start Winning Big'],
    });

    init(textRef2.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed: 60,
      strings: ['Wanna start placing bets?'],
    });
  }, []);

  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   const enteredUsername = usernameInputRef.current.value;
  //   const enteredPassword = passwordInputRef.current.value;

  //   setState({
  //     isLoading: true
  //   });

  //   let username = enteredUsername;
  //   let password = enteredPassword;
  //   const loginData = { username, password };
  //   const response = await axios.post(authBaseURL, loginData);
  //   const resp = await response;

  //   if (resp.status !== 200) {
  //     alert('error');
  //     setState({
  //       isLoading: false
  //     });
  //   }

  //   if (resp.data) {
  //     setState({ isLoading: false });
  //     authCtx.login(resp.data);
  //     navigate('/');
  //   }

  // };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (selectedFormData) => {
      setState({
        isLoading: true
      });
      console.log(selectedFormData);
      dispatch(authentication({
        username: selectedFormData.username,
        password: selectedFormData.password
      }));
    }
  });

  const gotoRegistration = () => {
    navigate('/registration');
  };

  const sucess = 'Login Successfully';
  return (
    <React.Fragment>

      <div className={classes.parent}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                // value: "#343148",
              },
            },
            fpsLimit: 30,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                },
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 3,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 5,
              },
            },
            detectRetina: true,
          }}
        />
        <div className={classes.child}>
          <div className={classes.child_left}>
            <MiniCarousel />
          </div>
          <div className={classes.child_right}>
            <div className={classes.child_right_inner}>
              <div className={classes.child_right_1}>
                <p>
                  Welcome &nbsp; <i className="fas fa-strikethrough"></i>
                  <i>portsGeek, <span ref={textRef}></span> </i>
                </p>
              </div>
              <div className={classes.child_right_2}>
                <form onSubmit={formik.handleSubmit}>
                  <div className={classes.input_field}>
                    <input
                      type="text"
                      placeholder='U S E R N A M E'
                      id='username'
                      name='username'
                      onChange={formik.handleChange} />
                  </div>
                  {formik.touched.username && Boolean(formik.errors.username) &&
                    <span className={classes.formError}>{formik.errors.username}</span>
                  }
                  <div className={classes.input_field}>
                    <input
                      type="password"
                      placeholder='P A S S W O R D'
                      id='password'
                      name='password'
                      onChange={formik.handleChange} />
                  </div>
                  {formik.touched.password && Boolean(formik.errors.password) &&
                    <span className={classes.formError}>{formik.errors.password}</span>
                  }
                  <div className={classes.login_btn}>
                    {!state.isLoading && (
                      <AnimatedButton text={'login'} />
                    )}
                    {state.isLoading && <p> Fetching <CircularProgress color="secondary" /></p>}
                  </div>
                </form>
              </div>
              <div className={classes.child_right_3}>
                <div className={classes.child_right_3_left}>
                  <a onClick={gotoResetPassword}>Forgot Password?</a>
                </div>
                <div className={classes.child_right_3_right}>
                  <span className={classes.span1} ref={textRef2}> </span>
                  <br />
                  <span className={classes.span2} onClick={gotoRegistration}>
                    <i className="fas fa-sign-in-alt"></i>Hit me to register

                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;