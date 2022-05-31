import React, {PureComponent} from 'react';
import {Animated, FlatList, StyleSheet, ViewStyle} from 'react-native';
import {ImageStyle} from 'react-native-fast-image';

import {MyView} from '../view/MyView';
import {MY_SIZE, setRadius, setMargin, COLOR} from 'bases/styles/Core';

import {MyButton} from '../button/MyButton';
import {MyImage} from './MyImage';

import {IMAGE_SIZE} from 'common/Constants';
import Utilities from 'utils/Utilities';
const DEFAULT_WIDTH = Utilities.getWidthScreen();
const DOT_WIDTH = MY_SIZE.s_10;

let nextIndex: number = 0;
let animVal: any = new Animated.Value(0);
let listRef: any = null;
let timerId: any = null;

interface IProps {
  style?: ViewStyle;
  styleContainerImage?: ViewStyle;
  styleImage?: ImageStyle;
  widthImage?: number;
  ratio?: number;
  styleBar?: ViewStyle;

  images: string[];
  onPress: (item: any, index: number) => void;

  interval?: number;
  isLoop?: boolean;
  isAnimBack?: boolean;

  paddingImage?: number;
}
/**
 ** ratio default '9 / 16' tỉ lệ giữa width và height
 */
export default class MyImageSlider extends PureComponent<IProps, {}> {
  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = ({item, index}: {item: any; index: number}) => {
    const {styleImage, styleContainerImage, onPress, widthImage, ratio} = this.props;

    let widthImg: number = Utilities.getWidthScreen();
    if (widthImage) {
      widthImg = widthImage;
    }

    let ratioImg: number = 9 / 16;
    if (ratio) {
      ratioImg = ratio;
    }
    const onPressImg = () => {
      onPress(item, index);
    };
    const source = Utilities.convertLinkImage(item, IMAGE_SIZE.HIGH);
    return (
      <MyButton key={index} transparent onPress={onPressImg} style={styleContainerImage}>
        <MyImage source={source} width={widthImg} height={widthImg * ratioImg} style={styleImage} />
      </MyButton>
    );
  };

  onScrollEnd = (e: any) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    nextIndex = pageNum;
  };

  scrollToIndex = (index: number, animated?: boolean) => {
    if (listRef) {
      listRef.scrollToIndex({index, animated});
    }
  };

  goToNextPage = () => {
    if (nextIndex + 1 < this.props.images.length) {
      nextIndex = nextIndex + 1;
      this.scrollToIndex(nextIndex, true);
    } else {
      nextIndex = 0;
      this.scrollToIndex(nextIndex, this.props.isAnimBack);
    }
  };

  startAutoPlay = () => {
    if (this.props.interval) {
      timerId = setInterval(this.goToNextPage, this.props.interval);
    } else {
      timerId = setInterval(this.goToNextPage, 3000);
    }
  };

  stopAutoPlay = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  componentDidMount() {
    this.stopAutoPlay();
    if (this.props.isLoop) {
      this.startAutoPlay();
    }
  }

  componentWillUnmount() {
    this.stopAutoPlay();
  }

  render() {
    const {images, style, styleBar, paddingImage} = this.props;
    let paddingTmp = 0;
    if (paddingImage) {
      paddingTmp = paddingImage;
    }

    if (images && images.length > 0) {
      let listDotView: any = [];
      images.forEach((_url, i) => {
        let scrollBarVal = animVal.interpolate({
          inputRange: [
            (DEFAULT_WIDTH - paddingTmp) * (i - 1),
            (DEFAULT_WIDTH - paddingTmp) * (i + 1)
          ],
          outputRange: [-DOT_WIDTH, DOT_WIDTH],
          extrapolate: 'clamp'
        });
        let renderItemDotView = (
          <MyView
            key={i.toString()}
            style={[
              sliderStyles.track,
              {
                backgroundColor: COLOR.TAB.INACTIVE
              }
            ]}>
            <Animated.View
              style={[
                sliderStyles.bar,
                {
                  backgroundColor: COLOR.TAB.RED,
                  width: DOT_WIDTH,
                  transform: [{translateX: scrollBarVal}]
                }
              ]}
            />
          </MyView>
        );
        listDotView.push(renderItemDotView);
      });

      return (
        <MyView style={[sliderStyles.container, style]}>
          <FlatList
            ref={node => {
              listRef = node;
            }}
            onMomentumScrollEnd={this.onScrollEnd}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={5}
            horizontal
            pagingEnabled
            data={images}
            extraData={images}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {x: animVal}}}], {
              useNativeDriver: false
            })}
          />
          <MyView style={[sliderStyles.barContainer, styleBar]}>{listDotView}</MyView>
        </MyView>
      );
    } else {
      return <MyView style={[sliderStyles.container, style]} />;
    }
  }
}

const sliderStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  barContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: MY_SIZE.s_10,
    zIndex: 2
  },
  track: {
    overflow: 'hidden',
    ...setRadius(MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50),
    height: MY_SIZE.s_8,
    width: MY_SIZE.s_8,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_5, MY_SIZE.s_5)
  },
  bar: {
    position: 'absolute',
    ...setRadius(MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50),
    height: MY_SIZE.s_8,
    width: MY_SIZE.s_8,
    left: 0,
    top: 0
  }
});
