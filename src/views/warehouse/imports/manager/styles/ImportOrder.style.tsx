import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

export const importOrdStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  containerEmpty: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  viewContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  textSum: {
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  myTextTop: {
    justifyContent: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  textEmpty: {
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, 0, 0)
  },
  lineSepe: {
    height: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.TEXT.SECONDARY,
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  buttonReset: {
    backgroundColor: COLOR.BUTTON.RED
  },
  textReset: {
    color: COLOR.TEXT.WHITE,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_32, MY_SIZE.s_32)
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  containerList: {
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE
  }
});

export const sortImport = StyleSheet.create({
  filterDivideRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.SECONDARY
  },
  btnFilterContainer: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_5, MY_SIZE.s_5, MY_SIZE.s_12, MY_SIZE.s_12)
  }
});
export const filterDateImport = StyleSheet.create({
  filterDivideLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  textDate: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0)
  }
});
