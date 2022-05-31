import {MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IFilterSoQuyState, setKeywordSearchSQ, setKeywordNoteSQ} from '../redux';
import {styles} from '../styles/FilterSoQuy.styles';

interface IProps extends IFilterSoQuyState {
  setKeywordSearchSQ: typeof setKeywordSearchSQ;
  setKeywordNoteSQ: typeof setKeywordNoteSQ;
}

interface IState {}

class TextSearch extends Component<IProps, IState> {
  setKeyword = (text: string) => {
    this.props.setKeywordSearchSQ(text);
  };

  render() {
    let {code, note} = this.props;
    return (
      <MyView style={styles.statusContainerChild}>
        <MyInput
          defaultValue={code}
          value={code}
          placeholder={'Mã phiếu'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={this.setKeyword}
        />
        <MyInput
          defaultValue={note}
          value={note}
          placeholder={'Theo ghi chú'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setKeywordNoteSQ(text)}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {code, note} = state.FilterSoQuyReducer;
  return {code, note};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setKeywordSearchSQ,
      setKeywordNoteSQ
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(TextSearch);
