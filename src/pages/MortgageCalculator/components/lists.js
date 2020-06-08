import React from 'react';
import { List } from 'antd';
import { countMortgageDefault, countMortgageComb } from '../utils';

const { Item } = List;

const ListView = ({ paymentMethod, mortgageType, lv, glv, slv, total, sTotal, gTotal, month}) => {
  let result;
  const mlv = lv / 1200;
  const gmlv = glv / 1200;
  const smlv = slv / 1200;
  if(mortgageType !== 3) {
    result = countMortgageDefault({paymentMethod, mortgageType, mlv, total, month});
  } else {
    result = countMortgageComb({paymentMethod, mortgageType, gmlv, smlv, sTotal, gTotal, month})
  }

  return (
    <List header={paymentMethod === 1 ? '等额本息' : '等额本金'}>
      {result.map(i => {
        return <Item key={i.label}>{`${i.label}:${i.value}`}</Item>
      })}
    </List>
  )
}


export default ListView;
