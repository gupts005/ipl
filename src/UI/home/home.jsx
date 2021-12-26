import React from 'react';
import Header from '../header/header';
import Menu from '../header/menu/menu';
import CarouselContainer from './components/CarouselContainer';
import './home.scss';

const Home = (props) => {

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (

    <React.Fragment>

      <div className='home' id='home'>

        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <div className='sections'>
          <CarouselContainer />
        </div>

      </div>

    </React.Fragment>

  );
}

export default Home;