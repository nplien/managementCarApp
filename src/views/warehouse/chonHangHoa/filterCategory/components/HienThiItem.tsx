import React, {PureComponent} from 'react';

import {COLOR} from 'bases/styles/Core';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {itemCateStyles} from 'views/categorys/styles/Category.styles';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {IFilterCategoryState, setHienThi} from '../redux';

interface IPropsStore extends IFilterCategoryState {
  item: {
    id: string;
    name: string;
    value: any;
  };
  setHienThi: typeof setHienThi;
}

class HienThiItem extends PureComponent<IPropsStore> {
  onPress = () => {
    const {item} = this.props;
    this.props.setHienThi(item);
  };

  render() {
    const {item, hienThi} = this.props;
    let isSelected = hienThi.name === item.name;

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
  const {hienThi} = state.FilterCategoryReducer;
  return {hienThi};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setHienThi}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HienThiItem);
