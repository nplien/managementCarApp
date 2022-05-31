import {MyButton, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {IMPORT_LIST} from 'configs/StatusConfig';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {setStatusImport, IImportOrderState} from '../../redux';

interface IProps extends IImportOrderState {
  setStatusImport: typeof setStatusImport;
}

interface IState {
  arrStatus: any;
  arrCurrentStatusTmp: any;
}

class StatusImport extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      arrStatus: IMPORT_LIST,
      arrCurrentStatusTmp: this.props.arrCurrentStatus ? [...this.props.arrCurrentStatus] : []
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
      Utilities.logException('StatusImport', error);
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
              key={index + ''}
              onPress={() => this.selectStatus(v)}
              style={[
                styles.statusText,
                {
                  backgroundColor: isActive ? COLOR.TEXT.BLUE : COLOR.BG.WHITE
                }
              ]}>
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
    borderColor: COLOR.BG.BLACK_10,
    borderWidth: 1,
    borderRadius: MY_SIZE.s_6
  },
  myText: {
    fontSize: MY_SIZE.s_16
  },
  viewStatus: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  }
});

const mapStateToProps = (state: RootState) => {
  let {arrCurrentStatus} = state.ImportOrderReducer;
  return {arrCurrentStatus};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setStatusImport}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(StatusImport);
