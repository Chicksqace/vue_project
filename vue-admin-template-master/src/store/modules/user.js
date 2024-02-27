import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,asyncRoutes,constantRoutes,anyRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes:[],
    roles:[],
    buttons:[],
    //对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的路由】
    rsultAsyncRoutes:[],
    //用户最终需要展示全部路由
    resultAllRputes:[]
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
},
//最终计算出的异步路由
SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
  state.rsultAsyncRoutes=asyncRoutes
  state.resultAllRputes=constantRoutes.concat(state.rsultAsyncRoutes,anyRoutes)
  // 给路由器添加新的路由
  router.addRoutes(state.resultAllRputes)
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
        commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRoutes,data.routes))
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

//定义一个函数：俩个数组进行对比，对比出当前用户到底显示那些异步路由
const computedAsyncRoutes=(asyncRoutes,routes)=>{
  //过滤出当前用户需要展示的异步
  return asyncRoutes.filter(item=>{
    // 说明存在
    if(routes.indexOf(item.name)!=-1){
      //递归 还别下级路由
      if(item.children&&item.children.length){
        item.children=computedAsyncRoutes(item.children,routes)
      }
      return true 
    }
  })

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

