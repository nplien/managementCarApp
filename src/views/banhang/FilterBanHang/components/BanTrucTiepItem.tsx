import React, {PureComponent} from 'react';

import {COLOR} from 'bases/styles/Core';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {IFilterBanHangState, setBanTrucTiep} from '../redux';
import {itemCateStyles} from '../styles/FilterBanHang.style';

interface IProps extends IFilterBanHangState {
  item: {
    id: string;
    name: string;
    value: any;
  };
  setBanTrucTiep: typeof setBanTrucTiep;
}

class BanTrucTiepItem extends PureComponent<IProps> {
  onPress = () => {
    const {item} = this.props;
    this.props.setBanTrucTiep(item);
  };

  render() {
    const {item, banTrucTiep} = this.props;
    let isSelected = banTrucTiep.name === item.name;

    return (
      <MyView>
        <MyButton style={itemCateStyles.content} onPress={this.onPress}>
          <MyText
            myFontStyle="Regular"
            style={[
              itemCateStyles.text,
              {
                color: isSelected ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY
              }
            ]}>
            {item.name}
          </MyText>
          <MyIcon
            name="check"
            iconFontType="AntDesign"
            size={22}
            color={isSelected ? COLOR.TEXT.BLUE : COLOR.TEXT.WHITE}
          />
        </MyButton>
        <ItemLineIndicator />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {banTrucTiep} = state.FilterBanHangReducer;
  return {banTrucTiep};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setBanTrucTiep}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BanTrucTiepItem);
