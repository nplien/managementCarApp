import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyView, MyButton, MyIcon, MyText} from 'bases/components';
import {FilterHangHoaStyle} from '../styles/FilterHangHoa.style';
import MyNavigator from 'utils/MyNavigator';
import {IFilterHangHoaState} from '../redux';
import DMViewItem from './DMViewItem';
import {COLOR} from 'bases/styles/Core';

interface IProps extends IFilterHangHoaState {}

class DMView extends PureComponent<IProps> {
  onPress = () => {
    const {arrCate} = this.props;
    MyNavigator.navigate('Categorys', {arrCate: arrCate, screen: 'FilterHangHoa'});
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
            FilterHangHoaStyle.btnLH,
            {
              backgroundColor: COLOR.TEXT.WHITE
            }
          ]}>
          <MyText
            myFontStyle="Regular"
            style={[
              FilterHangHoaStyle.myText,
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
      <MyButton style={FilterHangHoaStyle.myviewDM} onPress={this.onPress}>
        <MyView transparent style={FilterHangHoaStyle.mycontentViewDM}>
          {_viewContent}
        </MyView>
        <MyIcon
          style={FilterHangHoaStyle.myIconDM}
          iconFontType="AntDesign"
          name={'right'}
          size={22}
        />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrCate} = state.FilterHangHoaReducer;
  return {arrCate};
};

export default connect(mapStateToProps, null)(DMView);
