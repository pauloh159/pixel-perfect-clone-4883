import React from 'react';

export const ComposableMap = ({ children, ...props }) => <div {...props}>{children}</div>;
export const Geographies = ({ children, ...props }) => <div {...props}>{children}</div>;
export const Geography = (props) => <div {...props} />;