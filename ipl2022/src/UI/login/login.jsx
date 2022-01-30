import React, { useState, useRef, useEffect, useContext } from 'react';
import classes from './login.module.scss';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../API/auth-context';
import MiniCarousel from '../MiniCarousel/MiniCrousel';
import { init } from "ityped";
import Particles from 'react-tsparticles';
import { authBaseURL } from '../../common/http-urls.js';
import AnimatedButton from '../common/components/AnimatedButton/AnimatedButton';

const Login = () => {

  const navigate = useNavigate();

  const [state, setState] = useState({
    isLoading: false
  });

  const authCtx = useContext(AuthContext);

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const particlesInit = (main) => {
    // console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    // console.log(container);
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

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // console.log(enteredPassword, enteredUsername);
    setState({
      isLoading: true
    });

    fetch(authBaseURL, {
      method: 'POST',
      body: JSON.stringify({
        username: enteredUsername,
        password: enteredPassword
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        setState({
          isLoading: false
        });
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            if (data) {
              errorMessage = data.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data);
        navigate('/');
      }).catch((err) => {
        alert(err.message, ' catch block');
      })
  };

  const gotoRegistration = () => {
    navigate('/registration');
  };

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
                <form onSubmit={submitHandler}>
                  <div className={classes.input_field}>
                    <input type="text" placeholder='U S E R N A M E' id='username' required ref={usernameInputRef} />
                  </div>
                  <div className={classes.input_field}>
                    <input type="password" placeholder='P A S S W O R D' id='password' required ref={passwordInputRef} />
                  </div>
                  <div className={classes.login_btn}>
                    {!state.isLoading && (
                      <AnimatedButton text={'login'} />
                    )}
                    {state.isLoading && <p>Sending request...</p>}
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