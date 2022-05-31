import {MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IDetailBCHHState, setKeyWordDetailBCHH} from '../../redux';

import {filterBCHHStyle} from '../styles/FilterBCHH.styles';

interface IProps extends IDetailBCHHState {
  setKeyWordDetailBCHH: typeof setKeyWordDetailBCHH;
}

interface IState {}

class TextSearchOrder extends Component<IProps, IState> {
  render() {
    let {keyword} = this.props;
    return (
      <MyView style={filterBCHHStyle.statusContainerChild}>
        <MyInput
          defaultValue={keyword}
          placeholder={'Theo mã, tên hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[filterBCHHStyle.textInput2]}
          onChangeText={text => this.props.setKeyWordDetailBCHH(text)}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {keyword} = state.DetailBCHHReducer;
  return {keyword};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setKeyWordDetailBCHH
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(TextSearchOrder);
