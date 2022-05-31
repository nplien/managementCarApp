import React, {Component} from 'react';
import {MyView, MyText, MyButton, MyIcon} from 'bases/components';

import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {StyleSheet} from 'react-native';

import {IStaffModel} from 'models/Staff.Model';
import MyStaffModal from 'views/app/components/customs/MyStaffModal';
import {IReturnOrderState, onChangeStaffTraHang, setLocationCityTraHang} from '../../redux';
// import ModalLocationTH from './ModalLocationTH';

interface IProps extends IReturnOrderState {
  onChangeStaffTraHang: typeof onChangeStaffTraHang;
  setLocationCityTraHang: typeof setLocationCityTraHang;
}

class StaffAndLocation extends Component<IProps> {
  staffModalRef: any = React.createRef();
  locationModalRef: any = React.createRef();

  apDungStaff = (arrStaff: IStaffModel[]) => {
    this.props.onChangeStaffTraHang(arrStaff);
  };
  onShowStaffModal = () => {
    const {arrStaffDaChonTraHang} = this.props;
    this.staffModalRef?.current?.onShow(arrStaffDaChonTraHang);
  };
  onPressStaff = (item: IStaffModel) => {
    const {arrStaffDaChonTraHang} = this.props;
    if (arrStaffDaChonTraHang) {
      const indexCurrent: any = arrStaffDaChonTraHang?.findIndex(value => {
        return value.id === item.id;
      });
      if (indexCurrent !== -1) {
        arrStaffDaChonTraHang?.splice(indexCurrent, 1);
      } else {
        arrStaffDaChonTraHang?.push(item);
      }

      this.props.onChangeStaffTraHang([...arrStaffDaChonTraHang]);
    }
  };
  onShowLocationModal = () => {
    this.locationModalRef.current.showModal();
  };
  render() {
    const {arrStaffDaChonTraHang} = this.props;
    return (
      <MyView transparent style={styles.container}>
        <MyButton
          style={[styles.myViewDM]}
          onPress={() => {
            this.onShowStaffModal();
          }}>
          <MyView transparent style={styles.myContentViewDM}>
            {arrStaffDaChonTraHang && arrStaffDaChonTraHang.length > 0 ? (
              arrStaffDaChonTraHang.map((value, index) => {
                return (
                  <MyButton
                    key={index}
                    onPress={() => {
                      this.onPressStaff(value);
                    }}
                    style={[styles.myButtonCreator, {backgroundColor: COLOR.TEXT.BLUE}]}>
                    <MyText
                      myFontStyle="Regular"
                      style={[styles.myTextSize, {color: COLOR.TEXT.WHITE}]}>
                      {value.name}
                    </MyText>
                  </MyButton>
                );
              })
            ) : (
              <MyView style={[styles.myButtonCreator, {backgroundColor: COLOR.TEXT.WHITE}]}>
                <MyText myFontStyle="Regular" style={styles.myTextSize}>
                  Tất cả
                </MyText>
              </MyView>
            )}
          </MyView>
          <MyIcon style={styles.myIconDM} iconFontType="AntDesign" name={'right'} size={24} />
        </MyButton>
        {/* <MyText style={styles.titleContainer}>Khu vực giao hàng</MyText>
        <MyButton
          style={[styles.myViewDM]}
          onPress={() => {
            this.onShowLocationModal();
          }}>
          <MyView style={styles.myContentViewDM}>
            {locationDaChon && locationDaChon !== undefined ? (
              <MyButton
                onPress={() => {
                  //   this.onShowLocationModal();
                  this.props.setLocationCityTraHang(undefined);
                }}
                style={[styles.myButtonCreator, {backgroundColor: COLOR.TEXT.BLUE}]}>
                <MyText
                  myFontStyle="Regular"
                  style={[styles.myTextSize, {color: COLOR.TEXT.WHITE}]}>
                  {locationDaChon.name}
                </MyText>
              </MyButton>
            ) : (
              <MyView style={[styles.myButtonCreator, {backgroundColor: COLOR.TEXT.WHITE}]}>
                <MyText myFontStyle="Regular" style={styles.myTextSize}>
                  Tất cả
                </MyText>
              </MyView>
            )}
          </MyView>
          <MyIcon style={styles.myIconDM} iconFontType="AntDesign" name={'right'} size={24} />
        </MyButton> */}
        <MyStaffModal ref={this.staffModalRef} onApDung={this.apDungStaff} />
        {/* <ModalLocationTH ref={this.locationModalRef} /> */}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrStaffDaChonTraHang, locationDaChon} = state.ReturnOrderReducer;
  return {arrStaffDaChonTraHang, locationDaChon};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({onChangeStaffTraHang, setLocationCityTraHang}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(StaffAndLocation);

const styles = StyleSheet.create({
  container: {},
  myViewDM: {
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    flexDirection: 'row'
  },
  myContentViewDM: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  myButtonCreator: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_10, MY_SIZE.s_10),
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0),
    borderColor: COLOR.BG.BLACK_10,
    borderWidth: 1,
    borderRadius: MY_SIZE.s_6
  },
  myIconDM: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  myTextSize: {
    fontSize: MY_SIZE.s_16
  },
  titleContainer: {
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});
