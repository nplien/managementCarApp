import {MyButton, MyText, MyView} from 'bases/components';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SuppliersStyle} from '../style/suppliers.Style';
import {RootState} from 'views/app/redux/App.Reducer';

interface ISortModalProps {
  showHideModal: (isModal: boolean) => void;
}

class SortModal extends PureComponent<ISortModalProps> {
  constructor(props: ISortModalProps) {
    super(props);
  }

  render() {
    return (
      <MyButton onPress={() => this.props.showHideModal(false)} style={[SuppliersStyle.sortModal]}>
        <MyView style={SuppliersStyle.modalView}>
          {CONFIG_SORT_FILTER.CUSTOMER.map((v, i) => {
            return (
              <MyButton
                style={SuppliersStyle.modalItem}
                onPress={() => {
                  this.props.showHideModal(false);
                }}
                key={i + v.name}>
                <MyText style={SuppliersStyle.textSort} myFontStyle={'Medium'}>
                  {v.name}
                </MyText>
              </MyButton>
            );
          })}
        </MyView>
      </MyButton>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {} = state;
  return {};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SortModal);
