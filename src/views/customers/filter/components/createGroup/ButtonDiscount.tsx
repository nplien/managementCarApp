import React from 'react';
import {StyleSheet} from 'react-native';
import {MyView, MyButton, MyText, MyInput} from 'bases/components';
import {COLOR, MY_SIZE, setPadding} from 'bases/styles/Core';

interface IProps {
  onDiscountType: (value: number) => void;
  onDiscountValue: (value: string) => void;
}
interface AppState {
  numberBackground: number;
  discount_value: string;
}
export default class ButtonDiscount extends React.Component<IProps, AppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      numberBackground: 1,
      discount_value: ''
    };
  }
  render() {
    const {numberBackground} = this.state;
    return (
      <MyView style={{flexDirection: 'row'}}>
        <MyInput
          onChangeText={v => {
            if (numberBackground === 1 && parseInt(v) > 100) {
              this.setState({discount_value: '100'});
              this.props.onDiscountValue('100');
              return;
            }
            this.setState({discount_value: v});
            this.props.onDiscountValue(v);
          }}
          keyboardType="numeric"
          value={this.state.discount_value}
          containerStyle={[styles.inputNoteAdd, {flex: 1}]}
          placeholder="Giảm giá"
        />

        <MyButton
          onPress={() => {
            this.setState({numberBackground: 2, discount_value: ''});
            this.props.onDiscountType(2);
          }}
          style={[
            styles.btn,
            {
              borderBottomLeftRadius: 8,
              borderTopStartRadius: 8,
              backgroundColor: numberBackground === 2 ? COLOR.TEXT.BLUE : COLOR.BG.LIGHT_GRAY
            }
          ]}>
          <MyText>VND</MyText>
        </MyButton>
        <MyButton
          onPress={() => {
            this.setState({numberBackground: 1, discount_value: ''});
            this.props.onDiscountType(1);
          }}
          style={[
            styles.btn,
            {
              borderBottomRightRadius: 8,
              borderTopEndRadius: 8,
              backgroundColor: numberBackground === 1 ? COLOR.TEXT.BLUE : COLOR.BG.LIGHT_GRAY
            }
          ]}>
          <MyText>%</MyText>
        </MyButton>
      </MyView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  btn: {
    backgroundColor: COLOR.BG.GRAY,
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  inputNoteAdd: {
    borderBottomColor: COLOR.BG.BLACK_30,
    borderBottomWidth: 1
  }
});
