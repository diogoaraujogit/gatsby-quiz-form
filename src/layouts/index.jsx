import React from 'react';
import { ContextProviderComponent } from '../../context';

export default ({ children }) => (
  <ContextProviderComponent>
    <>
      {children}
    </>
  </ContextProviderComponent>
);
