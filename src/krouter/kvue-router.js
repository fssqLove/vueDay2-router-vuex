// 1.实现一个插件，挂在$router
let Vue;
class KVueRouter {
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

KVueRouter.install = function (_Vue) {
    // 保存构造函数，在KvueRouter里面使用
    Vue = _Vue;

    // 挂在$router
    // 怎么获取根实例中的router 选项

    Vue.mixin({
        beforeCreate() {
            // console.log(this)
            // 确保根示例的时候在执行
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        },
    })

    // 任务2:实现两个全局组件 router-link router-view
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            // <a href="#/about"></a>
            // h(tag,data,children)
            // <router-link to="/about"></router-link>
            console.log(this.$slots)
            return h('a', { attrs: { href: `#${this.to}` } }, this.$slots.default)
            // return <a href={`#${this.to}`}>{this.$slots.default}</a> // jsx 版本
        },
    })
    Vue.component('router-view', {
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
        },
    })
}

export default KVueRouter;