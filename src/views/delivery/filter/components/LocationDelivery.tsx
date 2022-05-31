import * as React from 'react';
import {MyView, MyText, MyButton, MyIcon} from 'bases/components';
import {COLOR, MY_SIZE, setPadding} from 'bases/styles/Core';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setDeleteProvincesCity, IFilterDeliveryState} from '../redux';
import ModalLocation from './ModalLoctionDelivery';
import {RootState} from 'views/app/redux/App.Reducer';

interface IProps {
  setDeleteProvincesCity: typeof setDeleteProvincesCity;
  FilterDeliveryReducer: IFilterDeliveryState;
}

class LocationDelivery extends React.Component<IProps> {
  refLocation: any = React.createRef();
  renderLocation = () => {
    const {provincesCity} = this.props.FilterDeliveryReducer;
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
            marginHorizontal: MY_SIZE.s_8
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
        <MyText style={{fontSize: MY_SIZE.s_16, color: COLOR.TEXT.BLACK}}>Chọn Tỉnh/TP</MyText>
      );
    }
  };
  render() {
    return (
      <MyView>
        <MyButton
          onPress={() => {
            this.refLocation.current?.showHideModal();
          }}
          style={[styles.myviewDM, styles.borderBottomTow]}>
          <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
            {this.renderLocation()}
          </View>
          <MyIcon iconFontType="AntDesign" name={'right'} size={20} />
        </MyButton>
        <ModalLocation ref={this.refLocation} />
      </MyView>
    );
  }
}
const styles = StyleSheet.create({
  borderBottomTow: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_8)
  },
  myviewDM: {
    flexDirection: 'row'
  }
});
const mapStateToProps = (state: RootState) => {
  let {FilterDeliveryReducer} = state;
  return {FilterDeliveryReducer};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setDeleteProvincesCity}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(LocationDelivery);
