import * as React from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {MyView, MyText, MyButton, MyImage} from 'bases/components';
import {COLOR, setPadding, setMargin, setRadius, MY_SIZE} from 'bases/styles/Core';
import {IStoreModel} from 'models/Store.Model';
import Utilities from 'utils/Utilities';
import {IMAGE_SIZE} from 'common/Constants';

interface IProps {
  ItemBranch: IStoreModel;
  onPress: () => void;
  propsStyle?: StyleProp<ViewStyle>;
}

export default class ItemBranch extends React.Component<IProps, any> {
  public render() {
    const {name, status, address, logo, province, district, ward} = this.props.ItemBranch;
    const {propsStyle} = this.props;
    let isActive = status === 'active';
    let addressStr = '';
    addressStr += address;
    addressStr += ', ' + ward?.name;
    addressStr += ', ' + district?.name;
    addressStr += ', ' + province?.name;

    return (
      <MyButton style={[styles.contentItem, propsStyle]} onPress={this.props.onPress}>
        <MyView>
          <MyImage
            resizeMode={'cover'}
            style={styles.image}
            height={styles.viewImage.height}
            width={styles.viewImage.width}
            source={Utilities.convertLinkImage(logo, IMAGE_SIZE.MEDIUM)}
          />
        </MyView>
        <MyView style={styles.viewLeft}>
          <MyView style={styles.container} transparent>
            {/* <MyText myFontStyle="Regular">Tên chi nhánh:</MyText> */}
            <MyText numberOfLines={1} style={[styles.title]}>
              {name}
            </MyText>
          </MyView>
          <MyView style={styles.container} transparent>
            {/* <MyText myFontStyle="Regular">Địa chỉ:</MyText> */}
            <MyText numberOfLines={2} style={styles.tittleAddress}>
              {addressStr}
            </MyText>
          </MyView>
          <MyView style={styles.container} transparent>
            {/* <MyText myFontStyle="Regular">Trạng thái:</MyText> */}
            <MyText style={[styles.title, {color: isActive ? COLOR.TEXT.GREEN : COLOR.TEXT.BLACK}]}>
              {isActive ? 'Đang hoạt động' : 'Không hoạt động'}
            </MyText>
          </MyView>
          {/* <MyView style={styles.container} transparent>
            <MyText myFontStyle="Regular">Cập nhật cuối:</MyText>
            <MyText style={styles.title}>
              {Utilities.convertTimeByFormat(updated_at && updated_at * 1000, 'DD/MM/YYYY')}
            </MyText>
          </MyView> */}
        </MyView>
      </MyButton>
    );
  }
}
const styles = StyleSheet.create({
  contentItem: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  title: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_6, MY_SIZE.s_0),
    flex: 1
  },
  viewContent: {
    flex: 1
  },
  myIcon: {
    justifyContent: 'center'
  },
  image: {
    ...setRadius(0, 0, 0, 0)
  },
  viewImage: {
    height: MY_SIZE.s_64,
    width: MY_SIZE.s_64,
    backgroundColor: COLOR.BG.RED,
    // ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, 0, MY_SIZE.s_8),
    ...setRadius(0, 0, 0, 0),
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewLeft: {
    flex: 1,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_10, MY_SIZE.s_0)
  },
  tittleAddress: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_6, MY_SIZE.s_0),
    flex: 1,
    fontSize: 12
  }
});
