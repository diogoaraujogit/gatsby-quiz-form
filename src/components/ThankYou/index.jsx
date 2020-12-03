import React from 'react';
import { Col } from 'antd';
import { useSpring, animated } from 'react-spring';
import HandShake from '../../images/handshake.svg';

const ThankYou = () => {
  const props = useSpring({
    opacity: 1, delay: 600, transform: 'translateX(0)', from: { opacity: 0, transform: 'translateY(-400px)' },
  });
  return (
    <animated.div style={props}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <img className="mainImg" src={`${HandShake}`} alt="handshake" height="230px" />
        <div className="thankyouText">
          <h2>Thank you!!</h2>
        </div>
      </Col>
    </animated.div>
  );
};

export default ThankYou;
