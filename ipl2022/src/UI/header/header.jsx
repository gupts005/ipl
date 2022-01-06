import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderData } from '../common/constants/data';
import './header.scss';

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
    <div className={'topbar ' + (props.menuOpen && 'active')}>
      <div className="wrapper">
        <div className="left">
          <div className='left_inner_left'>
            <h3 
              onClick={()=>setHomeSelected('99')}
              className={state.clicked === true && state.selectedIndex === '99' ? 'selected' : ''}>
              Home
            </h3>
          </div>
          <div className='left_inner_right'>
            {HeaderData.map((item) => (
              <span 
                key={item.id}
                onClick={()=>setSelected(item)}
                className={state.clicked === true && state.selectedIndex === item.id ? 'selected' : ''}>                 
                  {item.title}
              </span>
            ))}
          </div>
          <div></div>
        </div>
        <div className="right">
          <div className="hamburger" onClick={() => { props.setMenuOpen(!props.menuOpen) }}>
            <span className="line1"></span>
            <span className="line2"></span>
            <span className="line3"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;