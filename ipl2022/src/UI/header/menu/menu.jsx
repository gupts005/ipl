import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { HeaderData } from '../../common/constants/data';
import AuthContext from '../../store/auth-context';
import classes from "./menu.module.scss";

const Menu = (props) => {
  const history = useNavigate();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    history('/');
  };

  return (
    <div className={classes.menu +' ' + (props.menuOpen && classes.active)}>
      {HeaderData.map((item) => (
        <ul key={item.id}>
          <li onClick={() => props.setMenuOpen(false)}>
            <a href="#intro"> {item.title} </a>
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
