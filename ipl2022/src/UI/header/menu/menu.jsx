import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderData } from '../../common/constants/data';
import AuthContext from '../../store/auth-context';
import classes from "./menu.module.scss";

const Menu = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const navigationHandler = (item) => {
    navigate(`${item.url}`);
  };

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/');
  };

  return (
    <div className={classes.menu +' ' + (props.menuOpen && classes.active)}>
      {HeaderData.map((item) => (
        <ul key={item.id}>
          <li onClick={() => props.setMenuOpen(false)}>
            <a onClick={()=>navigationHandler(item)}> {item.title} </a>
          </li>
        </ul>
      ))}
      <ul>
        <li>
          <a onClick={logoutHandler}>Logout</a>
        </li>
      </ul>
    </div>
  )
}

export default Menu;