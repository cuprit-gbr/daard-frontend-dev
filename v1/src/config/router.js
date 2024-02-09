import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/views/HomeView.vue'

Vue.use(Router)

export default new Router({
	base: '/',
	//mode: 'history',
	mode: 'hash',
	linkActiveClass: 'routerLink--active',
	linkExactActiveClass: 'routerLink--exactActive',
	routes: [
		/*
		{
			path: '/',
			redirect: '/dev/',
		},
		*/
		{
			path: '/edit/',
			name: 'EditViewStart',
			redirect: '/edit/disease/',
		},
		{
			path: '/dev/',
			name: 'DevView',
			pathToRegexpOptions: {strict: true},
			component: () =>
				import( /* webpackChunkName: "DevView" */ '@/views/DevView.vue')
		},
		{
			path: '/login/',
			name: 'LoginView',
			pathToRegexpOptions: {strict: true},
			component: () =>
				import( /* webpackChunkName: "LoginView" */ '@/views/LoginView.vue')
		},
		{
			path: '/edit/:stepSlug/',
			name: 'EditView',
			pathToRegexpOptions: {strict: true},
			component: () =>
				import( /* webpackChunkName: "EditView" */ '@/views/EditView.vue')
		},
		{
			path: '/thank-you/',
			name: 'ThankYouView',
			pathToRegexpOptions: {strict: true},
			component: () =>
				import( /* webpackChunkName: "ThankYouView" */ '@/views/ThankYouView.vue')
		},
		{
			path: '/',
			name: 'HomeView',
			pathToRegexpOptions: {strict: true},
			component: HomeView,
		},
		{
			path: "*",
			redirect: '/',
		},
	]
})
