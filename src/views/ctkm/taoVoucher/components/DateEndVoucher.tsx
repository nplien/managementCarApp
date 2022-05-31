import * as React from 'react';
import {MyView, MyButton, MyText, MyInput} from 'bases/components';
import {taoVoucherStyles} from '../styles/TaoVoucher.Styles';
import Utilities from 'utils/Utilities';
import MyNavigator from 'utils/MyNavigator';

interface IProps {
  changeDate: (value: Date) => void;
}

interface AppState {
  valueDate: Date;
}

export default class DateEndVoucher extends React.Component<IProps, AppState> {
  state = {
    valueDate: new Date()
  };
  onPressDate = () => {
    const {valueDate} = this.state;
    MyNavigator.pushModal('MyDatePickerModal', {
      title: 'Kết thúc',
      titleButtonCancel: 'Huỷ',
      titleButtonChange: 'Chọn',
      value: valueDate,
      mode: 'datetime',
      onChange: this.handleToSelectedDate
    });
  };

  handleToSelectedDate = (value: any) => {
    this.setState({valueDate: value});
    this.props.changeDate(value);
  };
  public render() {
    const {valueDate} = this.state;
    return (
      <MyView style={taoVoucherStyles.containerChild}>
        <MyText style={taoVoucherStyles.textAdd}>Kết thúc</MyText>
        <MyButton
          onPress={() => {
            this.onPressDate();
          }}
          style={taoVoucherStyles.viewInputAdd}>
          <MyInput
            editable={false}
            placeholder={'Kết thúc'}
            value={Utilities.convertTimeByFormat(valueDate, 'DD/MM/YYYY HH:mm ')}
          />
        </MyButton>
      </MyView>
    );
  }
}
