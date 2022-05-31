import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyView, MyButton, MyIcon, MyText} from 'bases/components';
import MyNavigator from 'utils/MyNavigator';
import {IExportCateReducerState, setCateObj} from '../redux';
import DMViewItem from './DMViewItem';
import {COLOR} from 'bases/styles/Core';
import {cateAndBrandsStyle} from '../styles/ExportCate.styles';

interface IProps extends IExportCateReducerState {
  setCateObj: typeof setCateObj;
}

class DMView extends PureComponent<IProps> {
  onPress = () => {
    const {cate} = this.props;
    MyNavigator.navigate('ExportCategory', {cate: cate});
  };

  render() {
    const {cate} = this.props;
    let _viewContent = [];
    if (cate) {
      _viewContent.push(<DMViewItem key={cate.id} item={cate} />);
    } else {
      _viewContent.push(
        <MyView
          key={-1}
          style={[
            cateAndBrandsStyle.btnLH,
            {
              backgroundColor: COLOR.TEXT.WHITE
            }
          ]}>
          <MyText
            myFontStyle="Regular"
            style={[
              cateAndBrandsStyle.myText,
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
      <MyButton style={cateAndBrandsStyle.myviewDM} onPress={this.onPress}>
        <MyView style={cateAndBrandsStyle.mycontentViewDM}>{_viewContent}</MyView>
        <MyIcon
          style={cateAndBrandsStyle.myIconDM}
          iconFontType="AntDesign"
          name={'right'}
          size={22}
        />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {cate} = state.ExportCateReducer;
  return {cate};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setCateObj}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DMView);
