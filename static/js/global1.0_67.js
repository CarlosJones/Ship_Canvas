/**
注意全局对象是以Window.GG存在的,是单例模式
使用的是最原始的ajax请求,不依赖jquery
当需要同步的异步接口太多可以使用Promise保证异步接口的同步性(开发人员只需要关心成功怎么办不成功怎么办,不需要再额外考虑接口的同步性),在某些浏览器可能不兼容Promise,因此依赖兼容包promise.js,该promise.js兼容包由阿里提供
本例没有使用promise,直接在回调中调用
**/
(function() {
	function gg() {
		this.getTokenUrl = "http://10.21.2.55:8801/wharf-sso/oauth/token"; //定义原型对象属性

		this.createXmlHttpRequest = function() {
			var xmlHttp;
			try {
				xmlHttp = new XMLHttpRequest();
			} catch(e) {
				try {
					xmlHttp = new ActiviXObject("Msxml2.XMLHTTP");
				} catch(e) {
					try {
						xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
					} catch(e) {}
				}
			}
			return xmlHttp;
		}
		this.based64 = function(str) {
			// private property
			_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

			// public method for encoding
			this.encode = function(input) {
				var output = "";
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;
				input = _utf8_encode(input);
				while(i < input.length) {
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);
					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;
					if(isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if(isNaN(chr3)) {
						enc4 = 64;
					}
					output = output +
						_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
						_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
				}
				return output;
			}

			// public method for decoding
			this.decode = function(input) {
				var output = "";
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				var i = 0;
				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
				while(i < input.length) {
					enc1 = _keyStr.indexOf(input.charAt(i++));
					enc2 = _keyStr.indexOf(input.charAt(i++));
					enc3 = _keyStr.indexOf(input.charAt(i++));
					enc4 = _keyStr.indexOf(input.charAt(i++));
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
					output = output + String.fromCharCode(chr1);
					if(enc3 != 64) {
						output = output + String.fromCharCode(chr2);
					}
					if(enc4 != 64) {
						output = output + String.fromCharCode(chr3);
					}
				}
				output = _utf8_decode(output);
				return output;
			}

			// private method for UTF-8 encoding
			_utf8_encode = function(string) {
				string = string.replace(/\r\n/g, "\n");
				var utftext = "";
				for(var n = 0; n < string.length; n++) {
					var c = string.charCodeAt(n);
					if(c < 128) {
						utftext += String.fromCharCode(c);
					} else if((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					} else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}

				}
				return utftext;
			}

			// private method for UTF-8 decoding
			_utf8_decode = function(utftext) {
				var string = "";
				var i = 0;
				var c = c1 = c2 = 0;
				while(i < utftext.length) {
					c = utftext.charCodeAt(i);
					if(c < 128) {
						string += String.fromCharCode(c);
						i++;
					} else if((c > 191) && (c < 224)) {
						c2 = utftext.charCodeAt(i + 1);
						string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
						i += 2;
					} else {
						c2 = utftext.charCodeAt(i + 1);
						c3 = utftext.charCodeAt(i + 2);
						string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
						i += 3;
					}
				}
				return string;
			}
		}

		//获取token,两个参数clientId,clientPwd,该方法会自动base64编码
		this.getToken = function(clientId, clientPwd, userName, pwd,success,failed) {
			var form = new FormData(); //需要post的参数,下面3个注意匹配文档
			form.append("grant_type", "password");
			form.append("username", userName);
			form.append("Password", pwd);
			var xhr = this.createXmlHttpRequest();
			xhr.open("post", this.getTokenUrl, true); //以post方式请求
			xhr.setRequestHeader("Authorization", this.based64(clientId + ":" + clientPwd)); //根据文档要求设置请求头
			//接收服务器返回的数据
			xhr.onreadystatechange = function() {
				switch(xhr.readyState) {
					case 1:
						//alert("xhr对象已经建立,尚未调用send方法");
						break;
					case 2:
						//alert("发送数据，send方法已经调用");
						break;
					case 3:
						//alert("数据传送中，已经接受部分数据");
						break;
					case 4:
						//alert("数据接收完毕，此时可以通过responseBody和responseText获取数据");
						var webStatus = xhr.status;
						//alert("Http协议状态:" + webStatus);
						if(webStatus == 200 || webStatus == 304) {
							success(JSON.parse(xhr.responseText));
							//alert(xhr.responseBody);
						}
						break;
				}
			};
			xhr.send(form);
		}
	}
	Window.$G = new gg();
})();