import { NavigationContainerRef } from '@react-navigation/native';
import React from 'react';

const navigationRef = React.createRef<NavigationContainerRef>();

const navigate = (name: any, params?: any) => {
  navigationRef.current?.navigate(name, params);
};

const reset = (routeName: string) => {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: routeName }],
  });
};

export { navigationRef, navigate, reset };
