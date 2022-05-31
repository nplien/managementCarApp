import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyView, MyButton, MyIcon, MyText} from 'bases/components';
import {FilterCategoryStyle} from '../styles/FilterCategory.style';
import MyNavigator from 'utils/MyNavigator';
import {IFilterCategoryState, setCateObj} from '../redux';
import DMViewItem from './DMViewItem';
import {COLOR} from 'bases/styles/Core';

interface IProps extends IFilterCategoryState {
  setCateObj: typeof setCateObj;
}

class DMView extends PureComponent<IProps> {
  onPress = () => {
    const {arrCate} = this.props;
    MyNavigator.navigate('Categorys', {arrCate: arrCate, screen: 'FilterCategory'});
  };

  render() {
    const {arrCate} = this.props;

    let _viewContent = [];
    if (arrCate && arrCate.length > 0) {
      for (let index = 0; index < arrCate.length; index++) {
        const element = arrCate[index];
        _viewContent.push(<DMViewItem key={element.id} item={element} />);
      }
    } else {
      _viewContent.push(
        <MyView
          key={-1}
          style={[
            FilterCategoryStyle.btnLH,
            {
              backgroundColor: COLOR.TEXT.WHITE
            }
          ]}>
          <MyText
            myFontStyle="Regular"
            style={[
              FilterCategoryStyle.myText,
              {
                color: COLOR.TEXT.BLACK
              }
            ]}>
            {'Tất cả'}
          </MyText>
        </MyView>
      );
    }
    return (
      <MyButton style={FilterCategoryStyle.myviewDM} onPress={this.onPress}>
        <MyView style={FilterCategoryStyle.mycontentViewDM}>{_viewContent}</MyView>
        <MyIcon
          style={FilterCategoryStyle.myIconDM}
          iconFontType="AntDesign"
          name={'right'}
          size={22}
        />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrCate} = state.FilterCategoryReducer;
  return {arrCate};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setCateObj}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DMView);
