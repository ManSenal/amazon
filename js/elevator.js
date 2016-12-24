var elevator={
	FHEIGHT:0,//保存楼层的高度
	//保存亮灯区域上下边界距文档显示区顶部距离
	UPLEVEL:0,
	DOWNLEVEL:0,
	DURATION:1000,//动画持续时间
	init:function(){
		this.FHEIGHT=//#f1的高+#f1的marginBottom
			parseFloat($("#f1").css("height"))+parseFloat($(".nuk").css("height"))+
			parseFloat($("#f1").css("marginBottom"));
			console.log(this.FHEIGHT);
		this.UPLEVEL=//(innerHeight-FHEIGHT)/2
			(innerHeight-this.FHEIGHT)/2;
		this.DOWNLEVEL=//(UPLEVEL+FHEIGHT)
			this.UPLEVEL+this.FHEIGHT;
		//为document绑定scroll事件为scroll方法
		$(document).scroll(this.scroll.bind(this));
		//为#elevator下的ul添加mouseover事件代理，只有li才能响应事件
		$("#elevator>ul").on("mouseover","li",
			function(e){//target:li a
				var $target=$(e.target);//获得目标元素
				if(e.target.nodeName=="A"){//如果target是a 
					$target=$target.parent();//换成其父元素li
				}
				//$target中显示第二个a,隐藏第一个a
				$target.children(":first").hide();
				$target.children(":last").show();
			}
		);
		//为#elevator下的ul添加mouseout事件代理,只有li响应事件
		$("#elevator>ul").on("mouseout","li",
			function(e){
				var $target=$(e.target);
				if(e.target.nodeName=="A"){//如果target是a
					$target=$target.parent();//就改为其父元素
				}
				//获得$target在ul的下标
				var i=$target.index("#elevator>ul>li");
				//查找.floor下的header下的span取第i个
				var $span=$(".common>span:eq("+i+")");
				//如果span的class没有hover
				if(!$span.hasClass("hover")){
					//$target中显示第一个，隐藏第二个
					$target.children(":first").show();
					$target.children(":last").hide();
				}
			}
		);
		//为#elevator下的ul添加click事件,只有li下class为etitle的a响应
		$("#elevator>ul").on("click","li>a.etitle",
			function(e){
				//停止body上的动画，清空队列
				$("body").stop(true);
				//获取目标元素的父元素
				var $li=$(e.target).parent();
				//获取$li在所有li中的下标i
				var i=$li.index("#elevator>ul>li");
				//查找.floor下的header下的span中的第i个$span
				var $span=$(".common>span:eq("+i+")");
				//启动动画，让body在DURATION时间内滚动到$span距页面顶部的总距离-UPLEVEL
				$("body").animate(
					{scrollTop:
						$span.offset().top-this.UPLEVEL},
						this.DURATION
				);
			}.bind(this)
		);
	},
	scroll:function(){//响应document的scroll事件
		//查找.floor下的header下的span，对每个元素执行：
		$(".common>span").each(function(i,elem){
			//function(i,elem){i:下标，elem:当前DOM元素}
			//获取当前元素elem距页面顶部的总距离totalTop
			var totalTop=$(elem).offset().top;
			//获取body滚动或的距离scrollTop
			var scrollTop=$("body").scrollTop();
			//用totalTop-scrollTop,保存在innerTop
			var innerTop=totalTop-scrollTop;
			console.log(innerTop);
			console.log(this.UPLEVEL);
			console.log(this.DOWNLEVEL);
			//如果innerTop>UPLEVEL且<=DOWNLEVEL
			if(innerTop>this.UPLEVEL&&innerTop<=this.DOWNLEVEL){
				//设置当前元素elem的class为hover
				$(elem).addClass("hover");
				//对应的li中显示第二个a，隐藏第一个a
				$("#elevator>ul>li:eq("+i+")>a:first").hide();
				$("#elevator>ul>li:eq("+i+")>a:last").show();
			}else{
				$(elem).removeClass("hover");
				$("#elevator>ul>li:eq("+i+")>a:first").show();
				$("#elevator>ul>li:eq("+i+")>a:last").hide();
			}
		}.bind(this));
		////查找.common下的span 中为hover的，如果找到，就设置#elevator显示，否则隐藏
		//$(".common>span.hover").length>0?$("#elevator").show():$("#elevator").hide();
	}
}
elevator.init();
document.addEventListener('scroll',function(){
	var div=document.getElementById('elevator');
	div.style.display=(document.body.scrollTop>1800&&document.body.scrollTop<=5700)?'block':'none';
});