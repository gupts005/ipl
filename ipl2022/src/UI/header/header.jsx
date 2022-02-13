import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../API/auth-context';
import CustomizedMenus from '../common/components/CustomMenu';
import { HeaderData } from '../common/constants/data';
import Notification from '../notification/notification';
import classes from './header.module.scss';

const Header = (props) => {

  const notification = useSelector((state) => state.notification.notification);
  const userData = JSON.parse(localStorage.getItem('loginState'));
  const role = userData?.role;

  const [state, setState] = React.useState({
    selectedIndex: null,
    clicked: false
  });

  const navigate = useNavigate();

  const setSelected = (item) => {
    setState({
      selectedIndex: item.id,
      clicked: true
    });
    navigate(`${item.url}`);
  };

  const setHomeSelected = (id) => {
    setState({
      selectedIndex: id,
      clicked: true
    });
    navigate('/home');
  };

  return (
    <React.Fragment>
      <div className={classes.topbar + ' ' + (props.menuOpen && classes.active)}>
        <div className={classes.wrapper}>
          <div className={classes.left}>
            <div className={classes.left_inner_left}>
              <h4
                onClick={() => setHomeSelected('99')}
                className={state.clicked === true && state.selectedIndex === '99' ? classes.selected : ''}>
                Home
              </h4>
            </div>
            <div className={classes.left_inner_right}>
              {HeaderData.map((item) => (
                <span
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={state.clicked === true && state.selectedIndex === item.id ? classes.selected : ''}>
                  {item.title}
                </span>
              ))}
            </div>
            <div></div>
          </div>
          <div className={classes.right}>
            <div className={classes.dropdown}>
              {role === 'Admin' && <CustomizedMenus />}
            </div>
            <div className={classes.hamburger} onClick={() => { props.setMenuOpen(!props.menuOpen) }}>
              <span className={classes.line1}></span>
              <span className={classes.line2}></span>
              <span className={classes.line3}></span>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Header;