import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Card, DatePicker, Form, Button } from 'antd';
import { useFormTable, useRequest } from '@umijs/hooks';
import { down } from '../../utils/utils';
import { queryRule, exportExcel } from './service';




const TableList = () => {
  const [form] = Form.useForm();
  const { tableProps, search } = useFormTable(queryRule, {
    defaultPageSize: 10,
    form,
    cacheKey: 'tableProps',
    formatResult: response => {
    console.log("TableList -> response", response)
      return {
        list: response.data.records,
        total: response.data.total
      }
    }
  });

  const { run, loading } = useRequest(exportExcel, {
    manual: true,
    onSuccess: (result) => {
      const filename = result.response.headers.get('filename');
      down(result.data, decodeURI(filename));
    }
  })

  const { submit, reset } = search || {};
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      valueType: 'textarea',
    },
    {
      title: '进场时间',
      dataIndex: 'createTime',
      hideInForm: true,
    },
    {
      title: '出场时间',
      dataIndex: 'updateTime',
    }
  ];


  const searchForm = (
      <div style={{padding: '0 24px', display: 'flex', justifyContent: 'space-between'}}>
        <Form form={form}>
          <Form.Item label="选择月份" name="month">
            <DatePicker picker="month" format="YYYY-MM" />
          </Form.Item>
        </Form>
        <div>
          <Button type="primary" onClick={submit}>筛选</Button>
          <Button style={{marginLeft: 10}} onClick={reset}>重置</Button>
          <Button style={{marginLeft: 10}} onClick={() => run(form.getFieldsValue())}>导出</Button>
        </div>
      </div>
    )

  if(loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <PageHeaderWrapper>
      <Card
        bodyStyle={{padding: '24px 10px' }}
      >
        {searchForm}
        <Table
          rowKey="id"
          columns={columns}
          {...tableProps}
        />
      </Card>

    </PageHeaderWrapper>
  );
};

export default TableList;
