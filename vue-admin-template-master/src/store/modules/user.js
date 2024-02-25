import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes:[],
    roles:[],
    buttons:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
//  存储用户信息
SET_USERINFO:(state,userInfo)=>{
  //用户名
  state.name=userInfo.name
  //用户头像
  state.avatar=userInfo.avatar
  //菜单权限标记
  state.routes=userInfo.routes
  //按钮权限标记
  state.buttons=userInfo.buttons
  // 角色
  state.roles=userInfo.roles
}

}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    //解构出用户名与密码
    const { username, password } = userInfo;
    let result = await login({ username: username.trim(), password: password });
    //注意：当前登录请求现在使用mock数据，mock数据code是20000
    if(result.code==20000){
      //vuex存储token
      commit('SET_TOKEN',result.data.token);
      //本地持久化存储token
      setToken(result.data.token);
      return 'ok';
    }else{
      return Promise.reject(new Error('faile'));
    }
  }, 
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        console.log(data);
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        // vue存储用户全部的信息
        commit('SET_USERINFO',data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

