import React from 'react';
import { Button, ButtonProps } from '@ui-kitten/components';

export const AccentButton = (props: ButtonProps) => (
  <Button {...props} style={[props.style, { backgroundColor: '#4ba738' }]} />
);
