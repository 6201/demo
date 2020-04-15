/* eslint-disable prefer-promise-reject-errors */
import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  // return request('/api/login/account', {
  //   method: 'POST',
  //   data: params,
  // });
  return new Promise(resolve => {
    setTimeout(() => {
      if(params.password === 'ythadmin_2020' && params.userName === 'ythadmin') {
        resolve({
          status: 'ok',
          currentAuthority: 'admin',
        })
      }
    }, 100)
  })
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
