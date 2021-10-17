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
  btnRegister: {
    backgroundColor: colors.GENERAL,
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
