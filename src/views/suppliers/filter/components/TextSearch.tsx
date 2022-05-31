import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {MyInput, MyView} from 'bases/components';
import {COLOR, setPadding, MY_SIZE, setRadius} from 'bases/styles/Core';
import {RootState} from 'views/app/redux/App.Reducer';
import {ISuppliersState} from 'views/suppliers/manager/redux';
interface IProps extends ISuppliersState {
  onChangeTextView: (key: string, text: string) => void;
}

interface IState {
  keyword: string;
}

class TextSearch extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      keyword: this.props.param?.keyword || ''
    };
  }
  render() {
    const {keyword} = this.state;
    return (
      <MyView style={styles.viewTextSearch2}>
        <MyInput
          style={styles.inputSearch}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          placeholder="Tên, mã, số điện thoại"
          defaultValue={keyword}
          onChangeText={v => {
            this.props.onChangeTextView('keyword', v);
            this.setState({
              keyword: v
            });
          }}
        />
      </MyView>
    );
  }
}
const styles = StyleSheet.create({
  inputSearch: {
    fontSize: MY_SIZE.s_16,
    backgroundColor: COLOR.BG.WHITE,
    borderWidth: 1,
    borderColor: COLOR.BG.BLACK_30,
    borderRadius: MY_SIZE.s_4,
    overflow: 'hidden'
  },
  viewTextSearch2: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});

const mapStateToProps = (state: RootState) => {
  let {param} = state.SuppliersReducer;
  return {param};
};
export default connect(mapStateToProps, null)(TextSearch);
