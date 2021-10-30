import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
export const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  input: {},
  btnContainer: {
    width: '95%',
  },
  btn: {
    marginTop: 10,
    backgroundColor: colors.GENERAL,
  },
  iconShowPass: {
    color: 'grey',
  },
  iconHidden: {
    display: 'none',
  },
});
