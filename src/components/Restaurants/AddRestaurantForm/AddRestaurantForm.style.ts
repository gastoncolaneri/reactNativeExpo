import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
export const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    padding: 10,
  },
  viewForm: {
    marginHorizontal: 10,
  },
  input: {},
  textArea: {
    height: 100,
    width: '100%',
    padding: 0,
    margin: 0,
  },
  btnAddRestaurant: {
    backgroundColor: colors.GENERAL,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  viewImages: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  containerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 70,
    height: 70,
    backgroundColor: colors.BACKGROUND,
  },
  minImg: {
    marginRight: 10,
    width: 70,
    height: 70,
  },
});
