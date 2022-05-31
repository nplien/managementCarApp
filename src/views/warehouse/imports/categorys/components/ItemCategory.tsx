import React, {Component} from 'react';

import {COLOR} from 'bases/styles/Core';
import {MyButton, MyIcon, MyText} from 'bases/components';
import {ICategoryModel} from 'models/Category.Model';
import {itemCateStyles} from '../styles/ImportCate.styles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {IImportCateReducerState, setCateObj} from '../redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';

interface IPropsStore extends IImportCateReducerState {
  item: ICategoryModel;
  setCateObj: typeof setCateObj;
}

class ItemCategory extends Component<IPropsStore> {
  onPress = () => {
    const {item} = this.props;
    this.props.setCateObj(item);
    MyNavigator.goBack();
  };

  render() {
    const {item, cate} = this.props;
    let isSelected = cate?.id === item.id ? COLOR.TEXT.BLUE : COLOR.TEXT.WHITE;
    return (
      <MyButton style={itemCateStyles.content2} onPress={this.onPress}>
        <MyText myFontStyle="Regular" style={[itemCateStyles.text, {paddingLeft: item.padding}]}>
          {item.name}
        </MyText>
        <MyIcon name="check" iconFontType="AntDesign" size={22} color={isSelected} />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {cate} = state.ImportCateReducer;

  return {
    cate
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setCateObj}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCategory);
