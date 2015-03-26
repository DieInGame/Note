// 剧情
ap.module("scenario").requires("ui").defines(function() {
	ap.scenario = [{
		name: "newGame",
		description: "开始新游戏",
		// 判断是否需要进行剧情演出 trigger 为空就需要手动触发(通过name)
		trigger: null,
		// 是否需要中断游戏来播放剧情
		needPause: true,
		run: function() {
			ap.ui.playScenario(this);
		},
		// 剧情播放完毕的回调
		callback: function(difficulty) {
			ap.system.newGame(difficulty);
		},
		// 剧情演出 台词
		script: [{
			// 台词
			words: "联盟成立之前不久，诺克萨斯最高指挥部镇压了自称王储的瑞斯卡里奥发动的政变，理由是他们追求黑暗的秘术知识。"
		}, {
			words: "于是有那么一群被称作灰色秩序的放逐者，被迫离开他们的家园。"
		}, {
			words: "组织的领导者是一对夫妻，神秘术士格雷戈里·哈斯塔和他的妻子暗影巫女阿莫琳。"
		}, {
			words: "他们从瓦洛兰大陆带走了一批魔法师和其他知识分子，他们越过宏伟屏障，在禁忌的巫毒之地北部重新安家。"
		}, {
			words: "虽然生存时常充满挑战，但他们却超越前人，成功地在这里生活下去"
		}, {
			words: "几年之后，格雷戈里和阿莫琳生了个女儿，她的名字叫做安妮。"
		}, {
			words: "很早的时候格雷戈里就知道女儿非同一般，安妮身上流淌的术士血液和出色的黑暗魔法让她拥有惊人的秘术能量。"
		}, {
			words: "联盟的人认为这个女孩是最受欢迎的英雄之一，连要驱逐她父母的城邦居民也不例。"
		}, {
			words: "我们的故事就要从安妮与她最亲密的伙伴提伯斯相遇开始......"
		}, {
			words: "一个平常的早晨，安妮一个人看家。无聊的安妮趴在窗台，看着外面的灰色树林。"
		}, {
			words: "吼~~~远方传来了野兽狂暴的嘶吼。"
		}, {
			// 头像
			icon: "Annie",
			words: "好像，它在叫我去玩？"
		}, {
			icon: "Annie",
			words: "那就偷偷出去看看。最好带点什么东西去吧，树林里有好多坏东西呢。"
		}, {
			icon: "Annie",
			words: "带什么好呢？"
		}, {
			// 难度选择框
			select: ["小熊布偶（简单）", "魔法手杖（普通）", "血纹咒印（困难，一周目慎选）"],
			words: "(迷之音：请选择难度。通关后部分资料可以继承，建议从简单开始。)"
		}, {
			// 显示条件
			which: function(diff) {
				return diff === 0;
			},
			words: "软软的小熊布偶平息了安妮内心隐约的不安。"
		}, {
			which: function(diff) {
				return diff === 0;
			},
			icon: "Annie",
			words: "这次就在附近找找看吧。"
		}, {
			which: function(diff) {
				return diff === 0;
			},
			words: "安妮带着小熊布偶出门了..."
		}, {
			which: function(diff) {
				return diff === 1;
			},
			words: "结实的手杖传来的可靠的感觉。"
		}, {
			which: function(diff) {
				return diff === 1;
			},
			icon: "Annie",
			words: "这次就走远点吧。"
		}, {
			which: function(diff) {
				return diff === 1;
			},
			icon: "Annie",
			words: "安妮握着魔法手杖出门了..."
		}, {
			// 显示条件
			which: function(diff) {
				return diff === 2;
			},
			words: "血纹咒印闪耀的光芒似乎和安妮的血脉共鸣了。"
		}, {
			// 显示条件
			which: function(diff) {
				return diff === 2;
			},
			icon: "Annie",
			words: "这种感觉，我好像更厉害了。"
		}, {
			// 显示条件
			which: function(diff) {
				return diff === 2;
			},
			words: "安妮带着血纹咒印出门了..."
		},{
			words:"（谜之音：游戏内可以点击右下角的帮助 或者 按下H键获得游戏帮助。)"
		}]
	}, {
		name: "lv6",
		description: "角色提升到6级时，遇到熊，击败后获得技能",
		trigger: function() {
			if (ap.game.player.level == 6 && !this.disabled) {
				this.run();
				this.disabled = true;
			}
		},
		background: 'canvas',
		needPause: true,
		run: function() {
			ap.ui.playScenario(this);
		},
		callback: function() {
			ap.ui.addMessage("安妮命运的邂逅，史诗级暗影熊出现了！", "yellow");
		},
		script: [{
			icon: "Bear ",
			words: "吼~~~~~~~~~~~~~~~~~~"
		}, {
			icon: "Bear ",
			words: "吼~~~~~~~~~~~~"
		}, {
			icon: "Bear ",
			words: "吼~~~~~~"
		}, {
			words: "森林里传来野兽的吼声。"
		}, {
			icon: "Annie",
			words: "就在前面了！"
		}, {
			icon: "Annie",
			words: "那就是我要找的小熊吧。（兴奋）"
		}, {
			words: "被瘴气浸入的暗影熊目露凶光，冲了过来！"
		}, {
			icon: "Annie",
			words: "不听话的孩子是要被教训的。嘿！"
		}]
	}, {
		name: "gameOver",
		description: "玩家死亡，游戏结束",
		// 判断是否需要进行剧情演出 trigger 为空就需要手动触发(通过name)
		trigger: null,
		// 是否需要中断游戏来播放剧情
		needPause: true,
		run: function() {
			ap.ui.playScenario(this);
		},
		// 剧情播放完毕的回调
		callback: function() {
			ap.system.saveGame();
		},
		// 剧情演出 台词
		script: [{
			words: "树林里的怪物不断的涌出，强烈的敌意化作凶猛的攻击袭向安妮。"
		}, {
			icon: "Annie",
			words: "好疼，好累，好冷..."
		}, {
			icon: "Annie",
			words: "不和你们玩了！"
		}, {
			words: "安妮从口袋摸出了一块宝石，用魔力点燃了它。一阵闪烁中，安妮消失在原地。"
		}, {
			words: "神秘术士当然不会对自己的女儿吝啬，那是逃跑用的宝石。"
		}, {
			icon: "Annie",
			words: "下次，下次一定要打扁这些坏家伙。哼！"
		}, {
			words: "(迷之音：本次游戏虽然残念的结束了，但安妮的冒险并没有结束。本次获得的稀有道具都已经保留。祝愿下次能走的更远...）"
		}]
	}, {
		name: "loadGame",
		description: "继续游戏",
		trigger: null,
		needPause: true,
		run: function() {
			ap.ui.playScenario(this);
		},
		// 剧情播放完毕的回调
		callback: function() {
			ap.system.loadGame();
		},
		// 剧情演出 台词
		script: [{
			words: "我们的主角休息好又回来了。"
		}, {
			icon: "Annie",
			words: "我上次走到到哪儿来着？唔唔唔~~就从这里开始吧。"
		}]
	}, {
		name: "help",
		description: "帮助",
		trigger: null,
		background: 'canvas',
		needPause: true,
		run: function() {
			ap.ui.playScenario(this);
		},
		callback: function() {},
		script: [{
			words: "游戏指引 & TIPS"
		}, {
			words: "关于移动：<br/> 使用 鼠标右击地面 或者 方向键 来移动角色。"
		}, {
			words: "关于攻击：<br/> 使用 鼠标左键 或者 空格键 来释放普通攻击。<br/>使用 QWER键 来释放角色技能。"
		}, {
			words: "关于瞄准：<br/> 角色的攻击会瞄准当前鼠标的位置，如果使用键盘移动的话，就是攻击最近移动的方向。"
		}, {
			which: function() {
				return ap.game.player.level > 6;
			},
			words: "关于提伯斯：<br/> 提伯斯可以吸引周围敌人的注意力，并周期性的灼烧附近的敌人。"
		}, {
			words: "关于回复：<br/> 玩家回复的手段：攻击附带的生命吸取，怪物掉落的生命药水。攻击就是最好的回复。"
		}, {
			words: "关于区域：<br/> 每个地图都有一些特性，具体参考界面左上方的标识。特性会强化怪物的某些方面。"
		}, {
			words: "关于稀有区域：<br/> 稀有区域内有一个特殊的怪物，会召唤其他怪物，而且有概率掉落可继承的稀有物品。"
		}, {
			words: "关于角色属性：<br/> 游戏中可以按下 C键 来显示角色属性面板。"
		}, {
			words: "关于暂停：<br/> 游戏中可以按下 Esc键 来暂停游戏。"
		}, {
			words: "关于难度：<br/> 难度影响玩家的等级上限和结局。难度越高，怪物越强，但掉落稀有物品的概率也越大。"
		}, {
			words: "关于中断1：<br/> 游戏中可以随时中断游戏。在暂停游戏界面选择中断游戏，即可保存当前游戏退至主界面。"
		}, {
			words: "下次可以通过主界面的继续来继续上次的游戏。<br/> 继续游戏会将玩家的生命恢复到一半以上，并且重置场景中的怪物。"
		}, {
			words: "关于继承：<br/> 游戏中获得的稀有物品将在玩家死亡时或者中断时保存。下次游戏时将在继承这些稀有物品的情况下进行。"
		}, {
			words: "TIPS 1: <br/> 困难难度在没有继承物品的情况下较难应对，请在简单或者普通模式下获得部分物品后再来挑战。"
		}, {
			words: "TIPS 2: <br/> 危机的时候请不要犹豫，中断游戏再继续可以让角色回复部分生命。"
		}, {
			words: "TIPS 3: <br/> 游戏内置了金手指，如果真有需要的话，请按下F12来查看控制台。"
		}]
	}];
});