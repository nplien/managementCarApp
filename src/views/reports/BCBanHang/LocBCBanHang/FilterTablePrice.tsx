import React, {Component} from 'react';
import {MyView, MyText, MyButton, MyIcon} from 'bases/components';
import {FilterBCBanHangStyles} from '../styles/BCBanHang.Styles';
import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IBCBanHangState, checkTablePrice} from '../redux';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IBCBanHangState {
  checkTablePrice: typeof checkTablePrice;
}

class FilterTablePrice extends Component<IProps> {
  render() {
    const {arrTablePrice} = this.props;
    return (
      <MyView
        style={{
          ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
        }}>
        <MyButton
          transparent
          style={[FilterBCBanHangStyles.myViewDM]}
          onPress={() => {
            MyNavigator.pushModal('ModalListPrice');
          }}>
          <MyView style={FilterBCBanHangStyles.myContentViewDM} transparent>
            {arrTablePrice && arrTablePrice.length > 0 ? (
              arrTablePrice.map((value, index) => {
                return (
                  <MyButton
                    key={index}
                    onPress={() => {
                      this.props.checkTablePrice(value);
                    }}
                    style={[
                      FilterBCBanHangStyles.myButtonCreator,
                      {backgroundColor: COLOR.TEXT.BLUE}
                    ]}>
                    <MyText
                      myFontStyle="Regular"
                      style={[FilterBCBanHangStyles.myTextSize, {color: COLOR.TEXT.WHITE}]}>
                      {value.name}
                    </MyText>
                  </MyButton>
                );
              })
            ) : (
              <MyView
                style={[
                  FilterBCBanHangStyles.myButtonCreator,
                  {backgroundColor: COLOR.TEXT.WHITE}
                ]}>
                <MyText myFontStyle="Regular" style={FilterBCBanHangStyles.myTextSize}>
                  Bảng giá
                </MyText>
              </MyView>
            )}
          </MyView>
          <MyIcon
            style={FilterBCBanHangStyles.myIconDM}
            iconFontType="AntDesign"
            name={'right'}
            size={24}
          />
        </MyButton>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrTablePrice} = state.BCBanHangReducer;
  return {arrTablePrice};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({checkTablePrice}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterTablePrice);
