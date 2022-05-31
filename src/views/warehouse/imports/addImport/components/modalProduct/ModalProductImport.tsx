import React, {Component} from 'react';
import {StyleSheet, Modal, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {MyButton, MyImage, MyInput, MyText, MyTextPriceMask, MyView} from 'bases/components';
import {modalImportStyles} from '../../style/AddImport.Styles';
import Utilities from 'utils/Utilities';
import {ItemLineIndicator} from 'views/app/components/items';
import GiaTien from './GiaTien';
import SoLuong from './SoLuong';
import {IProductSale} from 'models/Product.Model';
import {BANG_GIA_CHUNG, IMAGE_SIZE} from 'common/Constants';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import ThanhTien from './ThanhTien';
import {setProductToImport} from '../../redux';
import {bindActionCreators} from 'redux';
import {IChooseBangGiaState} from 'views/warehouse/chonHangHoa/Productcategory/components/chooseBangGia/redux';

interface IProps extends IChooseBangGiaState {
  setProductToImport: typeof setProductToImport;
}

interface IStates {
  isVisible: boolean;
}

class ModalProductImport extends Component<IProps, IStates> {
  thanhTienRef: any = React.createRef();
  scrollRef: any = React.createRef();

  item: IProductSale | undefined = undefined;
  discount_type: number | 1 | 2 = 1;
  discount_value: number = 0;
  giaBanTam: number = 0;
  soLuong: number = 0;
  note: string = '';

  state = {isVisible: false};

  onShow = (item: IProductSale) => {
    this.item = item;
    this.discount_type = this.item.product.discount?.type || 1;
    this.discount_value = this.item.product.discount?.value || 0;
    this.soLuong = this.item.totalQty || 1;
    this.note = this.item.product.note || '';

    this.setState({
      isVisible: true
    });
  };

  onHide = () => {
    this.setState({
      isVisible: false
    });
  };

  submit = () => {
    if (this.item) {
      let sp: IProductSale = {
        product: {
          ...this.item.product,
          // discount_type: this.discount_type,
          // discount_value: this.discount_value,
          // giaBanTam: this.giaBanTam,
          note: this.note
        },
        price_books: BANG_GIA_CHUNG,
        totalQty: this.soLuong
      };
      this.props.setProductToImport(sp);
    }
    this.setState({
      isVisible: false
    });
  };

  changeDiscount = (type: number | 1 | 2, giaGiam: number, giaBan: number) => {
    this.discount_type = type;
    this.discount_value = giaGiam;
    this.giaBanTam = giaBan;

    this.thanhTienRef.current.setSoTien(this.soLuong * this.giaBanTam);
  };

  changeSoLuong = (soLuong: number) => {
    this.soLuong = soLuong;

    this.thanhTienRef.current.setSoTien(this.soLuong * this.giaBanTam);
  };

  setKeywordNote = (text: string) => {
    this.note = text;
  };

  shouldComponentUpdate(nextProps: IProps) {
    if (this.props.currentBangGia !== nextProps.currentBangGia) return false;
    return true;
  }

  render() {
    const {isVisible} = this.state;

    let source = Utilities.convertLinkImage('');
    if (
      this.item?.product.images &&
      this.item?.product.images.length > 0 &&
      this.item?.product.images[0]
    ) {
      source = Utilities.convertLinkImage(this.item?.product.images[0], IMAGE_SIZE.MEDIUM);
    }

    let giaBanGoc = this.item?.product.price || 0;

    this.giaBanTam = giaBanGoc;
    if (this.item?.product.price || this.item?.product.price === 0) {
      this.giaBanTam = this.item?.product.price;
    }

    let totalStock = 0;
    if (this.item?.product.stocks) {
      for (let index = 0; index < this.item?.product.stocks.length; index++) {
        const element = this.item?.product.stocks[index];
        if (element.total_quantity && element.total_quantity >= 0) {
          totalStock = totalStock + element.total_quantity;
        }
      }
    }

    return (
      <Modal
        visible={isVisible}
        transparent
        // supportedOrientations={['portrait', 'landscape']}
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
              <MyText myFontStyle="Medium" style={styles.title}>
                {this.item?.product.sku}
              </MyText>
            </MyView>
            <MyButton style={styles.btnTitle} transparent onPress={this.submit}>
              <MyText myFontStyle="Regular" style={styles.titleRight}>
                {'Lưu lại'}
              </MyText>
            </MyButton>
          </MyView>
          <MyView style={styles.line} />

          <ScrollView
            ref={this.scrollRef}
            keyboardShouldPersistTaps={'handled'}
            style={styles.modalContainer}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <MyView style={modalImportStyles.container} transparent>
              <MyImage
                style={modalImportStyles.image}
                height={modalImportStyles.image.height}
                width={modalImportStyles.image.width}
                source={source}
              />
              <MyView style={modalImportStyles.infoProdCenter} transparent>
                <MyText numberOfLines={2} style={modalImportStyles.textNameCenter}>
                  {this.item?.product.name}
                </MyText>
                <MyView style={modalImportStyles.viewTonKho}>
                  <MyTextPriceMask
                    text={giaBanGoc}
                    numberOfLines={1}
                    style={modalImportStyles.textPriceRight}
                  />
                  <MyView style={modalImportStyles.viewTonKho2}>
                    <MyText numberOfLines={1}>{'Tồn kho: '}</MyText>
                    <MyText
                      numberOfLines={1}
                      myFontStyle="Regular"
                      style={modalImportStyles.textStockRight}>
                      {totalStock}
                    </MyText>
                  </MyView>
                </MyView>
              </MyView>
            </MyView>
            <GiaTien
              type={this.discount_type}
              giaGoc={giaBanGoc}
              giaGiam={this.discount_value}
              giaBan={this.giaBanTam}
              onChangeDiscount={this.changeDiscount}
            />
            <ItemLineIndicator style={modalImportStyles.viewLine} />
            <SoLuong
              soLuong={this.soLuong}
              soLuongTon={totalStock}
              onChangeSoLuong={this.changeSoLuong}
            />
            <ItemLineIndicator style={modalImportStyles.viewLine} />
            <ThanhTien ref={this.thanhTienRef} giaBan={this.giaBanTam} soLuong={this.soLuong} />
            <ItemLineIndicator style={modalImportStyles.viewLine} />
            <MyText style={modalImportStyles.titleText}>Ghi chú</MyText>
            <MyInput
              numberOfLines={5}
              textAlignVertical={'top'}
              multiline
              defaultValue={this.note}
              placeholder={'Nhập ghi chú'}
              placeholderTextColor={COLOR.TEXT.SECONDARY}
              style={styles.textInput2}
              myFontStyle="Regular"
              onChangeText={this.setKeywordNote}
            />
          </ScrollView>
          <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container} />
        </MyView>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {currentBangGia} = state.ChooseBangGiaReducer;
  return {
    currentBangGia
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setProductToImport
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  ModalProductImport
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
  },
  textInput2: {
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8),
    height: MY_SIZE.s_140,
    fontSize: MY_SIZE.s_16,
    borderWidth: 1,
    borderColor: COLOR.TEXT.SECONDARY
  },
  textPriceLeft: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16),
    fontSize: MY_SIZE.s_18
  }
});
