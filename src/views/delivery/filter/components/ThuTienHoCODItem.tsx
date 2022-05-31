import React, {PureComponent} from 'react';

import {COLOR} from 'bases/styles/Core';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {IFilterDeliveryState, setThuTienHoCOD} from '../redux';
import {itemCODStyles} from '../styles/FilterDelivery.styles';

interface IProps extends IFilterDeliveryState {
  item: {
    id: string;
    name: string;
    value: any;
  };
  setThuTienHoCOD: typeof setThuTienHoCOD;
}

class ThuTienHoCODItem extends PureComponent<IProps> {
  onPress = () => {
    const {item, thuTienHoCOD} = this.props;
    if (thuTienHoCOD?.name === item?.name) {
      this.props.setThuTienHoCOD(undefined);
    } else {
      this.props.setThuTienHoCOD(item);
    }
  };

  render() {
    const {item, thuTienHoCOD} = this.props;
    let isSelected = thuTienHoCOD?.name === item?.name;

    return (
      <MyView>
        <MyButton style={itemCODStyles.content} onPress={this.onPress}>
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
        <ItemLineIndicator />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {thuTienHoCOD} = state.FilterDeliveryReducer;
  return {thuTienHoCOD};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setThuTienHoCOD}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ThuTienHoCODItem);
