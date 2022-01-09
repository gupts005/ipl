import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderData } from '../common/constants/data';
import classes from './header.module.scss';

const Header = (props) => {

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
    <div className={classes.topbar+' ' + (props.menuOpen && classes.active)}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <div className={classes.left_inner_left}>
            <h3 
              onClick={()=>setHomeSelected('99')}
              className={state.clicked === true && state.selectedIndex === '99' ? classes.selected : ''}>
              Home
            </h3>
          </div>
          <div className={classes.left_inner_right}>
            {HeaderData.map((item) => (
              <span 
                key={item.id}
                onClick={()=>setSelected(item)}
                className={state.clicked === true && state.selectedIndex === item.id ? classes.selected : ''}>                 
                  {item.title}
              </span>
            ))}
          </div>
          <div></div>
        </div>
        <div className={classes.right}>
          <div className={classes.hamburger} onClick={() => { props.setMenuOpen(!props.menuOpen) }}>
            <span className={classes.line1}></span>
            <span className={classes.line2}></span>
            <span className={classes.line3}></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;