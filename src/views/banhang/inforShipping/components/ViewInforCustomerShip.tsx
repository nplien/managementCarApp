import {MyView, MyText, MyIcon, MyButton} from 'bases/components';
import {IAddressModel} from 'models/Customer.Model';
import React, {Component, PureComponent} from 'react';
import {inforShipStyles} from '../style/InforShipping.Styles';
import {StyleSheet, Modal, FlatList} from 'react-native';
import {COLOR, MY_SIZE, setPadding, setRadius} from 'bases/styles/Core';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  IInforShippingState,
  IRequestShip,
  setInforCustomerShip,
  setObjectInforShip
} from '../redux';
interface IPropscustomer {
  isSelected: boolean;
  customer: IAddressModel;
  addcustomerSelected: (customer: IAddressModel) => void;
}

class CustomerItem extends Component<IPropscustomer> {
  onSelectcustomer = () => {
    this.props.addcustomerSelected(this.props.customer);
  };

  render() {
    const {customer, isSelected} = this.props;

    return (
      <MyButton onPress={this.onSelectcustomer} style={itemcustomertyles.content}>
        <MyText myFontStyle="Regular" style={itemcustomertyles.text}>
          {customer.name}
        </MyText>
        <MyIcon
          name="check"
          iconFontType="AntDesign"
          size={22}
          color={isSelected ? COLOR.TEXT.BLUE : COLOR.TEXT.WHITE}
        />
      </MyButton>
    );
  }
}
interface IProps extends IInforShippingState {
  arrAddress: IAddressModel[];
  setInforCustomerShip: typeof setInforCustomerShip;
  setObjectInforShip: typeof setObjectInforShip;
  onSelectAddress: (address: IRequestShip) => void;
}

interface IStates {
  isVisible: boolean;
}

class ViewInforCustomerShip extends PureComponent<IProps, IStates> {
  state = {isVisible: false};

  onShow = () => {
    this.setState({
      isVisible: true
    });
  };

  onHide = () => {
    this.setState({
      isVisible: false
    });
  };
  onSelectcustomer = (customer: IAddressModel) => {
    let dataCustomer: IRequestShip = {
      receiver_address: customer.address,
      receiver_province: customer.province,
      receiver_district: customer.district,
      receiver_ward: customer.ward,
      receiver_name: customer.name,
      receiver_phone: customer.phone
    };
    this.onHide();
    this.props.onSelectAddress(dataCustomer);
    this.props.setObjectInforShip(dataCustomer);
    this.props.setInforCustomerShip(customer);
  };

  renderItem = ({item}: {item: IAddressModel}) => {
    let isSelected = false;
    const {inforCustomerShip} = this.props;
    if (inforCustomerShip?.id === item.id) {
      isSelected = true;
    }
    return (
      <CustomerItem
        isSelected={isSelected}
        customer={item}
        addcustomerSelected={this.onSelectcustomer}
      />
    );
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };
  render() {
    const {isVisible} = this.state;
    const {arrAddress} = this.props;
    return (
      <>
        <MyView style={inforShipStyles.containerChild}>
          <MyText
            style={[inforShipStyles.txtTitle, {paddingVertical: MY_SIZE.s_16}]}
            myFontStyle="Regular">
            Danh sách người nhận
          </MyText>
          <MyButton style={{paddingRight: MY_SIZE.s_8}} onPress={this.onShow}>
            <MyIcon iconFontType="FontAwesome5" name="address-book" size={22} />
          </MyButton>
        </MyView>
        <MyView style={inforShipStyles.line} />
        <Modal
          visible={isVisible}
          transparent
          animationType="slide"
          hardwareAccelerated
          onRequestClose={this.onHide}>
          <MyView style={styles.container2}>
            <MyButton
              style={styles.containerToolbar}
              transparent
              onPress={this.onHide}
              activeOpacity={1}
            />

            <MyView style={styles.content}>
              <MyButton style={styles.btnTitle} transparent onPress={this.onHide}>
                <MyText myFontStyle="Regular" style={styles.titleLeft}>
                  {'Huỷ bỏ'}
                </MyText>
              </MyButton>
              <MyView style={styles.btnTitle2} transparent>
                <MyText myFontStyle="Bold" style={styles.title}>
                  {'Danh sách người nhận'}
                </MyText>
              </MyView>
              <MyText style={styles.btnTitle} />
            </MyView>
            <MyView style={styles.line} />

            <FlatList
              style={styles.modalContainer}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={arrAddress}
              extraData={arrAddress}
              initialNumToRender={10}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.renderItemSeparatorComponent}
            />
            <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container} />
          </MyView>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {inforCustomerShip} = state.InforShippingReducer;
  return {inforCustomerShip};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setInforCustomerShip, setObjectInforShip}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  ViewInforCustomerShip
);
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE
  },
  container2: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK_30
  },
  containerToolbar: {
    height: MY_SIZE.s_75
  },
  content: {
    ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0),
    height: MY_SIZE.s_46,
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row'
  },
  btnTitle: {
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  },
  btnTitle2: {
    flex: 2,
    height: '100%',
    justifyContent: 'center'
  },
  titleLeft: {
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0),
    color: COLOR.TEXT.BLUE,
    textAlign: 'left'
  },
  title: {
    fontSize: MY_SIZE.s_18,
    textAlign: 'center'
  },
  titleRight: {
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16),
    color: COLOR.TEXT.BLUE,
    textAlign: 'right'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.TEXT.PRIMARY
  }
});

const itemcustomertyles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: MY_SIZE.s_16
  },
  content: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  content2: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_0, MY_SIZE.s_16)
  }
});
