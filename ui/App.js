import React from 'react';
import { Texts } from '../infra/constants';
import { Home } from './home';

export const App = () => (
  <div>
    <h1 style={{ textAlign: 'center' }}>{Texts.HOME_TITLE}</h1>
    {/* TODO Implement routes */}
    <Home />
  </div>
);
