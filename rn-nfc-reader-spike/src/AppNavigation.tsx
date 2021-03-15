import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Foo from './containers/Foo';
import HelloWorld from './containers/HelloWorld';

export type StackParamList = {
  HelloWorld: undefined;
  Foo: { code: string | undefined };
};

const Stack = createStackNavigator<StackParamList>();

type AppNavigationProps = {
  initialRouteName: 'HelloWorld' | 'Foo';
};

const AppNavigation: React.FC<AppNavigationProps> = ({ initialRouteName }) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="HelloWorld"
        options={{ title: 'hello world!!' }}
        component={HelloWorld}
      />
      <Stack.Screen
        name="Foo"
        options={{ title: 'foooooooooo!' }}
        component={Foo}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
