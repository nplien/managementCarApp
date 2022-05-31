import React, {Component} from 'react';

import {COLOR} from 'bases/styles/Core';
import {MyButton, MyIcon, MyText} from 'bases/components';
import {ICategoryModel} from 'models/Category.Model';
import {itemCateStyles} from '../styles/Category.styles';
import {setCateObjHangHoa} from 'views/products/FilterHangHoa/redux';
import {setCateObjBanHang} from 'views/banhang/FilterBanHang/redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

interface IPropsStore {
  item: ICategoryModel;
  isSelected: boolean;
  screen: string;

  setCateObjHangHoa: typeof setCateObjHangHoa;
  setCateObjBanHang: typeof setCateObjBanHang;
}

interface IStatesStore {
  isSelected: boolean;
}

class ItemCategory extends Component<IPropsStore, IStatesStore> {
  state = {isSelected: this.props.isSelected};

  onPress = () => {
    const {item, screen} = this.props;

    this.setState(
      {
        isSelected: !this.state.isSelected
      },
      () => {
        switch (screen) {
          case 'FilterHangHoa': {
            this.props.setCateObjHangHoa(item);
            break;
          }

          case 'FilterBanHang': {
            this.props.setCateObjBanHang(item);
            break;
          }
        }
      }
    );
  };

  render() {
    const {item} = this.props;
    const {isSelected} = this.state;

    return (
      <MyButton style={itemCateStyles.content2} onPress={this.onPress}>
        <MyText myFontStyle="Regular" style={[itemCateStyles.text, {paddingLeft: item.padding}]}>
          {item.name}
        </MyText>
        <MyIcon
          name="check"
          iconFontType="AntDesign"
          size={22}
          color={isSelected ? COLOR.TEXT.BLUE : COLOR.TEXT.WHITE}
        />
      </MyButton>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setCateObjHangHoa, setCateObjBanHang}, dispatch);
};

export default connect(null, mapDispatchToProps)(ItemCategory);
