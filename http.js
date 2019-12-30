function getToken() {
	return sessionStorage.getItem('token');
}
// http://localhost:3000/api/
const _request = (url, resolve, reject, data = {}, method = 'GET') => {
	uni.request({
		header:{
			token: getToken()
		},
		url: 'http://localhost:3000/api/' + url,
		method,
		data,
		success:(res) => {
			console.log(url,res);
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
			console.log('token失效')
			uni.reLaunch({
				url:'/pages/login/login'
			})
		}
	}
	return new Promise((resolve, reject) => {
		_request(url, resolve, reject, data, method);
	});
}


	