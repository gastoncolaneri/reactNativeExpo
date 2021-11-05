import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
export const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    padding: 20,
  },
  viewForm: {},
  input: {},
  textArea: {
    height: 100,
    width: '100%',
    padding: 0,
    margin: 0,
  },
  btnAddRestaurant: {
    backgroundColor: colors.GENERAL,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  viewImages: {
    flexDirection: 'row',
    marginHorizontal: 10,
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
  mainImg: {
    alignItems: 'center',
    height: 200,
    marginBottom: 20,
  },
  viewMainImg: {
    width: '100%',
    height: 200,
  },
  mapStyle: {
    width: '100%',
    height: 550,
  },
  viewMapBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  viewBtnSave: { paddingRight: 5 },
  btnSave: { backgroundColor: colors.GENERAL },
  viewBtnCancel: { paddingLeft: 5 },
  btnCancel: { backgroundColor: colors.RED },
});
