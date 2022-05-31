import {setPadding, COLOR, setMargin, setRadius, MY_SIZE} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const addImportStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  }
});
export const ImportHeaderSearch = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.SECONDARY
  },
  txtSearch: {
    fontSize: MY_SIZE.s_14,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)
  },
  btnSearch: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  viewRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  myviewIcon: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16)
  },

  icon: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  }
});
export const supplierStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  viewLeft: {
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0),
    alignItems: 'center'
  },
  txtSupplier: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)
  },
  icon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, -MY_SIZE.s_8)
  }
});
export const listimportAdd = StyleSheet.create({
  container: {
    flex: 1
  },
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  BtnEmpty: {...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)}
});
export const bottomViewStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  myViewBottom: {
    backgroundColor: COLOR.BG.BLACK,
    justifyContent: 'space-between',
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_16, MY_SIZE.s_16),
    flex: 1
  },
  txtCount: {
    borderRadius: 4,
    borderWidth: 1,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_6, MY_SIZE.s_4),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_0),
    fontSize: 12,
    color: COLOR.TEXT.WHITE,
    borderColor: COLOR.BG.WHITE
  },
  btnBottomView: {
    backgroundColor: COLOR.TEXT.GREEN,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtValue: {
    color: COLOR.TEXT.WHITE
  },
  viewBtnBottom: {
    flexDirection: 'row'
  },
  btnBottomViewDelete: {
    backgroundColor: COLOR.TEXT.GREEN,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
export const itemAddImportStyles = StyleSheet.create({
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
export const modalImportStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_24, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  image: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    width: MY_SIZE.s_56,
    height: MY_SIZE.s_56
  },
  infoProdCenter: {
    flex: 1,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_0)
  },
  textNameCenter: {
    fontSize: MY_SIZE.s_16
  },
  viewTonKho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  viewTonKho2: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textPriceRight: {
    fontSize: MY_SIZE.s_18,
    color: COLOR.TEXT.BLUE
  },
  textStockRight: {
    textAlign: 'right',
    color: COLOR.TEXT.GREEN
  },
  viewGiamGia: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  contentViewGiamGia: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  inputSoluong: {
    borderWidth: 1,
    borderColor: COLOR.TEXT.SECONDARY,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_10, MY_SIZE.s_10),
    textAlign: 'right'
  },
  titleText: {
    flex: 1,
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  contentInput: {
    flex: 1,
    backgroundColor: 'transparent',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_12)
  },
  contentInput2: {
    flex: 1,
    backgroundColor: 'transparent',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_2, MY_SIZE.s_16)
  },
  titleText2: {
    flex: 2,
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  viewLine: {
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_12, MY_SIZE.s_12)
  }
});
