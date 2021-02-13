import Vue from 'vue';

export function create(Component, props) {
    // 组件构造函数如何获取
    // 1.Vue.extend()
    // 2.render

    const vm = new Vue({
        // h 是 createElement,返回的vNode，是虚拟dom
        // 需要挂在变成真实dom
        render: h => h(Component, { props }),
    }).$mount() // 不指定宿主元素，则会创建真实dom ,但是不会追加操作

    // 获取真实dom
    document.body.appendChild(vm.$el)

    const comp = vm.$children[0]

    comp.remove = function () {
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }

    return comp
}