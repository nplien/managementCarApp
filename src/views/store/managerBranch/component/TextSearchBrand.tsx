import {MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IManagerBranchState, setKeyword} from '../redux';
import {brandHeaderStyles} from '../styles/ManagerBranch.Style';

interface IProps extends IManagerBranchState {
  setKeyword: typeof setKeyword;
}

interface IState {
  arrStatus: any;
  arrCurrentStatusTmp: any;
}

class TextSearchVoucher extends Component<IProps, IState> {
  render() {
    let {keyword} = this.props;
    return (
      <MyView style={brandHeaderStyles.statusContainerChild}>
        <MyInput
          defaultValue={keyword}
          placeholder={'Theo tên chi nhánh'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[brandHeaderStyles.textInput2]}
          onChangeText={text => this.props.setKeyword(text)}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {keyword} = state.ManagerBranchReducer;
  return {keyword};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setKeyword}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(TextSearchVoucher);
