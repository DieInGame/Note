// 系统 唯一
ap.module("system").requires("ui", "mediator", "config").defines(function() {
	"use strict";
	ap.system = {
		running: false,
		// 当前活动的game对象
		delegate: null,
		// 系统刷新用定时器的id
		loopId: null,
		context: null,
		init: function() {
			ap.ui.init();
			ap.mediator.init();
			this.context = ap.ui.canvas.getContext('2d');
		},
		resize: function() {},
		// 新开游戏
		newGame: function(val) {
			// console.log(val);
			this.delegate = new ap.Game();
			this.startLoop();
		},
		// 循环播放
		startLoop : function () {
			this.running = true;
			this.loopId = ap.ui.setAnimation(this.run.bind(this));
		},
		// 暂停
		pause : function () {
			ap.ui.clearAnimation(this.loopId);
			this.running = false;
		},
		// 运行中
		run: function() {
			// 执行当前游戏的run
			this.delegate.run();
		},
		// 读取中断的游戏
		loadGame: function() {
			this.delegate = new ap.Game({});
		},
		// 保存游戏
		saveGame : function() {

		}
	};
});