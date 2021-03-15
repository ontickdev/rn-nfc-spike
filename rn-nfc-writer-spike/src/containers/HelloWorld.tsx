import { Alert, Button, Text } from 'react-native';

import React from 'react';
import styles from '../CommonStyles';
import NfcProxy from '../NfcProxy';

const HelloWorld: React.FC = () => {
  const writeMime = async () => {
    let result = await NfcProxy.writeNdefMime();
    Alert.alert(result ? 'Success' : 'Fail to write NDEF');
  };

  const writeText = async () => {
    let result = await NfcProxy.writeNdef({
      type: 'URI',
      //value: 'ontick://auth/sign-in/123',
      value: 'https://this-is-my-test-123456.com/sign-in/123',
    });
    Alert.alert(result ? 'Success' : 'Fail to write NDEF');
  };

  const writeUrl = async () => {
    let result = await NfcProxy.writeNdef({
      type: 'URI',
      //value: 'ontick://auth/sign-in/123',
      value: 'http://bribepay.co.uk/nfc-test/123',
    });
    Alert.alert(result ? 'Success' : 'Fail to write NDEF');
  };

  return (
    <>
      <Text style={styles.header}>Welcome to Ontick :o)</Text>
      {/* <Button title="write mime" onPress={writeMime} />
      <Button title="write text" onPress={writeText} /> */}
       <Button title="write url" onPress={writeUrl} /> 
    </>
  );
};

export default HelloWorld;
