import * as React from 'react';
import {StyleSheet} from 'react-native';
import {MyButton, MyView, MyText, MyIcon} from 'bases/components';
import {COLOR, setPadding, MY_SIZE, setRadius} from 'bases/styles/Core';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';

import {ItemLineIndicator} from 'views/app/components/items';
import {ISuppliersState} from 'views/suppliers/manager/redux';

interface IProps extends ISuppliersState {
  onChangeValue: (value: string) => void;
}

interface AppState {
  statusState: string;
}

class ViewStatus extends React.Component<IProps, AppState> {
  constructor(props: IProps) {
    super(props);
    const {param} = this.props;
    this.state = {
      statusState: param?.status ? param?.status : ''
    };
  }

  public render() {
    const {statusState} = this.state;
    return (
      <MyView style={styles.container}>
        <MyButton
          transparent
          style={[styles.myButton, styles.borderBottom]}
          onPress={() => {
            this.setState({
              statusState: ''
            });
            this.props.onChangeValue('');
          }}>
          <MyText
            myFontStyle="Regular"
            style={[
              styles.myText,
              {color: statusState === '' ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY}
            ]}>
            {' '}
            Tất cả
          </MyText>
          {statusState === '' ? (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.BLUE} />
          ) : (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.WHITE} />
          )}
        </MyButton>
        <ItemLineIndicator />
        <MyButton
          style={[styles.myButton, styles.borderBottom]}
          onPress={() => {
            this.setState({
              statusState: 'active'
            });
            this.props.onChangeValue('active');
          }}>
          <MyText
            myFontStyle="Regular"
            style={[
              styles.myText,
              {
                color: statusState === 'active' ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY
              }
            ]}>
            {' '}
            Đang hoạt động
          </MyText>
          {statusState === 'active' ? (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.BLUE} />
          ) : (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.WHITE} />
          )}
        </MyButton>
        <ItemLineIndicator />
        <MyButton
          transparent
          style={[styles.myButton, styles.borderBottom]}
          onPress={() => {
            this.setState({
              statusState: 'inactive'
            });
            this.props.onChangeValue('inactive');
          }}>
          <MyText
            myFontStyle="Regular"
            style={[
              styles.myText,
              {
                color: statusState === 'inactive' ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY
              }
            ]}>
            {' '}
            Ngừng hoạt động
          </MyText>
          {statusState === 'inactive' ? (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.BLUE} />
          ) : (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.WHITE} />
          )}
        </MyButton>
      </MyView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  myView: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    fontSize: MY_SIZE.s_16
  },
  myButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  borderBottom: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  borderBottomTow: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    alignContent: 'space-between'
  },
  myText: {
    flex: 1,
    fontSize: MY_SIZE.s_16
  }
});
const mapStateToProps = (state: RootState) => {
  const {param} = state.SuppliersReducer;
  return {param};
};
export default connect(mapStateToProps, null)(ViewStatus);
