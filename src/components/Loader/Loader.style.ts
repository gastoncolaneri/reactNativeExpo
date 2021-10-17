import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

export const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: '#fff',
    borderColor: colors.GENERAL,
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.GENERAL,
    textTransform: 'uppercase',
    marginTop: 10,
  },
});
