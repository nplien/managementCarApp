import {MyText, MyView} from 'bases/components';
import {COLOR, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import React from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet
} from 'react-native';
import ReportQtyProduct from './soluong/ReportQtyProduct';

const initialState = {
  index: 0
};
const getWidth = Dimensions.get('screen').width;
export default function ReportProduct1() {
  const [state, setstate] = React.useState(initialState);
  const scrollRef = React.useRef<any>(undefined);
  const routes: any[] = [
    // {key: 'reportRevenueProduct', name: 'Theo doanh thu'},
    {key: 'reportQtyProduct', name: 'Theo số lượng'}
  ];
  return (
    <MyView transparent>
      <MyText myFontStyle="Medium" style={styles.titleHeaderTab}>
        Sản phẩm bán chạy
      </MyText>
      <MyView style={styles.tabbar}>
        {routes.map((tab, index) => {
          let focused = state.index === index;
          return (
            <MyText
              onPress={() => {
                setstate({index});
                scrollRef.current.scrollTo({x: getWidth * index});
              }}
              key={tab.key}
              myFontStyle="Bold"
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: focused ? COLOR.TEXT.BLUE : 'gray',
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor: focused ? '#ccccff' : 'white',
                ...setPadding(4, 4, 16, 16)
              }}>
              {tab.name}
            </MyText>
          );
        })}
      </MyView>
      <ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          const numberView: number =
            event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width;
          setstate({index: Math.round(numberView)});
        }}
        showsHorizontalScrollIndicator={false}
        bounces={true}
        horizontal
        pagingEnabled={true}>
        {/* <MyView style={styles.myviewFlex}>
          <ReportRevenueProduct />
        </MyView> */}
        <MyView style={styles.myviewFlex}>
          <ReportQtyProduct />
        </MyView>
      </ScrollView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(16, 16, 0, 0),
    elevation: 0,
    shadowColor: 'white',
    ...setPadding(10, 16, 16, 16),
    flexDirection: 'row'
  },
  titleHeaderTab: {
    ...setMargin(0, 10, 16, 16)
  },
  myviewFlex: {
    flex: 1,
    width: getWidth
  }
});
