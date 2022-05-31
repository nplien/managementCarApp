/* eslint-disable react/no-did-mount-set-state */
import * as React from 'react';
import {MyView, MyText, MyLoading, MyImage, MyButtonText, MyButtonIcon} from 'bases/components';
import {styles} from './Styles/BranchDetail.Style';
import {ManagerAPI} from 'services/Manager.Api';
import {IStoreModel} from 'models/Store.Model';
import Utilities from 'utils/Utilities';
import {ScrollView} from 'react-native';
import {IMAGE_SIZE} from 'common/Constants';
import MyNavigator from 'utils/MyNavigator';
import {COLOR, MY_SIZE, setPadding} from 'bases/styles/Core';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'BranchDetail'>;

interface IState {
  objDetail: Partial<IStoreModel>;
  isLoadHoder: boolean;
  isError: boolean;
  isCheck: boolean;
}
let widthImg: number = Utilities.getWidthScreen();
export default class BranchDetail extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      objDetail: {},
      isLoadHoder: true,
      isError: false,
      isCheck: false
    };
  }

  async componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <MyButtonIcon
          style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)}}
          iconFontType="FontAwesome5"
          iconProps={{name: 'edit', size: 20, color: COLOR.TEXT.BLACK}}
          onPress={() => {
            MyNavigator.navigate('AddManagerBranch', {
              isUpdateBrands: true,
              itemUpdate: this.state.objDetail,
              onSelect: this.onSelect
            });
          }}
        />
      )
    });
    const {id} = this.props.route.params;
    const response = await ManagerAPI.getDetailStores(String(id));
    if (response && !response.code) {
      this.setState({
        objDetail: response.data || {},
        isLoadHoder: false
      });
    } else {
      this.setState({
        isLoadHoder: false,
        isError: true
      });
    }
  }
  onSelect = (data: boolean) => {
    this.setState({isCheck: data});
    this.componentDidMount();
  };

  render() {
    const {isLoadHoder, isError} = this.state;

    if (isLoadHoder) {
      return (
        <MyView style={styles.myLoading} transparent>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView style={styles.emptyCustomer} transparent>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.componentDidMount()}
            title="Tải lại"
            style={styles.BtnEmpty}
          />
        </MyView>
      );
    }
    const {objDetail} = this.state;
    let isActive = objDetail?.status === 'active';
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.viewList}
        style={styles.container2}>
        <MyImage
          style={styles.logo}
          height={widthImg / 1.5}
          width={widthImg}
          source={Utilities.convertLinkImage(objDetail?.logo, IMAGE_SIZE.MEDIUM)}
        />
        <MyView style={styles.container}>
          <MyText style={styles.title} myFontStyle={'Regular'}>
            Mã chi nhánh
          </MyText>
          <MyText style={styles.value}>{objDetail?.id}</MyText>
        </MyView>
        <MyView style={styles.container}>
          <MyText style={styles.title} myFontStyle={'Regular'}>
            Tên chi nhánh
          </MyText>
          <MyText style={styles.value}>{objDetail?.name}</MyText>
        </MyView>
        <MyView style={styles.container}>
          <MyText style={styles.title} myFontStyle={'Regular'}>
            Điện thoại
          </MyText>
          <MyText style={styles.value}>{objDetail?.phone}</MyText>
        </MyView>
        <MyView style={styles.container}>
          <MyText style={styles.title} myFontStyle={'Regular'}>
            Trạng thái
          </MyText>
          <MyText style={[styles.value, {color: isActive ? COLOR.TEXT.GREEN : COLOR.TEXT.BLACK}]}>
            {isActive ? 'Đang hoạt động' : 'Không hoạt động'}
          </MyText>
        </MyView>
        <MyView style={styles.container}>
          <MyText style={styles.title} myFontStyle={'Regular'}>
            Email
          </MyText>
          <MyText style={styles.value}>{objDetail?.email}</MyText>
        </MyView>
        <MyView style={styles.container}>
          <MyText style={styles.title} myFontStyle={'Regular'}>
            Địa chỉ
          </MyText>
          <MyText style={styles.value}>{objDetail?.address}</MyText>
        </MyView>
        <MyView style={styles.container}>
          <MyText style={styles.title} myFontStyle={'Regular'}>
            Tỉnh, thành
          </MyText>
          <MyText style={styles.value}>{objDetail.province?.name}</MyText>
        </MyView>
        <MyView style={styles.container}>
          <MyText style={styles.title} myFontStyle={'Regular'}>
            Quận, huyện
          </MyText>
          <MyText style={styles.value}>{objDetail.district?.name}</MyText>
        </MyView>
        <MyView style={styles.container}>
          <MyText style={styles.title} myFontStyle={'Regular'}>
            Phường, xã
          </MyText>
          <MyText style={styles.value}>{objDetail.ward?.name}</MyText>
        </MyView>
      </ScrollView>
    );
  }
}
