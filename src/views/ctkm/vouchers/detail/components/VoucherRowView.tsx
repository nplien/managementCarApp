import {MyText, MyTextPriceMask, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {voucherStyles} from '../../manager/styles/Voucher.styles';

interface IVoucherRowViewProps {
  title: string;
  value: string | number;
  isTextMask?: boolean;
}

export default class VoucherRowView extends PureComponent<IVoucherRowViewProps> {
  render() {
    const {title, value, isTextMask} = this.props;
    return (
      <MyView style={voucherStyles.containerRow}>
        <MyText myFontStyle={'Bold'}> {title} </MyText>
        {isTextMask ? (
          <MyTextPriceMask
            text={value}
            myFontStyle={'Regular'}
            style={voucherStyles.textInfoSmall}
          />
        ) : (
          <MyText myFontStyle={'Regular'} style={voucherStyles.textInfoSmall}>
            {value}
          </MyText>
        )}
      </MyView>
    );
  }
}
