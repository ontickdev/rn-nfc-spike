import { Text } from 'react-native';

import React from 'react';
import styles from '../CommonStyles';

const HelloWorld: React.FC = () => {
  return (
    <>
      <Text style={styles.header}>Hello World :o)</Text>
    </>
  );
};

export default HelloWorld;
