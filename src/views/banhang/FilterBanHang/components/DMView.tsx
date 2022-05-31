import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyView, MyButton, MyIcon, MyText} from 'bases/components';
import {FilterBanHangStyle} from '../styles/FilterBanHang.style';
import MyNavigator from 'utils/MyNavigator';
import {IFilterBanHangState} from '../redux';
import DMViewItem from './DMViewItem';
import {COLOR} from 'bases/styles/Core';

interface IProps extends IFilterBanHangState {}

class DMView extends PureComponent<IProps> {
  onPress = () => {
    const {arrCate} = this.props;
    MyNavigator.navigate('Categorys', {arrCate: arrCate, screen: 'FilterBanHang'});
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
            FilterBanHangStyle.btnLH,
            {
              backgroundColor: COLOR.TEXT.WHITE
            }
          ]}>
          <MyText
            myFontStyle="Regular"
            style={[
              FilterBanHangStyle.myText,
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
      <MyButton style={FilterBanHangStyle.myviewDM} onPress={this.onPress}>
        <MyView transparent style={FilterBanHangStyle.mycontentViewDM}>
          {_viewContent}
        </MyView>
        <MyIcon
          style={FilterBanHangStyle.myIconDM}
          iconFontType="AntDesign"
          name={'right'}
          size={22}
        />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrCate} = state.FilterBanHangReducer;
  return {arrCate};
};

export default connect(mapStateToProps, null)(DMView);
