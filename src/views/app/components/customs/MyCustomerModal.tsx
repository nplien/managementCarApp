import React, {PureComponent} from 'react';
import {StyleSheet, Modal, FlatList, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {
  MyButton,
  MyButtonText,
  MyIcon,
  MyInputNew,
  MyLoading,
  MyText,
  MyView
} from 'bases/components';
import {ItemLineIndicator} from 'views/app/components/items';
import {CustomerModel} from 'models/Customer.Model';
import {ICustomerState} from 'views/customers/manager/redux';
import {getApiCustomer} from 'services';

interface IPropsCustomerItem {
  isSelected: boolean;
  customer: CustomerModel;
  onCustomerSelected: (customer: CustomerModel) => void;
}

class CustomerItem extends PureComponent<IPropsCustomerItem> {
  onCustomerSelected = () => {
    this.props.onCustomerSelected(this.props.customer);
  };

  render() {
    const {customer, isSelected} = this.props;

    return (
      <MyButton onPress={this.onCustomerSelected} style={itemStoretyles.content}>
        <MyText myFontStyle="Regular" style={itemStoretyles.text}>
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

interface IProps extends ICustomerState {
  onApDung: (arrCustomerDaChon: CustomerModel[]) => void;
}

interface IStates {
  isVisible: boolean;
  arrCustomerDaChon: CustomerModel[];
  keyword: string;

  isFirstLoading: boolean;
  isRefresh: boolean;
  arrCustomer: CustomerModel[];
  isLoadMore: boolean;
  isStop: boolean;
  isError: boolean;

  numberOfRefresh: number;
}

class MyCustomerModal extends PureComponent<IProps> {
  state: IStates = {
    isVisible: false,
    arrCustomerDaChon: [],
    keyword: '',

    isFirstLoading: true,
    isRefresh: false,
    arrCustomer: [],
    isLoadMore: false,
    isStop: false,
    isError: false,

    numberOfRefresh: 0
  };

  limit: number = 10;

  componentDidMount() {
    getApiCustomer({skip: 0, limit: this.limit, status: 'active', keyword: this.state.keyword})
      .then(res => {
        if (res.code) {
          this.setState({
            isFirstLoading: false,
            isError: true,
            isRefresh: false
          });
        } else {
          if (res.data?.length) {
            this.setState({
              isFirstLoading: false,
              arrCustomer: res.data,
              isRefresh: false,
              isStop: res.data?.length < this.limit
            });
          } else {
            this.setState({
              isFirstLoading: false,
              arrCustomer: res.data,
              isRefresh: false,
              isStop: false
            });
          }
        }
      })
      .catch(() => {
        this.setState({
          isFirstLoading: false,
          isError: true,
          isRefresh: false
        });
      });
  }

  onShow = (customerDaChon: CustomerModel[]) => {
    this.setState({
      isVisible: true,
      arrCustomerDaChon: [...customerDaChon]
    });
  };

  onHide = () => {
    this.setState({
      isVisible: false
    });
  };

  onCustomerSelected = (customer: CustomerModel) => {
    const {arrCustomerDaChon} = this.state;

    let arrCusDaChon = [...arrCustomerDaChon];
    let found = arrCusDaChon.findIndex((x: CustomerModel) => x.id === customer.id);
    if (found > -1) {
      arrCusDaChon.splice(found, 1);
    } else {
      arrCusDaChon = [customer];
    }

    this.setState({
      arrCustomerDaChon: arrCusDaChon,
      numberOfRefresh: this.state.numberOfRefresh + 1
    });
  };

  onChangeKeyword = (text: string) => {
    this.setState({
      keyword: text
    });
  };

  onClearKeyword = () => {
    this.setState(
      {
        keyword: null,
        arrCustomerDaChon: [],
        isRefresh: true
      },
      () => {
        this.componentDidMount();
      }
    );
  };

  onSearchKeyword = () => {
    this.setState(
      {
        arrCustomerDaChon: [],
        isRefresh: true
      },
      () => {
        this.componentDidMount();
      }
    );
  };

  reload = () => {
    this.setState(
      {
        isRefresh: true
      },
      () => {
        this.componentDidMount();
      }
    );
  };

  submit = () => {
    this.setState(
      {
        isVisible: false
      },
      () => {
        const {arrCustomerDaChon} = this.state;
        this.props.onApDung(arrCustomerDaChon);
      }
    );
  };

  renderItem = ({item}: {item: CustomerModel}) => {
    const {arrCustomerDaChon} = this.state;
    let isSelected = false;
    if (arrCustomerDaChon.findIndex((x: CustomerModel) => x.id === item.id) > -1) {
      isSelected = true;
    }

    return (
      <CustomerItem
        isSelected={isSelected}
        customer={item}
        onCustomerSelected={this.onCustomerSelected}
      />
    );
  };

  keyExtractor = (_item: CustomerModel, index: number) => {
    return 'CustomerModel-' + index;
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  onEndReached = () => {
    const {arrCustomer, isLoadMore, isStop} = this.state;

    if (isLoadMore || isStop) {
      return;
    }

    this.setState(
      {
        isLoadMore: true
      },
      () => {
        getApiCustomer({
          skip: arrCustomer.length,
          limit: this.limit,
          status: 'active',
          keyword: this.state.keyword
        })
          .then(res => {
            if (res.code) {
              this.setState({
                isFirstLoading: false,
                isError: true,
                isRefresh: false,
                isLoadMore: false
              });
            } else {
              if (res.data?.length) {
                this.setState({
                  isFirstLoading: false,
                  arrCustomer: this.state.arrCustomer.concat(res.data),
                  isRefresh: false,
                  isStop: res.data?.length < this.limit,
                  isLoadMore: false
                });
              } else {
                this.setState({
                  isFirstLoading: false,
                  arrCustomer: this.state.arrCustomer.concat(res.data || []),
                  isRefresh: false,
                  isStop: false,
                  isLoadMore: false
                });
              }
            }
          })
          .catch(() => {
            this.setState({
              isFirstLoading: false,
              isError: true,
              isRefresh: false,
              isLoadMore: false
            });
          });
      }
    );
  };

  renderListFooterComponent = () => {
    const {isLoadMore} = this.state;
    if (isLoadMore) {
      return (
        <MyView style={styles.viewLoadmore}>
          <MyLoading />
        </MyView>
      );
    }
    return <MyView style={styles.viewLoadmore} />;
  };

  renderListEmptyComponent = () => {
    if (this.props.isFirstLoading) {
      return (
        <MyView style={styles.viewLoadmore}>
          <MyLoading />
        </MyView>
      );
    }
    if (this.props.isError) {
      return (
        <MyView style={styles.emptyCustomer}>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText onPress={this.reload} title="Tải lại" style={styles.BtnEmpty} />
        </MyView>
      );
    } else {
      return (
        <MyView style={styles.emptyCustomer}>
          <MyText>Dữ liệu trống</MyText>
        </MyView>
      );
    }
  };

  render() {
    const {isVisible, keyword, arrCustomer, isRefresh, numberOfRefresh} = this.state;

    return (
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
                {'Chọn khách hàng'}
              </MyText>
            </MyView>
            <MyButton style={styles.btnTitle} transparent onPress={this.submit}>
              <MyText myFontStyle="Regular" style={styles.titleRight}>
                {'Áp dụng'}
              </MyText>
            </MyButton>
          </MyView>
          <MyView style={styles.line} />
          <MyView style={styles.containerInput}>
            <MyInputNew
              style={styles.inputSearch}
              value={keyword}
              onChangeText={this.onChangeKeyword}
              placeholder="Tìm theo tên..."
              returnKeyType="search"
              onSubmitEditing={this.onSearchKeyword}
            />
            {keyword ? (
              <MyIcon
                iconFontType="AntDesign"
                name="close"
                onPress={this.onClearKeyword}
                size={24}
                style={styles.iconSearch}
              />
            ) : null}
          </MyView>

          <FlatList
            style={styles.modalContainer}
            refreshControl={<RefreshControl refreshing={isRefresh} />}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={arrCustomer}
            extraData={numberOfRefresh}
            initialNumToRender={10}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.renderItemSeparatorComponent}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderListFooterComponent}
            ListEmptyComponent={this.renderListEmptyComponent}
          />
          <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container} />
        </MyView>
      </Modal>
    );
  }
}

export default MyCustomerModal;

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
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputSearch: {
    borderRadius: 16,
    paddingVertical: 8,
    margin: 8,
    backgroundColor: COLOR.BG.SECONDARY,
    flex: 1
  },
  iconSearch: {
    position: 'absolute',
    right: 16
  },
  viewLoadmore: {
    height: 50
  },
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  BtnEmpty: {...setMargin(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)}
});

const itemStoretyles = StyleSheet.create({
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
