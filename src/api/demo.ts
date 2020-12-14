// 用于接口缓存
import mem from 'mem';
import request from '@/utils/request.ts';

export function getData(foo: string) {
  request({
    url: '/getData',
    params: {
      foo
    }
  });
}

export const getBanners = mem(
  function(foo: string) {
    return request({
      url: '/banner',
      params: {
        foo
      }
    });
  },
  {
    maxAge: 1000 * 60 * 15
  }
);

export function postData(foo: string) {
  request({
    url: '/postData',
    method: 'post',
    data: {
      foo
    }
  });
}
