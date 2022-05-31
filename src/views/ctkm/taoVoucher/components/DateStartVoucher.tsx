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

export default class DateStartVoucher extends React.Component<IProps, AppState> {
  dateRef: any = React.createRef();
  state = {
    valueDate: new Date()
  };
  onPressDate = () => {
    const {valueDate} = this.state;
    MyNavigator.pushModal('MyDatePickerModal', {
      title: 'Bắt đầu',
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
        <MyText style={taoVoucherStyles.textAdd}>Bắt đầu</MyText>
        <MyButton
          onPress={() => {
            this.onPressDate();
          }}
          style={taoVoucherStyles.viewInputAdd}>
          <MyInput
            editable={false}
            placeholder={'Bắt đầu'}
            value={Utilities.convertTimeByFormat(valueDate, 'DD/MM/YYYY HH:mm')}
          />
        </MyButton>
      </MyView>
    );
  }
}
