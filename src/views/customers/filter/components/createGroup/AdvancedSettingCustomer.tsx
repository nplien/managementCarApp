import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {setMargin, setPadding, COLOR, MY_SIZE} from 'bases/styles/Core';
import {MyView, MyButton, MyText, MyIcon, MyInput} from 'bases/components';
// import ItemAdvancedSetting from './ItemAdvancedSetting';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {addItem, clear} from './redux/AdvancedSettingCustomer.Reducer';
import {onDeleteItem, updateItem} from './redux/AdvancedSettingCustomer.Reducer';
import SelectCondition, {ListField} from './SelectCondition';
import ChooseValue, {ListOperation} from './ChooseValue';
import Utilities from 'utils/Utilities';
import MyNavigator from 'utils/MyNavigator';

interface IProps {
  arrList: any[];
  clear: typeof clear;
  addItem: typeof addItem;
  onDeleteItem: typeof onDeleteItem;
  updateItem: typeof updateItem;
}
interface AppState {}
class AdvancedSettingCustomer extends PureComponent<IProps, AppState> {
  componentWillUnmount() {
    this.props.clear();
  }
  buttonAddList = () => {
    this.props.addItem();
  };

  renderItem = (_value: any, index: number) => {
    let refCondition: any;
    let refChooseValue: any;
    const onPressBirthDay = () => {
      MyNavigator.pushModal('MyDatePickerModal', {
        title: 'Chọn ngày',
        titleButtonCancel: 'Huỷ',
        titleButtonChange: 'Chọn',
        value: _value.applied_value,
        onChange: handleToSelectedDate
      });
    };

    const handleToSelectedDate = (value: any) => {
      let condition = {
        applied_value: value
      };
      this.props.updateItem(condition, index);
    };
    return (
      <MyView style={styles.container} key={index.toString()}>
        <MyView style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <MyButton
            style={styles.selectCheck}
            onPress={() => {
              if (refCondition) {
                refCondition?.showHideModal();
              }
            }}>
            <MyText>{_value.valueCondition}</MyText>
            <MyIcon
              style={{paddingLeft: MY_SIZE.s_8}}
              iconFontType="AntDesign"
              name={'caretdown'}
              size={18}
              color={COLOR.TEXT.GRAY}
            />
          </MyButton>
          <MyButton
            style={{...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_12)}}
            onPress={() => {
              this.props.onDeleteItem(index);
            }}>
            <MyIcon iconFontType="Octicons" name={'trashcan'} size={20} color={COLOR.TEXT.GRAY} />
          </MyButton>
        </MyView>
        {_value.isShowInput ? (
          <MyView style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <MyButton
              style={[
                styles.selectCheck,
                {
                  ...setPadding(MY_SIZE.s_8, MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_12)
                }
              ]}
              onPress={() => {
                if (refChooseValue) {
                  refChooseValue?.showHideModal();
                }
              }}>
              <MyText>{_value.valueOperations}</MyText>
              <MyIcon
                style={{paddingLeft: MY_SIZE.s_8}}
                iconFontType="AntDesign"
                name={'caretdown'}
                size={18}
                color={COLOR.TEXT.GRAY}
              />
            </MyButton>
            <MyView style={{flex: 1}}>
              {_value.applied_field === 'created_at' ? (
                <MyButton
                  style={[
                    styles.selectCheck,
                    {
                      ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_12)
                    }
                  ]}
                  onPress={onPressBirthDay}>
                  <MyText>
                    {Utilities.convertTimeByFormat(_value?.applied_value || '', 'DD/MM/YYYY')}
                  </MyText>
                </MyButton>
              ) : (
                <MyInput
                  value={_value?.applied_value || ''}
                  onChangeText={(_v: any) => {
                    let condition = {
                      applied_value: _v
                    };
                    this.props.updateItem(condition, index);
                  }}
                  containerStyle={styles.inputNoteAdd}
                />
              )}
            </MyView>
          </MyView>
        ) : null}
        <SelectCondition
          ref={ref => (refCondition = ref)}
          id={_value?.applied_field || ''}
          onSelect={(valueSelect: ListField) => {
            let condition = {
              applied_field: valueSelect.id,
              isShowInput: valueSelect.isShowInput,
              valueCondition: valueSelect.name
            };
            this.props.updateItem(condition, index);
          }}
        />
        <ChooseValue
          ref={ref => (refChooseValue = ref)}
          id={_value?.applied_operation || ''}
          onSelect={(valueSelect: ListOperation) => {
            let condition = {
              applied_operation: valueSelect.id,
              valueOperations: valueSelect.name
            };
            this.props.updateItem(condition, index);
          }}
        />
      </MyView>
    );
  };
  render() {
    return (
      <MyView style={styles.container1}>
        <MyText style={styles.textTittle}>Thiết lập nâng cao</MyText>
        {this.props.arrList.map(this.renderItem)}
        <MyButton style={styles.btn} onPress={this.buttonAddList}>
          <MyIcon iconFontType="AntDesign" name={'plus'} size={20} color={COLOR.TEXT.GRAY} />
          <MyText style={styles.textView}>Thêm điều kiện</MyText>
        </MyButton>
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  textTittle: {
    fontSize: MY_SIZE.s_16
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    ...setMargin(MY_SIZE.s_6, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    width: 150
  },
  textView: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)
  },

  selectCheck: {
    flexDirection: 'row',
    borderBottomColor: COLOR.BG.BLACK_30,
    borderBottomWidth: 1,
    ...setPadding(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_12),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4)
  },
  container: {
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0)
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

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({addItem, clear, onDeleteItem, updateItem}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSettingCustomer);
