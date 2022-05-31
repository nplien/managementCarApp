import React, {Component, PureComponent} from 'react';
import {StyleSheet, Modal, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLOR, MY_SIZE, setPadding, setRadius} from 'bases/styles/Core';
import {MyButton, MyIcon, MyInputNew, MyText, MyView} from 'bases/components';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {ItemLineIndicator} from 'views/app/components/items';
import {IStaffModel} from 'models/Staff.Model';
import {getAllStaff, ICreateByState} from 'views/employees/QLNhanVien/redux';
import {bindActionCreators} from 'redux';

interface IPropsStaffItem {
  isSelected: boolean;
  staff: IStaffModel;
  onStaffSelected: (staff: IStaffModel) => void;
}

class StaffItem extends Component<IPropsStaffItem> {
  onStaffSelected = () => {
    this.props.onStaffSelected(this.props.staff);
  };

  render() {
    const {staff, isSelected} = this.props;

    return (
      <MyButton onPress={this.onStaffSelected} style={itemStoretyles.content}>
        <MyText myFontStyle="Regular" style={itemStoretyles.text}>
          {staff.name}
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

interface IProps extends ICreateByState {
  onApDung: (arrStaff: IStaffModel[]) => void;
  getAllStaff: typeof getAllStaff;
}

interface IStates {
  isVisible: boolean;
  arrStaffDaChon: IStaffModel[];
  isApDung: boolean;
  keyword: string;
}

class MyStaffModal extends PureComponent<IProps> {
  state: IStates = {isVisible: false, arrStaffDaChon: [], isApDung: true, keyword: ''};

  componentDidMount() {
    const {arrStaffs} = this.props;
    if (arrStaffs?.length === 0) this.props.getAllStaff();
  }

  onShow = (staffDaChon: IStaffModel[]) => {
    const {arrStaffs} = this.props;
    if (staffDaChon?.length === arrStaffs?.length) {
      let data: IStaffModel[] = [{id: 'TAT_CA', name: 'Tất cả'}];
      data = data.concat(arrStaffs || []);

      this.setState({
        isVisible: true,
        arrStaffDaChon: data
      });
    } else {
      this.setState({
        isVisible: true,
        arrStaffDaChon: [...staffDaChon]
      });
    }
  };

  onHide = () => {
    this.setState({
      isVisible: false
    });
  };

  onStaffSelected = (staff: IStaffModel) => {
    const {arrStaffs} = this.props;
    const {arrStaffDaChon} = this.state;

    if (staff.id === 'TAT_CA') {
      let found = arrStaffDaChon.findIndex((x: IStaffModel) => x.id === staff.id);
      if (found > -1) {
        this.setState({
          arrStaffDaChon: [],
          isApDung: false
        });
      } else {
        let data: IStaffModel[] = [{id: 'TAT_CA', name: 'Tất cả'}];
        data = data.concat(arrStaffs || []);

        this.setState({
          arrStaffDaChon: data,
          isApDung: true
        });
      }
    } else {
      let found = arrStaffDaChon.findIndex((x: IStaffModel) => x.id === staff.id);
      if (found > -1) {
        arrStaffDaChon.splice(found, 1);

        let foundAll = arrStaffDaChon.findIndex((x: IStaffModel) => x.id === 'TAT_CA');
        if (foundAll > -1) {
          arrStaffDaChon.splice(foundAll, 1);
        }
      } else {
        arrStaffDaChon.push(staff);
        if (arrStaffDaChon.length === arrStaffs?.length) {
          arrStaffDaChon.unshift({id: 'TAT_CA', name: 'Tất cả'});
        }
      }
      this.setState({
        arrStaffDaChon: [...arrStaffDaChon],
        isApDung: arrStaffDaChon.length > 0
      });
    }
  };

  onChangeKeyword = (text: string) => {
    this.setState({
      keyword: text
    });
  };

  onClearKeyword = () => {
    this.setState({
      keyword: null
    });
  };

  submit = () => {
    this.setState(
      {
        isVisible: false
      },
      () => {
        const {arrStaffDaChon} = this.state;
        let foundAll = arrStaffDaChon.findIndex((x: IStaffModel) => x.id === 'TAT_CA');
        if (foundAll > -1) {
          arrStaffDaChon.splice(foundAll, 1);
        }
        this.props.onApDung(arrStaffDaChon);
      }
    );
  };

  renderItem = ({item}: {item: IStaffModel}) => {
    const {arrStaffDaChon} = this.state;
    let isSelected = false;
    if (arrStaffDaChon.findIndex((x: IStaffModel) => x.id === item.id) > -1) {
      isSelected = true;
    }
    return (
      <StaffItem isSelected={isSelected} staff={item} onStaffSelected={this.onStaffSelected} />
    );
  };

  keyExtractor = (_item: IStaffModel, index: number) => {
    return 'Staff-' + index;
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  render() {
    const {isVisible, isApDung, keyword} = this.state;
    const {arrStaffs} = this.props;

    let data: IStaffModel[] = [{id: 'TAT_CA', name: 'Tất cả'}];
    data = data.concat(arrStaffs || []);
    if (keyword) {
      data = data.filter(
        x =>
          String(x.name).toUpperCase().includes(keyword.toUpperCase()) ||
          String(x.phone).toUpperCase().includes(keyword.toUpperCase())
      );
    }

    return (
      <Modal
        visible={isVisible}
        transparent
        // supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        hardwareAccelerated
        onRequestClose={this.onHide}>
        {/* <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container}> */}
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
                {'Chọn nhân viên'}
              </MyText>
            </MyView>
            <MyButton
              style={styles.btnTitle}
              transparent
              onPress={this.submit}
              disabled={!isApDung}>
              <MyText
                myFontStyle="Regular"
                style={[
                  styles.titleRight,
                  {color: isApDung ? COLOR.TEXT.BLUE : COLOR.TEXT.SECONDARY}
                ]}>
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
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={data}
            extraData={data}
            initialNumToRender={10}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.renderItemSeparatorComponent}
          />
          <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container} />
        </MyView>
        {/* </SafeAreaView> */}
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrStaffs} = state.QLNhanVienReducer;
  return {arrStaffs};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({getAllStaff}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(MyStaffModal);

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
  }
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
