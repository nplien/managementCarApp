import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {PureComponent} from 'react';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';

import {BottomViewStyle} from '../styles/CreateSale.styles';
import {ICreateSaleState} from '../redux';

interface IProps extends ICreateSaleState {}

class ChooseKenhBan extends PureComponent<IProps> {
  render() {
    const {currentKenhBan} = this.props;

    return (
      <MyButton
        transparent
        style={BottomViewStyle.itemTouch}
        onPress={() => MyNavigator.navigate('KenhBan')}>
        <MyIcon name="shopping-basket" iconFontType="FontAwesome5" size={18} />
        <MyText style={BottomViewStyle.txtSearch} myFontStyle="Bold">
          {currentKenhBan?.name}
        </MyText>
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {currentKenhBan} = state.CreateSaleReducer;
  return {
    currentKenhBan
  };
};

export default connect(mapStateToProps, null)(ChooseKenhBan);
