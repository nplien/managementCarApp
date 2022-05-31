import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {createRef, PureComponent} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {CONFIG_PRICE_SHOW} from 'common/Constants';
import {IProductHangHoaState, changeGiaBanHangHoa} from '../redux';
import {CategoryStyle} from '../styles/ProductHangHoa.Style';
import {IPropsButtonSheet} from 'views/app';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IProductHangHoaState {
  changeGiaBanHangHoa: typeof changeGiaBanHangHoa;
}

class ChangeGiaBan extends PureComponent<IProps> {
  bottomSheetRef: any = createRef();

  showSortPrice = () => {
    this.bottomSheetRef.current.onShow();
  };

  render() {
    const {giaHienThi} = this.props;

    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_PRICE_SHOW.HANG_HOA.length; index++) {
      const element = CONFIG_PRICE_SHOW.HANG_HOA[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.changeGiaBanHangHoa(element);
          MyNavigator.goBack();
        },
        isActive: element.name === giaHienThi?.name
      });
    }

    return (
      <SafeAreaView edges={['bottom']} style={CategoryStyle.viewSafe}>
        <MyButton
          style={CategoryStyle.myViewBottom}
          onPress={() => {
            MyNavigator.pushModal('MyBottomSheetPicker', {
              arrayButton: arrSortBy,
              titleButtonCancel: 'Huỷ bỏ'
            });
          }}>
          <MyView style={CategoryStyle.viewTitleBottom} transparent>
            <MyText numberOfLines={1} style={CategoryStyle.titleBottom}>
              {giaHienThi?.name}
            </MyText>
          </MyView>
          <MyView transparent style={CategoryStyle.myviewIcon}>
            <MyIcon
              iconFontType="MaterialIcons"
              name="call-made"
              size={24}
              color={COLOR.BG.WHITE}
            />
          </MyView>
        </MyButton>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {giaHienThi} = state.ProductHangHoaReducer;
  return {giaHienThi};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeGiaBanHangHoa
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeGiaBan);
