/*\
|*|有用的js函数  useful js functions
|*|鹤霁制作	  made by hjki(darryl)
|*|2022.1.1
|*|修改于2020.3.16
\*/
var Auxiliaries = {
dpiPpi: function(Width, Height, Inch) {
	return ((Width ^ 2 + Height ^ 2) ^ 0.5) / Inch;
},
hex2int: function(hex) {
	var len = hex.length, a = new Array(len), code;
	for (var i = 0; i < len; i++) {
		code = hex.charCodeAt(i);
		if (48<=code && code < 58) {
			code -= 48;
		} else {
			code = (code & 0xdf) - 65 + 10;
		}
		a[i] = code;
	}
	
	return a.reduce(function(acc, c) {
		acc = 16 * acc + c;
		return acc;
	}, 0);
},
hex2rgba: function(hex, opacity) {
	var opacity = opacity||0;
	return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + ", " + parseInt("0x" + hex.slice(3, 5))
		+ ", " + parseInt("0x" + hex.slice(5, 7)) + ", " + opacity + ")";
},
getObj: function(id) {
	if (typeof id == "object") return id;
	else if(typeof id == "string") {
		return document.getElementById(id);
	}
	else {
		throw id + " not found!";
		return;
	}
}
}
var lastPos = 0;
var Darryl = {


/* 1.隐藏与显示元素 */
objHid : function(id) {
	/*|定义显示或隐藏函数 
	|*|2022-3-10 将直接访问元素style属性改为可读性更高的函数方法
	|*|2022-3-14 增加一个过渡效果
	|*|2022-3-15 修复元素无法访问的bug
	|*/
	id = Auxiliaries.getObj(id);
	Darryl.setCss(id, "transition", "all .309s");
	if (id.style.opacity == 0) {
		Darryl.setCss(id, "opacity", "1")
	}
	else {
		Darryl.setCss(id, "opacity", "0")
	}
},
/*|2.使用新的注释标识符
|*|原理：正则表达式寻找 *.* 以及 …
|*/
annotation : function() {
	var str = document.getElementsByTagName('html')[0].outerHTML;
	var patterns = [/\*\.\*/, /….*/g];
	/* 循环查找 *.* */
	for (this.i = 0; patterns[0].test(str); this.i += 1) {
		if (this.i % 2 == 0) str = str.replace(patterns[0],"<!--");
		else str = str.replace(patterns[0],"-->");
	}
	if (patterns[1].test(str)) {
		tem = str.match(patterns[1]);
		console.log(tem);
		for (this.i = 0; patterns[1].test(str); this.i += 1) {
			temp = tem[i].replace("…","<!--") + "-->";
			str = str.replace(tem[i],temp);
		}
	}
	/*返回处理好的文本*/
	document.getElementsByTagName('html')[0].innerHTML = str;
	return str;
},
/*|3.自定义弹窗
|*|2022-3-10 将模态框id与class进行调整，防止出现冲突
|*|2022-3-12 更改页面滑动方法以适配不同机型
|*|2022-3-16 修改弹窗加载方法
|*/
modalAlert : function(url) {
	if (!url) url = "https://hjki156.github.io/UsefulJs/css/modalAlert.css";
	console.log(url);
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = url;
	var code = "\
<div class=\"darryl-mask\" id=\"darryl-mask\">\n\
<div class=\"darryl-modal\">\n\
<h1 id=\"darryl-modal-title\">弹窗</h1>\n\
<p id=\"darryl-modal-content\">暂无内容…</p>\n\
<a id=\"darryl-modal-close\" href=\"#\">close</a>\n\
<a id=\"darryl-modal-ok\" href=\"#\">ok</a>\n\
</div>\n\
</div>";
	document.body.appendChild(link);
	Darryl.alert = function(str) {window.alert(str);}
	link.onload = function() {
		document.body.innerHTML += code;
		Darryl.alert = function(str, title) {
			var onlyOne;
			title = title||"弹窗";
			var ok = document.getElementById("darryl-modal-ok");
			var close = document.getElementById("darryl-modal-close");
			var titleObj = document.getElementById("darryl-modal-title");
			var contentObj = document.getElementById("darryl-modal-content");
			close.style.display = "block";
			ok.style.width = "50vw";
			ok.style.borderBottomLeftRadius = "0";
			if (!onlyOne) {
				ok.style.width = "100%";
				ok.style.borderBottomLeftRadius = "1vh";
				close.style.display = "none";
			}
			document.body.style.overflow="hidden";
			ok.addEventListener("click", function(e) {
				e.preventDefault();
				Darryl.setCss("darryl-mask", "display", "none");
				document.body.style.overflow="";
			});
			titleObj.innerHTML = title;
			contentObj.innerHTML = str;
			lastPos = window.pageYOffset;
			testPos = document.documentElement.scrollTop;
			Darryl.setCss("darryl-mask", "display", "block");
			massage = "内容：" + str + " 标题：" + title + " 坐标：" + lastPos;
			return massage;
		}
	}
},
/*4.渐入式效果*/
setCss : function(id, styleId, value) {
	/*判断是否为对象*/
	if (typeof id == "object") id.style[styleId] = value;
	else if(typeof id == "string") {
		tem = document.getElementById(id);
		tem.style[styleId] = value;
	}
	else {
		throw id + " not found!";
	}
},
fadeIn : function(id, time) {
	time = time||1000;
	Darryl.setCss(id, "transition", "all .618s");
	Darryl.setCss(id, "position", "relative");
	Darryl.setCss(id, "opacity", "0");
	Darryl.setCss(id, "left", "-100vw");
	Darryl.setCss(id, "top", "-100vh");
	setTimeout(function(){
		Darryl.setCss(id, "left", "0");
		Darryl.setCss(id, "top", "0");
		setTimeout(function(){Darryl.setCss(id, "opacity", "1")}, time*2);
		},time);
},
/*5.渐入式状态栏 2022-3-9*/
fadeBar : function(id, background, color) {
	var background = background||"#F1F1F1";
	var color = color||"#4E4848";
	var opacity;
	var start = setInterval(function(){
		opacity = window.pageYOffset / 50 * .1 + .1;
		Darryl.setCss(id, "background", Auxiliaries.hex2rgba(background, opacity));
		if (opacity >= .5) Darryl.setCss(id, "color", color);
		else if (opacity >= 1) opacity = 1;
		else Darryl.setCss(id, "color", background);
		}, 132);
}
}