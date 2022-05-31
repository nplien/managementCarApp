import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {CONFIG_PRICE_SHOW} from 'common/Constants';
import {CustomerStyle} from '../../style/Customer.Style';
import {changeGiaBanCustomer, ICustomerState} from '../../redux';
import {IPropsButtonSheet} from 'views/app';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends ICustomerState {
  changeGiaBanCustomer: typeof changeGiaBanCustomer;
}

class TotalPriceCustomer extends PureComponent<IProps> {
  render() {
    const {giaHienThiCustomer} = this.props;

    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_PRICE_SHOW.CUSTOMER.length; index++) {
      const element = CONFIG_PRICE_SHOW.CUSTOMER[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.changeGiaBanCustomer(element);
          MyNavigator.goBack();
        },
        isActive: element.name === giaHienThiCustomer?.name
      });
    }

    return (
      <MyView>
        <MyButton
          style={CustomerStyle.myViewBottom}
          onPress={() => {
            MyNavigator.pushModal('MyBottomSheetPicker', {
              arrayButton: arrSortBy,
              titleButtonCancel: 'Huỷ bỏ'
            });
          }}>
          <MyView style={CustomerStyle.viewTitleBottom} transparent>
            <MyText numberOfLines={1} style={CustomerStyle.titleBottom}>
              {giaHienThiCustomer?.name}
            </MyText>
          </MyView>
          <MyView transparent style={CustomerStyle.myviewIcon}>
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
  const {giaHienThiCustomer} = state.CustomerReducer;
  return {giaHienThiCustomer};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeGiaBanCustomer
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TotalPriceCustomer);
