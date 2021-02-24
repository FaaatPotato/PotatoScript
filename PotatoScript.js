///api_version=2
var script = registerScript({
    name: "PotatoScript",
    version: "2.0.0",
    authors: ["FaaatPotato (Strafe function by TheMossYT, setSpeed and some parts BaguetteFly (NOT used, but maybe in futer idk), Cancerglide base)"]
});
var MovementUtils = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");
var C03 = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C02 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var S08 = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
var S12 = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
var velocity = moduleManager.getModule("Velocity");
var Blink = moduleManager.getModule("Blink");
var Scaffold = moduleManager.getModule("Scaffold");
var AntiBot = moduleManager.getModule("AntiBot");
var NoFall = moduleManager.getModule("NoFall");
var Strafe = moduleManager.getModule("Strafe");
var Step = moduleManager.getModule("Step");
var FastPlace = moduleManager.getModule("FastPlace");
var FreeCam = moduleManager.getModule("FreeCam");
var Scaffold = moduleManager.getModule("Scaffold");
var Fly = moduleManager.getModule("Fly");
var Timer = Java.type('java.util.Timer');
var Sprint = moduleManager.getModule("Sprint");
var KillAura = moduleManager.getModule("KillAura");
var RotationUtils = Java.type('net.ccbluex.liquidbounce.utils.RotationUtils');
var Rotation = Java.type('net.ccbluex.liquidbounce.utils.Rotation');
var RandomUtils = Java.type('net.ccbluex.liquidbounce.utils.misc.RandomUtils');
var AxisAlignedBB = Java.type("net.minecraft.util.AxisAlignedBB");
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var Block = Java.type('net.minecraft.block.Block');
var Blocks = Java.type('net.minecraft.init.Blocks');
var blocks = [];

var matrixshit;
var nosex;
var cumshot;
var instantcum;
var moonwalkswitch;
var cock;
var syx;
var overboat;
var nigha;
var seggs;
var fyck;
var wix;
var aacshit;
var gey;
var reduce;
var redesex;
var serhat;
var milf;

function setTimeout(func, milliseconds) {
    var timer = new Timer("setTimeout", true);
    timer.schedule(function () {
        func();
    }, milliseconds);

    return timer;
}
// baguette fly
function setYeet(_yeet) {
	var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
	mc.thePlayer.motionX = _yeet * -Math.sin(playerYaw);
	mc.thePlayer.motionZ = _yeet * Math.cos(playerYaw);
}
// strafe by TheMossYT
function strafe(speed) {
    var a = mc.thePlayer.rotationYaw * 0.017453292;
    var l = mc.thePlayer.rotationYaw * 0.017453292 - Math.PI * 1.5;
    var r = mc.thePlayer.rotationYaw * 0.017453292 + Math.PI * 1.5;
    var rf = mc.thePlayer.rotationYaw * 0.017453292 + Math.PI * 0.19;
    var lf = mc.thePlayer.rotationYaw * 0.017453292 + Math.PI * -0.19;
    var lb = mc.thePlayer.rotationYaw * 0.017453292 - Math.PI * 0.76;
    var rb = mc.thePlayer.rotationYaw * 0.017453292 - Math.PI * -0.76;
    if (mc.gameSettings.keyBindForward.pressed) {
        if (mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindRight.pressed) {
            mc.thePlayer.motionX -= (Math.sin(lf) * speed);
            mc.thePlayer.motionZ += (Math.cos(lf) * speed);
        } else if (mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindLeft.pressed) {
            mc.thePlayer.motionX -= (Math.sin(rf) * speed);
            mc.thePlayer.motionZ += (Math.cos(rf) * speed);
        } else {
            mc.thePlayer.motionX -= (Math.sin(a) * speed);
            mc.thePlayer.motionZ += (Math.cos(a) * speed);
        }
    } else if (mc.gameSettings.keyBindBack.pressed) {
        if (mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindRight.pressed) {
            mc.thePlayer.motionX -= (Math.sin(lb) * speed);
            mc.thePlayer.motionZ += (Math.cos(lb) * speed);
        } else if (mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindLeft.pressed) {
            mc.thePlayer.motionX -= (Math.sin(rb) * speed);
            mc.thePlayer.motionZ += (Math.cos(rb) * speed);
        } else {
            mc.thePlayer.motionX += (Math.sin(a) * speed);
            mc.thePlayer.motionZ -= (Math.cos(a) * speed);
        }
    } else if (mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindForward.pressed && !mc.gameSettings.keyBindBack.pressed) {
        mc.thePlayer.motionX += (Math.sin(l) * speed);
        mc.thePlayer.motionZ -= (Math.cos(l) * speed);
    } else if (mc.gameSettings.keyBindRight.pressed && !mc.gameSettings.keyBindLeft.pressed && !mc.gameSettings.keyBindForward.pressed && !mc.gameSettings.keyBindBack.pressed) {
        mc.thePlayer.motionX += (Math.sin(r) * speed);
        mc.thePlayer.motionZ -= (Math.cos(r) * speed);
    }
  }
function vClip(d) {
   mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + d, mc.thePlayer.posZ);
}
Math.rad = function(deg) {
    return deg * Math.PI / 180;
  }
Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
  }
