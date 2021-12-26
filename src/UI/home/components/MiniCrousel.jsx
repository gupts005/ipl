import React from "react";
import RBCarousel from "react-bootstrap-carousel";
import { Row, Col } from "./bootstrap-component.jsx";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import './carousel.scss';

const MiniCarousel = (props) => {

  return (
    <React.Fragment>

      <div className="parent">
        <Row>
          <Col span={12}>
            <RBCarousel className="carousel-fade" version={4}>
              <div style={{ width: '100%', height: 500, backgroundColor: "darkcyan" }}>
                <div className="carousel-center">
                  This carsouel transition is fade
                </div>
                <div className="carousel-caption">Text</div>
              </div>
              <div style={{ width: '100%', height: 500, backgroundColor: "yellowgreen" }}>
                <span className="carousel-center">
                  This carsouel transition is fade
                </span>
                <div className="carousel-caption">Text</div>
              </div>
            </RBCarousel>
          </Col>
        </Row>
      </div>

    </React.Fragment>
  );
};

export default MiniCarousel;