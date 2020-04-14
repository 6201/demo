import request from '@/utils/request';
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

export async function exportExcel({month}) {
  const data = new FormData();
  data.append('month', moment(month).format('YYYY-MM'));
  return request('dingtalk/scan/list/export', {
    method: 'POST',
    data,
    responseType: 'blob',
    getResponse: true,
  })
}

