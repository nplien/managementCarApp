import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {changeGiaBan, IChangeGiaBanState} from './redux';
import {CONFIG_PRICE_SHOW} from 'common/Constants';
import {SuppliersStyle} from '../../style/suppliers.Style';
import {IPropsButtonSheet} from 'views/app';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IChangeGiaBanState {
  changeGiaBan: typeof changeGiaBan;
}

class TotalPriceSupplier extends PureComponent<IProps> {
  render() {
    const {giaHienThi} = this.props;

    let arrSortPrice: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_PRICE_SHOW.NCC.length; index++) {
      const element = CONFIG_PRICE_SHOW.NCC[index];
      arrSortPrice.push({
        title: element.name,
        onPress: () => {
          this.props.changeGiaBan(element);
          MyNavigator.goBack();
        },
        isActive: element.name === giaHienThi.name
      });
    }

    return (
      <MyView>
        <MyButton
          style={SuppliersStyle.myViewBottom}
          onPress={() => {
            MyNavigator.pushModal('MyBottomSheetPicker', {
              arrayButton: arrSortPrice,
              titleButtonCancel: 'Huỷ bỏ'
            });
          }}>
          <MyView style={SuppliersStyle.viewTitleBottom} transparent>
            <MyText numberOfLines={1} style={SuppliersStyle.titleBottom}>
              {giaHienThi?.name}
            </MyText>
          </MyView>
          <MyView transparent style={SuppliersStyle.myviewIcon}>
            <MyIcon
              iconFontType="MaterialIcons"
              name="call-made"
              size={24}
              color={COLOR.BG.WHITE}
            />
          </MyView>
        </MyButton>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {giaHienThi} = state.TotalPriceSupplierReducer;
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

export default connect(mapStateToProps, mapDispatchToProps)(TotalPriceSupplier);
