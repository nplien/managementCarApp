import * as React from 'react';
import {MyView, MyText, MyButton} from 'bases/components';
import {StyleSheet} from 'react-native';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {IStaffModel} from 'models/Staff.Model';
import Utilities from 'utils/Utilities';
import MyNavigator from 'utils/MyNavigator';

interface IProps {
  ItemManager: IStaffModel;
}

export class ItemManager extends React.Component<IProps, any> {
  public render() {
    const {id, name, phone, status, created_by, created_at, updated_at} = this.props.ItemManager;
    let isActive = status === 'active';
    return (
      <MyButton
        style={ItemManagerStyles.container2}
        onPress={() => {
          MyNavigator.push('NhanvienDetail', {id: id || '', itemDetail: this.props.ItemManager});
        }}>
        <MyView style={ItemManagerStyles.container}>
          <MyText myFontStyle="Regular">Số Điện thoại:</MyText>
          <MyText style={ItemManagerStyles.title}>{phone}</MyText>
        </MyView>
        <MyView style={ItemManagerStyles.container}>
          <MyText myFontStyle="Regular">Tên người dùng:</MyText>
          <MyText style={ItemManagerStyles.title}>{name}</MyText>
        </MyView>
        <MyView style={ItemManagerStyles.container}>
          <MyText myFontStyle="Regular">Trạng thái:</MyText>
          <MyText
            style={[
              ItemManagerStyles.title,
              {color: isActive ? COLOR.TEXT.GREEN : COLOR.TEXT.BLACK}
            ]}>
            {isActive ? 'Đang hoạt động' : 'Không hoạt động'}
          </MyText>
        </MyView>
        <MyView style={ItemManagerStyles.container}>
          <MyText myFontStyle="Regular">Người tạo:</MyText>
          <MyText style={ItemManagerStyles.title}>{created_by?.name}</MyText>
        </MyView>
        <MyView style={ItemManagerStyles.container}>
          <MyText myFontStyle="Regular">Ngày tạo:</MyText>
          <MyText style={ItemManagerStyles.title}>
            {Utilities.convertTimeByFormat(created_at ? created_at * 1000 : 0, 'DD/MM/YYYY')}
          </MyText>
        </MyView>
        <MyView style={ItemManagerStyles.container}>
          <MyText myFontStyle="Regular">Cập nhật cuối:</MyText>
          <MyText style={ItemManagerStyles.title}>
            {Utilities.convertTimeByFormat(updated_at ? updated_at * 1000 : 0, 'DD/MM/YYYY')}
          </MyText>
        </MyView>
      </MyButton>
    );
  }
}
const ItemManagerStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  container2: {
    backgroundColor: COLOR.BG.WHITE,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  title: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_6, MY_SIZE.s_0)
  },
  myIcon: {
    justifyContent: 'center'
  },
  viewContent: {
    flex: 1
  }
});
