import React, {PureComponent} from 'react';
import {MyInput, MyView} from 'bases/components';
import {FilterBCHangHoaStyle} from '../styles/BCHangHoa.Styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IBCHangHoaState, changeKeyWordBCHangHoa} from '../redux';
import {COLOR, MY_SIZE, setPadding, setRadius} from 'bases/styles/Core';
interface IProps extends Partial<IBCHangHoaState> {
  changeKeyWordBCHangHoa: typeof changeKeyWordBCHangHoa;
}
class InputFilter extends PureComponent<IProps> {
  render() {
    const {KeyWord} = this.props;
    return (
      <MyView
        style={{
          backgroundColor: COLOR.BG.WHITE,
          ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
          ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
        }}>
        <MyInput
          style={FilterBCHangHoaStyle.inputSearch}
          placeholder="Theo mã,hàng hoá"
          value={KeyWord}
          onChangeText={text => {
            this.props.changeKeyWordBCHangHoa(text);
          }}
        />
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {KeyWord} = state.BCHangHoaReducer;
  return {KeyWord};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeKeyWordBCHangHoa
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InputFilter);
