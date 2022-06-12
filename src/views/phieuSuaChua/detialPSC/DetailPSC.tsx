import {FlatList} from 'react-native';
import React from 'react';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {ItemLineIndicator, ItemProductOfPSC} from 'views/app/components/items';
import {IAppNavigateProps} from 'views/app';
import BotPriceView from 'views/invoice/detailsInvoice/components/BotPriceView';
import {COLOR} from 'bases/styles/Core';
import {KHACH_LE} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {detailStyles} from 'views/invoice/detailsInvoice/styles/DetailInvoice.style';
import {IProductInPSC} from 'models/PhieuSuaChua.Model';
import tw from 'utils/tailwind';

type IProps = IAppNavigateProps<'DetailPSC'>;
export default function DetailPSC(props: IProps) {
  const {params} = props.route;
  const renderHeader = () => {
    const timeNow = new Date().getTime();
    const length = params.detailPSC.created_at
      ? timeNow.toString().length - params.detailPSC.created_at?.toString().length
      : 0;
    const timeCreate =
      length > 0 && (length === 3 || length === 4)
        ? Number(params.detailPSC.created_at) * 1000
        : Number(params.detailPSC.created_at);
    const isDisabled = params.detailPSC.customer?.id === KHACH_LE.id;
    return (
      <MyView style={detailStyles.container}>
        <MyText
          myFontStyle={'Regular'}
          style={[
            detailStyles.statusText,
            tw.style(params.detailPSC.status_id === 2 ? 'text-green-400' : 'text-red-500')
          ]}>
          {params.detailPSC?.status_name}
        </MyText>
        <MyButton disabled={isDisabled} style={detailStyles.rowTopview}>
          <MyView transparent style={detailStyles.infoProdCenter}>
            <MyButton transparent style={detailStyles.viewName}>
              <MyText myFontStyle="Medium" numberOfLines={2} style={detailStyles.textNameLeft}>
                {params.detailPSC.customer?.name}
              </MyText>
              {isDisabled ? null : (
                <MyIcon
                  iconFontType="MaterialCommunityIcons"
                  name={'chevron-right'}
                  color={COLOR.TEXT.SECONDARY}
                  size={24}
                  style={detailStyles.icon}
                />
              )}
            </MyButton>
            <MyText myFontStyle={'Medium'} numberOfLines={2} style={detailStyles.textRight}>
              {params.detailPSC.customer?.license_plates}
            </MyText>
          </MyView>
          <MyView transparent style={tw.style('mt-8px flex-row justify-between items-center')}>
            <MyText myFontStyle={'Regular'} numberOfLines={1} style={detailStyles.textLeft}>
              {params.detailPSC.stores?.name}
            </MyText>
            <MyText myFontStyle={'Regular'} numberOfLines={1} style={detailStyles.textRight}>
              {Utilities.convertTimeByFormat(timeCreate, 'DD/MM/YYYY-HH:mm')}
            </MyText>
          </MyView>
        </MyButton>
        {/* Khi nào có Api thì mở ra */}

        {/* <MyButton style={detailStyles.btnShipper}>
          <MyView transparent style={detailStyles.viewShipper}>
            <MyIcon name="motorcycle" iconFontType="Fontisto" size={14} color={COLOR.BG.GRAY} />
            <MyText myFontStyle="Medium" style={{marginLeft: MY_SIZE.s_8}}>
              Giao hàng
            </MyText>
          </MyView>
          <MyIcon
            name="navigate-next"
            iconFontType="MaterialIcons"
            size={24}
            color={COLOR.BG.GRAY}
          />
        </MyButton> */}
      </MyView>
    );
  };

  const renderFooter = () => {
    let total_quantity_stock = 0;
    if (params.detailPSC.products && params.detailPSC.products.length > 0) {
      params.detailPSC.products.forEach((element: IProductInPSC) => {
        if (element.total_quantity && element.total_quantity > 0) {
          total_quantity_stock += element.total_quantity;
        }
      });
    }
    return (
      <MyView style={detailStyles.container}>
        <MyView style={detailStyles.rowBotview} />
        <BotPriceView
          disabled
          color={COLOR.TEXT.BLUE}
          value={params.detailPSC.total_price || 0}
          title={'Tổng tiền hàng'}
          isStock={true}
          stock_quantity={total_quantity_stock}
        />
        <MyView style={detailStyles.lineSepePrice} />
        <MyView style={detailStyles.lineSepePrice} />
        <BotPriceView
          disabled
          color={COLOR.TEXT.GREEN}
          value={params.detailPSC.total_price || 0}
          title={'Khách cần trả'}
        />
        <MyView style={detailStyles.lineSepePrice} />
        <BotPriceView
          color={COLOR.TEXT.BLACK}
          value={params.detailPSC.total_paid || 0}
          userPayment={params.detailPSC.total_paid || 0}
          title={'Khách đã trả'}
          onPress={() => {
            // MyNavigator.push('PaymentOfOrder', {list: params.detailPSC.payments || []});
          }}
        />
      </MyView>
    );
  };
  const renderItem = ({item}: any) => {
    return <ItemProductOfPSC itemProduct={item} />;
  };
  return (
    <MyView style={detailStyles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={params.detailPSC.products}
        extraData={params.detailPSC.products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <ItemLineIndicator />}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
      {/* <SafeAreaView edges={['bottom', 'left', 'right']}>
      <MyView style={detailStyles.botView}>
        <MyText style={detailStyles.productLengthtext}>
          {params.detailPSC.products?.length + ' Sản phẩm'}
        </MyText>
        <MyText style={detailStyles.productLengthtext}>
          Tổng{' '}
          <MyTextPriceMask style={detailStyles.productBotPrice} text={params.detailPSC.total_price} />
        </MyText>
      </MyView>
    </SafeAreaView> */}
    </MyView>
  );
}