function hClip(d) {
	var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
	mc.thePlayer.setPosition(mc.thePlayer.posX + d * -Math.sin(playerYaw), mc.thePlayer.posY, mc.thePlayer.posZ + d * Math.cos(playerYaw));
}
function hClip2(d) {
	var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
	mc.getNetHandler().addToSendQueue(new C04(mc.thePlayer.posX + d * -Math.sin(playerYaw), mc.thePlayer.posY, mc.thePlayer.posZ + d * Math.cos(playerYaw), false));
}
function vClip2(d) {
	mc.getNetHandler().addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY+d, mc.thePlayer.posZ, false));
}
script.registerModule({
    name: "PotatoSpeed",
    category: "Movement",
    description: "Speed modes for RedeSky! OwO",
    settings: {
		SpeedMode: Setting.list({
			name: "SpeedMode",
			default: "BHop",
			values: ["BHop", "AfterJump", "YPort", "MatrixBHop1", "MatrixBHop2", "MatrixOnGround1", "MatrixOnGround2", "RedeskyBHop"]
		}),
		BHopTimer: Setting.float({
			name: "BHopTimer",
			default: 1.05,
			min:1.0,
			max:1.2
		}),
		BHopSpeed: Setting.float({
			name: "BHopSpeed",
			default: 0.36,
			min:0.28,
			max:0.45
		}),
		BHopY: Setting.float({
			name: "BHopY",
			default: 0.36,
			min:0.36,
			max:0.42
		}),
		YPortBoost: Setting.float({
			name: "YPortBoost",
			default: 0.36,
			min:0.1,
			max:0.6
		}),
        JumpOnEnable: Setting.boolean({
            name: "JumpOnEnable",
            default: false
		}),
        ReturnOnCollide: Setting.boolean({
            name: "ReturnOnCollide",
            default: false
		}),
		OnGroundBoost: Setting.float({
			name: "OnGroundBoost",
			default: 0.3,
			min:0.3,
			max:1
		}),
		OnGroundReduce: Setting.float({
			name: "OnGroundReduce",
			default: 0.1,
			min:0.01,
			max:0.6
		}),
        OnGroundDelay: Setting.integer({
            name: "OnGroundDelay",
            default: 5,
            min:0,
            max:20
        }),
        InstantFast: Setting.boolean({
            name: "InstantFast",
            default: false
		}),
        BoostOnDamage: Setting.boolean({
            name: "BoostOnDamage",
            default: true
		}),
		OnGroundRetry: Setting.boolean({
	        name: "OnGroundRetry",
	        default: true
	    }),
        OnGroundWaitTicks: Setting.boolean({
            name: "OnGroundWaitTicks",
            default: true
		}),
        ReturnOnNoMove: Setting.boolean({
            name: "ReturnOnNoMove",
            default: true
		}),
        FlagDetection: Setting.boolean({
            name: "FlagDetection",
            default: true
		}),
        StopInAir: Setting.boolean({
            name: "StopInAir",
            default: false
		}),
        Reset: Setting.boolean({
            name: "Reset",
            default: false
		}),
    }
}, function(module) {
    module.on("update", function() {
    	 		module.tag = module.settings.SpeedMode.get();
                if (!MovementUtils.isMoving() && module.settings.ReturnOnNoMove.get()) {
                return; 
                mc.timer.timerSpeed = 1;
                }
                if (module.settings.ReturnOnCollide.get() && mc.thePlayer.isCollidedHorizontally) {
                return;	
                }
                if (module.settings.StopInAir.get() &&!mc.thePlayer.onGround && !mc.gameSettings.keyBindForward.pressed) {
                    mc.thePlayer.motionX = 0.0;
                    mc.thePlayer.motionZ = 0.0;
                    }
                
                if (module.settings.Reset.get()) {
                	module.settings.BHopY.set(0.36);
                	module.settings.BHopSpeed.set(0.36);
                	module.settings.BHopTimer.set(1.05);
                	module.settings.Reset.set(false);
                }
                
                if (module.settings.FlagDetection.get()) {
               	 if ((mc.thePlayer.motionX == 0 && mc.thePlayer.motionZ == 0) && MovementUtils.isMoving && !mc.thePlayer.isCollidedHorizontally) {
               		Chat.print("§8§l[§c§lPotatoSpeed§8§l]§7 You have been flagged!");
               		Chat.print("§8§l[§c§lPotatoSpeed§8§l]§7 Disabled speed.");
               		module.setState(false);
               		mc.timer.timerSpeed = 1;
               	 }
               }
                
                switch (module.settings.SpeedMode.get()) {
                case "BHop":
            	mc.timer.timerSpeed = module.settings.BHopTimer.get();
            	if (mc.thePlayer.onGround) {
            		mc.thePlayer.motionY = module.settings.BHopY.get();
                    var dir = Math.rad(mc.thePlayer.rotationYaw);
                    mc.thePlayer.motionX += -Math.sin(dir) * module.settings.BHopSpeed.get();
                    mc.thePlayer.motionZ += Math.cos(dir) * module.settings.BHopSpeed.get();
            	 }
            	break;
                case "AfterJump":
                	if (mc.thePlayer.fallDistance > 0.1) {
                		mc.timer.timerSpeed = 1;
                        var dir = Math.rad(mc.thePlayer.rotationYaw);
                        mc.thePlayer.motionX += -Math.sin(dir) * 0.05;
                        mc.thePlayer.motionZ += Math.cos(dir) * 0.05;
                	}
             	   if (mc.thePlayer.onGround) {
             		   mc.thePlayer.jump();
             		   mc.timer.timerSpeed = 0.9;
             	   }
             	   break;
                case "YPort":
                	mc.timer.timerSpeed = 1.8;
                	if (mc.thePlayer.onGround) {
                		mc.thePlayer.motionY = 0.36;
                        var dir = Math.rad(mc.thePlayer.rotationYaw);
                        mc.thePlayer.motionX += -Math.sin(dir) * module.settings.YPortBoost.get();
                        mc.thePlayer.motionZ += Math.cos(dir) * module.settings.YPortBoost.get();
                	}
                	if (mc.thePlayer.fallDistance > 0.2) {
                		mc.timer.timerSpeed = 2.4;
                	}
                	if (mc.thePlayer.fallDistance > 0.5) {
                		mc.timer.timerSpeed = 0.3;
                		mc.thePlayer.motionY = -1.5;
                		var dir = Math.rad(mc.thePlayer.rotationYaw);
                        mc.thePlayer.motionX += -Math.sin(dir) * -0.08;
                        mc.thePlayer.motionZ += Math.cos(dir) * -0.08;
                	}
                	break;
                case "MatrixOnGround1":
                	// @skidma ty searched long for this air detection, found it
					// <3
                	if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY - 0.001, mc.thePlayer.posZ)).getBlock() == Block.getBlockById(0) || mc.gameSettings.keyBindJump.pressed) {
                	return;	
                	}
                	mc.thePlayer.onGround = true;
                	module.settings.JumpOnEnable.set(false);
                	mc.thePlayer.setSprinting(true);
                	Strafe.setState(true);
                	mc.timer.timerSpeed = 1;
                	if (mc.thePlayer.ticksExisted % 3 == 0) {
                		if (mc.gameSettings.keyBindForward.pressed) {
                        var dir = Math.rad(mc.thePlayer.rotationYaw);
                        mc.thePlayer.motionX += -Math.sin(dir) * 0.33
                        mc.thePlayer.motionZ += Math.cos(dir) * 0.33
                        var dir = Math.rad(mc.thePlayer.rotationYaw);
                        mc.thePlayer.motionX += -Math.sin(dir) * -0.13
                        mc.thePlayer.motionZ += Math.cos(dir) * -0.13
                		}
                		if (mc.gameSettings.keyBindLeft.pressed) {
                            var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                            mc.thePlayer.motionX += -Math.sin(dir) * 0.18
                            mc.thePlayer.motionZ += Math.cos(dir) * 0.18
                            var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                            mc.thePlayer.motionX += -Math.sin(dir) * -0.1	
                            mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                		}
                        if (mc.gameSettings.keyBindRight.pressed) {
                            var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                            mc.thePlayer.motionX += -Math.sin(dir) * 0.18
                            mc.thePlayer.motionZ += Math.cos(dir) * 0.18
                            var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                            mc.thePlayer.motionX += -Math.sin(dir) * -0.1
                            mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                        }
                	}
                	if (!mc.thePlayer.onGround) {
                	reduce = 1;
                	if (reduce == 1) {
                    var dir = Math.rad(mc.thePlayer.rotationYaw);
                    mc.thePlayer.motionX += -Math.sin(dir) * -0.11
                    mc.thePlayer.motionZ += Math.cos(dir) * -0.11
                	reduce = 0;	
                	}
                	}
                	break;
                case "MatrixOnGround2":
                	// @skidma ty searched long for this air detection, found it
					// <3
                	if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY - 0.001, mc.thePlayer.posZ)).getBlock() == Block.getBlockById(0) || mc.gameSettings.keyBindJump.pressed) {
                	return;	
                	}
                	if (module.settings.OnGroundWaitTicks.get() && cumshot == 0) {
                		mc.thePlayer.motionY *= 0.0;
                		setTimeout(function () {
                		cumshot = 1;
                		},300);
                	}
                	if (cumshot == 1) {
                	if (mc.thePlayer.motionX == 0 && mc.thePlayer.motionZ == 0 && MovementUtils.isMoving && !mc.thePlayer.isCollidedHorizontally && module.settings.OnGroundRetry.get()) {
                	module.setState(false);
                	mc.thePlayer.onGround = false;
                	Chat.print("§8§l[§c§lPotatoScript§8§l]§7 Retrying enable...");
                	setTimeout(function () {
                	module.setState(true);	
                	},1);
                	}
                	mc.thePlayer.motionY *= 0.0;
                	Strafe.setState(true);
                	mc.timer.timerSpeed = 1;
                	if (mc.thePlayer.ticksExisted % module.settings.OnGroundDelay.get() == 0) {
                		if (mc.gameSettings.keyBindForward.pressed) {
                        var dir = Math.rad(mc.thePlayer.rotationYaw);
                        mc.thePlayer.motionX += -Math.sin(dir) * module.settings.OnGroundBoost.get()
                        mc.thePlayer.motionZ += Math.cos(dir) * module.settings.OnGroundBoost.get()
                        var dir = Math.rad(mc.thePlayer.rotationYaw);
                        mc.thePlayer.motionX += -Math.sin(dir) * -module.settings.OnGroundReduce.get()
                        mc.thePlayer.motionZ += Math.cos(dir) * -module.settings.OnGroundReduce.get()
                        if (module.settings.BoostOnDamage.get() && mc.thePlayer.hurtTime > 0) {
                        var dir = Math.rad(mc.thePlayer.rotationYaw);
                        mc.thePlayer.motionX += -Math.sin(dir) * 0.1
                        mc.thePlayer.motionZ += Math.cos(dir) * 0.1
                        }
                		}
                        if (mc.gameSettings.keyBindLeft.pressed) {
                        var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                        mc.thePlayer.motionX += -Math.sin(dir) * 0.3
                        mc.thePlayer.motionZ += Math.cos(dir) * 0.3
                        var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                        mc.thePlayer.motionX += -Math.sin(dir) * -0.1	
                        mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                        if (module.settings.BoostOnDamage.get() && mc.thePlayer.hurtTime > 0) {
                        var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                        mc.thePlayer.motionX += -Math.sin(dir) * 0.1
                        mc.thePlayer.motionZ += Math.cos(dir) * 0.1
                        }
                        }
                        if (mc.gameSettings.keyBindRight.pressed) {
                        var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                        mc.thePlayer.motionX += -Math.sin(dir) * 0.3
                        mc.thePlayer.motionZ += Math.cos(dir) * 0.3
                        var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                        mc.thePlayer.motionX += -Math.sin(dir) * -0.1
                        mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                        if (module.settings.BoostOnDamage.get() && mc.thePlayer.hurtTime > 0) {
                        var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                        mc.thePlayer.motionX += -Math.sin(dir) * 0.1
                        mc.thePlayer.motionZ += Math.cos(dir) * 0.1 
                        }
                        }
                        if (mc.gameSettings.keyBindBack.pressed) {
                        var dir = Math.rad(mc.thePlayer.rotationYaw + 180);
                        mc.thePlayer.motionX += -Math.sin(dir) * module.settings.OnGroundBoost.get()
                        mc.thePlayer.motionZ += Math.cos(dir) * module.settings.OnGroundBoost.get()
                        var dir = Math.rad(mc.thePlayer.rotationYaw);
                        mc.thePlayer.motionX += -Math.sin(dir) * -module.settings.OnGroundReduce.get()
                        mc.thePlayer.motionZ += Math.cos(dir) * -module.settings.OnGroundReduce.get()	
                        }
                	}
                	}
                	break;
                case "MatrixBHop1":
                if (!mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX + 0.5,mc.thePlayer.posY,mc.thePlayer.posZ)) || !mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX - 0.5,mc.thePlayer.posY,mc.thePlayer.posZ))) return;
                if (!mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY,mc.thePlayer.posZ + 0.5)) || !mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY,mc.thePlayer.posZ - 0.5))) return;
                
                if (mc.thePlayer.onGround && mc.gameSettings.keyBindForward.pressed && mc.thePlayer.ticksExisted % 3 == 0) {
                mc.thePlayer.jump()
                }
                if (mc.thePlayer.ticksExisted % 3 == 0 && !mc.thePlayer.onGround && mc.gameSettings.keyBindForward.pressed) {
                    var dir = Math.rad(mc.thePlayer.rotationYaw);
                    mc.thePlayer.motionX += -Math.sin(dir) * 0.3
                    mc.thePlayer.motionZ += Math.cos(dir) * 0.3
                    var dir = Math.rad(mc.thePlayer.rotationYaw);
                    mc.thePlayer.motionX += -Math.sin(dir) * -0.1
                    mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                }
                if (mc.gameSettings.keyBindLeft.pressed && mc.thePlayer.ticksExisted % 3 == 0) {
                    var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                    mc.thePlayer.motionX += -Math.sin(dir) * 0.3
                    mc.thePlayer.motionZ += Math.cos(dir) * 0.3
                    var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                    mc.thePlayer.motionX += -Math.sin(dir) * -0.1	
                    mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                    var dir = Math.rad(mc.thePlayer.rotationYaw);
                    mc.thePlayer.motionX += -Math.sin(dir) * -0.1
                    mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                }
                if (mc.gameSettings.keyBindRight.pressed && mc.thePlayer.ticksExisted % 3 == 0) {
                    var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                    mc.thePlayer.motionX += -Math.sin(dir) * 0.3
                    mc.thePlayer.motionZ += Math.cos(dir) * 0.3
                    var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                    mc.thePlayer.motionX += -Math.sin(dir) * -0.1	
                    mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                    var dir = Math.rad(mc.thePlayer.rotationYaw);
                    mc.thePlayer.motionX += -Math.sin(dir) * -0.1
                    mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                }
                if (mc.gameSettings.keyBindBack.pressed && mc.thePlayer.ticksExisted % 3 == 0) {
                    var dir = Math.rad(mc.thePlayer.rotationYaw + 180);
                    mc.thePlayer.motionX += -Math.sin(dir) * 0.3
                    mc.thePlayer.motionZ += Math.cos(dir) * 0.3
                    var dir = Math.rad(mc.thePlayer.rotationYaw + 180);
                    mc.thePlayer.motionX += -Math.sin(dir) * -0.1	
                    mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                }
                	break;
                case "MatrixBHop2":
                    if (mc.thePlayer.onGround && mc.gameSettings.keyBindForward.pressed) {
                        mc.thePlayer.jump()
                        }
                        if (mc.thePlayer.ticksExisted % 3 == 0 && !mc.thePlayer.onGround && mc.gameSettings.keyBindForward.pressed) {
                            var dir = Math.rad(mc.thePlayer.rotationYaw);
                            mc.thePlayer.motionX += -Math.sin(dir) * 0.3
                            mc.thePlayer.motionZ += Math.cos(dir) * 0.3
                            var dir = Math.rad(mc.thePlayer.rotationYaw);
                            mc.thePlayer.motionX += -Math.sin(dir) * -0.1
                            mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                        }
                        break;
                case "RedeskyBHop":
                	if (mc.thePlayer.ticksExisted % 3 == 0 && mc.thePlayer.onGround && mc.gameSettings.keyBindForward.pressed) {
                		mc.thePlayer.jump()
                	}
                    if (mc.thePlayer.ticksExisted % 3 == 0 && !mc.thePlayer.onGround && mc.gameSettings.keyBindForward.pressed) {
                        var dir = Math.rad(mc.thePlayer.rotationYaw);
                        mc.thePlayer.motionX += -Math.sin(dir) * 0.2
                        mc.thePlayer.motionZ += Math.cos(dir) * 0.2
                        var dir = Math.rad(mc.thePlayer.rotationYaw);
                        mc.thePlayer.motionX += -Math.sin(dir) * -0.11
                        mc.thePlayer.motionZ += Math.cos(dir) * -0.11
                    }
                    if (mc.gameSettings.keyBindLeft.pressed && mc.thePlayer.ticksExisted % 3 == 0) {
                        mc.thePlayer.speedInAir = 0.028;	
                        var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                        mc.thePlayer.motionX += -Math.sin(dir) * 0.2
                        mc.thePlayer.motionZ += Math.cos(dir) * 0.2
                        var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
                        mc.thePlayer.motionX += -Math.sin(dir) * -0.1	
                        mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                        var dir = Math.rad(mc.thePlayer.rotationYaw);
                        mc.thePlayer.motionX += -Math.sin(dir) * -0.1
                        mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                    }
                    if (mc.gameSettings.keyBindRight.pressed && mc.thePlayer.ticksExisted % 3 == 0) {
                    	mc.thePlayer.speedInAir = 0.028;	
                        var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                        mc.thePlayer.motionX += -Math.sin(dir) * 0.2
                        mc.thePlayer.motionZ += Math.cos(dir) * 0.2
                        var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
                        mc.thePlayer.motionX += -Math.sin(dir) * -0.1	
                        mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                        var dir = Math.rad(mc.thePlayer.rotationYaw);
                        mc.thePlayer.motionX += -Math.sin(dir) * -0.1
                        mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                    }
                    if (mc.gameSettings.keyBindBack.pressed && mc.thePlayer.ticksExisted % 3 == 0) {
                        var dir = Math.rad(mc.thePlayer.rotationYaw + 180);
                        mc.thePlayer.motionX += -Math.sin(dir) * 0.2
                        mc.thePlayer.motionZ += Math.cos(dir) * 0.2
                        var dir = Math.rad(mc.thePlayer.rotationYaw + 180);
                        mc.thePlayer.motionX += -Math.sin(dir) * -0.1	
                        mc.thePlayer.motionZ += Math.cos(dir) * -0.1
                    }
                	break;
                } 	   
});
    module.on("enable", function() {
    if (module.settings.InstantFast.get()) {
        var dir = Math.rad(mc.thePlayer.rotationYaw);
        mc.thePlayer.motionX += -Math.sin(dir) * 0.2;
        mc.thePlayer.motionZ += Math.cos(dir) * 0.2;
    }
    if (module.settings.JumpOnEnable.get()) {
    	mc.thePlayer.jump()
        var dir = Math.rad(mc.thePlayer.rotationYaw);
        mc.thePlayer.motionX += -Math.sin(dir) * -0.04
        mc.thePlayer.motionZ += Math.cos(dir) * -0.04
    }
    if (module.settings.OnGroundWaitTicks.get() && module.settings.SpeedMode.get() == "MatrixOnGround2") {
    cumshot = 0;
    }
    });
    module.on("disable", function() {
        mc.timer.timerSpeed = 1;
        mc.thePlayer.speedInAir = 0.02;
        Strafe.setState(false);
        if (module.settings.OnGroundWaitTicks.get()) {
        	cumshot = 0;
        } else {
        cumshot = 1;
        }
    });
});
script.registerModule({
    name: "PotatoFly",
    description: "Some fly modes",
    category: "Fun",
    settings: {
		FlyMode: Setting.list({
			name: "FlyMode",
			default: "MatrixBoatNew",
			values: ["Matrix1Old", "Matrix2Old", "MatrixBlink", "BoatMatrix", "BoatSpartan", "AAC4Boat", "Test"]
		}),
		FallDistance: Setting.float({
			name: "FallDistance",
			default: 3,
			min:3,
			max:10
		}),
        AutoJump: Setting.boolean({
            name: "AutoJump",
            default: false
		}),
		InstantOnGroundKeyBind: Setting.list({
			name: "InstantOnGroundKeyBind",
			default: "Sneak",
			values: ["Sneak", "Jump"]
		}),
        InstantOnGround: Setting.boolean({
            name: "InstantOnGround",
            default: false
		}),
        DisableVelocity: Setting.boolean({
            name: "DisableVelocity",
            default: true
		}),
		BoatY: Setting.float({
			name: "BoatY",
			default: 0.5,
			min:0.5,
			max:5
		}),
        BoatStartSpoof: Setting.boolean({
            name: "BoatStartSpoof",
            default: true
		}),
        UseTimer: Setting.boolean({
            name: "UseTimer",
            default: true
		}),
		BoatBoost: Setting.float({
			name: "BoatBoost",
			default: 3,
			min:2.5,
			max:5
		}),
		SpartanBoatBoost: Setting.float({
			name: "SpartanBoatBoost",
			default: 3,
			min:1,
			max:8
		}),
        FastStop: Setting.boolean({
            name: "FastStop",
            default: false
		}),
		AACMotionY: Setting.float({
			name: "AACMotionY",
			default: 2.5,
			min:0.5,
			max:9
		}),
		XZActivationDelay: Setting.float({
			name: "XZActivationDelay",
			default: 300,
			min:100,
			max:1000
		}),
		UseAACMotionY: Setting.boolean({
            name: "UseAACMotionY",
            default: true
		}),
		UseAACMotionXZ: Setting.boolean({
            name: "UseAACMotionXZ",
            default: true
		}),
		AACBoatFlyShort: Setting.boolean({
            name: "AACBoatFlyShort",
            default: false
		}),
		AACBoatFlyLong: Setting.boolean({
            name: "AACBoatFlyLong",
            default: false
		}),
		RedeskyBoatFly: Setting.boolean({
            name: "RedeskyBoatFly",
            default: false
		}),
        MatrixBlinkNoMove: Setting.boolean({
            name: "MatrixBlinkNoMove",
            default: true
		}),
        AutoSneak: Setting.boolean({
            name: "AutoSneak",
            default: true
		}),
        ModeInfo: Setting.boolean({
            name: "ModeInfo",
            default: true
		}),
    }

}, function (module) {
    module.on("enable", function () {
    	if (module.settings.DisableVelocity.get()) {
    		velocity.setState(false);
    	}
    	if (module.settings.FlyMode.get() == "BoatSpartan") {
    	}
    	if (module.settings.FlyMode.get() == "MatrixBlink") {
    	nosex = 1;	
    	} 
    	if (module.settings.ModeInfo.get()) {
    	if (module.settings.FlyMode.get() == "Matrix1Old") {
    	Chat.print("§8§l[§c§lPotatoScript§8]§7 This mode requires §c§lTNT");
    	Chat.print("§8§l[§c§lPotatoScript§8]§7 MotionNoFall only for this mode!");
    	Chat.print("§8§l[§c§lPotatoScript§8]§7 This script is for Matrix §c§lbelow ver 6.0.0");
    	}
    	if (module.settings.FlyMode.get() == "Matrix2Old") {
    	Chat.print("§8§l[§c§lPotatoScript§8]§7 This mode requires §c§lTNT");
    	Chat.print("§8§l[§c§lPotatoScript§8]§7 Isn't working as long as MatrixFly!");
    	Chat.print("§8§l[§c§lPotatoScript§8]§7 This script is for Matrix §c§lbelow ver 6.0.0");
    	}
    	if (module.settings.FlyMode.get() == "BoatMatrix") {
        Chat.print("§8§l[§c§lPotatoScript§8]§7 This mode is up do date!");
        }
    	}
    });
    module.on("motion", function () {
    	switch (module.settings.FlyMode.get()) {
    	case "BoatSpartan":
    		if (syx == 1) {
                mc.thePlayer.motionY *= 0.5;
        	    mc.timer.timerSpeed = 0.3;
        	    mc.thePlayer.onGround = true;
        	    mc.gameSettings.keyBindLeft.pressed = false;
        	    mc.gameSettings.keyBindBack.pressed = false;
        	    mc.gameSettings.keyBindJump.pressed = false;
        	    mc.gameSettings.keyBindRight.pressed = false;
                var yaw = Math.radians(mc.thePlayer.rotationYaw);
                mc.thePlayer.motionX = -Math.sin(yaw) * module.settings.SpartanBoatBoost.get()
                mc.thePlayer.motionZ = Math.cos(yaw) * module.settings.SpartanBoatBoost.get()
        		}
    		break;
    	}
    });
    
    module.on("disable", function () {
    	if (module.settings.FlyMode.get() == "BoatSpartan") {
    	mc.thePlayer.motionX = 0;
    	mc.thePlayer.motionZ = 0;
    	}
    	FastPlace.setState(false);
    	cock = 0;
    	serhat = 0;
    	fyck = 0;
    	syx = 0;
    	nosex = 0;
    	aacshit = 0;
    	Blink.setState(false);
    	mc.timer.timerSpeed = 1;
		mc.gameSettings.keyBindForward.pressed = false;
		mc.gameSettings.keyBindSprint.pressed = false;
        	if (module.settings.DisableVelocity.get()) {
        		velocity.setState(true);
        	} 
    });
    
    module.on("update", function () {
    	if (module.settings.RedeskyBoatFly.get()) {
        	module.settings.UseAACMotionY.set(true);	
        	module.settings.AACMotionY.set(3.8);
    		module.settings.UseAACMotionXZ.set(true);
    		module.settings.XZActivationDelay.set(188);
    		module.settings.RedeskyBoatFly.set(false);
    	}
    	if (module.settings.AACBoatFlyShort.get()) {
    	module.settings.UseAACMotionY.set(true);	
    	module.settings.AACMotionY.set(2.5);
    	module.settings.UseAACMotionXZ.set(false);
    	module.settings.AACBoatFlyShort.set(false);
    	}
    	if (module.settings.AACBoatFlyLong.get()) {
    		module.settings.UseAACMotionY.set(true);
    		module.settings.AACMotionY.set(6);
    		module.settings.UseAACMotionXZ.set(true);
    		module.settings.XZActivationDelay.set(300);
    		module.settings.AACBoatFlyLong.set(false);
    	}
    	
    	if (!MovementUtils.isMoving() && module.settings.FastStop.get()) {
    	mc.thePlayer.motionX = 0.0;
    	mc.thePlayer.motionZ = 0.0;	
    	mc.thePlayer.motionY = 0.0;	
    	}
    	
    	if (module.settings.AutoJump.get() && mc.thePlayer.onGround) {
    		mc.thePlayer.jump();
    	}
    	module.tag = module.settings.FlyMode.get();
    	switch (module.settings.FlyMode.get()) {
    	case "Matrix1Old":
    	if (mc.thePlayer.hurtTime > 0) {
    		mc.thePlayer.sendQueue.addToSendQueue(new C03(true));
			mc.gameSettings.keyBindForward.pressed = true;
			mc.gameSettings.keyBindSprint.pressed = true;
            var dir = Math.rad(mc.thePlayer.rotationYaw);
            mc.thePlayer.motionX += -Math.sin(dir) * 0.6;
            mc.thePlayer.motionZ += Math.cos(dir) * 0.6;	
    	}
    	if (mc.thePlayer.fallDistance > module.settings.FallDistance.get()) {
			mc.gameSettings.keyBindForward.pressed = true;
			mc.gameSettings.keyBindSprint.pressed = true;
           if (mc.thePlayer.ticksExisted % 4 == 0) mc.thePlayer.motionY = -.2
            if (mc.thePlayer.ticksExisted % 5 == 0) {
            	mc.thePlayer.motionY = 0.3;
                var dir = Math.rad(mc.thePlayer.rotationYaw);
                mc.thePlayer.motionX += -Math.sin(dir) * 1;
                mc.thePlayer.motionZ += Math.cos(dir) * 1;
            }
           }
    	break;
    	case "Matrix2Old":
    		if (mc.thePlayer.hurtTime > 0) {
    			mc.thePlayer.sendQueue.addToSendQueue(new C03(true));
    			mc.gameSettings.keyBindForward.pressed = true;
    			mc.gameSettings.keyBindSprint.pressed = true;
                var dir = Math.rad(mc.thePlayer.rotationYaw);
                mc.thePlayer.motionX += -Math.sin(dir) * 0.6;
                mc.thePlayer.motionZ += Math.cos(dir) * 0.6;
    		}
    		if (mc.thePlayer.fallDistance > 3) {
    			mc.gameSettings.keyBindForward.pressed = true;
    			mc.gameSettings.keyBindSprint.pressed = true;
    			mc.thePlayer.motionY *= 0.5;
    			if (mc.thePlayer.ticksExisted % 3 == 0) {
                    var dir = Math.rad(mc.thePlayer.rotationYaw);
                    mc.thePlayer.motionX += -Math.sin(dir) * 1;
                    mc.thePlayer.motionZ += Math.cos(dir) * 1;
    			}
    		}
    		break;
    	case "MatrixBlink":
    		mc.thePlayer.motionY *= 0.0;
    		if (nosex == 1) {
    		mc.thePlayer.motionX = 0;
    		mc.thePlayer.motionY = 0;
    		mc.thePlayer.motionZ = 0;
    		mc.gameSettings.keyBindJump.pressed = false;
    		mc.gameSettings.keyBindRight.pressed = false;
    		mc.gameSettings.keyBindLeft.pressed = false;
    		mc.gameSettings.keyBindBack.pressed = false;
    		}
    		if (mc.thePlayer.hurtTime > 0) {
    			Blink.setState(true);
    			nosex = 0;
    		}
    		if (nosex == 0) {
            var dir = Math.rad(mc.thePlayer.rotationYaw);
            mc.thePlayer.motionX += -Math.sin(dir) * 1;
            mc.thePlayer.motionZ += Math.cos(dir) * 1;
    		}
    		break;
    	case "BoatMatrix":
    		if (mc.thePlayer.isRiding()) {
    		if (module.settings.AutoSneak.get()) {
    		mc.gameSettings.keyBindSneak.pressed = true;
    		}
    		if (module.settings.UseTimer.get()) {
    		mc.timer.timerSpeed = 0.3;
    		}
    		matrixshit = 1;
    		} else {
    		mc.timer.timerSpeed = 1;
    		if (matrixshit == 1) {
        	if (module.settings.AutoSneak.get()) {
        	setTimeout(function () {
            mc.gameSettings.keyBindSneak.pressed = false;
        	},250);
            }
    		matrixshit = 0;
    		nigha = 1;
    		if (module.settings.BoatStartSpoof.get()) {
    		mc.thePlayer.sendQueue.addToSendQueue(new C03(true));
    		}
    		mc.thePlayer.motionY = module.settings.BoatY.get();
    		setTimeout(function () {
            var dir = Math.rad(mc.thePlayer.rotationYaw);
            setYeet(module.settings.BoatBoost.get());
    		},150);
    		}
    		if (nigha == 1) {
    		if (module.settings.InstantOnGroundKeyBind.get() == "Sneak") {
    		if (mc.gameSettings.keyBindSneak.pressed) {
    		mc.thePlayer.motionX = 0;
    		mc.thePlayer.motionZ = 0;
    		nigha = 0;
            if (module.settings.InstantOnGround.get()) {
            setTimeout(function () {
            var dir = Math.rad(mc.thePlayer.rotationYaw);
            mc.thePlayer.motionX += -Math.sin(dir) * 5;
            mc.thePlayer.motionZ += Math.cos(dir) * 5;
            mc.thePlayer.motionY = 1;
            },50);
            }
    		}
    		}
    		if (module.settings.InstantOnGroundKeyBind.get() == "Jump") {
        	if (mc.gameSettings.keyBindJump.pressed) {
            mc.thePlayer.motionX = 0;
            mc.thePlayer.motionZ = 0;
            nigha = 0;
            if (module.settings.InstantOnGround.get()) {
            setTimeout(function () {
            var dir = Math.rad(mc.thePlayer.rotationYaw);
            mc.thePlayer.motionX += -Math.sin(dir) * 1;
            mc.thePlayer.motionZ += Math.cos(dir) * 1;
            },50);
            }
            }
    		}
    		}
    		}
    		module.settings.AutoJump.set(false);
    		break;
    	case "BoatSpartan":
    		if (mc.thePlayer.isRiding()) {
    		syx = 1;
    		overboat = 1;
    		if (module.settings.AutoSneak.get()) {
    		mc.gameSettings.keyBindSneak.pressed = true;
    		}
    		} else {
    		if (syx == 1) {
    		mc.gameSettings.keyBindSneak.pressed = false;
    		if (mc.thePlayer.fallDistance > 2) {
    		module.setState(false);
    		}
    		}
    		if (overboat == 1) {
    		vClip(0.5);
    		overboat = 0;
    		}
    		}
    		break;
    	case "AAC4Boat":
    	if (mc.thePlayer.isRiding()) {
    	hClip2(9)
    	vClip2(100)
    	vClip(-0.1)
    	hClip(100)
    	setYeet(10)
    	mc.timer.timerSpeed = 0.5;
    	mc.thePlayer.motionY = 10;
    	aacshit = 1;
    	} else {
    	if (aacshit == 1) {
        aacshit = 0;	
    	if (module.settings.UseAACMotionY.get()) {
    	mc.timer.timerSpeed = 0.3;
        mc.thePlayer.motionY = module.settings.AACMotionY.get();
    	}
    	if (module.settings.UseAACMotionXZ.get() && !mc.thePlayer.onGround) {
    	setTimeout(function () {
        var dir = Math.rad(mc.thePlayer.rotationYaw);
        mc.thePlayer.motionX += -Math.sin(dir) * 2;
        mc.thePlayer.motionZ += Math.cos(dir) * 2;
    	},module.settings.XZActivationDelay.get());
    	}
    	}
    	mc.timer.timerSpeed = 1;
    	}
    		break;
    	case "Test":
    		break;
    	}
    });

});

