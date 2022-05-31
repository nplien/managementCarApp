import * as React from 'react';
import {connect} from 'react-redux';
import {MyView, MyText, MyButton, MyTextPriceMask} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {BottomViewStyle} from '../styles/createExport.styles';
import {RootState} from 'views/app/redux/App.Reducer';
import {ICreateExportState, setClearValue} from '../redux';
import {WareHouseApi} from 'services/WareHouse.Api';
import {IChooseStoreState} from 'views/menuLeft/redux';
import Utilities from 'utils/Utilities';
import {bindActionCreators} from 'redux';
import {getListExportOrder, setOnRefreshExport} from '../../manager/redux';
import MyNavigator from 'utils/MyNavigator';
interface IProps extends ICreateExportState, IChooseStoreState {
  setClearValue: typeof setClearValue;
  getListExportOrder: typeof getListExportOrder;
  setOnRefreshExport: typeof setOnRefreshExport;
}

class BottomView extends React.Component<IProps, any> {
  postChuyenhang = async () => {
    const {objBranch, arrExport, totalCount, totalPrice, cuaHangDangChon, notePhieuChuyen} =
      this.props;
    try {
      if (objBranch && objBranch.id) {
        const response = await WareHouseApi.postListExport({
          type: 1,
          note: notePhieuChuyen,
          source: cuaHangDangChon,
          store: objBranch,
          products: arrExport,
          total_price: totalPrice,
          total_product: totalCount
        });
        if (response && response.code === 0) {
          Utilities.showToast(response.message, '', 'success');
          this.props.setOnRefreshExport(true);
          this.props.getListExportOrder();
          this.props.setClearValue();
          MyNavigator.goBack();
        } else {
          Utilities.showToast(response.message, '', 'warning');
        }
      } else {
        Utilities.showToast('Chưa chọn chi nhánh chuyển tới', '', 'warning');
      }
    } catch (error) {
      Utilities.showToast('Tải lên nội dung thất bại!', '', 'warning');
    }
  };
  render() {
    const {totalCount, totalPrice, arrExport} = this.props;
    return (
      <>
        <MyView style={[BottomViewStyle.container, BottomViewStyle.myViewBottom]}>
          <MyText>{arrExport.length} mặt hàng</MyText>
          <MyView transparent style={BottomViewStyle.container}>
            <MyTextPriceMask
              hideCurrency
              text={totalCount || '0'}
              style={BottomViewStyle.txtCount}
            />
            <MyTextPriceMask
              text={totalPrice || '0'}
              numberOfLines={1}
              myFontStyle="Regular"
              style={{color: COLOR.TEXT.GREEN}}
            />
          </MyView>
        </MyView>
        <MyButton
          style={BottomViewStyle.btnBottomView}
          onPress={() => {
            this.postChuyenhang();
          }}>
          <MyText style={{color: COLOR.TEXT.WHITE}}>Chuyển hàng</MyText>
        </MyButton>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {totalCount, totalPrice, arrExport, objBranch, notePhieuChuyen} = state.CreateExportReducer;
  const {cuaHangDangChon} = state.ChooseStoreReducer;
  return {totalCount, totalPrice, arrExport, objBranch, cuaHangDangChon, notePhieuChuyen};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setClearValue, getListExportOrder, setOnRefreshExport}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomView);
