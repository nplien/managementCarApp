import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {CategoryStyle} from '../styles/ProductHangHoa.Style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {CONFIG_PRICE_SHOW} from 'common/Constants';
import {changeGiaBan, IProductBanHangState} from '../redux';
import MyNavigator from 'utils/MyNavigator';
import {IPropsButtonSheet} from 'views/app';

interface IProps extends IProductBanHangState {
  changeGiaBan: typeof changeGiaBan;
}

class ChangeGiaBan extends PureComponent<IProps> {
  render() {
    const {giaHienThi} = this.props;

    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_PRICE_SHOW.HANG_HOA.length; index++) {
      const element = CONFIG_PRICE_SHOW.HANG_HOA[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.changeGiaBan(element);
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
  const {giaHienThi} = state.ProductBanHangReducer;
  return {giaHienThi};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeGiaBan
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeGiaBan);