script.registerModule({
    name: "MatrixFastClimb",
    description: "Its matrix Fastclimb. ok.",
    category: "Fun",
    tag: "OwO",
    settings: {
		ClimbMode: Setting.list({
			name: "ClimbMode",
			default: "Skip",
			values: ["Skip", "Motion"]
		}),
        SkipDelay: Setting.integer({
            name: "SkipDelay",
            default: 2,
            min:1,
            max:20
        }),
        MotionDelay: Setting.integer({
            name: "MotionDelay",
            default: 4,
            min:1,
            max:20
        }),
		SkipY: Setting.float({
			name: "SkipY",
			default: 0.6,
			min:0.1,
			max:2
		}),
		MotionY: Setting.float({
			name: "MotionY",
			default: 0.28,
			min:0.1,
			max:2
		}),
        SpoofSkip: Setting.boolean({
            name: "SpoofSkip",
            default: true
		}),
        Reset: Setting.boolean({
            name: "Reset",
            default: false
		}),
    }

}, function (module) {
    module.on("enable", function () {
    Chat.print("§8§l[§c§lPotatoScript§8§l]§7 This script is for Matrix below ver. 6!");
    });
    module.on("disable", function () {
    mc.timer.timerSpeed = 1;
    });
    module.on("update", function () {
    	module.tag = module.settings.ClimbMode.get();
    	
    	if (module.settings.Reset.get()) {
    		module.settings.MotionDelay.set(4);
    		module.settings.MotionY.set(0.28);
    		module.settings.SkipDelay.set(2);
    		module.settings.SkipY.set(0.2);
    		module.settings.Reset.set(false);
    	}
    	
    		if (module.settings.ClimbMode.get() == "Skip") {
    		if (mc.thePlayer.isOnLadder() || mc.thePlayer.isOnVine()) {
    		if (mc.thePlayer.isCollidedHorizontally) {
    		if (mc.thePlayer.ticksExisted % 15 == 0 && module.settings.SpoofSkip.get()) {
    		mc.thePlayer.sendQueue.addToSendQueue(new C03(true));
    		}
    		if (mc.thePlayer.ticksExisted % module.settings.SkipDelay.get() == 0) {
    		mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + module.settings.SkipY.get(), mc.thePlayer.posZ);
    		          };
    		      }
    		   }
    		}
    		if (module.settings.ClimbMode.get() == "Motion") {
        	if (mc.thePlayer.isOnLadder() || mc.thePlayer.isOnVine()) {
        		if (mc.thePlayer.isCollidedHorizontally) {
        		    if (mc.thePlayer.ticksExisted % 15 == 0 && module.settings.SpoofSkip.get()) {
        			mc.thePlayer.sendQueue.addToSendQueue(new C03(true));
        		    }
            			if (mc.thePlayer.ticksExisted % module.settings.MotionDelay.get() == 0) {
            				mc.thePlayer.motionY = module.settings.MotionY.get();
            			};
            		}
            	}
    		}
    });

});

