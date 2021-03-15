import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import AppContextProvider from './AppContext';
import AppNavigation from './AppNavigation';
import styles from './CommonStyles';
import NfcPromptAndroid from './components/NfcPromptAndroid';
import { navigationRef } from './NavigationRef';

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3985cb',
  },
  fonts: {
    ...DefaultTheme.fonts,
    superLight: { ...DefaultTheme.fonts.light },
  },
  userDefinedThemeProperty: '',
  animation: {
    ...DefaultTheme.animation,
    customProperty: 1,
  },
};

// const linking = {
//   prefixes: ['ontick://', 'https://bribepay.co.uk'],
//   config: {
//     screens: {
//       Foo: 'auth/sign-in/:code',
//       Foo2: 'nfc-test'
//     },
//   },
// };

const linking = {
  prefixes: ['https://bribepay.co.uk'],
  config: {
    screens: {
      //Foo: 'auth/sign-in/:code',
      Foo2: 'nfc-test/:code'
    },
  },
};

const App: React.FC = () => {
  const [showNfcPrompt, setShowNfcPrompt] = useState(false);

  return (
    <AppContextProvider
      showNfcPrompt={showNfcPrompt}
      setShowNfcPrompt={setShowNfcPrompt}>
      <PaperProvider theme={CustomDefaultTheme}>
        <NavigationContainer
          linking={linking}
          fallback={<Text>Navigation Container Loading...</Text>}
          ref={navigationRef}>
          <AppNavigation initialRouteName={'HelloWorld'} />
        </NavigationContainer>
        <NfcPromptAndroid />
      </PaperProvider>
    </AppContextProvider>
  );
};

export default App;
