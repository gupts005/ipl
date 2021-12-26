import { HeaderData } from "../../common/constants";
import "./menu.scss";

const Menu = (props) => {
  return (
    <div className={"menu " + (props.menuOpen && "active")}>
      {HeaderData.map((item) => (
        <ul key={item.id}>
          <li onClick={() => props.setMenuOpen(false)}>
            <a href="#intro"> {item.title} </a>
          </li>
        </ul>
      ))}
    </div>
  )
}

export default Menu;
