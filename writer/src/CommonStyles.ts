import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerMarginBottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  header: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  formContainer: {
    width: 300,
  },
  input: {
    height: 40,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 5,
    borderBottomWidth: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  error: {
    height: 17.5,
    fontSize: 10,
    color: 'red',
  },
  copy: {
    fontFamily: 'System',
    fontSize: 12,
    color: '#000',
  },
});

export default styles;
