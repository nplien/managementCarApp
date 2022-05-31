import * as React from 'react';
import {StyleSheet} from 'react-native';
import {setPadding, setMargin, COLOR, MY_SIZE} from 'bases/styles/Core';
import {MyView, MyText, MyButton} from 'bases/components';
import {IInventoryModel} from 'models/Inventory.Model';
import Utilities from 'utils/Utilities';
import MyNavigator from 'utils/MyNavigator';

interface IProps {
  itemProduct: IInventoryModel;
}

export class ItemInventory extends React.PureComponent<IProps> {
  clickItem = () => {
    MyNavigator.navigate('InventoryDetail', {IdInventory: this.props.itemProduct.id});
  };

  render() {
    const {
      code,
      status,

      created_at,

      confirmed_at,
      confirmed_by,

      cancelled_at,
      cancelled_by,
      status_name
    } = this.props.itemProduct;

    let colorStatus = COLOR.TEXT.GREEN;
    if (status !== 'completed') {
      colorStatus = COLOR.TEXT.RED;
    }

    let createAt = Utilities.convertTimeByFormat(
      created_at && created_at * 1000,
      'DD/MM/YYYY - HH:mm'
    );

    let xuly = '-';
    let nguoiXuLy = '-';
    if (status === 'completed') {
      if (confirmed_at) {
        xuly = Utilities.convertTimeByFormat(confirmed_at * 1000, 'DD/MM/YYYY - HH:mm');
        nguoiXuLy = confirmed_by?.name || '-';
      }
    } else if (status === 'cancelled') {
      if (cancelled_at) {
        xuly = Utilities.convertTimeByFormat(cancelled_at * 1000, 'DD/MM/YYYY - HH:mm');
        nguoiXuLy = cancelled_by?.name || '-';
      }
    }

    return (
      <MyButton onPress={this.clickItem} style={styles.container}>
        <MyView style={styles.myViewDad}>
          <MyText myFontStyle={'600'} style={styles.myTextCode}>
            {code}
          </MyText>
          <MyText style={[styles.myText, {color: colorStatus}]}>{status_name}</MyText>
        </MyView>
        <MyView style={styles.myViewDad}>
          <MyText style={styles.myText2} myFontStyle="Regular">
            {createAt}
          </MyText>
          <MyText style={styles.myText2} myFontStyle="Regular">
            {xuly}
          </MyText>
        </MyView>
        <MyView style={styles.myViewDad}>
          <MyText style={styles.myText2} />
          <MyText style={[styles.myText2, {fontSize: MY_SIZE.s_14}]}>{nguoiXuLy}</MyText>
        </MyView>
      </MyButton>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },

  myViewDad: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  myText: {
    fontSize: MY_SIZE.s_16,
    color: COLOR.BG.BLACK
  },
  myTextCode: {
    fontSize: MY_SIZE.s_16,
    color: COLOR.BG.BLACK,
    textTransform: 'uppercase'
  },

  myText2: {
    fontSize: MY_SIZE.s_12,
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});
