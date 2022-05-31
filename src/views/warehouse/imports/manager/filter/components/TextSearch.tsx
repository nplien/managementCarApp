import {MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  IImportOrderState,
  setKeywordCodeImport,
  setKeywordNoteImport,
  setKeywordProduct_nameImport,
  setKeywordProduct_skuImport
} from '../../redux';

import {styles} from '../styles/ImportFilter.styles';

interface IProps extends IImportOrderState {
  setKeywordCodeImport: typeof setKeywordCodeImport;
  setKeywordNoteImport: typeof setKeywordNoteImport;
  setKeywordProduct_skuImport: typeof setKeywordProduct_skuImport;
  setKeywordProduct_nameImport: typeof setKeywordProduct_nameImport;
}

interface IState {
  arrStatus: any;
  arrCurrentStatusTmp: any;
}

class TextSearch extends Component<IProps, IState> {
  setKeywordCodeImport = (text: string) => {
    this.props.setKeywordCodeImport(text);
  };
  setKeywordNoteImport = (text: string) => {
    this.props.setKeywordNoteImport(text);
  };
  setKeywordProduct_skuImport = (text: string) => {
    this.props.setKeywordProduct_skuImport(text);
  };
  setKeywordProduct_nameImport = (text: string) => {
    this.props.setKeywordProduct_nameImport(text);
  };

  render() {
    let {code, note, product_sku, product_name} = this.props;
    return (
      <MyView style={styles.statusContainerChild}>
        <MyInput
          defaultValue={code}
          placeholder={'Mã phiếu nhập'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.setKeywordCodeImport(text)}
        />
        <MyInput
          defaultValue={note}
          placeholder={'Ghi chú'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.setKeywordNoteImport(text)}
        />
        <MyInput
          defaultValue={product_sku}
          placeholder={'Mã hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.setKeywordProduct_skuImport(text)}
        />
        <MyInput
          defaultValue={product_name}
          placeholder={'Tên hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.setKeywordProduct_nameImport(text)}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {code, note, product_sku, product_name} = state.ImportOrderReducer;
  return {code, note, product_sku, product_name};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setKeywordCodeImport,
      setKeywordNoteImport,
      setKeywordProduct_skuImport,
      setKeywordProduct_nameImport
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(TextSearch);
