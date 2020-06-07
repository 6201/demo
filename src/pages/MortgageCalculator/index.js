import React, { useState } from 'react';
import { Card, Form, Button, Radio, Input, Select, InputNumber, Row, Col, List, Tooltip } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Item } = Form;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const towLayout ={
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const monthOption = () => {
  let option = new Array(31).fill(0);
  option = option.map((item,index) => {
    let temp = item;
    if (index) {
      temp = {
        value: index * 12,
        label: `${index}年（${index * 12}期）`
      }
    } else {
      temp = {
        value: 6,
        label: '6个月（6期）'
      }
    }
    return temp;
  })
  return option;
}

const MortgageCaluculator = () => {

  const option = monthOption();
  const initValue = {
    paymentMethod: 1,
    mortgageType: 1,
    total: 100,
    gTotal: 100,
    sTotal: 100,
    month: 240,
    lv: 3.25,
    glv: 3.25,
    slv: 4.90
  }
  const [values, setValues] = useState(initValue);
  const [isShowResult, setIsShowResult] = useState(false)
  const [form] = Form.useForm();


  const handleSubmit = val => {
    setIsShowResult(true);
    setValues(val);
  }

  const { paymentMethod } = values;
  return (
    <PageHeaderWrapper>
      <Card>
        <Row>
          <Col span={16}>
            <Form
            {...layout}
            form={form}
            initialValues={values}
            onFinish={handleSubmit}
            onValuesChange={() => setIsShowResult(false)}
          >
            <Item
              name="paymentMethod"
              label={
                <span>
                  还款方式&nbsp;
                  <Tooltip title={
                    <div>
                      <p>等额本息:等额本息还款,也称定期付息,即借款人每月按相等的金额偿还贷款本息,其中每月贷款利息按月初剩余贷款本金计算并逐月结清。</p>
                      <p>等额本金:又称利随本清、等本不等息还款法。贷款人将本金分摊到每个月内,同时付清上一交易日至本次还款日之间的利息。</p>
                    </div>
                  }>
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
            >
              <Radio.Group >
                <Radio value={1}>等额本息</Radio>
                <Radio value={2}>等额本金</Radio>
              </Radio.Group>
            </Item>
            <Item label="贷款类别" name="mortgageType">
              <Radio.Group >
                <Radio value={1}>公积金贷</Radio>
                <Radio value={2}>商业贷款</Radio>
                <Radio value={3}>组合贷</Radio>
              </Radio.Group>
            </Item>
            <Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.mortgageType !== currentValues.mortgageType}
            >
              {({ getFieldValue }) => {
                return getFieldValue('mortgageType') !== 3 ? (
                  <Item
                    label="贷款总额"
                    name="total"
                    rules={[
                      { required: true, message: '贷款总额不能为空' }
                    ]}
                  >
                    <Input placeholder="请输入贷款总额" style={{width: 290}} addonAfter="万元" />
                  </Item>
                ) : (
                  <Item {...towLayout} label="贷款金额">
                    <Item {...layout} label="使用公积金贷款:" name="gTotal">
                      <Input placeholder="公积金贷款总额" style={{width: 170}} addonAfter="万元" />
                    </Item>
                    <Item {...layout} label="使用商业性贷款:" name="sTotal">
                      <Input placeholder="商业贷款总额" style={{width: 170}} addonAfter="万元" />
                    </Item>
                  </Item>
                )
              }}

            </Item>
            <Item
              label="按揭年数"
              name="month"
              rules={[
                { required: true, message: '请选择按揭年数' }
              ]}
            >
              <Select style={{width: 290}} placeholder="请选择按揭年限">
                {option.map(item => {
                  return <Option key={item.value} value={item.value}>{item.label}</Option>
                })}
              </Select>
            </Item>
            <Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.mortgageType !== currentValues.mortgageType}
            >
              { ({ getFieldValue }) => {
                return getFieldValue('mortgageType') !== 3 ? (
                  <Item
                    label={
                      <span>
                        <Tooltip title="根据2015年10月24日最新银行利率：公积金[5年以下：2.75%（包括5年），5年以上：3.25%]；商业贷款[0~1年：4.35%（包括1年），1~5年：4.75%（包括5年），5年以上：4.90%]">
                          <QuestionCircleOutlined />
                        </Tooltip>
                        &nbsp;利率
                      </span>
                    }
                    name="lv"
                    rules={[
                      { required: true, message: '利率不能为空哦' }
                    ]}
                  >
                    <InputNumber
                      placeholder="利率"
                      formatter={value => `${value}%`}
                      parser={value => value.replace('%', '')}
                    />
                  </Item>
                ) : (
                  <>
                    <Item
                      label={
                        <span>
                          <Tooltip title="根据2015年10月24日最新银行利率：公积金[5年以下：2.75%（包括5年），5年以上：3.25%]；商业贷款[0~1年：4.35%（包括1年），1~5年：4.75%（包括5年），5年以上：4.90%]">
                            <QuestionCircleOutlined />
                          </Tooltip>
                          &nbsp;商贷利率
                        </span>
                      }
                      name="slv"
                      rules={[
                        { required: true, message: '利率不能为空哦' }
                      ]}
                    >
                      <InputNumber
                        placeholder="利率"
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                      />
                    </Item>
                    <Item
                      label={
                        <span>
                          <Tooltip title="根据2015年10月24日最新银行利率：公积金[5年以下：2.75%（包括5年），5年以上：3.25%]；商业贷款[0~1年：4.35%（包括1年），1~5年：4.75%（包括5年），5年以上：4.90%]">
                            <QuestionCircleOutlined />
                          </Tooltip>
                          &nbsp;公积金利率
                        </span>
                      }
                      name="glv"
                      rules={[
                        { required: true, message: '利率不能为空哦' }
                      ]}
                    >
                      <InputNumber
                        placeholder="利率"
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                      />
                    </Item>
                  </>
                )
              }}

            </Item>
            <Item {...tailLayout}>
              <Button type="primary" htmlType="submit">开始计算</Button>
              <Button type="link" onClick={() => form.setFieldsValue(initValue)}>清空</Button>
            </Item>
          </Form>
          </Col>
          <Col span={8}>
            {isShowResult && (
              <Card>
                <List
                  header={<div>{paymentMethod === 1 ? '等额本息' : '等额本金'}</div>}
                >
                  <List.Item>
                    贷款总额：{100}
                  </List.Item>
                  <List.Item>
                    贷款总额：{100}
                  </List.Item>
                  <List.Item>
                    还款总额：{100}
                  </List.Item>
                  <List.Item>
                    支付利息：{100}
                  </List.Item>
                  <List.Item>
                    贷款月数：{100}
                  </List.Item>
                  <List.Item>
                    贷款月数：{100}
                  </List.Item>
                  <List.Item>
                    贷款月数：{100}
                  </List.Item>
                </List>
              </Card>
            )}
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  )
}

export default MortgageCaluculator;
