function getToken() {
	return sessionStorage.getItem('token');
}
const _request = (url, resolve, reject, data = {}, method = 'GET') => {
	uni.request({
		header:{
			token: getToken()
		},
		url: 'http://localhost:3000/' + url,
		method,
		data,
		success:(res) => {
			console.log(res);
		resolve(res);
		},
		fail:(err) => {
			reject(err);
		}
	})
}

export default ({
	url,
	data,
	method
}) => {
	if(url.includes('login')){
		
	}else{
		let isToken = getToken();
		if(!isToken){
			uni.reLaunch({
				url:'/pages/login/login.vue'
			})
		}
	}
	return new Promise((resolve, reject) => {
		_request(url, resolve, reject, data, method);
	});
}


	