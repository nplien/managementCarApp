import React, {PureComponent} from 'react';

import {COLOR} from 'bases/styles/Core';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {IFilterBanHangState, setTonKho} from '../redux';
import {itemCateStyles} from '../styles/FilterBanHang.style';

interface IPropsStore extends IFilterBanHangState {
  item: {
    id: string;
    name: string;
    value: any;
  };
  setTonKho: typeof setTonKho;
}

class TonKhoItem extends PureComponent<IPropsStore> {
  onPress = () => {
    const {item} = this.props;
    this.props.setTonKho(item);
  };

  render() {
    const {item, tonKho} = this.props;
    let isSelected = tonKho.name === item.name;

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
  const {tonKho} = state.FilterBanHangReducer;
  return {tonKho};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setTonKho}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TonKhoItem);
