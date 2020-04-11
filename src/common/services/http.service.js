import axios from 'axios';
import localStore from './localstorage.service';
import errorLog from './error-log.service';
import { AUTH_TOKEN } from './../constants/constants';

class HttpService {
	constructor() {
		let service = null;
		if (!window.HttpService) {
			service = axios.create();
			service.interceptors.request.use(
				this.handleRequestSuccess,
				this.handleRequestError
			);
			service.interceptors.response.use(
				this.handleResponseSuccess,
				this.handleResponseError
			);
			window.HttpService = service;
		}

		this.service = window.HttpService;
	}

	// HTTP interceptor handlers
	handleRequestSuccess = config => {
		// Do something before request is sent
		return config;
	};
	handleRequestError = error => {
		// Do something with request error
		return Promise.reject(error);
	};
	handleResponseSuccess = response => {
		return response;
	};

	handleResponseError = error => {
		switch (error.response.status) {
			case 401:
				break;
			case 404:
				break;
			default:
				// 500
				break;
		}
		console.log(error.response);
		errorLog.log(error.response);
		return Promise.reject(error);
	};

	//set headers
	get config() {
		const token = localStore.get(AUTH_TOKEN) || '';
		return {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				Authorization: `Bearer ${token}`,
			},
		};
	}

	// GET Request
	get(path) {
		return this.service.get(path, this.getConfig);
	}
	// POST Request
	post(path, payload) {
		return this.service.post(path, payload, this.getConfig);
	}
	// PATCH Request
	patch(path, payload) {
		return this.service.patch(path, payload, this.getConfig);
	}
	// PUT Request
	put(path, payload) {
		return this.service.put(path, payload, this.getConfig);
	}
	// DELETE Request
	delete(path, id) {
		return this.service.delete(`${path}/${id}`, this.getConfig);
	}
}

const http = new HttpService();
const httpInstance = window.HttpService || null;

export { http, httpInstance };
