import React from 'react';
import CarouselContainer from './components/CarouselContainer';
import './home.scss';

const Home = (props) => {

  return (

    <React.Fragment>

      <div className='home'>

        <div className='sections'>
          <CarouselContainer />
        </div>

      </div>

    </React.Fragment>

  );
}

export default Home;