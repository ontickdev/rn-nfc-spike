import { Alert, Text } from 'react-native';

import React from 'react';
import styles from '../CommonStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../AppNavigation';
import { RouteProp } from '@react-navigation/native';

type SignInNavigationProp = StackNavigationProp<StackParamList, 'Foo'>;

type SignInRouteProp = RouteProp<StackParamList, 'Foo'>;

type FooProps = {
  route: SignInRouteProp;
  navigation: SignInNavigationProp;
};

const Foo: React.FC<FooProps> = ({ route }) => {
  const { code } = route.params;
  Alert.alert(code ?? 'undef');

  return (
    <>
      <Text style={styles.header}>Reader</Text>
    </>
  );
};

export default Foo;
