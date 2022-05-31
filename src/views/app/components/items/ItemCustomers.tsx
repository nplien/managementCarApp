import * as React from 'react';
import {MyView, MyText, MyIcon, MyButton} from 'bases/components';
import {StyleSheet, StyleProp, ViewStyle, Linking} from 'react-native';
import {setPadding, COLOR, setRadius, setMargin, MY_SIZE} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';

interface IItemCustomersProps {
  customerCheck?: boolean;
  uri?: string;
  name?: string;
  id?: string | number;
  onPressItem?: () => void;
  phoneCustomer?: string;
  totalPrice?: number;
  ChangeIcon?: boolean;
  Color?: boolean;
  styleProps?: StyleProp<ViewStyle>;
}

interface IItemCustomersState {}

/**
 *  1. Item khách hàng, suppliers,wholesales
 *  @param customerCheck:kiem tra man hinh nao onpress
 *  @param codeCustomer:id cua customer
 *  @param totalPrice:so tien customer da dung
 */
export class ItemCustomers extends React.PureComponent<IItemCustomersProps, IItemCustomersState> {
  public render() {
    const {
      name,
      //  id,
      phoneCustomer,
      totalPrice,
      onPressItem,
      ChangeIcon,
      Color,
      styleProps
    } = this.props;
    let character = String(name).trim().substring(0, 1);
    // const createId = 'KH 000000';
    // let idCurrent = 'Chưa cập nhật';
    // if (id) {
    //   const lengthCurrent = createId.length - id?.toString().length;
    //   const subStringId = String(createId).substring(0, lengthCurrent);
    //   idCurrent = subStringId + id?.toString();
    // }
    let price = Utilities.convertCount(totalPrice ? totalPrice : 0);
    return (
      <MyButton style={styleProps} onPress={onPressItem}>
        <MyView transparent style={styles.content}>
          <MyView transparent style={styles.MvAvatar}>
            {/* <MyImage
              style={styles.MvAvatarChild}
              height={styles.MvAvatarChild.height}
              width={styles.MvAvatarChild.width}
              source={Utilities.convertLinkImage(uri, IMAGE_SIZE.MEDIUM)}
            /> */}
            <MyView
              style={[
                styles.MvAvatarChild,
                {
                  backgroundColor: Utilities.returnColorBangChuCai(character),
                  justifyContent: 'center',
                  alignItems: 'center'
                }
              ]}>
              <MyText style={{fontSize: 20, color: 'white'}} myFontStyle="Bold">
                {character}
              </MyText>
            </MyView>
          </MyView>
          <MyView transparent style={styles.MvInfoCustomers}>
            <MyView
              transparent
              style={{...setPadding(MY_SIZE.s_0, MY_SIZE.s_2, MY_SIZE.s_16, MY_SIZE.s_0)}}>
              <MyText style={styles.viewName} myFontStyle="Bold" numberOfLines={2}>
                {name ? name : ''}
              </MyText>
            </MyView>
            {/* <MyView transparent style={styles.title}>
              <MyIcon iconFontType="Entypo" name="user" size={14} style={styles.icon} />
              <MyText style={styles.secondTitle} numberOfLines={1} myFontStyle="Regular">
                {idCurrent}
              </MyText>
            </MyView> */}
            <MyView transparent style={styles.title}>
              <MyIcon
                iconFontType="MaterialCommunityIcons"
                name="phone"
                size={16}
                style={styles.icon}
              />
              <MyButton
                transparent
                onPress={() => {
                  if (phoneCustomer) Linking.openURL(`tel:${phoneCustomer}`);
                }}>
                <MyText style={styles.textPhone} numberOfLines={1} myFontStyle="Regular">
                  {phoneCustomer ? phoneCustomer : 'Chưa cập nhật'}
                </MyText>
              </MyButton>
            </MyView>
          </MyView>
          <MyView transparent style={styles.MvTotalSell}>
            <MyView transparent style={styles.MvTotalSell}>
              <MyText style={styles.textTotalSell}>{price}</MyText>
            </MyView>
            {ChangeIcon ? (
              <MyIcon
                iconFontType="AntDesign"
                name="check"
                size={24}
                color={Color ? COLOR.TEXT.GREEN : COLOR.TEXT.BLACK}
              />
            ) : null}
          </MyView>
        </MyView>
      </MyButton>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewName: {
    fontSize: MY_SIZE.s_14
  },
  MvAvatar: {
    alignItems: 'center',
    alignSelf: 'center'
  },
  MvInfoCustomers: {flex: 3},
  MvChildInfo: {alignItems: 'center'},
  MvTotalSell: {flex: 1.5, alignItems: 'flex-end'},

  title: {
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  secondTitle: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_6, MY_SIZE.s_0)
  },
  textTotalSell: {
    fontSize: MY_SIZE.s_16,
    color: COLOR.TEXT.BLUE
  },
  MvAvatarChild: {
    ...setRadius(MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50),
    width: MY_SIZE.s_48,
    height: MY_SIZE.s_48
  },
  icon: {
    alignSelf: 'center',
    color: COLOR.TEXT.GRAY
  },
  textPhone: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_2, MY_SIZE.s_6, MY_SIZE.s_0),
    color: COLOR.TEXT.BLUE
  }
});
