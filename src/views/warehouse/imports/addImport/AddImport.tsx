import {MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import HeaderSearchImport from './components/HeaderSearchImport';
import HeaderSupplier from './components/HeaderSupplier';
import ListImportAdd from './components/ListImportAdd';
import {addImportStyle} from './style/AddImport.Styles';

export default class AddImport extends PureComponent {
  render() {
    return (
      <MyView style={addImportStyle.container}>
        <HeaderSearchImport />
        <HeaderSupplier />
        <ListImportAdd />
        {/* <BottomTotalImport /> */}
      </MyView>
    );
  }
}
