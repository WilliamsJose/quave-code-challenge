import React from 'react';

export const Conteiner = ({ children, ...styles }) => (
  <div className={`mx-auto text-center max-w-2xl ${styles}`}>
    {children}
  </div>
);
