import React from 'react';
import {View, Modal, FlatList} from 'react-native';
import {MyView, MyButton, MyText} from 'bases/components';
import {FilterCustomerStyle} from '../../styles/FilterCustomer.style';
import {ItemLineIndicator} from 'views/app/components/items';
import {LIST_OPERATION} from 'common/Constants';
import {setPadding, COLOR, MY_SIZE} from 'bases/styles/Core';

interface IProps {
  onSelect: (valueObject: ListOperation) => void;
  id: string;
}
interface AppState {
  isModal: boolean;
  arrModal: ListOperation[];
}
export interface ListOperation {
  id: string;
  name: string;
}
export default class ChooseValue extends React.Component<IProps, AppState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isModal: false,
      arrModal: LIST_OPERATION
    };
  }
  showHideModal = () => {
    this.setState({
      isModal: true
    });
  };
  hideModal = () => {
    this.setState({
      isModal: false
    });
  };
  renderItemSelectCondition = ({item}: {item: ListOperation}) => {
    const {id} = this.props;
    return (
      <MyButton
        style={{
          backgroundColor: id === item.id ? COLOR.TEXT.BLUE : COLOR.BG.WHITE,
          ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12)
        }}
        onPress={() => {
          this.props.onSelect(item);
          this.hideModal();
        }}>
        <MyText
          style={{
            fontSize: MY_SIZE.s_16,
            color: id === item.id ? COLOR.TEXT.WHITE : COLOR.TEXT.BLACK
          }}>
          {item.name}
        </MyText>
      </MyButton>
    );
  };
  render() {
    const {arrModal} = this.state;
    return (
      <View>
        <Modal
          visible={this.state.isModal}
          onRequestClose={this.hideModal}
          animationType="slide"
          hardwareAccelerated
          transparent>
          <MyView style={FilterCustomerStyle.container2}>
            <MyButton
              style={FilterCustomerStyle.containerToolbar}
              transparent
              onPress={this.hideModal}
              activeOpacity={1}
            />

            <MyView style={FilterCustomerStyle.content}>
              <MyButton style={FilterCustomerStyle.btnTitle} transparent onPress={this.hideModal}>
                <MyText myFontStyle="Regular" style={FilterCustomerStyle.titleLeft}>
                  {'Huỷ bỏ'}
                </MyText>
              </MyButton>
              <MyView style={FilterCustomerStyle.btnTitle2} transparent>
                <MyText myFontStyle="Bold" style={FilterCustomerStyle.title}>
                  {'Chọn giá trị'}
                </MyText>
              </MyView>
              <MyText style={FilterCustomerStyle.btnTitle} />
            </MyView>
            <MyView style={FilterCustomerStyle.line} />
            <FlatList
              style={FilterCustomerStyle.modalContainer}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={arrModal}
              extraData={arrModal}
              initialNumToRender={10}
              renderItem={this.renderItemSelectCondition}
              keyExtractor={(_item, index) => String(index)}
              ItemSeparatorComponent={() => <ItemLineIndicator />}
            />
          </MyView>
        </Modal>
      </View>
    );
  }
}
