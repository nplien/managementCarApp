import {FONT_FAMILY} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    // flex: 1,
    backgroundColor: 'transparent'
    // justifyContent: 'center'
  },
  modalContent: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    paddingHorizontal: 32
  },
  viewHeader: {marginTop: 24},
  viewBody: {marginVertical: 16},
  viewFooter: {marginBottom: 24},
  txtTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: FONT_FAMILY.Bold
  },
  txt: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.Regular
  },
  txtContent: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.Regular,
    marginTop: 10
  },
  app_name: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: 18,
    textTransform: 'uppercase'
  }
});
