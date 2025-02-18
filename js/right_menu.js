var right_cilck_num = 0;

// 显示自定义右键菜单
window.oncontextmenu = function (e) {
  // 检查是否按下了Ctrl键
  if (e.ctrlKey) {
    return true;
  }

  e.preventDefault(); // 阻止浏览器自带的右键菜单显示
  var menu = document.getElementById("rightmenu-wrapper");
  menu.style.display = "block"; // 将自定义的“右键菜单”显示出来
  menu.style.left = e.clientX + "px"; // 设置位置，跟随鼠标
  menu.style.top = e.clientY + "px";
  right_cilck_num = right_cilck_num + 1;

  if (right_cilck_num % 7 == 1) {
    const tooltip = document.getElementById('tooltip-rightmenu');
    tooltip.classList.add('show-tooltip');

    // 3秒后隐藏提示框
    setTimeout(() => {
      tooltip.classList.remove('show-tooltip');
    }, 3000);
  }
};

// 点击页面隐藏自定义菜单
window.onclick = function (e) {
  var menu = document.getElementById("rightmenu-wrapper");
  menu.style.display = "none";
};

// 复制本文链接
function copyPageUrl() {
	const url = window.location.href;
	navigator.clipboard.writeText(url)
	  .then(() => {
		const tooltip = document.getElementById('tooltip-clipboard');
		tooltip.classList.add('show-tooltip');
		setTimeout(() => {
		  tooltip.classList.remove('show-tooltip');
		}, 3000);
	  })
	  .catch(() => {
		alert("复制失败，请手动复制链接。");
	  });
  }

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    // 进入全屏
    document.documentElement.requestFullscreen().catch(err => {
      console.error('无法进入全屏模式:', err);
    });
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
}

function scrollToComments() {
  const commentsSection = document.getElementById('gitalk-container');
  if (commentsSection) {
    commentsSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.error('未找到评论区');
  }
}
