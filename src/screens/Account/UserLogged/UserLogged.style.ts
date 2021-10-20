import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
export const styles = StyleSheet.create({
  userContainer: {
    minHeight: '100%',
    backgroundColor: colors.BACKGROUND,
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: colors.GENERAL,
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
