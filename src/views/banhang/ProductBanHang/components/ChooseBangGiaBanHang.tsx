import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {PureComponent} from 'react';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';

import {BHCustomerandPrice} from '../styles/ProductHangHoa.Style';
import {COLOR} from 'bases/styles/Core';
import {IProductBanHangState} from '../redux';

interface IProps extends IProductBanHangState {}

class ChooseBangGia extends PureComponent<IProps> {
  render() {
    const {currentBangGia} = this.props;

    return (
      <MyButton
        style={BHCustomerandPrice.btnPrice}
        onPress={() => MyNavigator.navigate('BangGiaChung')}>
        <MyIcon
          name="tag"
          iconFontType="MaterialCommunityIcons"
          size={20}
          color={COLOR.TEXT.GRAY}
        />
        <MyText style={BHCustomerandPrice.txtSearch} myFontStyle="Regular">
          {currentBangGia?.name}
        </MyText>
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {currentBangGia} = state.ProductBanHangReducer;
  return {
    currentBangGia
  };
};

export default connect(mapStateToProps, null)(ChooseBangGia);
