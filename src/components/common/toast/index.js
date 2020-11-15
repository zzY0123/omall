import Toast from './Toast.vue'

const obj = {}

obj.install = function (Vue) {
	// document.body.appendChild(Toast.$el)

	const toastContrustor = Vue.extend(Toast)
	const toast = new toastContrustor();
	toast.$mount(document.createElement("div"))
	document.body.appendChild(toast.$el)
	Vue.prototype.$toast = toast;
	// Vue.prototype.$toast = Toast;
}

export default obj;