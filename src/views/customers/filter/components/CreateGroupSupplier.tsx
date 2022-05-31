import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {MyInput, MyView, MyButtonText} from 'bases/components';
import {COLOR, setMargin, MY_SIZE} from 'bases/styles/Core';
import ButtonDiscount from './createGroup/ButtonDiscount';
import {IGroupCustomer} from 'models/GroupCustomer.Model';
import AdvancedSettingCustomer from './createGroup/AdvancedSettingCustomer';
import AutoCustomer from './createGroup/AutoCustomer';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {postApiGroupCustomer} from 'services';
import MyNavigator from 'utils/MyNavigator';

interface IProps {
  arrList: any;
}
interface AppState {}
class CreateGroupCustomer extends React.Component<IProps, AppState> {
  mapValueCustomer: any;
  constructor(props: IProps) {
    super(props);
    this.mapValueCustomer = {};
  }
  onchangeValue = (key: keyof IGroupCustomer, text: any) => {
    this.mapValueCustomer[key] = text;
  };
  createGroup = async () => {
    if (!this.mapValueCustomer.name) {
      Utilities.showToast('Vui lòng nhập tên nhóm!');
      return;
    }
    let arrListNew: any = [];
    this.props.arrList.map((v: any) => {
      let objectNew = {
        applied_field: v.applied_field || '',
        applied_operation: v.applied_operation || '',
        applied_value: v.applied_value || ''
      };
      arrListNew.push(objectNew);
    });
    this.onchangeValue('conditions', arrListNew);
    try {
      const result: any = await postApiGroupCustomer(this.mapValueCustomer);
      if (result && !result.code) {
        Utilities.showToast(result.message, '', 'success');
        MyNavigator.goBack();
        return;
      }
      Utilities.showToast(result.message, '', 'warning');
    } catch (error) {
      Utilities.logException('CreateGroupCustomer', error);
    }
  };
  render() {
    return (
      <MyView style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <MyView style={styles.viewInput}>
            <Text style={{fontSize: MY_SIZE.s_16}}> Tên nhóm:</Text>
            <MyInput
              onChangeText={v => {
                this.onchangeValue('name', v);
              }}
              containerStyle={styles.inputNoteAdd}
              placeholder="Tên nhóm">
              {this.mapValueCustomer.name}
            </MyInput>
          </MyView>
          <MyView style={styles.viewInput}>
            <Text style={{fontSize: MY_SIZE.s_16}}> Giảm giá:</Text>

            <ButtonDiscount
              onDiscountType={v => {
                this.onchangeValue('discount_type', v);
              }}
              onDiscountValue={v => {
                this.onchangeValue('discount_value', v);
              }}
            />
          </MyView>
          <MyView style={styles.viewInput}>
            <Text style={{fontSize: MY_SIZE.s_16}}> Ghi chú:</Text>
            <MyInput
              onChangeText={v => {
                this.onchangeValue('note', v);
              }}
              containerStyle={styles.inputNoteAdd}
              placeholder="Ghi chú">
              {this.mapValueCustomer.note}
            </MyInput>
          </MyView>
          <AdvancedSettingCustomer />
          <AutoCustomer
            value={v => {
              this.onchangeValue('is_auto_updated', v);
            }}
          />
        </ScrollView>
        <MyButtonText
          onPress={() => {
            this.createGroup();
          }}
          title="Lưu lại"
          style={{...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)}}
        />
      </MyView>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.BG.WHITE},
  viewInput: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  inputNoteAdd: {
    borderBottomColor: COLOR.BG.BLACK_30,
    borderBottomWidth: 1
  }
});
const mapStateToProps = (state: RootState) => {
  const {arrList} = state.AdvancedSettingCustomerReducer;
  return {arrList};
};

export default connect(mapStateToProps, null)(CreateGroupCustomer);
