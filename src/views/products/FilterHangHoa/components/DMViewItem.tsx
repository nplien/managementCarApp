import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {MyButton, MyText} from 'bases/components';

import {FilterHangHoaStyle} from '../styles/FilterHangHoa.style';
import {COLOR} from 'bases/styles/Core';

import {setCateObjHangHoa} from '../redux';
import {ICategoryModel} from 'models/Category.Model';

interface IPropsItem {
  item: ICategoryModel;
  setCateObjHangHoa: typeof setCateObjHangHoa;
}

class DMViewItem extends PureComponent<IPropsItem> {
  onPress = () => {
    const {item} = this.props;
    this.props.setCateObjHangHoa(item);
  };

  render() {
    const {item} = this.props;

    return (
      <MyButton
        style={[
          FilterHangHoaStyle.btnLH,
          {
            backgroundColor: COLOR.TEXT.BLUE
          }
        ]}
        onPress={this.onPress}>
        <MyText
          myFontStyle="Regular"
          style={[
            FilterHangHoaStyle.myText,
            {
              color: COLOR.TEXT.WHITE
            }
          ]}>
          {item.name}
        </MyText>
      </MyButton>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setCateObjHangHoa}, dispatch);
};

export default connect(null, mapDispatchToProps)(DMViewItem);
