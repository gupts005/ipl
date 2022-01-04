import React from 'react';
import { HeaderData } from '../common/constants/data';
import './header.scss';

const Header = (props) => {

  const [state, setState] = React.useState({
    selectedIndex: null,
    clicked: false
  });

  const setSelected = (id) => {
    setState({
      selectedIndex: id,
      clicked: true
    });
  };
  
  const setHomeSelected = () => {
    setState({
      selectedIndex: null,
      clicked: false
    });
  };

  return (
    <div className={'topbar ' + (props.menuOpen && 'active')}>
      <div className="wrapper">
        <div className="left">
          <div className='left_inner_left'>
            <h3 
              onClick={()=>setHomeSelected()}
              className={state.clicked === false? 'selected' : ''}>
              Home
            </h3>
          </div>
          <div className='left_inner_right'>
            {HeaderData.map((item) => (
              <span 
                key={item.id}
                onClick={()=>setSelected(item.id)}
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