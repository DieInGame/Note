// UI 关联DOM用
// 以防万一
window.requestAnimationFrame = window.requestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
ap.module("ui").requires("utils").defines(function() {
	"use strict";
	ap.ui = {
		// 当前游戏动画循环调用用
		_anims: {},
		_next: 1,
		// 战斗信息计数 最多30个
		messageCount: 0,
		// 剧情界面是否加过listener
		scenarioHasEvent: false,
		// =============剧情相关=============
		// 当前播放的剧情
		script: null,
		// 当前播放到的位置
		cur: 0,
		// 剧情的返回值
		returnValue: 0,
		// 剧情播放完的回调
		callback: null,

		// =============DOM关联==================
		// Loading界面
		loading: null,
		// 主界面
		main: null,
		// 主界面 - 选项
		startGame: null,
		loadGame: null,
		// 剧情界面
		scenario: null,
		// 剧情界面 - 头像		
		head: null,
		// 剧情界面 - 文本
		lines: null,
		// 剧情界面 - 画面选项 框
		selecter: null,
		// 剧情界面 - 画面选项 内容
		selectList: null,
		// 游戏界面
		gameUI: null,
		// 游戏界面 - 战斗信息
		messageList: null,
		// 游戏界面 - 画布
		canvas: null,
		// 等级
		level: null,
		// 游戏界面 - 血条
		life: null,
		lifeNum: null,
		lifeBar: null,
		// 游戏界面 - 护盾条
		shield: null,
		shieldNum: null,
		shieldBar: null,
		// 游戏界面 - 技能栏
		skillList: [],
		// 游戏界面 - 区域特性栏 - 区域号
		areaCount: null,
		// 游戏界面 - 区域特性栏 - 稀有标识
		rare: null,
		// 游戏界面 - 区域特性栏 - 特性列表
		featureList: null,
		// 游戏界面 - 区域特性栏 - 剩余击杀数
		leaveKill: null,
		// 游戏界面 - 区域特性栏 - 文字说明 可以离开
		canLeave: null,
		// 游戏界面 - 区域特性栏 - 文字说明 不能离开
		cannotLeave: null,
		// 游戏界面 - 角色面板 
		playerInfo: null,
		// 游戏界面 - 角色面板 - 名称
		nameInfo: null,
		// 游戏界面 - 角色面板 - 等级
		levelInfo: null,
		// 游戏界面 - 角色面板 - 距离升级
		nextLvExpInfo: null,
		// 游戏界面 - 角色面板 - 生命
		lifeInfo: null,
		// 游戏界面 - 角色面板 - 攻击力
		powerInfo: null,
		// 游戏界面 - 角色面板 - 攻速
		attackSpeedInfo: null,
		// 游戏界面 - 角色面板 - 暴击
		criticalInfo: null,
		// 游戏界面 - 角色面板 - 生命吸取
		drainLifeInfo: null,
		// 游戏界面 - 角色面板 - 移动速度
		moveSpeedInfo: null,
		// 游戏界面 - 角色面板 - 闪避
		dodgeInfo: null,
		// 游戏界面 - 技能栏 - 技能0 - 普通攻击
		skill0: null,
		// 游戏界面 - 技能栏 - 技能1
		skill1: null,
		// 游戏界面 - 技能栏 - 技能2
		skill2: null,
		// 游戏界面 - 技能栏 - 技能3
		skill3: null,
		// 游戏界面 - 技能栏 - 技能4
		skill4: null,


		init: function() {
			// loading 界面
			this.loading = ap.$("#loading");
			// 主界面
			this.main = ap.$("#main");
			this.startGame = ap.$("#newGame");
			this.loadGame = ap.$("#loadGame");
			// 剧情界面
			this.scenario = ap.$("#scenario");
			this.selecter = ap.$("#selecter");
			this.selectList = ap.$("#selectList");
			this.head = ap.$("#head");
			this.messageList = ap.$("#messageInfo");
			this.lines = ap.$("#lines");
			// 游戏界面
			this.gameUI = ap.$("#ui");
			this.canvas = ap.$("canvas")[0];
			this.level = ap.$("#level");
			this.life = ap.$("#life");
			this.lifeBar = ap.$("#lifeInner");
			this.lifeNum = ap.$("#lifeNum");
			this.shield = ap.$("#shieldInner");
			this.shieldNum = ap.$("#shieldNum");
			this.shieldBar = ap.$("#shieldInner");
			// 游戏界面 - 区域特性栏
			this.areaCount = ap.$("#areaCount");
			this.rare = ap.$("#rare");
			this.featureList = ap.$("#featureList");
			this.leaveKill = ap.$("#leaveKill");
			this.canLeave = ap.$("#canLeave");
			this.cannotLeave = ap.$("#cannotLeave");
			// 游戏界面 - 角色面板
			this.playerInfo = ap.$("#playerInfo");
			this.nameInfo = ap.$("#nameInfo");
			this.levelInfo = ap.$("#levelInfo");
			this.nextLvExpInfo = ap.$("#nextLvExpInfo");
			this.lifeInfo = ap.$("#lifeInfo");
			this.powerInfo = ap.$("#powerInfo");
			this.attackSpeedInfo = ap.$("#attackSpeedInfo");
			this.criticalInfo = ap.$("#criticalInfo");
			this.drainLifeInfo = ap.$("#drainLifeInfo");
			this.moveSpeedInfo = ap.$("#moveSpeedInfo");
			this.dodgeInfo = ap.$("#dodgeInfo");
			// 游戏界面 - 技能栏
			this.skill0 = ap.$("#skill0");
			this.skill1 = ap.$("#skill1");
			this.skill2 = ap.$("#skill2");
			this.skill3 = ap.$("#skill3");
			this.skill4 = ap.$("#skill4");

			this.canvas.height = document.body.clientHeight;
			this.canvas.width = document.body.clientWidth;

			// 剧情界面的跳过按钮
			ap.$("#close").addEventListener("click", this.skipScenario.bind(this), false);

			// 战斗信息列表的滚动事件
			ap.$("#message").addEventListener("mousewheel", function(e) {
				var w = e.wheelDelta > 0 ? 1 : -1,
					ul = this.children[0].children[0],
					height = ul.offsetHeight,
					pHeight = ul.parentNode.offsetHeight,
					top = +(ul.style.top || "0px").replace("px", ""),
					newTop = top;
				if (height > pHeight) {
					newTop += 5 * w;
					if (newTop > 0) {
						newTop = 0;
					}
					if (newTop < pHeight - height) {
						newTop = pHeight - height;
					}
					ul.style.top = newTop + "px";
				}
			}, false);
			// 清空信息战斗信息列表的内容
			if (this.messageList.children.length > 0) {
				this.messageList.innerHTML = "";
			}

			this.addMessage("欢迎开始冒险~");
		},

		// CSS 操作
		hasClass: function(obj, cls) {
			return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
		},
		addClass: function(obj, cls) {
			if (!this.hasClass(obj, cls)) {
				obj.className += " " + cls;
			}
		},
		removeClass: function(obj, cls) {
			if (this.hasClass(obj, cls)) {
				var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
				obj.className = obj.className.replace(reg, '');
			}
		},

		// 动画循环播放
		setAnimation: function(callback) {
			var current = this._next++;
			this._anims[current] = true;
			var animate = function() {
				if (!ap.ui._anims[current]) {
					return;
				}
				window.requestAnimationFrame(animate);
				callback();
			};
			window.requestAnimationFrame(animate);
			return current;
		},
		// 清空当前播放的动画
		clearAnimation: function(id) {
			delete this._anims[id];
		},

		// ==============剧情播放相关==============
		// 播放剧情
		playScenario: function(scenario) {
			this.script = scenario.script;
			if (scenario.needPause) {
				ap.system.pause();
			}
			// 显示剧情界面
			this.removeClass(this.scenario, "hidden");
			this.addClass(this.main, "hidden");
			this.addClass(this.gameUI, "hidden");

			this.callback = scenario.callback || {};
			this.cur = 0;
			this.playNext();
		},
		// 播放下一句
		playNext: function() {
			if (this.cur == this.script.length) {
				// 剧情播放完毕执行回调
				if (this.callback) {
					this.callback(this.returnValue);
				}
				this.scenarioRemoveListener();
				return;
			}
			var section = this.script[this.cur];
			this.cur++;
			// 判断当前条件是否要播放 针对选择枝
			if (section.which && !section.which(this.returnValue)) {
				this.playNext();
				return;
			}
			// 设置头像
			if (section.icon) {
				this.head.className = section.icon.toLowerCase();
			} else {
				this.head.className = "none";
			}
			// 设置台词
			if (section.words) {
				this.lines.innerHTML = section.words;
			} else {
				this.lines.innerHTML = "";
			}
			// 设置背景  设计保留 暂无合适背景Orz
			// if (section.background) {
			// } else {
			// }
			// 创建一个选择菜单 并关联监听器
			if (section.select) {
				this.removeClass(this.selecter, "hidden");
				this.selectList.innerHTML = "";
				var fr = document.createDocumentFragment();
				var i = 0;
				section.select.map(function(s) {
					var li = ap.$new("li");
					li.innerHTML = s;
					li.addEventListener("click", (function(val) {
						return function() {
							ap.ui.returnValue = val;
							ap.ui.playNext();
						};
					})(i));
					fr.appendChild(li);
					i++;
				});
				this.selectList.appendChild(fr);
				this.scenarioRemoveListener();
			} else {
				this.addClass(this.selecter, "hidden");
				// 添加动作
				if (!this.scenarioHasEvent) {
					window.addEventListener("keyup", this.playNextHandler, false);
					window.addEventListener("mouseup", this.playNextHandler, false);
					this.scenarioHasEvent = true;
				}
			}

		},
		// 跳过剧情
		skipScenario: function() {
			this.cur = this.script.length;
			ap.ui.playNext();
		},
		playNextHandler: function(e) {
			// 点击画面或者按下空格或Enter时
			if (e.type !== 'keyup' || e.keyCode === 32 || e.keyCode === 13) {
				ap.ui.playNext();
			}
		},
		// 去掉剧情绑定的事件
		scenarioRemoveListener: function() {
			if (this.scenarioHasEvent) {
				window.removeEventListener("keyup", this.playNextHandler, false);
				window.removeEventListener("mouseup", this.playNextHandler, false);
				this.scenarioHasEvent = false;
			}
		},
		// 接收画面点击的选项
		setResultValue: function(val) {
			this.returnValue = val;
			this.playNext();
		},
		// 画面点击新游戏
		newGame: function() {
			// 触发新开游戏事件
			ap.mediator.fire("NEWGAME");
		},

		// 显示主界面
		showMain: function() {
			this.addClass(this.loading, "hidden");
			this.removeClass(this.main, "hidden");
			this.startGame.addEventListener("click", (function() {
				this.addClass(this.main, "hidden");
				this.removeClass(this.gameUI, "hidden");
				this.newGame();
				event.stopPropagation();
				event.preventDefault();
			}).bind(this));
		},
		// 显示游戏界面
		showGame: function() {
			this.addClass(this.loading, "hidden");
			this.addClass(this.main, "hidden");
			this.addClass(this.scenario, "hidden");
			this.removeClass(this.gameUI, "hidden");
		},

		// ==============游戏UI相关==============
		// 设置等级
		setLevel: function(lv) {
			this.level.innerHTML = lv;
		},
		// 刷新血量条
		setLife: function(num, max) {
			this.lifeNum.innerHTML = num + "/" + max;
			this.lifeBar.style.width = (num / max * 100) + "%";
			// 刷新角色面板
			this.refreshRoleJoho();
		},
		// 刷新护盾条
		setShield: function(num, max) {
			if (num === 0) {
				// 护盾耗尽 消除护盾
				this._showShield(false);
				return;
			}
			if (num == max) {
				// 初次添加
				this._showShield(true);
			}
			this.shieldNum.innerHTML = num + "/" + max;
			this.shieldBar.style.width = (num / max * 100) + "%";
		},
		// 控制护盾界面是否显示
		_showShield: function(flg) {
			if (flg) {
				this.addClass(this.life, "hasShield");
				this.removeClass(this.shield, "hidden");
				this.removeClass(this.shieldNum, "hidden");
			} else {
				this.removeClass(this.life, "hasShield");
				this.addClass(this.shield, "hidden");
				this.addClass(this.shieldNum, "hidden");
			}
		},
		// 添加战斗信息
		addMessage: function(message) {
			this.messageCount++;
			// 超出消除
			if (this.messageCount > 30) {
				this.messageList.removeChild(this.messageList.children[0]);
				this.messageCount--;
			}
			var m = ap.$new("li");
			m.innerHTML = (new Date()).toTimeString().substr(0, 8) + " " + message;
			this.messageList.appendChild(m);
			// 保持显示最后一行
			var height = this.messageList.offsetHeight,
				pHeight = this.messageList.parentNode.offsetHeight;
			if (height > pHeight) {
				this.messageList.style.top = pHeight - height + "px";
			}
		},
		// 设置特性栏
		setFeature: function(areaCount, isRare, feature, leaveKill) {
			this.areaCount.innerHTML = areaCount;
			if (isRare) {
				this.removeClass(this.rare, "hidden");
			} else {
				this.addClass(this.rare, "hidden");
			}
			this.featureList.innerHTML = "";
			var df = document.createDocumentFragment();
			for (var i = 0; i < feature.length; i++) {
				var span = ap.$new("span");
				span.innerHTML = feature[i].name;
				span.title = feature[i].description;
				df.appendChild(span);
			}
			this.featureList.appendChild(df);
			this.removeClass(this.cannotLeave, "hidden");
			this.addClass(this.canLeave, "hidden");
			this.leaveKill.innerHTML = leaveKill;
		},
		// 更新离开前击杀数
		setLeaveKill: function(num) {
			if (num === 0) {
				this.removeClass(this.canLeave, "hidden");
				this.addClass(this.cannotLeave, "hidden");
			} else {
				this.leaveKill.innerHTML = num;
			}
		},
		// 显示 / 隐藏 角色信息面板
		showRolePanel: function() {
			if (this.hasClass(this.playerInfo, "hidden")) {
				// 显示面板
				this.removeClass(this.playerInfo, "hidden");
			} else {
				// 隐藏面板
				this.addClass(this.playerInfo, "hidden");
			}
		},
		// 刷新角色面板内容
		refreshRoleJoho: function() {
			var player = ap.game.player;
			if (player) {
				this.nameInfo.innerHTML = player.name;
				this.levelInfo.innerHTML = player.level;
				this.nextLvExpInfo.innerHTML = player.nextLvExp - player.exp;
				this.lifeInfo.innerHTML = ~~player.life + "/" + player.lifeLimit;
				this.powerInfo.innerHTML = ~~player.power;
				this.attackSpeedInfo.innerHTML = player.attackSpeed.toFixed(2);
				this.criticalInfo.innerHTML = ~~(player.critical * 100);
				this.drainLifeInfo.innerHTML = ~~(player.drainLife * 100);
				this.moveSpeedInfo.innerHTML = ~~player.moveSpeed;
				this.dodgeInfo.innerHTML = ~~(player.dodge * 100);
			}
		},
		initSkillUI : function() {
			var skills = ap.game.player.skills;
			// 玩家的技能默认有5个
			for (var i = 0 ; i < skills.length ; i++) {
				var s = this["skill"+i];
				// s.
			}

		}

	};
});