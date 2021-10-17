import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

export const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputForm: {
    width: '100%',
    marginTop: 20,
  },
  btnContainerRegister: {
    marginTop: '10%',
    width: '95%',
  },
  btnLogin: {
    backgroundColor: colors.GENERAL,
    marginBottom: 15,
  },
  iconInput: {
    color: colors.GENERAL,
  },
  iconShowPass: {
    color: 'grey',
  },
  iconHidden: {
    display: 'none',
  },
});
