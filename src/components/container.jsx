import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const { Content } = Layout;

const Container = ({ children }) => (
  <Layout>
    <Content
      style={{
        padding: '24px 50px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: '1220px', margin: '0 auto' }}>{children}</div>
    </Content>
  </Layout>
);
Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
