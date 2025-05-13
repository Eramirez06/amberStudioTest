import React from 'react';
import {Text} from 'react-native';

const Error = ({error}) => {
  return <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>;
};

export default Error;
