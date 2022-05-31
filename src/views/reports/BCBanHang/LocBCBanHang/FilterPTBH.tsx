import React, {Component} from 'react';
import {MyView, MyButton, MyText, MyIcon} from 'bases/components';
import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {checkSalesMethods, IBCBanHangState} from '../redux';
import {FilterBCBanHangStyles} from '../styles/BCBanHang.Styles';
import {ARR_PT_BAN_HANG} from 'configs/FilterConfig';

interface IProps extends IBCBanHangState {
  checkSalesMethods: typeof checkSalesMethods;
}
class FilterPTBH extends Component<IProps> {
  render() {
    const {methodSale} = this.props;
    return (
      <MyView style={{...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)}}>
        {ARR_PT_BAN_HANG.map((value, index) => {
          return (
            <MyButton
              transparent
              key={index.toString()}
              onPress={() => {
                this.props.checkSalesMethods(value);
              }}
              style={FilterBCBanHangStyles.viewCheckbox}>
              <MyIcon
                iconFontType="MaterialIcons"
                name={
                  methodSale && methodSale?.id === value.id
                    ? 'radio-button-checked'
                    : 'radio-button-unchecked'
                }
                size={24}
                color={COLOR.TEXT.POSITIVE_BTN}
              />
              <MyText style={{marginLeft: MY_SIZE.s_8}}>{value.name}</MyText>
            </MyButton>
          );
        })}
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {methodSale} = state.BCBanHangReducer;
  return {methodSale};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      checkSalesMethods
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPTBH);
