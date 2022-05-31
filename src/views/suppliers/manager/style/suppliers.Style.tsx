import {StyleSheet} from 'react-native';
import {setPadding, setMargin, COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
export const SuppliersStyle = StyleSheet.create({
  contentStyle: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, 0, 0)
  },
  myLoading: {...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  BtnEmpty: {...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)},
  itemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.BG.GRAY
  },
  myTextTop: {
    justifyContent: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  ctnSoLuong: {
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  myViewSearch: {
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10),
    flexDirection: 'row',
    flex: 1
  },
  myViewInput: {
    flex: 1
  },
  myInput: {borderColor: 'black', borderWidth: 1},
  myViewButton: {...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)},
  myButtonText: {paddingHorizontal: 16},
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  container2: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  myViewTop: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  myviewIcon: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10)
  },
  myviewIcon2: {
    flex: 1,
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10)
  },
  myText: {
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    fontSize: MY_SIZE.s_14
  },
  myButton: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_6, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  myTextone: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_0),
    fontSize: MY_SIZE.s_14
  },
  myClose: {
    ...setPadding(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  myButtonCustomer: {
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  ContainerView: {...setMargin(MY_SIZE.s_0, MY_SIZE.s_10, MY_SIZE.s_8, MY_SIZE.s_8)},
  sortModal: {
    zIndex: 999,
    position: 'absolute',
    backgroundColor: COLOR.BG.BLACK_30,
    top: 50,
    right: 0,
    flex: 1,
    width: '100%',
    height: '100%'
  },
  modalItem: {
    borderWidth: 0.5,
    borderColor: COLOR.BG.BLACK_10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: COLOR.BG.WHITE,
    width: Utilities.getWidthScreen() / 2,
    position: 'absolute',
    right: 0,
    top: 0
  },
  modalDateView: {
    backgroundColor: COLOR.BG.WHITE,
    flex: 1
  },
  textSort: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    textAlign: 'left',
    width: '100%',
    fontSize: MY_SIZE.s_16
  },
  textTitleSort: {
    fontSize: MY_SIZE.s_20
  },
  textModal: {
    marginHorizontal: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  tittleModal: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.BG.SECONDARY
  },
  parentModal: {height: 150, width: '100%', backgroundColor: 'transparent'},

  /** styles ADD Supplier */
  containerADD: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    flexDirection: 'row',
    alignContent: 'center'
  },
  inputNameADD: {
    borderColor: COLOR.BG.BLACK_30,
    borderBottomWidth: 1
  },
  textInfoADD: {
    fontSize: MY_SIZE.s_16,
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  containerChildADD: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLOR.BG.BLACK_30,
    borderBottomWidth: 1
  },
  viewAvatarAdd: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_4),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLOR.BG.BLACK_30,
    borderBottomWidth: 1,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  viewInputPhoneAdd: {
    flex: 1.5,
    // borderBottomColor: COLOR.BG.BLACK,
    // borderBottomWidth: 1,
    height: 48,
    justifyContent: 'center'
  },
  inputNoteAdd: {
    borderBottomColor: COLOR.BG.BLACK_30,
    borderBottomWidth: 1,
    ...setMargin(MY_SIZE.s_24, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textPhoneAdd: {
    flex: 1
  },
  viewBirthdayAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'flex-end'
  },
  contentBirthDay: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  btnImageAdd: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16)
  },

  myViewBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.BLACK_TOOLBAR
  },
  viewTitleBottom: {
    backgroundColor: COLOR.BG.BLACK_TOOLBAR,
    justifyContent: 'center'
  },
  titleBottom: {
    color: COLOR.TEXT.WHITE
  },
  viewInput: {
    flex: 1.5,
    height: 48,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
