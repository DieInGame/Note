// 实体 所有的参与碰撞物体
ap.module("entity").requires("timer", "class", "skill").defines(function() {
	"use strict";
	ap.Entity = ap.Class.extend({
		// 实体的名字
		name: null,
		// 攻击力
		power: 10,
		// 因状态而改变的
		powerBonus: 0,
		// 暴击加成
		criticalBonus: 0,

		// 移动速度 每秒移动像素
		moveSpeed: 100,
		// 移动速度奖励
		moveSpeedBonus: 0,
		// 移动用计时器
		moveTimer: null,

		// 是否定身
		isImmobilize: false,
		// 是否有反射Buff
		isReflection: false,
		// 是否死亡
		isKilled: false,
		// 是否在被干扰
		isJam : false,

		// 初始化
		init: function(property) {
			// 复制参数的属性
			for (var i in property) {
				this[i] = property[i];
			}
			// 如果当前配置指定了技能 创建技能实例
			if (property && property["skill"]) {
				for (var i = 0; i < property["skill"].length; i++) {
					var sk = ap.skill.createSkill(property["skill"][i], this);
					this.skills[property["skill"][i]] = sk;
				}
			}
			this.moveTimer = new ap.Timer();
		},
		// 攻击动作 技能
		attack: function(skill) {
			var s = this.skills[skill];
			// 检查Cooldown
			if (s.timer.delta() >= s.coolDown) {
				s.cast();
				// 重置冷却计时
				s.timer.reset();
			}
		},
		// 计算指定的角度移动的偏移量 具体移动在collision中实现
		moveByRad: function(rad) {
			this.moveOffset.x = this.lastMove * Math.cos(rad);
			this.moveOffset.y = this.lastMove * Math.sin(rad);
		},
		// 修改角度，再移动一次
		changeRad: function(num) {
			// 按照次数修正方向
			var f = num % 2 ? -1 : 1,
				// 按照次数修正度数
				rad = Math.round(num / 2) * 15 * Math.PI / 180;
			this.moveByRad(this.moveAim + rad * f);
		},
		// 受到治疗 吸血和恢复buff
		onHeal: function(heal) {
			this.life += heal;
			if (this.life > this.lifeLimit) {
				this.life = this.lifeLimit;
			}
		},

		// 造成伤害
		onDamage: function(damage) {
			// 吸血判定
			if (this.drainLife > 0) {
				this.onHeal(damage * this.drainLife);
			}
		},

		// 受到伤害  canReflection: 伤害能否反射
		onHurt: function(damage, attacker, canReflection) {
			if (this.hurt) {
				this.hurt(damage);
			} else {
				this.life -= damage;
			}

			// 检查反射Buff
			if (this.isReflection && !canReflection) {
				// 反射的伤害不会再次触发反射
				ap.Mediator.attack(this, attacker, damage * 0.5, "reflection", null, null, true);
			}

			if (this.life <= 0) {
				this.onKill();
				return true;
			} else {
				return false;
			}

		},

		// 死亡事件
		onKill: function() {
			this.isKilled = true;
		},
		update: function() {
			// 检查自带的状态 （如果自带debuff效果，优先处理）
			this.status.forEach(function(s) {
				s.effect(this);
			});
		},
		draw: function() {
			var pos = ap.game.getCameraPos();
			if (this.animSheet) {
				this.animSheet.draw(~~(this.pos.x + 0.5) + pos.x, ~~(this.pos.y + 0.5) + pos.y);
			}
			// 测试用 锚点
			ap.game.context.fillRect(~~(this.pos.x + 0.5) + pos.x - 2, ~~(this.pos.y + 0.5) + pos.y - 2, 4, 4);
		},

	});
});