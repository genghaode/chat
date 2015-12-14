angular.module('chat').directive('enterBreak', function(){
	return function(scope, element, attrs){
		var ctrlDown = false;
		element.bind('keydown', function(event){
			if(event.which == 17){
				ctrlDown = true;
				setTimeout(function(){
					ctrlDown = false;
				}, 1000);
			}
			if(event.which == 13){
				if(ctrlDown){
					element.val(element.val()+'\n');
				}else {//发送消息
					scope.$apply(function(){
						//调用指令属性上的方法
						scope.$eval(attrs.enterBreak);
					});
					event.preventDefault();
				}
			}
		});
	}
});