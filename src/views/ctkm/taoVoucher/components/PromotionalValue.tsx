import * as React from 'react';
import {MyView, MyText, MyButton, MyInputPriceMask, MyIcon} from 'bases/components';
import {taoVoucherStyles} from '../styles/TaoVoucher.Styles';
import {COLOR} from 'bases/styles/Core';

interface IProps {
  onChangeValue: (value: string, type: number) => void;
  onChangeType: (type: number) => void;
}

interface AppState {
  typeValue: number;
}

export default class PromotionalValue extends React.Component<IProps, AppState> {
  refInput: any = React.createRef();
  state = {
    typeValue: 2
  };
  public render() {
    const {typeValue} = this.state;
    return (
      <MyView style={taoVoucherStyles.containerChild}>
        <MyText style={taoVoucherStyles.textAdd}>Giá trị khuyến mại{}</MyText>
        <MyView style={taoVoucherStyles.viewPromotional}>
          <MyView style={taoVoucherStyles.viewInputAdd}>
            <MyInputPriceMask
              inputRef={this.refInput}
              numberOfLines={1}
              keyboardType={'number-pad'}
              textAlign="right"
              placeholder={'0'}
              onTextCallback={v => {
                this.props.onChangeValue(v, typeValue);
              }}
              returnKeyType="done"
            />
          </MyView>
          <MyView style={{flexDirection: 'row'}}>
            <MyButton
              onPress={() => {
                this.setState(
                  {
                    typeValue: 2
                  },
                  () => {
                    this.props.onChangeType(2);
                  }
                );
              }}
              style={[
                taoVoucherStyles.btnVND,
                {
                  backgroundColor: typeValue === 2 ? COLOR.TEXT.POSITIVE_BTN : COLOR.TEXT.BLUE
                }
              ]}>
              <MyIcon
                size={16}
                iconFontType="MaterialCommunityIcons"
                name={typeValue === 2 ? 'radiobox-marked' : 'radiobox-blank'}
                color={typeValue === 2 ? COLOR.TEXT.WHITE : COLOR.TEXT.BLACK}
              />
              <MyText style={{color: typeValue === 2 ? COLOR.TEXT.WHITE : COLOR.TEXT.BLACK}}>
                VND
              </MyText>
            </MyButton>
            <MyButton
              onPress={() => {
                this.setState(
                  {
                    typeValue: 1
                  },
                  () => {
                    this.props.onChangeType(1);
                  }
                );
              }}
              style={[
                taoVoucherStyles.btnPercent,
                {
                  backgroundColor: typeValue === 1 ? COLOR.TEXT.POSITIVE_BTN : COLOR.TEXT.BLUE
                }
              ]}>
              <MyIcon
                size={16}
                iconFontType="MaterialCommunityIcons"
                name={typeValue === 1 ? 'radiobox-marked' : 'radiobox-blank'}
                color={typeValue === 1 ? COLOR.TEXT.WHITE : COLOR.TEXT.BLACK}
              />
              <MyText style={{color: typeValue === 1 ? COLOR.TEXT.WHITE : COLOR.TEXT.BLACK}}>
                %
              </MyText>
            </MyButton>
          </MyView>
        </MyView>
      </MyView>
    );
  }
}