script.registerModule({
    name: "PotatoManager",
    description: "A manager that loads configs for important modules.",
    category: "Misc",
    tag: "6.0.0",
    settings: {
        MatrixScaffoldB73: Setting.boolean({
            name: "MatrixScaffoldB73",
            default: false
		}),
        MatrixAntiBotB73: Setting.boolean({
            name: "MatrixAntiBotB73",
            default: false
		}),
    }

}, function (module) {
    module.on("enable", function () {

    });
    module.on("disable", function () {
    setTimeout(function () {
    commandManager.executeCommand(".t PotatoManager");
    },10);
    });
    module.on("update", function () {
    if (module.settings.MatrixScaffoldB73.get()) {
    	moduleManager.getModule("Scaffold").getValue("Mode").set("Expand");
    	moduleManager.getModule("Scaffold").getValue("AutoBlock").set("Spoof");
    	moduleManager.getModule("Scaffold").getValue("RotationMode").set("StaticPitch");
    	moduleManager.getModule("Scaffold").getValue("Eagle").set("Silent");
    	moduleManager.getModule("Scaffold").getValue("PlaceTiming").set("Post");
    	moduleManager.getModule("Scaffold").getValue("PlaceableDelay").set(true);
    	moduleManager.getModule("Scaffold").getValue("MaxDelay").set(2);
    	moduleManager.getModule("Scaffold").getValue("MinDelay").set(2);
    	moduleManager.getModule("Scaffold").getValue("Sprint").set(false);
    	moduleManager.getModule("Scaffold").getValue("Swing").set(true);
    	moduleManager.getModule("Scaffold").getValue("Search").set(true);
    	moduleManager.getModule("Scaffold").getValue("Down").set(false);
    	moduleManager.getModule("Scaffold").getValue("BlocksToEagle").set(0);
    	moduleManager.getModule("Scaffold").getValue("ExpandLength").set(1);
    	moduleManager.getModule("Scaffold").getValue("MinDiff").set(0.20);
    	moduleManager.getModule("Scaffold").getValue("StaticPitchOffSet").set(82.00);
    	moduleManager.getModule("Scaffold").getValue("RotationStrafe").set(false);
    	moduleManager.getModule("Scaffold").getValue("SilentRotation").set(true);
    	moduleManager.getModule("Scaffold").getValue("KeepRotation").set(true);
    	moduleManager.getModule("Scaffold").getValue("KeepRotationLength").set(20);
    	moduleManager.getModule("Scaffold").getValue("xzRange").set(0.10);
    	moduleManager.getModule("Scaffold").getValue("yRange").set(0.10);
    	moduleManager.getModule("Scaffold").getValue("SearchAccuracy").set(16);
    	moduleManager.getModule("Scaffold").getValue("MaxTurnSpeed").set(40);
    	moduleManager.getModule("Scaffold").getValue("MinTurnSpeed").set(1);
    	moduleManager.getModule("Scaffold").getValue("Timer").set(1.0);
    	moduleManager.getModule("Scaffold").getValue("SpeedModifier").set(1.0);
    	moduleManager.getModule("Scaffold").getValue("Slow").set(true);
    	moduleManager.getModule("Scaffold").getValue("SameY").set(false);
    	moduleManager.getModule("Scaffold").getValue("SafeWalk").set(true);
    	moduleManager.getModule("Scaffold").getValue("AirSafe").set(false);
    	moduleManager.getModule("Scaffold").getValue("Counter").set(true);
    	moduleManager.getModule("Scaffold").getValue("Mark").set(true);
    	moduleManager.getModule("Scaffold").getValue("Zitter").set(false);
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§8 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§a§l Successfully §7loaded Jartex Scaffold!");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§7 Created: §c§l24.1.2021 Matrix ver: 6.0.0");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§8 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
    	module.settings.MatrixScaffoldB73.set(false);
    }
    if (module.settings.MatrixAntiBotB73.get()) {
    	moduleManager.getModule("AntiBot").getValue("Tab").set(false);
    	moduleManager.getModule("AntiBot").getValue("EntityID").set(true);
    	moduleManager.getModule("AntiBot").getValue("Color").set(false);
    	moduleManager.getModule("AntiBot").getValue("LivingTime").set(false);
    	moduleManager.getModule("AntiBot").getValue("Ground").set(false);
    	moduleManager.getModule("AntiBot").getValue("Air").set(false);
    	moduleManager.getModule("AntiBot").getValue("InvalidGround").set(false);
    	moduleManager.getModule("AntiBot").getValue("Swing").set(false);
    	moduleManager.getModule("AntiBot").getValue("Health").set(false);
    	moduleManager.getModule("AntiBot").getValue("Derp").set(false);
    	moduleManager.getModule("AntiBot").getValue("WasInvisible").set(false);
    	moduleManager.getModule("AntiBot").getValue("Armor").set(true);
    	moduleManager.getModule("AntiBot").getValue("Ping").set(false);
    	moduleManager.getModule("AntiBot").getValue("NeedHit").set(false);
    	moduleManager.getModule("AntiBot").getValue("DuplicateInWorld").set(false);
    	moduleManager.getModule("AntiBot").getValue("DuplicateInTab").set(false);
    	moduleManager.getModule("AntiBot").getValue("AlwaysInRadius").set(true);
    	moduleManager.getModule("AntiBot").getValue("AlwaysInRadiusBlocks").set(20);
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§8 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§a§l Successfully §7loaded Matrix AntiBot!");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§7 Created: §c§l1.2.2021 Matrix ver: 6.0.2-pre");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§8 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
    	module.settings.MatrixAntiBotB73.set(false);
    }
    });
    script.on("load", function() {
    	setTimeout(function () {
    		module.setState(true);
    	},2500);
    });
});
script.registerModule({
    name: "ScaffoldAddons",
    description: "Adds a few more Zitter modes to your scaffold ok? :D",
    category: "Misc",
    settings: {
		ZitterMode: Setting.list({
			name: "ZitterMode",
			default: "MoonWalk",
			values: ["MoonWalk", "Strafe", "Breezly", "None"]
		}),	
		SprintMode: Setting.list({
			name: "SprintMode",
			default: "Matrix",
			values: ["Matrix", "None",]
		}),	
    }

}, function (module) {
    module.on("enable", function () {
    moonwalkswitch = 0;
    });
    module.on("disable", function () {
    moonwalkswitch = 0;
    });
    module.on("update", function () {
    if (module.settings.ZitterMode.get() == "MoonWalk") {	
    if (Scaffold.getState() && mc.gameSettings.keyBindForward.pressed) {
    if (mc.thePlayer.ticksExisted % 7 == 0) {
        var dir = Math.rad(mc.thePlayer.rotationYaw - 90);
        mc.thePlayer.motionX += -Math.sin(dir) * 0.1
        mc.thePlayer.motionZ += Math.cos(dir) * 0.1
    }
    if (mc.thePlayer.ticksExisted % 11 == 0) {
        var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
        mc.thePlayer.motionX += -Math.sin(dir) * 0.1 
        mc.thePlayer.motionZ += Math.cos(dir) * 0.1
        var dir = Math.rad(mc.thePlayer.rotationYaw + 90);
        mc.thePlayer.setPosition(mc.thePlayer.posX += -Math.sin(dir) * 0.072, mc.thePlayer.posY, mc.thePlayer.posZ);
        mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * 0.072);
    }
    }
    }
    if (module.settings.SprintMode.get() == "Matrix") {
    if (Scaffold.getState() && mc.gameSettings.keyBindForward.pressed && mc.thePlayer.fallDistance > 0.8) {
    var dir = Math.rad(mc.thePlayer.rotationYaw);
    mc.thePlayer.motionX += -Math.sin(dir) * -0.05 
    mc.thePlayer.motionZ += Math.cos(dir) * -0.05
    }	
    }
    });
});
script.registerModule({
    name: "RangeSwitch",
    description: "Switches killaura range off and on ground, good for matrix",
    category: "Misc",
    settings: {
    	OnGroundRange: Setting.float({
			name: "OnGroundRange",
			default: 3,
			min:0.1,
			max:8
		}),
    	OffGroundRange: Setting.float({
			name: "OffGroundRange",
			default: 3,
			min:0.1,
			max:8
		}),
    	FallState09: Setting.float({
			name: "FallState09",
			default: 3,
			min:0.1,
			max:8
		}),
    	FallState08: Setting.float({
			name: "FallState08",
			default: 3,
			min:0.1,
			max:8
		}),
    	FallState07: Setting.float({
			name: "FallState07",
			default: 3,
			min:0.1,
			max:8
		}),
    	FallState06: Setting.float({
			name: "FallState06",
			default: 3,
			min:0.1,
			max:8
		}),
    	FallState05: Setting.float({
			name: "FallState05",
			default: 3,
			min:0.1,
			max:8
		}),
    	FallState04: Setting.float({
			name: "FallState04",
			default: 3,
			min:0.1,
			max:8
		}),
    	FallState03: Setting.float({
			name: "FallState03",
			default: 3,
			min:0.1,
			max:8
		}),
    	FallState02: Setting.float({
			name: "FallState02",
			default: 3,
			min:0.1,
			max:8
		}),
    	FallState01: Setting.float({
			name: "FallState01",
			default: 3,
			min:0.1,
			max:8
		}),
		MatrixConfig: Setting.boolean({
            name: "MatrixConfig",
            default: false
		}),
    }

}, function (module) {
    module.on("enable", function () {

    });
    module.on("disable", function () {

    });
    module.on("update", function () {
        if (module.settings.MatrixConfig.get()) {
        	module.settings.FallState01.set(3.56);
        	module.settings.FallState02.set(3.58);
        	module.settings.FallState03.set(3.62);
        	module.settings.FallState04.set(3.62);
        	module.settings.FallState05.set(3.62);
        	module.settings.FallState06.set(3.65);
        	module.settings.FallState07.set(3.66);
        	module.settings.FallState08.set(3.67);
        	module.settings.FallState09.set(3.69);
        	module.settings.OffGroundRange.set(3.56);
        	module.settings.OnGroundRange.set(3.7);
        	module.settings.MatrixConfig.set(false);
        }	
    });
    module.on("attack", function () {
    if (KillAura.getState() == true) {
    if (mc.thePlayer.onGround) {
    wix = 1;
    moduleManager.getModule("KillAura").getValue("Range").set(module.settings.OnGroundRange.get());	
    }
    if (!mc.thePlayer.onGround && wix == 1) {
    moduleManager.getModule("KillAura").getValue("Range").set(module.settings.OffGroundRange.get());
    }
    if (mc.thePlayer.fallDistance > 0.9) {
    wix = 0;
    moduleManager.getModule("KillAura").getValue("Range").set(module.settings.FallState09.get());	
    }
    if (mc.thePlayer.fallDistance > 0.8) {
        moduleManager.getModule("KillAura").getValue("Range").set(module.settings.FallState08.get());	
        }
    if (mc.thePlayer.fallDistance > 0.7) {
        moduleManager.getModule("KillAura").getValue("Range").set(module.settings.FallState07.get());	
        }
    if (mc.thePlayer.fallDistance > 0.6) {
        moduleManager.getModule("KillAura").getValue("Range").set(module.settings.FallState06.get());	
        }
    if (mc.thePlayer.fallDistance > 0.5) {
        moduleManager.getModule("KillAura").getValue("Range").set(module.settings.FallState05.get());	
        }
    if (mc.thePlayer.fallDistance > 0.4) {
        moduleManager.getModule("KillAura").getValue("Range").set(module.settings.FallState04.get());	
        }
    if (mc.thePlayer.fallDistance > 0.3) {
        moduleManager.getModule("KillAura").getValue("Range").set(module.settings.FallState03.get());	
        }
    if (mc.thePlayer.fallDistance > 0.2) {
        moduleManager.getModule("KillAura").getValue("Range").set(module.settings.FallState02.get());	
        }
    if (mc.thePlayer.fallDistance > 0.1) {
        moduleManager.getModule("KillAura").getValue("Range").set(module.settings.FallState01.get());	
        }
    }
    });

});
script.registerModule({
    name: "MatrixNofall",
    description: "Marrix Nofall k",
    category: "Fun",
    settings: {}

}, function (module) {
    module.on("enable", function () {
    blocks = [];
    fall = false;
    });
    
    module.on("disable", function () {
    Blink.setState(false);
    });
    module.on("update", function () {
    if (fall == true) {
    mc.thePlayer.motionY = -0.7
    mc.thePlayer.motionX = 0.0
    mc.thePlayer.motionZ = 0.0
    mc.gameSettings.keyBindForward.pressed = false;
    mc.gameSettings.keyBindLeft.pressed = false;
    mc.gameSettings.keyBindRight.pressed = false;
    mc.gameSettings.keyBindBack.pressed = false;
    }
    if (mc.thePlayer.onGround) {	
    mc.thePlayer.onGround = true;
    for (i = 0;i < blocks.length;i++) {
    mc.theWorld.destroyBlock(blocks[i], false);
    }
    }
    if (mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY-1,mc.thePlayer.posZ))) {
    if (mc.thePlayer.fallDistance >= 2) {
    fall = true;
    mc.theWorld.setBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY-1, mc.thePlayer.posZ), Blocks.barrier.getDefaultState());
    blocks.push(new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY-1,mc.thePlayer.posZ));
    } else {
    fall = false;
    }
    }
});
});



