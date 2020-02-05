import request from '../utils/request';

/**
 * 用户登录接口
 * @param {object} user 用户
 * @param {string} user.username 用户名
 * @param {string} user.password 用户密码
 */
export async function login(user) {
  return request({
    url: '/user/login',
    method: 'post',
    data: user
  });
}

/**
 * 用户注册接口
 * @param {object} user 用户
 * @param {string} user.username 用户名
 * @param {string} user.password 用户密码
 */
export async function regist(user) {
  return request({
    url: '/user/regist',
    method: 'post',
    data: user
  });
}
