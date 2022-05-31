import React, {PureComponent} from 'react';

import {COLOR} from 'bases/styles/Core';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ItemLineIndicatorCustom} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {ARR_DOI_TAC_GIAO_HANG, IFilterDeliveryState, setDoiTacGiaoHang} from '../redux';
import {itemCODStyles} from '../styles/FilterDelivery.styles';

interface IProps extends IFilterDeliveryState {
  item: {
    id: string;
    name: string;
  };
  index?: number;
  setDoiTacGiaoHang: typeof setDoiTacGiaoHang;
}

class DoiTacGiaohangItem extends PureComponent<IProps> {
  onPress = () => {
    const {item, doiTacGiaohang} = this.props;
    if (doiTacGiaohang?.name === item?.name) {
      this.props.setDoiTacGiaoHang(undefined);
    } else {
      this.props.setDoiTacGiaoHang(item);
    }
  };

  render() {
    const {item, doiTacGiaohang, index} = this.props;
    let isSelected = doiTacGiaohang?.name === item?.name;
    let isEnd = ARR_DOI_TAC_GIAO_HANG.length - 1 === index;
    return (
      <MyView transparent>
        <MyButton transparent style={itemCODStyles.content} onPress={this.onPress}>
          <MyText
            myFontStyle="Regular"
            style={[
              itemCODStyles.text,
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
        {isEnd ? null : <ItemLineIndicatorCustom />}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {doiTacGiaohang} = state.FilterDeliveryReducer;
  return {doiTacGiaohang};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setDoiTacGiaoHang}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DoiTacGiaohangItem);
