
var right_cilck_num = 0;
window.oncontextmenu = function(e){
	// 检查是否按下了Ctrl键
	if (e.ctrlKey) {
		return true;
	}

	e.preventDefault(); //阻止浏览器自带的右键菜单显示
	var menu = document.getElementById("rightmenu-wrapper");
	menu.style.display = "block"; //将自定义的“右键菜单”显示出来
	menu.style.left = e.clientX + "px";  //设置位置，跟随鼠标
	menu.style.top = e.clientY+"px"; 
	right_cilck_num = right_cilck_num+ 1;
	
	if(right_cilck_num %7== 1){
	      const tooltip = document.getElementById('tooltip-rightmenu');
	      tooltip.classList.add('show-tooltip');

	      // 3秒后隐藏提示框
	      setTimeout(() => {
		tooltip.classList.remove('show-tooltip');
	      }, 3000);
	}
}
window.onclick = function(e){ //点击窗口，右键菜单隐藏
	var menu = document.getElementById("rightmenu-wrapper");
	menu.style.display = "none";
}