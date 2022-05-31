import * as React from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {setTypes, IFilterCustomerState} from 'views/customers/manager/redux';
import {MyView, MyButton, MyText, MyIcon} from 'bases/components';
import {FilterCustomerStyle} from '../styles/FilterCustomer.style';
import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import {ItemLineIndicator} from 'views/app/components/items';
import {LIST_TYPES} from 'common/Constants';

interface IProps extends IFilterCustomerState {
  setTypes: typeof setTypes;
}
class ViewGender extends React.Component<IProps, any> {
  render() {
    const {types} = this.props;
    return (
      <MyView
        style={{
          flex: 1,
          backgroundColor: COLOR.BG.WHITE,
          ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12)
        }}>
        <MyButton
          transparent
          style={[FilterCustomerStyle.myButton, FilterCustomerStyle.borderBottom]}
          onPress={() => {
            this.props.setTypes(null);
          }}>
          <MyText
            myFontStyle="Regular"
            style={[
              FilterCustomerStyle.myText,
              {color: !types ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY}
            ]}>
            Tất cả
          </MyText>
          {!types ? (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.BLUE} />
          ) : (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.WHITE} />
          )}
        </MyButton>
        <ItemLineIndicator />
        {LIST_TYPES.map(value => {
          return (
            <MyView key={value.code} transparent>
              <MyButton
                transparent
                key={value.code}
                style={[FilterCustomerStyle.myButton, FilterCustomerStyle.borderBottom]}
                onPress={() => {
                  this.props.setTypes(value.code);
                }}>
                <MyText
                  myFontStyle="Regular"
                  style={[
                    FilterCustomerStyle.myText,
                    {color: types === value.code ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY}
                  ]}>
                  {value.name}
                </MyText>
                {types === value.code ? (
                  <MyIcon
                    iconFontType="AntDesign"
                    name={'check'}
                    size={20}
                    color={COLOR.TEXT.BLUE}
                  />
                ) : (
                  <MyIcon
                    iconFontType="AntDesign"
                    name={'check'}
                    size={20}
                    color={COLOR.TEXT.WHITE}
                  />
                )}
              </MyButton>
              <ItemLineIndicator />
            </MyView>
          );
        })}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {types} = state.CustomerReducer;
  return {types};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setTypes}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewGender);
