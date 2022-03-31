var islands = new Array();
var rarities = new Array();
var origines = new Array();
var catchables = new Array();
var effects = new Array();

islands["1"]={cn:"阿玛克纳"};
islands["2"]={cn:"邦塔"};
islands["3"]={cn:"布拉克玛"};
islands["4"]={cn:"萨弗基亚"};
islands["8"]={cn:"无主之地"};
islands["13"]={cn:"冒险岛"};

jobs["40"]={cn:"面点师"};
jobs["62"]={cn:""};
jobs["64"]={cn:"种植"};
jobs["67"]={cn:"造币"};
jobs["68"]={cn:"近战武器大师"};
jobs["69"]={cn:"远程武器大师"};
jobs["70"]={cn:"魔法武器大师"};
jobs["71"]={cn:"伐木"};
jobs["72"]={cn:"草药"};
jobs["73"]={cn:"采矿"};
jobs["74"]={cn:"畜牧"};
jobs["75"]={cn:"钓鱼"};
jobs["76"]={cn:"厨师"};
jobs["77"]={cn:"制甲师"};
jobs["78"]={cn:"珠宝师"};
jobs["79"]={cn:"裁缝"};
jobs["80"]={cn:"皮匠"};
jobs["81"]={cn:"工匠"};
jobs["82"]={cn:"制造"};

rarities["0"]={cn:"普通"};
rarities["1"]={cn:"少见"};
rarities["2"]={cn:"稀有"};
rarities["3"]={cn:"神话"};
rarities["4"]={cn:"传说"};
rarities["5"]={cn:"遗迹"};
rarities["6"]={cn:"PVP"};
rarities["7"]={cn:"史诗"};

origines["ORIGIN_DROP"]={cn:"掉落"};
origines["ORIGIN_CRAFT"]={cn:"制造"};
origines["ORIGIN_TOKEN"]={cn:"牌子"};
origines["ORIGIN_ACHIEVEMENT"]={cn:"成就"};
origines["ORIGIN_SHOPS"]={cn:"商城"};

effects["1"]={cn:"最终伤害",en:"Damage"};
effects["2"]={cn:"最终治疗",en:"Heals"};
effects["4"]={cn:"生命",en:"Bonus max HP"};
effects["5"]={cn:"治疗",en:"Heal bonus"};
effects["6"]={cn:"行动力",en:"AP bonus"};
effects["7"]={cn:"行动力损失抗性",en:"AP loss resistance"};
effects["8"]={cn:"移动力",en:"MP boost"};
effects["10"]={cn:"移动力损失抗性",en:"MP loss resistance"};
effects["12"]={cn:"单元素等级加成",en:"Branch level bonus"};
effects["13"]={cn:"全元素等级加成",en:"level bonus to all spells"};
effects["15"]={cn:"背刺抗性",en:"Back damage resistance"};
effects["16"]={cn:"伤害抗性",en:"Resistance to all elements"};
effects["17"]={cn:"火系抗性",en:"Fire resistance"};
effects["18"]={cn:"水系抗性",en:"Water resistance"};
effects["19"]={cn:"土系抗性",en:"Earth resistance"};
effects["20"]={cn:"风系抗性",en:"Air resistance"};
effects["21"]={cn:"伤害",en:"Damage bonus (%)"};
effects["22"]={cn:"火系伤害百分比",en:"Fire damage bonus (%)"};
effects["23"]={cn:"土系伤害百分比",en:"Earth damage bonus (%)"};
effects["24"]={cn:"水系伤害百分比",en:"Water damage bonus (%)"};
effects["25"]={cn:"风系伤害百分比",en:"Air damage bonus (%)"};
effects["26"]={cn:"暴击伤害",en:"Critical Hits damage bonus"};
effects["27"]={cn:"暴击",en:"Critical Hits bonus"};
effects["30"]={cn:"韧性",en:"Strength bonus"};
effects["33"]={cn:"射程",en:"Range bonus"};
effects["34"]={cn:"勘探",en:"Prospecting bonus"};
effects["35"]={cn:"悟性",en:"Wisdom bonus"};
effects["36"]={cn:"先手",en:"Initiative bonus"};
effects["37"]={cn:"锁定",en:"Lock bonus"};
effects["38"]={cn:"闪避",en:"Dodge bonus"};
effects["39"]={cn:"背刺",en:"Back damage bonus"};
effects["42"]={cn:"统率",en:"Leadership bonus"};
effects["43"]={cn:"装备熟练",en:"Kit Skill bonus"};
effects["44"]={cn:"造成移动力损失",en:"Bonus to MP loss chances"};
effects["45"]={cn:"熟练",en:"Kit Skill bonus"};
effects["49"]={cn:"召唤物伤害",en:"Summons damage bonus"};
effects["51"]={cn:"意志",en:"Willpower bonus"};
effects["52"]={cn:"格挡",en:"Block bonus"};

catchables["1"]={cn:"可捕捉"};
