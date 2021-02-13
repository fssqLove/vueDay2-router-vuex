let Vue;

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