import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {MyButton, MyIcon} from 'bases/components';
import {COLOR, setPadding, MY_SIZE} from 'bases/styles/Core';
interface IProps {
  value: (value: boolean) => void;
}
interface AppState {
  isCheck: boolean;
}
export default class AutoCustomer extends React.Component<IProps, AppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isCheck: false
    };
  }
  render() {
    const {isCheck} = this.state;
    return (
      <MyButton
        style={styles.container}
        onPress={() => {
          this.setState({isCheck: !isCheck}, () => this.props.value(!isCheck));
        }}>
        {isCheck ? (
          <MyIcon
            iconFontType="MaterialIcons"
            name={'check-box'}
            size={20}
            color={COLOR.TEXT.BLUE}
          />
        ) : (
          <MyIcon
            iconFontType="MaterialIcons"
            name={'check-box-outline-blank'}
            size={20}
            color={COLOR.TEXT.BLUE}
          />
        )}
        <Text style={{fontSize: MY_SIZE.s_16}}> Hệ thống thực hiện tự động</Text>
      </MyButton>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});
