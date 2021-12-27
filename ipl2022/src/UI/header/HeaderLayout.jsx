import React from 'react';
import Header from './header';
import Menu from './menu/menu';

const HeaderLayout = (props) => {
  
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <React.Fragment>

      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main> {props.children} </main>
    </React.Fragment>
  );
};

export default HeaderLayout;