import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {MyInput, MyView, MyButtonText} from 'bases/components';
import {COLOR, setMargin, MY_SIZE} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
import {postApiGroupCustomer} from 'services';

interface IProps {}
interface AppState {
  name?: string;
  note?: string;
}
export default class CreateGroupSupplier extends React.Component<IProps, AppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: '',
      note: ''
    };
  }
  createGroup = async () => {
    const {name, note} = this.state;
    if (name && name.length <= 0) {
      Utilities.showToast('Vui lòng nhập tên nhóm!');
      return;
    }
    try {
      const result: any = await postApiGroupCustomer({name: name, note: note, type: 'supplier'});
      if (result && !result.code) {
        Utilities.showToast(result.message, '', 'success');
        this.setState({
          name: '',
          note: ''
        });
      }
    } catch (error) {
      Utilities.logException('CreateGroupSupplier', error);
    }
  };
  render() {
    return (
      <MyView style={{flex: 1, backgroundColor: COLOR.BG.WHITE}}>
        <MyView style={styles.viewInput}>
          <Text style={{fontSize: MY_SIZE.s_16}}> Tên nhóm:</Text>
          <MyInput
            onChangeText={v => {
              this.setState({
                name: v
              });
            }}
            value={this.state.name}
            containerStyle={styles.inputNoteAdd}
            placeholder="Tên nhóm"
          />
        </MyView>
        <MyView style={styles.viewInput}>
          <Text style={{fontSize: MY_SIZE.s_16}}> Ghi chú:</Text>
          <MyInput
            onChangeText={v => {
              this.setState({
                note: v
              });
            }}
            value={this.state.note}
            containerStyle={styles.inputNoteAdd}
            placeholder="Ghi chú"
          />
        </MyView>
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
  viewInput: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  inputNoteAdd: {
    borderBottomColor: COLOR.BG.BLACK_30,
    borderBottomWidth: 1
  }
});
