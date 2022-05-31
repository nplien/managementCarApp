import {StyleSheet} from 'react-native';
import {FONT_FAMILY} from 'bases/styles/Core';

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
  },
  btnUpdateNow: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
    borderRadius: 16
  },
  btnCancel: {flex: 1, borderWidth: 1, borderColor: 'silver', borderRadius: 16},
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  btnTextCancel: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  space: {
    width: 8
  }
});
