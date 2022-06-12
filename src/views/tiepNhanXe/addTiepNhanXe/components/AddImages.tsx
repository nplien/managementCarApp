/* eslint-disable react-native/no-inline-styles */
import React, {Component, createRef} from 'react';
import {Alert, FlatList} from 'react-native';
import Utilities from 'utils/Utilities';
import ImagePicker from 'react-native-image-crop-picker';
import {MyButton, MyIcon, MyImage, MyText, MyView} from 'bases/components';
import {COLOR, setMargin, setRadius} from 'bases/styles/Core';

class AddImages extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      arrImage: [],
      isShowBackground: false,
      isShowImage: true
    };
  }
  flatListRef: any = createRef();
  renderBGHorizontal: any = null;
  renderBGSim: any = null;
  handleOnPressCameraBG = () => {
    const {isShowBackground} = this.state;
    if (isShowBackground) {
      Alert.alert(
        'Thông báo',
        'Nếu bạn chuyển sang dạng Ảnh thì màu nền  ở trên của bạn sẽ bị mất.',
        [
          {
            text: 'Huỷ',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'Đồng ý',
            onPress: () => {
              this.setState({
                isShowBackground: false,
                isShowImage: true
              });
              this.handleToOnPressItem();
            }
          }
        ],
        {cancelable: false}
      );
    } else {
      this.handleToOnPressItem();
    }
  };

  handleToOnPressItem = async () => {
    const {arrImage} = this.state;
    let localImage: any = [];
    try {
      Utilities.showHideRootLoading(true, 'Vui lòng chờ...');
      localImage = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true
      });
      const data = arrImage;
      localImage.forEach((element: any) => {
        data.push(element);
      });
      this.setState({
        arrImage: data.slice(0, 6)
      });
      if (arrImage && arrImage.length !== 0) {
        const images = arrImage?.map((k: any) => k);
        this.setState({
          arrImage: images.slice(0, 6)
        });
        Utilities.showHideRootLoading(false);
      } else {
        Utilities.showHideRootLoading(false);
        Utilities.log('err');
      }
    } catch (error) {
      Utilities.showHideRootLoading(false);
      Utilities.logException('error', error);
    }
  };
  handleOnDelete = (index: any) => {
    const {arrImage} = this.state;
    try {
      const data = arrImage.slice(0, arrImage.length);
      data.splice(index, 1);
      this.setState({
        arrImage: data
      });
    } catch (error) {
      Utilities.logException('DeleteImageUpload', error);
    }
  };
  //   handlePreviewImage = (index: number) => {
  //     const {arrImage} = this.state;
  //     let arrimg = arrImage.map((k: any) => k.path);
  //     MyNavigator.navigate('showGallery', {arrayimage: arrimg, indexImage: index});
  //   };
  handleOnChangeBG = (item: any) => {
    if (this.state.arrImage.length > 0) {
      Alert.alert(
        'Thông báo',
        'Nếu bạn chuyển sang dạng nền thì tất cả ảnh ở trên của bạn sẽ bị mất',
        [
          {
            text: 'Huỷ',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'Đồng ý',
            onPress: () => {
              this.setState({
                iamgeBackground: item.source,
                arrImage: [],
                isShowBackground: true,
                isShowImage: false
              });
              this.storeImagesProperty(item);
            }
          }
        ],
        {cancelable: false}
      );
    } else {
      this.setState({
        iamgeBackground: item.source,
        isShowBackground: true,
        isShowImage: false
      });
      this.storeImagesProperty(item);
    }
  };
  storeImagesProperty = (item: any) => {
    const arr = [];
    arr.push(item);
  };
  renderItem = ({item, index}: any) => {
    const {arrImage} = this.state;
    if (item.plusImage) {
      return (
        <MyView>
          {arrImage.length < 6 ? (
            <MyButton
              style={{
                borderRadius: 4,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                height: 150,
                ...setMargin(10, 0, 8, 8),
                borderColor: COLOR.BG.GRAY
              }}
              onPress={() => this.handleToOnPressItem()}>
              {/* <SvgCss
                xml={svgCamera}
                style={{
                  width: 60,
                  height: 60,
                  ...setMargin(0, 10, 0, 0)
                }}
              /> */}
            </MyButton>
          ) : (
            <MyView />
          )}
        </MyView>
      );
    }
    return (
      <MyView
        style={{
          width: 100,
          height: 150,
          ...setMargin(10, 0, 8, 8)
        }}>
        <MyButton
        // onPress={() => this.handlePreviewImage(index)}
        >
          <MyImage
            style={{
              width: 100,
              height: 150,
              ...setRadius(4, 4, 4, 4)
            }}
            source={{
              uri: item.path
            }}
          />
        </MyButton>
        <MyButton
          onPress={() => this.handleOnDelete(index)}
          style={{
            backgroundColor: COLOR.BG.BLACK_30,
            width: 20,
            height: 20,
            borderRadius: 20,
            position: 'absolute',
            top: 6,
            left: 6,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <MyIcon size={18} name="close" iconFontType={'AntDesign'} color={COLOR.BG.WHITE} />
        </MyButton>
      </MyView>
    );
  };
  renderItemBackground = ({item}: any) => {
    console.log('---render');
    if (item.plusArrImage) {
      return (
        <MyButton
          style={{
            width: 60,
            height: 60,
            ...setMargin(0, 10, 0, 0)
          }}
          onPress={this.handleOnPressCameraBG}>
          <MyIcon
            name="camera-plus"
            size={24}
            color={COLOR.BG.BLACK}
            iconFontType={'MaterialCommunityIcons'}
          />
        </MyButton>
      );
    }
    return (
      <MyButton
        style={{
          justifyContent: 'space-between',
          ...setMargin(0, 0, 4, 4)
        }}
        onPress={() => this.handleOnChangeBG(item)}>
        <MyImage
          style={{
            width: 32,
            height: 32,
            borderRadius: 3
          }}
          source={{uri: item.path}}
        />
      </MyButton>
    );
  };
  keyExtractor = (item: any, index: any) => {
    return Utilities.randomNumber() + index;
  };
  handleChangeText = (text: string) => {
    // if () {
    // } else {
    // }
    this.setState({
      description: text
    });
  };
  render() {
    const {arrImage, isShowImage} = this.state;
    return (
      <MyView
        style={{
          ...setMargin(0, 0, 16, 16)
        }}>
        {isShowImage && (
          <MyView>
            {arrImage.length === 0 ? (
              <MyButton
                style={{
                  borderRadius: 6,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  ...setMargin(10, 0, 0, 0),
                  borderColor: COLOR.BG.GRAY,
                  height: 200
                }}
                onPress={() => this.handleToOnPressItem()}>
                <MyButton onPress={() => this.handleToOnPressItem()}>
                  {/* <SvgCss xml={svgCamera} style={styleAddProduct.svgCamera} /> */}
                </MyButton>
                <MyText
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16
                  }}>
                  Chọn một vài bức ảnh cho sản phẩm
                </MyText>
                <MyText
                  style={{
                    color: '#6C6C6C',
                    ...setMargin(5, 0, 0, 0)
                  }}>
                  Bạn được chọn tối đa 6 cái ảnh
                </MyText>
              </MyButton>
            ) : (
              <FlatList
                ref={this.flatListRef}
                onContentSizeChange={() => {
                  this.flatListRef.current.scrollToEnd();
                }}
                getItemLayout={(data, index) => ({length: 40, offset: 40 * index, index})}
                onScrollToIndexFailed={info => {
                  const wait = new Promise(resolve => setTimeout(resolve, 500));
                  wait.then(() => {
                    this.flatListRef.current?.scrollToIndex({index: info.index, animated: true});
                  });
                }}
                showsHorizontalScrollIndicator={false}
                style={{
                  width: '100%'
                }}
                data={[...arrImage, {plusImage: true}]}
                extraData={1234}
                horizontal
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
              />
            )}
            <MyText
              style={{
                color: '#6C6C6C',
                ...setMargin(10, 0, 0, 0)
              }}>
              {`${arrImage.length}/6 ảnh đã được chọn`}
            </MyText>
          </MyView>
        )}
        {this.renderBGSim}
        {this.renderBGHorizontal}
      </MyView>
    );
  }
}

export default AddImages;
