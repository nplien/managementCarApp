import {StyleSheet} from 'react-native';
import {setPadding, COLOR, setMargin, setRadius, MY_SIZE} from 'bases/styles/Core';
export const CreateExportStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  loading: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  myViewTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.SECONDARY
  },
  myviewIcon: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewTextHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.TEXT.PRIMARY
  },
  txtSearch: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)
  }
});
export const HeaderBrachStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.WHITE
  },
  txtSearch: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)
  },
  btnCustomer: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16),
    flex: 1
  },
  btnPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_6, MY_SIZE.s_6, MY_SIZE.s_16, MY_SIZE.s_8),
    flex: 1,
    justifyContent: 'flex-end'
  }
});
export const BottomViewStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.BLACK_10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  myViewBottom: {
    backgroundColor: COLOR.BG.BLACK_10,
    justifyContent: 'space-between',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  txtCount: {
    borderRadius: 4,
    borderWidth: 1,
    ...setPadding(MY_SIZE.s_2, MY_SIZE.s_2, MY_SIZE.s_6, MY_SIZE.s_6),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12),
    fontSize: MY_SIZE.s_12
  },
  btnBottomView: {
    backgroundColor: COLOR.TEXT.GREEN,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemTouch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  txtSearch: {
    fontSize: MY_SIZE.s_16,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)
  },
  containerGioHang: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_0, MY_SIZE.s_16),
    justifyContent: 'flex-end'
  },
  priceGioHang: {
    fontSize: MY_SIZE.s_16,
    color: COLOR.TEXT.GREEN
  },
  viewBtnBottom: {
    flexDirection: 'row'
  },
  bottomView: {
    backgroundColor: COLOR.TEXT.GREEN,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
export const itemCreateExportStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  image: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    width: MY_SIZE.s_40,
    height: MY_SIZE.s_40
  },
  infoProdCenter: {
    flex: 2,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_10, MY_SIZE.s_0)
  },
  textNameCenter: {
    textAlign: 'left',
    fontSize: MY_SIZE.s_16
  },
  textIDCenter: {
    textAlign: 'left',
    fontSize: MY_SIZE.s_12,
    color: COLOR.TEXT.GREEN,
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  infoProdRight: {
    flex: 1
  },
  textPriceRight: {
    textAlign: 'right',
    ...setMargin(MY_SIZE.s_2, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8)
  },
  textStockRight: {
    textAlign: 'right',
    fontSize: MY_SIZE.s_12,
    color: COLOR.TEXT.GREEN,
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  btnCountItem: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_10, MY_SIZE.s_10)
  },
  inputSoluong: {
    width: MY_SIZE.s_64,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLOR.TEXT.SECONDARY,
    height: MY_SIZE.s_30
  },
  icon: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16)
  },
  bgTranparent: {
    backgroundColor: 'transparent'
  },
  textPriceLeft: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16),
    fontSize: MY_SIZE.s_16
  },
  viewBot: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewBotPrice: {
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    alignItems: 'center'
  },
  textX: {
    color: COLOR.TEXT.BLUE,
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end'
  }
});
export const InfoPhieuChuyenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  containerChildADD: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLOR.BG.BLACK_30,
    borderBottomWidth: 1
  },
  textPhoneAdd: {
    flex: 1
  },
  viewInputPhoneAdd: {
    flex: 2,
    height: 48,
    justifyContent: 'center'
  },
  bottomView: {
    borderBottomColor: COLOR.BG.BLACK,
    borderBottomWidth: 1
  },
  inputNoteAdd: {
    borderBottomColor: COLOR.BG.BLACK_30,
    borderBottomWidth: 1,
    ...setMargin(MY_SIZE.s_24, MY_SIZE.s_16, MY_SIZE.s_14, MY_SIZE.s_14)
  },
  myText: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8)
  }
});
