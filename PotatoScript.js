///api_version=2
var script = registerScript({
    name: "PotatoSpeed",
    version: "1.1.1",
    authors: ["FaaatPotato (Strafe function by TheMossYT, setSpeed and some parts BaguetteFly (NOT used, but maybe in futer idk), Cancerglide base)"]
});
var MovementUtils = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");
var C03 = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C02 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var S08 = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
var S12 = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
var velocity = moduleManager.getModule("Velocity");
var blink = moduleManager.getModule("Blink");
var Scaffold = moduleManager.getModule("Scaffold");
var AntiBot = moduleManager.getModule("AntiBot");
var Timer = Java.type('java.util.Timer');
var RotationUtils = Java.type('net.ccbluex.liquidbounce.utils.RotationUtils');
var Rotation = Java.type('net.ccbluex.liquidbounce.utils.Rotation');

var matrixshit;
var nosex;

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
    Tag: "OwO",
    settings: {
		SpeedMode: Setting.list({
			name: "SpeedMode",
			default: "BHop",
			values: ["BHop", "AfterJump", "Test"]
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
        FlagDetection: Setting.boolean({
            name: "FlagDetection",
            default: true
		}),
        ReturnOnCollide: Setting.boolean({
            name: "ReturnOnCollide",
            default: false
		}),
        Reset: Setting.boolean({
            name: "Reset",
            default: false
		}),
    }
}, function(module) {
    module.on("update", function() {
                if (!MovementUtils.isMoving()) {return; mc.timer.timerSpeed = 1;}
                if (mc.thePlayer.fallDistance > 1 && !module.settings.SpeedMode.get() == "Test") return;
                if (module.settings.ReturnOnCollide.get() && mc.thePlayer.isCollidedHorizontally) {
                return;	
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
                case "Test":
                	if (mc.thePlayer.onGround) {
                    	mc.timer.timerSpeed = 1;
                		mc.thePlayer.motionY = 0.12;
                	}
                	if (mc.thePlayer.fallDistance > 0.5) {
                	}
                	if (!mc.thePlayer.onGround) {
                	} 		
                	break;
                } 	   
});
    module.on("enable", function() {
    });
    module.on("disable", function() {
        mc.timer.timerSpeed = 1;
        mc.thePlayer.speedInAir = 0.02;
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
			values: ["Matrix1Old", "Matrix2Old", "BoatMatrixNew", "Boat0"]
		}),
		FallDistance: Setting.float({
			name: "FallDistance",
			default: 3,
			min:3,
			max:10
		}),
		BoatY: Setting.float({
			name: "BoatY",
			default: 0.5,
			min:0.5,
			max:5
		}),
		BoatBoost: Setting.float({
			name: "BoatBoost",
			default: 3,
			min:3,
			max:5
		}),
        AutoSneak: Setting.boolean({
            name: "AutoSneak",
            default: true
		}),
        BoatJartexTimer: Setting.boolean({
            name: "BoatJartexTimer",
            default: true
		}),
        DisableVelocity: Setting.boolean({
            name: "DisableVelocity",
            default: true
		}),
        AutoJump: Setting.boolean({
            name: "AutoJump",
            default: false
		}),
        MotionNoFall: Setting.boolean({
            name: "MotionNoFall",
            default: false
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
    	if (module.settings.FlyMode.get() == "BoatMatrixNew") {
        Chat.print("§8§l[§c§lPotatoScript§8]§7 This mode is up do date!");
        }
    	}
    });
    module.on("disable", function () {
    	nosex = 0;
    	mc.timer.timerSpeed = 1;
		mc.gameSettings.keyBindForward.pressed = false;
		mc.gameSettings.keyBindSprint.pressed = false;
        	if (module.settings.DisableVelocity.get()) {
        		velocity.setState(true);
        	} 
    });
    
    module.on("update", function () {
    	if (module.settings.AutoJump.get() && mc.thePlayer.onGround) {
    		mc.thePlayer.jump();
    	}
    	module.tag = module.settings.FlyMode.get();
    	switch (module.settings.FlyMode.get()) {
    	case "Matrix1Old":
    	if (mc.thePlayer.hurtTime > 0) {
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
           if (module.settings.MotionNoFall.get() && mc.thePlayer.isCollidedHorizontally) {
               var dir = Math.rad(mc.thePlayer.rotationYaw);
               mc.thePlayer.motionX += -Math.sin(dir) * -5;
               mc.thePlayer.motionZ += Math.cos(dir) * -5;
               setTimeout(function () {
               module.setState(false);
               },100);
           }
    	};
    	break;
    	case "Matrix2Old":
    		if (mc.thePlayer.hurtTime > 0) {
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
    	case "BoatMatrixNew":
    		if (mc.thePlayer.isRiding()) {
    		if (module.settings.AutoSneak.get()) {
    		mc.gameSettings.keyBindSneak.pressed = true;
    		}
    		if (module.settings.BoatJartexTimer.get()) {
    		mc.timer.timerSpeed = 0.3;
    		}
    		matrixshit = 1;
    		} else {
    		mc.timer.timerSpeed = 1;
    		if (matrixshit == 1) {
        	if (module.settings.AutoSneak.get()) {
            mc.gameSettings.keyBindSneak.pressed = false;
            }
    		matrixshit = 0;
    		mc.thePlayer.sendQueue.addToSendQueue(new C03(true));
    		mc.thePlayer.motionY = module.settings.BoatY.get();
    		setYeet(module.settings.BoatBoost.get());
    		}
    		}
    		module.settings.MotionNoFall.set(false);
    		module.settings.AutoJump.set(false);
    		break;
    	case "Boat0":
    	if (!mc.thePlayer.isRiding()) {
        mc.thePlayer.sendQueue.addToSendQueue(new C03(true));
        mc.thePlayer.motionY *= 0.0;
        }	
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
        ScaffoldMatrix: Setting.boolean({
            name: "ScaffoldMatrix",
            default: false
		}),
        ScaffoldJartex: Setting.boolean({
            name: "ScaffoldJartex",
            default: false
		}),
        AntiBotMatrix: Setting.boolean({
            name: "AntiBotMatrix",
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
    	
    if (module.settings.ScaffoldMatrix.get()) {
    	moduleManager.getModule("Scaffold").getValue("Mode").set("Normal");
    	moduleManager.getModule("Scaffold").getValue("AutoBlock").set("Spoof");
    	moduleManager.getModule("Scaffold").getValue("RotationMode").set("Static");
    	moduleManager.getModule("Scaffold").getValue("Eagle").set("Silent");
    	moduleManager.getModule("Scaffold").getValue("PlaceTiming").set("Pre");
    	moduleManager.getModule("Scaffold").getValue("MaxDelay").set(62);
    	moduleManager.getModule("Scaffold").getValue("MinDelay").set(62);
    	moduleManager.getModule("Scaffold").getValue("PlaceableDelay").set(true);
    	moduleManager.getModule("Scaffold").getValue("Sprint").set(false);
    	moduleManager.getModule("Scaffold").getValue("Swing").set(true);
    	moduleManager.getModule("Scaffold").getValue("Search").set(true);
    	moduleManager.getModule("Scaffold").getValue("Down").set(false);
    	moduleManager.getModule("Scaffold").getValue("BlocksToEagle").set(0);
    	moduleManager.getModule("Scaffold").getValue("RotationStrafe").set(false);
    	moduleManager.getModule("Scaffold").getValue("SilentRotation").set(true);
    	moduleManager.getModule("Scaffold").getValue("KeepRotation").set(true);
    	moduleManager.getModule("Scaffold").getValue("KeepRotationLength").set(20);
    	moduleManager.getModule("Scaffold").getValue("xzRange").set(0.20);
    	moduleManager.getModule("Scaffold").getValue("yRange").set(0.80);
    	moduleManager.getModule("Scaffold").getValue("SearchAccuracy").set(8);
    	moduleManager.getModule("Scaffold").getValue("MaxTurnSpeed").set(60);
    	moduleManager.getModule("Scaffold").getValue("MinTurnSpeed").set(50);
    	moduleManager.getModule("Scaffold").getValue("Timer").set(1.0);
    	moduleManager.getModule("Scaffold").getValue("SpeedModifier").set(1.20);
    	moduleManager.getModule("Scaffold").getValue("Slow").set(false);
    	moduleManager.getModule("Scaffold").getValue("SameY").set(false);
    	moduleManager.getModule("Scaffold").getValue("SafeWalk").set(true);
    	moduleManager.getModule("Scaffold").getValue("AirSafe").set(false);
    	moduleManager.getModule("Scaffold").getValue("Counter").set(true);
    	moduleManager.getModule("Scaffold").getValue("Mark").set(false);
    	moduleManager.getModule("Scaffold").getValue("Zitter").set(false);
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§8 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§a§l Successfully §7loaded Matrix Scaffold!");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§7 Created: §c§l11.1.2021 Matrix ver: 6.0.0");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§8 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
    	module.settings.ScaffoldMatrix.set(false);
    }
    if (module.settings.ScaffoldJartex.get()) {
    	moduleManager.getModule("Scaffold").getValue("Mode").set("Normal");
    	moduleManager.getModule("Scaffold").getValue("AutoBlock").set("Switch");
    	moduleManager.getModule("Scaffold").getValue("RotationMode").set("StaticYaw");
    	moduleManager.getModule("Scaffold").getValue("Eagle").set("EdgeDistance");
    	moduleManager.getModule("Scaffold").getValue("PlaceTiming").set("Pre");
    	moduleManager.getModule("Scaffold").getValue("MaxDelay").set(62);
    	moduleManager.getModule("Scaffold").getValue("MinDelay").set(62);
    	moduleManager.getModule("Scaffold").getValue("PlaceableDelay").set(true);
    	moduleManager.getModule("Scaffold").getValue("Sprint").set(false);
    	moduleManager.getModule("Scaffold").getValue("Swing").set(true);
    	moduleManager.getModule("Scaffold").getValue("Search").set(true);
    	moduleManager.getModule("Scaffold").getValue("Down").set(false);
    	moduleManager.getModule("Scaffold").getValue("BlocksToEagle").set(0);
    	moduleManager.getModule("Scaffold").getValue("RotationStrafe").set(false);
    	moduleManager.getModule("Scaffold").getValue("SilentRotation").set(true);
    	moduleManager.getModule("Scaffold").getValue("KeepRotation").set(true);
    	moduleManager.getModule("Scaffold").getValue("KeepRotationLength").set(20);
    	moduleManager.getModule("Scaffold").getValue("StaticYawOffset").set(82.00);
    	moduleManager.getModule("Scaffold").getValue("EagleEdgeDistance").set(0.20);
    	moduleManager.getModule("Scaffold").getValue("xzRange").set(0.20);
    	moduleManager.getModule("Scaffold").getValue("yRange").set(0.80);
    	moduleManager.getModule("Scaffold").getValue("SearchAccuracy").set(8);
    	moduleManager.getModule("Scaffold").getValue("MaxTurnSpeed").set(60);
    	moduleManager.getModule("Scaffold").getValue("MinTurnSpeed").set(50);
    	moduleManager.getModule("Scaffold").getValue("Timer").set(1.0);
    	moduleManager.getModule("Scaffold").getValue("SpeedModifier").set(0.98);
    	moduleManager.getModule("Scaffold").getValue("Slow").set(false);
    	moduleManager.getModule("Scaffold").getValue("SameY").set(false);
    	moduleManager.getModule("Scaffold").getValue("SafeWalk").set(true);
    	moduleManager.getModule("Scaffold").getValue("AirSafe").set(false);
    	moduleManager.getModule("Scaffold").getValue("Counter").set(true);
    	moduleManager.getModule("Scaffold").getValue("Mark").set(false);
    	moduleManager.getModule("Scaffold").getValue("Zitter").set(false);
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§8 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§a§l Successfully §7loaded Jartex Scaffold!");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§7 Created: §c§l11.1.2021 Matrix ver: 6.0.0");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§8 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
    	module.settings.ScaffoldJartex.set(false);
    }
    if (module.settings.AntiBotMatrix.get()) {
    	moduleManager.getModule("AntiBot").getValue("Tab").set(true);
    	moduleManager.getModule("AntiBot").getValue("TabMode").set("Equals");
    	moduleManager.getModule("AntiBot").getValue("EntityID").set(true);
    	moduleManager.getModule("AntiBot").getValue("Color").set(false);
    	moduleManager.getModule("AntiBot").getValue("LivingTime").set(true);
    	moduleManager.getModule("AntiBot").getValue("LivingTimeTicks").set(40);
    	moduleManager.getModule("AntiBot").getValue("Ground").set(false);
    	moduleManager.getModule("AntiBot").getValue("Air").set(false);
    	moduleManager.getModule("AntiBot").getValue("InvalidGround").set(true);
    	moduleManager.getModule("AntiBot").getValue("Swing").set(false);
    	moduleManager.getModule("AntiBot").getValue("Health").set(true);
    	moduleManager.getModule("AntiBot").getValue("Derp").set(false);
    	moduleManager.getModule("AntiBot").getValue("WasInvisible").set(true);
    	moduleManager.getModule("AntiBot").getValue("Armor").set(false);
    	moduleManager.getModule("AntiBot").getValue("Ping").set(false);
    	moduleManager.getModule("AntiBot").getValue("NeedHit").set(true);
    	moduleManager.getModule("AntiBot").getValue("DuplicateInWorld").set(true);
    	moduleManager.getModule("AntiBot").getValue("DuplicateInTab").set(true);
    	moduleManager.getModule("AntiBot").getValue("AlwaysInRadius").set(true);
    	moduleManager.getModule("AntiBot").getValue("AlwaysInRadiusBlocks").set(8);
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§8 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§a§l Successfully §7loaded Matrix AntiBot!");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§7 Created: §c§l11.1.2021 Matrix ver: 6.0.0");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]");
    	Chat.print("§8§l[§c§lPotatoScript§8§l]§8 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
    	module.settings.AntiBotMatrix.set(false);
    }
    });
    script.on("load", function() {
    	setTimeout(function () {
    		module.setState(true);
    	},2500);
    });
});
