import React, { useEffect } from 'react';
import CarouselContainer from './components/CarouselContainer';
import './home.scss';
import FetchingApi from '../common/components/FetchingApi';

const Home = (props) => {

  return (

    <React.Fragment>
      <FetchingApi />
      <div className='home'>

        <div className='sections'>
          <CarouselContainer />
        </div>

      </div>

    </React.Fragment>

  );
}

export default Home;