import request from '@/utils/request';
import { stringify } from 'qs';
import moment from 'moment';

export async function queryRule({current, pageSize}, {month}) {
  const data = new FormData();
  data.append('pageNo', current);
  data.append('pageSize', pageSize);
  data.append('month', moment(month).format('YYYY-MM'));
  return request('/dingtalk/scan/list', {
    method: 'POST',
    data,
  });
}

export async function exportExcel(params) {
  return request('dingtalk/scan/list/export', {
    method: 'POST',
    data: stringify(params),
    responseType: 'blob',
    getResponse: true,
  })
}

