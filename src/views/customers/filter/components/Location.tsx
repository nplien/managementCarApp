import * as React from 'react';
import {MyView, MyText, MyButton, MyIcon} from 'bases/components';
import {FilterCustomerStyle} from '../styles/FilterCustomer.style';
import {COLOR, MY_SIZE} from 'bases/styles/Core';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  IFilterCustomerState,
  setDeleteProvincesCity,
  setProvincesCity
} from 'views/customers/manager/redux';
import {MyLocation} from 'views/app/components/customs';
import {LOCATION} from 'common/Constants';
interface IProps {
  CustomerReducer: IFilterCustomerState;
  setDeleteProvincesCity: typeof setDeleteProvincesCity;
  setProvincesCity: typeof setProvincesCity;
}

class Location extends React.Component<IProps> {
  refLocation: any = React.createRef();
  renderLocation = () => {
    const {provincesCity} = this.props.CustomerReducer;
    if (provincesCity && provincesCity.length > 0) {
      const mapLocation = provincesCity.map((value: {name: any; code: string}, index: number) => (
        <MyButton
          key={index.toString()}
          onPress={() => {
            this.props.setDeleteProvincesCity(value);
          }}
          style={{
            borderRadius: MY_SIZE.s_4,
            backgroundColor: COLOR.TEXT.BLUE,
            marginHorizontal: MY_SIZE.s_8,
            marginVertical: MY_SIZE.s_4
          }}>
          <MyText
            style={{
              fontSize: MY_SIZE.s_16,
              color: COLOR.TEXT.WHITE,
              padding: MY_SIZE.s_8
            }}>
            {value.name}
          </MyText>
        </MyButton>
      ));
      return mapLocation;
    } else {
      return (
        <MyText style={{fontSize: MY_SIZE.s_16, color: COLOR.TEXT.BLACK, marginLeft: MY_SIZE.s_12}}>
          Chọn Tỉnh/TP
        </MyText>
      );
    }
  };
  btnShowLocation = () => {
    const {provincesCity} = this.props.CustomerReducer;
    if (provincesCity && provincesCity.length > 0) {
      const arrCodeCity = provincesCity.map((value: {code: number}) => value.code);

      this.refLocation?.current.showHideModal(LOCATION.CITY, arrCodeCity);
    } else {
      this.refLocation?.current.showHideModal(LOCATION.CITY);
    }
  };
  render() {
    return (
      <MyView>
        <MyButton
          onPress={this.btnShowLocation}
          style={[
            FilterCustomerStyle.myviewDM,
            {marginHorizontal: MY_SIZE.s_8, alignItems: 'center'}
          ]}>
          <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
            {this.renderLocation()}
          </View>
          <MyIcon
            style={{marginVertical: MY_SIZE.s_16}}
            iconFontType="AntDesign"
            name={'right'}
            size={20}
          />
        </MyButton>
        <MyLocation
          ref={this.refLocation}
          valueModal={value => {
            if (value.id && value.name) {
              this.props.setProvincesCity({code: value.id?.toString(), name: value.name});
            }
          }}
        />
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  let {CustomerReducer} = state;
  return {CustomerReducer};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setDeleteProvincesCity, setProvincesCity}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Location);
