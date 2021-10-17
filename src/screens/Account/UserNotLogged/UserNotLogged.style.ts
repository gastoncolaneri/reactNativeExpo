import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    marginVertical: '5%',
  },
  viewBody: {
    marginHorizontal: '10%',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 15,
  },
  viewButton: {
    flex: 1,
    alignItems: 'center',
  },
  containerButton: {
    width: '50%',
  },
  button: {
    backgroundColor: colors.GENERAL,
  },
});
