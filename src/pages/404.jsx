import React from 'react';
import Container from '../components/container';
import SEO from '../components/seo';
import NotFound from '../images/404.svg';

const NotFoundPage = () => (
  <Container defKey="2">
    <SEO title="404: Not found" />

    <img className="mainImg notFoundImg" src={`${NotFound}`} alt="handshake" height="230px" />
    <h1 style={{ textAlign: 'center' }}>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Container>
);

export default NotFoundPage;
