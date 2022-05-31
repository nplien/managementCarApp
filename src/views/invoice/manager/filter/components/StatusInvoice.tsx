import {MyButton, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {INVOICE_LIST} from 'configs/StatusConfig';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {IInvoiceOrderState} from 'views/invoice/manager/redux';

interface IProps extends IInvoiceOrderState {}

interface IState {
  arrStatus: any;
  arrCurrentStatusTmp: any;
}

class StatusOrder extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      arrStatus: INVOICE_LIST,
      arrCurrentStatusTmp: this.props.arrCurrentStatusInvoice
        ? [...this.props.arrCurrentStatusInvoice]
        : []
    };
  }

  selectStatus = (status: any) => {
    try {
      let arrCurrentStatusTmp = this.state.arrCurrentStatusTmp;
      let idxFound = arrCurrentStatusTmp.findIndex((x: any) => x.id === status.id);
      if (idxFound > -1) {
        arrCurrentStatusTmp.splice(idxFound, 1);
      } else {
        arrCurrentStatusTmp.push(status);
      }
      this.setState({
        arrCurrentStatusTmp
      });
    } catch (error) {
      Utilities.logException('StatusInvoice', error);
    }
  };

  render() {
    let {arrStatus, arrCurrentStatusTmp} = this.state;
    return (
      <MyView style={styles.viewStatus}>
        {arrStatus.map((v: any, index: number) => {
          let isActive = arrCurrentStatusTmp.findIndex((x: any) => x.id === v.id) > -1;
          return (
            <MyButton
              key={index.toString()}
              style={[
                styles.statusText,
                {
                  backgroundColor: isActive ? COLOR.TEXT.BLUE : COLOR.BG.WHITE
                }
              ]}
              onPress={() => this.selectStatus(v)}>
              <MyText
                myFontStyle="Regular"
                style={[
                  styles.myText,
                  {
                    color: isActive ? COLOR.TEXT.WHITE : COLOR.TEXT.BLACK
                  }
                ]}>
                {v.name}
              </MyText>
            </MyButton>
          );
        })}
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  statusText: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_10, MY_SIZE.s_10),
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0),
    borderWidth: 1,
    borderColor: COLOR.BG.SECONDARY,
    borderRadius: MY_SIZE.s_6
  },
  viewStatus: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  myText: {
    fontSize: MY_SIZE.s_16
  }
});

const mapStateToProps = (state: RootState) => {
  let {arrCurrentStatusInvoice} = state.InvoiceOrderReducer;
  return {arrCurrentStatusInvoice};
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(StatusOrder);
