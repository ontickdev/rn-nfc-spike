import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import AppContextProvider from './AppContext';
import styles from './CommonStyles';
import NfcPromptAndroid from './components/NfcPromptAndroid';
import HelloWorld from './containers/HelloWorld';

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

const App: React.FC = () => {
  const [showNfcPrompt, setShowNfcPrompt] = useState(false);

  return (
    <AppContextProvider
      showNfcPrompt={showNfcPrompt}
      setShowNfcPrompt={setShowNfcPrompt}>
      <PaperProvider theme={CustomDefaultTheme}>
        <SafeAreaView style={styles.container}>
          <HelloWorld />
        </SafeAreaView>
        <NfcPromptAndroid />
      </PaperProvider>
    </AppContextProvider>
  );
};

export default App;
