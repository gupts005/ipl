import React from 'react';
import { Carousel } from 'react-bootstrap';
import { allteams, chennaiWin, trophy } from '../../common/constants/data';
import './carousel.scss';

const CarouselContainer = () => {
  return (
    <Carousel fade={true} pause={false}>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={chennaiWin}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Kings of IPL 2021</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={allteams}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>All teams in this Season</h3>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={trophy}
          alt="Third slide"
        />
        <Carousel.Caption>
          {/* <h3>Third slide label</h3> */}
          {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default CarouselContainer;