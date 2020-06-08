
export const countMortgageDefault = (data) => {
  const { paymentMethod, mortgageType, mlv, total, month } = data;
  let result;
  if (paymentMethod === 1) {
    const mm = total * (mlv * ((1 + mlv) ** month) / (((1 + mlv) ** month) - 1))
    // 等额本息
    result = [
      {
        label: '贷款总额',
        value: `${total}万元`,
      },
      {
        label: mortgageType === 1 ? '公积金贷款利率' : '商业贷款利率',
        value: `${mlv * 1200}%`
      },
      {
        label: '还款总额',
        value: `${(month * mm).toFixed(2)}万元`
      },
      {
        label: '支付利息',
        value: `${(month * mm - total).toFixed(2)}万元`
      },
      {
        label: '贷款月数',
        value: `${month}月`
      },
      {
        label: '月均还款',
        value: `${(mm * 10000).toFixed(2)}元`
      }
    ]
  } else {
    // 等额本金
    const tlx = month * ( total * mlv - mlv * ( total / month ) * (month -1) / 2 + total / month )
    result = [
      {
        label: '贷款总额',
        value: `${total}万元`,
      },
      {
        label: mortgageType === 1 ? '公积金贷款利率' : '商业贷款利率',
        value: `${mlv * 1200}%`
      },
      {
        label: '还款总额',
        value: `${tlx.toFixed(2)}万元`
      },
      {
        label: '支付利息',
        value: `${(tlx - total).toFixed(2)}万元`
      },
      {
        label: '贷款月数',
        value: `${month}月`
      },
      {
        label: '首月还款',
        value: `${((total / month + total * mlv) * 10000).toFixed(2)}元`
      },
      {
        label: '末月还款',
        value: `${((total / month + (total - total * (month - 1) / month) * mlv) * 10000).toFixed(2)}元`
      }
    ]
  }

  return result;
}


export const countMortgageComb = (data) => {
  const { paymentMethod, gmlv, smlv, sTotal, gTotal, month } = data;
  let result;
  if (paymentMethod === 1) {
    const gmm = gTotal * (gmlv * ((1 + gmlv) ** month) / (((1 + gmlv) ** month) - 1))
    const smm = sTotal * (smlv * ((1 + smlv) ** month) / (((1 + smlv) ** month) - 1))

    result = [
      {
        label: '贷款总额',
        value: `${gTotal + sTotal}万元`,
      },
      {
        label: '公积金贷款利率',
        value: `${gmlv * 1200}%`
      },
      {
        label: '商业贷款利率',
        value: `${smlv * 1200}%`
      },
      {
        label: '还款总额',
        value: `${(month * (gmm + smm)).toFixed(2)}万元`
      },
      {
        label: '支付利息',
        value: `${(month * (gmm + smm) - sTotal - gTotal).toFixed(2)}万元`
      },
      {
        label: '贷款月数',
        value: `${month}月`
      },
      {
        label: '月均还款',
        value: `${((gmm + smm) * 10000).toFixed(2)}元`
      }
    ];
  } else {
    // 等额本金
    const stlx = month * ( sTotal * smlv - smlv * ( sTotal / month ) * (month -1) / 2 + sTotal / month );
    const gtlx = month * ( gTotal * gmlv - gmlv * ( gTotal / month ) * (month -1) / 2 + gTotal / month );

    result = [
      {
        label: '贷款总额',
        value: `${gTotal + sTotal}万元`,
      },
      {
        label: '公积金贷款利率',
        value: `${gmlv * 1200}%`
      },
      {
        label: '商业贷款利率',
        value: `${smlv * 1200}%`
      },
      {
        label: '还款总额',
        value: `${(stlx + gtlx).toFixed(2)}万元`
      },
      {
        label: '支付利息',
        value: `${(stlx + gtlx - sTotal - gTotal).toFixed(2)}万元`
      },
      {
        label: '贷款月数',
        value: `${month}月`
      },
      {
        label: '首月还款',
        value: `${(((sTotal + gTotal) / month + sTotal * smlv + gTotal * gmlv) * 10000).toFixed(2)}元`
      },
      {
        label: '末月还款',
        value: `${(((sTotal + gTotal) / month + (sTotal - sTotal * (month - 1) / month) * smlv + (gTotal - gTotal * (month - 1) / month) * gmlv) * 10000).toFixed(2)}元`
      }
    ]
  }
  return result;
}
