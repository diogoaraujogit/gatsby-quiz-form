import React from 'react';
import { Col } from 'antd';
import { useSpring, animated } from 'react-spring';
import Img from '../../images/human.svg';

const LeftBanner = () => {
  const props = useSpring({
    opacity: 1, delay: 300, transform: 'translateX(0)', from: { opacity: 0, transform: 'translateX(-800px)' },
  });
  return (
    <Col xs={24} sm={24} md={24} lg={12}>
      <animated.div style={props}>
        <img className="mainImg" src={`${Img}`} alt="contact img" height="320" />
      </animated.div>
    </Col>
  );
};

export default LeftBanner;
