import './header.scss';

const Header = (props) => {
  return (
    <div className={'topbar '+ (props.menuOpen && 'active')}>
      <div className="wrapper">
        <div className="left">
          <a href="#match_list" className='logo'>Match</a>
          <div className='itemContainer'>
          <i className="fa fa-user icon"></i>
            <span>9033481597</span>
          </div>
          <div className='itemContainer'>
          <i className="fa fa-user icon"></i>
            <span>suraj@something.com</span>
          </div>
        </div>
        <div className="right">
          <div className="hamburger" onClick={()=>{props.setMenuOpen(!props.menuOpen)}}>
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
