/* eslint-disable prefer-promise-reject-errors */
import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  // return request('/api/login/account', {
  //   method: 'POST',
  //   data: params,
  // });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(params.password === 'ythadmin_2020' && params.userName === 'ythadmin') {
        resolve({
          status: 'ok',
          currentAuthority: 'admin',
        })
      } else if ( params.password === 'pldadmin_2020' && params.userName === 'pldadmin') {
        resolve({
          status: 'ok',
          currentAuthority: 'user',
        })
      } else {
        reject()
      }
    }, 100)
  })
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
