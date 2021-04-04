# 1.vue 路由 
## 1.1实现router-link组件 （主要返回一个a标签）
```
/**router-link.js**/

export default {
  props:{
    to:{
      type:String,
      required:true
    }
  },
  render(h){
    return h("a",{attrs:{herf:`#${this.to}`}},this.$slots.default) // 三个参数，第一个是a标签，第二个是参数，第三个是children
  }
}
```

## 1.2实现router-view组件, (渲染匹配到的内容)
```
/**router-view.js**/

export default {
  render(h){
        render(h) {
            // 标记自己是router-view 组件
            this.$vnode.data.routerView = true;

            // 标记路由深度
            let depth = 0;
            let parent = this.$parent;
            while (parent) {
                const vnodeData = parent.$vnode && parent.$vnode.data
                if (vnodeData) {
                    if (vnodeData.routerView) {
                        depth++
                    }
                }
                parent = parent.$parent
            }



            // 获取path对应的component
            // const item = this.$router.$options.routes.find(({ path }) => path === this.$router.current);

            const item = this.$router.matched[depth]
            if (!item) {
                return h('div', '')
            }
            return h(item.component)
 }
```

## 1.3 vue-router (实现vue-router功能)
```
/**vue-router.js**/

import link from './router-link.js'
import view from './router-view.js'

let Vue;

class VueRouter {
    constructor(options) {
        this.$options = options;

        // 需要创建响应式属性
        // Vue.util.defineReactive(this, 'current', window.location.hash.slice(1))
        this.current = window.location.hash.slice(1);
        Vue.util.defineReactive(this, 'matched', [])

        // 监听url变化
        window.addEventListener('hashchange', () => {
            console.log(window.location.hash)
            this.current = window.location.hash.slice(1)
            this.matched = []

            this.match()
        })
    }

    match(routers) {
        routers = routers || this.$options.routes

        for (const router of routers) {
            if (router.path === '/' && this.current === '/') {
                this.matched.push(router)
            } else if (router.path !== '/' && this.current.indexOf(router.path) === 0) {
                this.matched.push(router)
                if (router.children)
                    this.match(router.children)
                return;
            }

        }
    }
}

VueRouter.install = function(_vue){
  Vue  = _vue;

  Vue.mixin({
     beforeCreate(){
      if(this.$options.router){
        Vue.prototype.$router = this.$options.router // 将vue-router挂载到Vue实例上
      }
     }
   })

  // 注册两个组件
  Vue.component('router-link',link)
  Vue.component('router-view',view)
}

export default VueRouter
```

## 1.4 配置路由表
```
/**index.js**/

import Vue from 'vue'
import VueRouter from './vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: '/about/test',
        name: 'test',
        component: {
          render(h) {
            return h('div', 'test page')
          },
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

```


## 1.5使用
```
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$create = create;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```
****
## 2.vuex
## 2.1实现
```
/**vuex.js**/

class Store {
    constructor(options) {
        this._getters = options.getters
        this._mutations = options.mutations
        this._actions = options.actions

        // 定义computed选项
        const computed = {};
        this.getters = {}; // 暴露给用户

        const stroe = this;
        Object.keys(this._getters).forEach(key => {
            const fn = stroe._getters[key]

            computed[key] = function () { // 增加computed 需要的参数
                return fn(stroe.state);
            }

            Object.defineProperty(stroe.getters, key, {
                get: () => stroe.state[key]
            })
        })

        this.state = new Vue({
            data: options.state,
            computed: computed,
        })



        // 绑定commit actions 的上下文为store示例
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    // 类型 ，负载
    commit(type, payload) {
        const entry = this._mutations[type]
        if (entry) {
            entry(this.state, payload);
        }
    }

    dispatch(type, payload) {
        const entry = this._actions[type]
        if (entry) {
            entry(this, payload);
        }
    }
}

function install(_Vue) {
    Vue = _Vue

    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        },
    })
}

// Vuex
export default {
    Store,
    install
}
```

## 2.2配置
```
import Vue from 'vue'
import Vuex from './vuex.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    add(state) {
      state.count++
    }
  },
  actions: {
    asyncAdd({ commit }) {
      setTimeout(() => {
        commit("add")
      }, 2000)
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  },
  modules: {
  }
})
```

## 2.3 使用
```
import Vue from 'vue'
import App from './App.vue'
import store from './Store'


new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

/**
    <P @click="$store.commit('add')">add:{{ $store.state.count }}</P>
    <P @click="$store.dispatch('asyncAdd')"
      >asyncAdd:{{ $store.state.count }}</P
    >
    <P>doubleCount:{{ $store.getters.doubleCount }}</P>
**/
```




[源码链接](https://github.com/fssqLove/vueDay2-router-vuex)
