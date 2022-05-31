import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import {MyView} from 'bases/components';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IBCBanHangState} from 'views/reports/BCBanHang/redux';
import Utilities from 'utils/Utilities';
import {ListViewLoiNhuanStyles} from 'views/reports/BCBanHang/styles/BCBanHang.Styles';
import {ID_VIEW_LOI_NHUAN, VIEW_LOI_NHUAN} from 'common/Constants';

interface IProps extends IBCBanHangState {}
class ListViewLoiNhuan extends PureComponent<IProps> {
  render() {
    const {tongDoanhThu, tongLoiNhuan, tongGiaVon} = this.props;
    return (
      <MyView style={ListViewLoiNhuanStyles.container}>
        {VIEW_LOI_NHUAN.map(x => {
          let price = 0;
          if (x.id === ID_VIEW_LOI_NHUAN.PROFIT) {
            price = tongLoiNhuan || 0;
          } else if (x.id === ID_VIEW_LOI_NHUAN.REVENUE) {
            price = tongDoanhThu || 0;
          } else {
            price = tongGiaVon || 0;
          }

          return (
            <MyView
              key={x.id}
              style={[
                ListViewLoiNhuanStyles.viewContent,
                {
                  backgroundColor: x.color
                }
              ]}>
              <Text style={ListViewLoiNhuanStyles.textTitle}>{x.name}</Text>
              <Text style={ListViewLoiNhuanStyles.textValue}>{Utilities.convertCount(price)}</Text>
            </MyView>
          );
        })}
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {tongDoanhThu, tongLoiNhuan, tongGiaVon} = state.BCBanHangReducer;
  return {
    tongDoanhThu,
    tongLoiNhuan,
    tongGiaVon
  };
};
export default connect(mapStateToProps, null)(ListViewLoiNhuan);
