import * as React from 'react';
import {StyleSheet} from 'react-native';
import {MyView, MyText, MyButton, MyIcon} from 'bases/components';
import {COLOR, setMargin, setPadding, MY_SIZE} from 'bases/styles/Core';

// import MyNavigator from 'utils/MyNavigator';
import {IAddressModel} from 'models/Customer.Model';

interface IProps {
  itemAddress: IAddressModel;
  isShowBack?: boolean;
}

export default class ItemAddress extends React.Component<IProps, any> {
  public render() {
    const {name, address, type, phone} = this.props.itemAddress;
    const {isShowBack} = this.props;
    return (
      <MyButton
        style={styles.container}
        onPress={() => {
          //   MyNavigator.push('BranchDetail', {id});
        }}>
        <MyView style={styles.viewContent}>
          <MyText style={[styles.title, styles.name]}>{name}</MyText>
          <MyText style={[styles.address, {color: COLOR.TEXT.BLUE}]}>{address}</MyText>
          <MyView style={styles.childContainer}>
            <MyIcon
              iconFontType={'MaterialCommunityIcons'}
              name={'phone'}
              size={20}
              color={COLOR.TEXT.GRAY}
            />
            <MyText style={styles.address2}>{phone}</MyText>
          </MyView>
          <MyView style={styles.childContainer}>
            <MyIcon
              iconFontType={'MaterialIcons'}
              name={'location-pin'}
              size={20}
              color={COLOR.TEXT.GRAY}
            />
            <MyText style={styles.address2}>{type}</MyText>
          </MyView>
        </MyView>
        {isShowBack ? null : (
          <MyView style={styles.myIcon}>
            <MyIcon iconFontType="Entypo" name={'chevron-thin-right'} size={24} />
          </MyView>
        )}
      </MyButton>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  childContainer: {
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  title: {
    flex: 1,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_6, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  name: {
    fontSize: MY_SIZE.s_16
  },
  address: {
    flex: 1
  },
  address2: {
    color: COLOR.TEXT.GRAY,
    alignSelf: 'center',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_4, MY_SIZE.s_0)
  },
  viewContent: {
    flex: 9
  },
  myIcon: {
    justifyContent: 'center'
  }
});
