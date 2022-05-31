import * as React from 'react';
import {StyleSheet} from 'react-native';
import {MyButton, MyText} from 'bases/components';
import Utilities from 'utils/Utilities';
import {COLOR, MY_SIZE} from 'bases/styles/Core';
import {ISumBCBHModel} from 'models/DashBoard.Model';
import {BC_SORT_DTT, BC_SORT_DTT_TITLE} from 'common/Constants';
import MyNavigator from 'utils/MyNavigator';
import {IPropsButtonSheet} from 'views/app';

export type TittleDTT = {
  title?: string;
};

interface IProps {
  sum?: ISumBCBHModel;
  chooseDTT: (value: TittleDTT) => void;
  sortDTT: TittleDTT;
}

interface IState {}

export default class SortDoanhThuThuan extends React.Component<IProps, IState> {
  render() {
    const {sum, sortDTT} = this.props;
    let arrSortBy: IPropsButtonSheet[] = [];
    let totalValue: any = '';
    if (sortDTT) {
      for (let index = 0; index < BC_SORT_DTT.length; index++) {
        const element = BC_SORT_DTT[index];
        arrSortBy.push({
          title: element.title,
          onPress: () => {
            MyNavigator.goBack();
            this.props.chooseDTT(element);
          },
          isActive: element.title === sortDTT?.title
        });
      }
      switch (sortDTT.title) {
        case BC_SORT_DTT_TITLE.DOANH_THU_THUAN:
          totalValue = Utilities.convertCount(sum?.total_value_5 || 0); //doanh thu thuan
          break;
        case BC_SORT_DTT_TITLE.GIA_TRI_TRA:
          totalValue = '-' + Utilities.convertCount(sum?.total_value_4 || 0); //gia tri tra
          break;
        case BC_SORT_DTT_TITLE.DOANH_THU:
          totalValue = Utilities.convertCount(sum?.total_value_2 || 0); //doanh thu
          break;

        default:
          break;
      }
    }

    return (
      <MyButton
        onPress={() => {
          MyNavigator.pushModal('MyBottomSheetPicker', {
            arrayButton: arrSortBy,
            titleButtonCancel: 'Huỷ bỏ'
          });
        }}
        style={styles.myViewTop}
        transparent>
        <MyText>{sortDTT.title || ''}: </MyText>
        <MyText style={{color: COLOR.TEXT.BLUE}}>{totalValue}</MyText>
      </MyButton>
    );
  }
}
const styles = StyleSheet.create({
  myViewTop: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: MY_SIZE.s_16
  }
});
