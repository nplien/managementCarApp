import React, {Component} from 'react';
import {MyView, MyButton, MyText, MyIcon} from 'bases/components';
import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {checkSalesChannel, IBCBanHangState} from '../redux';
import {FilterBCBanHangStyles} from '../styles/BCBanHang.Styles';
import {ARR_KENH_BAN} from 'configs/FilterConfig';

interface IProps extends IBCBanHangState {
  checkSalesChannel: typeof checkSalesChannel;
}
class FilterKenhban extends Component<IProps> {
  render() {
    const {arrKenhban} = this.props;

    return (
      <MyView style={{...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)}}>
        {ARR_KENH_BAN.map((value, index) => {
          let isActive = arrKenhban && arrKenhban?.findIndex((x: any) => x.id === value.id) > -1;
          return (
            <MyButton
              transparent
              key={index.toString()}
              onPress={() => {
                this.props.checkSalesChannel(value);
              }}
              style={FilterBCBanHangStyles.viewCheckbox}>
              <MyIcon
                iconFontType="MaterialCommunityIcons"
                name={isActive ? 'checkbox-marked' : 'checkbox-blank-outline'}
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
  const {arrKenhban} = state.BCBanHangReducer;
  return {arrKenhban};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      checkSalesChannel
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterKenhban);
