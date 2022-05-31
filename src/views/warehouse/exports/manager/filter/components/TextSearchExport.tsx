import {MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  setKeywordCodeExport,
  setKeywordProductNameExport,
  setKeywordProductSkuExport,
  IExportOrderState
} from '../../redux';

import {styles} from '../styles/FilterExport.styles';

interface IProps extends IExportOrderState {
  setKeywordCodeExport: typeof setKeywordCodeExport;
  setKeywordProductSkuExport: typeof setKeywordProductSkuExport;
  setKeywordProductNameExport: typeof setKeywordProductNameExport;
}

interface IState {}

class TextSearchExport extends Component<IProps, IState> {
  setKeywordCodeExport = (text: string) => {
    this.props.setKeywordCodeExport(text);
  };
  setKeywordProductSkuExport = (text: string) => {
    this.props.setKeywordProductSkuExport(text);
  };
  setKeywordProductNameExport = (text: string) => {
    this.props.setKeywordProductNameExport(text);
  };

  render() {
    let {code, product_sku, product_name} = this.props;
    return (
      <MyView style={styles.statusContainerChild}>
        <MyInput
          defaultValue={code}
          placeholder={'Mã mã phiếu'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.setKeywordCodeExport(text)}
        />
        <MyInput
          defaultValue={product_sku}
          placeholder={'Mã hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.setKeywordProductSkuExport(text)}
        />
        <MyInput
          defaultValue={product_name}
          placeholder={'Mã tên hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.setKeywordProductNameExport(text)}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {code, product_sku, product_name} = state.ExportOrderReducer;
  return {code, product_sku, product_name};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {setKeywordCodeExport, setKeywordProductSkuExport, setKeywordProductNameExport},
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(TextSearchExport);
