import React from 'react';
import Header from '../header/header';
import Menu from '../header/menu/menu';
import MatchList from '../match-list/match-list';
import UserProfile from '../user-profile/user-profile';
import './home.scss';

const Home = (props) => {

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (

    <React.Fragment>

      <div className='home' id='home'>

        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <div className='sections'>
          <MatchList />
          <UserProfile />
        </div>

      </div>

    </React.Fragment>

  );
}

export default Home;