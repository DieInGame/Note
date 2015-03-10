// 技能 所有的攻击效果
ap.module("skill").requires("utils").defines(function() {
	"use strict";
	ap.skill = {
		// 玩家技能
		Pyromania : {
			id: "Pyromania",
			name: "嗜火",
			icon: "Pyromania.png",
			description: "普通攻击。\n附加效果：每进行4个攻击后，安妮的下一次伤害就会对目标造成短暂的定身效果。",
			coolDown: 0,
			caster: null,
			// 施法 参数：方向
			cast: function() {
				var status = [];
				this.caster.attackCount += 1;
				if (this.caster.attackCount >= 5) {
					this.caster.attackCount = 0;
				}
				// 创造火球投射物
				ap.game.createFlyer({
					power: this.caster.power + this.caster.powerBonus,
					duration: 3,
					owner: this.caster,
					range: 30,
					status: status,
					pos: {x:this.caster.pos.x, y:this.caster.pos.y},
					aim: this.caster.aim,
					animSheet: new ap.Image("media/item/fireball.png", ap.Image.OFFSET.LOWER_LEFT)
				});
			}
		},
		// 怪物技能列表
		Charge: {
			id: "Charge",
			name: "冲锋",
			description: null,
			coolDown: 10,
			cost: 0,
			caster: null,
			cast: function() {
				//this.caster.status.push(new ap.Status["CHARGE"]);
			}
		},
		Fire: {
			id: "Fire",
			name: "冲锋",
			description: null,
			coolDown: 10,
			cost: 0,
			caster: null,
			cast: function() {
				//this.caster.status.push(new ap.Status["CHARGE"]);
			}
		}


	};
	// 生成新的技能对象
	ap.skill.createSkill = function(name, caster) {
		var newSkill = ap.utils.deepCopy(ap.skill[name]);
		newSkill.caster = caster;
		// 如果冷却未设定，则用未角色的攻击速度来设定
		if (newSkill.coolDown === 0) {
			newSkill.coolDown = 1 / caster.attackSpeed;
		}
		// 初始化时，追加属性 冷却用的计时器
		newSkill.timer = new ap.Timer();
		return newSkill;
	};
});