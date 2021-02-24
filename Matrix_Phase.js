/// api_version=2
var script = registerScript({
    name: "MAXPhase",
    version: "1.0",
    authors: ["FaaatPotato"]
});

var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C03 = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var Block = Java.type('net.minecraft.block.Block');
var Blocks = Java.type('net.minecraft.init.Blocks');

Math.rad = function(deg) {
    return deg * Math.PI / 180;
}

script.registerModule({
    name: "MatrixPhase",
    description: "This lets you go through walls on Matrix anticheat",
    category: "Exploit",
    settings: {
	    Mode: Setting.list({
			name: "Mode",
			default: "JartexSW",
			values: ["JartexSW","JartexAuto","1BlockAllDirections"]
		}),
	    PhaseMode: Setting.list({
			name: "PhaseMode",
			default: "FastClip",
			values: ["FastClip","SlowPacket"]
		}),
	    AutoDirection: Setting.list({
			name: "AutoDirection",
			default: "DOWN",
			values: ["UP","DOWN"]
		}),
        Bedwars: Setting.boolean({
            name: "Bedwars",
            default: true
		}),
    }

}, function (module) {
    module.on("enable", function () {	
    auto = false;	
    auto2 = false;
    });
    module.on("disable", function () {
    mc.timer.timerSpeed = 1;
    });
    module.on("update", function () {
    
    if (module.settings.Mode.get() == "1BlockAllDirections") {	
    if (mc.gameSettings.keyBindJump.pressed && !mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY + 2,mc.thePlayer.posZ))) {
    
    phaseY2 = mc.thePlayer.posY;
    
    if (mc.thePlayer.posY == phaseY2) {
    mc.thePlayer.motionY = 0.0;
    	
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 3, mc.thePlayer.posZ, true));	
        
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 3, mc.thePlayer.posZ, true));	
        
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 3, mc.thePlayer.posZ, true));		
    }	
    }	
    	
    if (mc.thePlayer.isCollidedVertically && mc.gameSettings.keyBindSneak.pressed) {
    
    phaseY = mc.thePlayer.posY;	
    	
    if (mc.thePlayer.posY == phaseY && module.settings.PhaseMode.get() == "SlowPacket") {
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 3, mc.thePlayer.posZ, true));	
    
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 3, mc.thePlayer.posZ, true));	
    }
    if (mc.thePlayer.posY == phaseY && module.settings.PhaseMode.get() == "FastClip") {
    	
    mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY - 3, mc.thePlayer.posZ);		
    }
    }
    	
    if (mc.thePlayer.isCollidedHorizontally && mc.gameSettings.keyBindForward.pressed) {
    	
    phaseX = mc.thePlayer.posX;
    phaseZ = mc.thePlayer.posZ;
    
    if (mc.thePlayer.posX == phaseX && mc.thePlayer.posZ == phaseZ) {
     
    var dir = Math.rad(mc.thePlayer.rotationYaw);	
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX += -Math.sin(dir) * 2, mc.thePlayer.posY, mc.thePlayer.posZ += Math.sin(dir) * 2, true));	
        
    var dir = Math.rad(mc.thePlayer.rotationYaw);
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX += -Math.sin(dir) * 2, mc.thePlayer.posY, mc.thePlayer.posZ += Math.sin(dir) * 2, true));	
    
    mc.thePlayer.motionX = 0.0;
    mc.thePlayer.motionZ = 0.0;
    }
    }
    if (!mc.thePlayer.isCollidedHorizontally) {
    mc.timer.timerSpeed = 1;	
    }
    }
    
    if (module.settings.Mode.get() == "JartexSW") {
        if (mc.gameSettings.keyBindJump.pressed && !mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY + 3,mc.thePlayer.posZ))) {
            
            phaseY2 = mc.thePlayer.posY;
            
            if (mc.thePlayer.posY == phaseY2) {
            mc.thePlayer.motionY = 0.0;
            	
            mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 4, mc.thePlayer.posZ, true));	
                
            mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 4, mc.thePlayer.posZ, true));	
            
            mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 4, mc.thePlayer.posZ, true));	
            }	
            }	
            	
            if (mc.thePlayer.isCollidedVertically && mc.gameSettings.keyBindSneak.pressed) {
            
            phaseY = mc.thePlayer.posY;	
            	
            if (mc.thePlayer.posY == phaseY) {
            mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 3, mc.thePlayer.posZ, true));	
            
            mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 3, mc.thePlayer.posZ, true));		
            }
            }	
            	
            if (mc.thePlayer.isCollidedHorizontally && mc.gameSettings.keyBindForward.pressed) {
            	
            phaseX = mc.thePlayer.posX;
            phaseZ = mc.thePlayer.posZ;
            
            if (mc.thePlayer.posX == phaseX && mc.thePlayer.posZ == phaseZ) {
            var dir = Math.rad(mc.thePlayer.rotationYaw);
            mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX += -Math.sin(dir) * 4 / 2, mc.thePlayer.posY, mc.thePlayer.posZ, true));
            mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * 4 / 2, true));
            
            var dir = Math.rad(mc.thePlayer.rotationYaw);
            mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX += -Math.sin(dir) * 4 / 2, mc.thePlayer.posY, mc.thePlayer.posZ, true));
            mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ += Math.cos(dir) * 4 / 2, true));
            }
        }	
    }
    
    if (module.settings.Mode.get() == "JartexAuto") {
    if (module.settings.AutoDirection.get() == "UP" && module.settings.PhaseMode.get() == "SlowPacket") {	
    if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY + 3, mc.thePlayer.posZ)).getBlock() == Block.getBlockById(20)) {
    auto = true;	
    } else {
    auto = false;
    }
    if (auto == true) {
        phaseY3 = mc.thePlayer.posY;
    	
        if (mc.thePlayer.posY == phaseY3) {
        
        if (mc.thePlayer.ticksExisted % 15 == 0 && mc.thePlayer.onGround) {
        mc.gameSettings.keyBindForward.pressed = true;
        }
        if (mc.thePlayer.ticksExisted % 20 == 0) {
        mc.gameSettings.keyBindForward.pressed = false;	
        }
        	
        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 4, mc.thePlayer.posZ, true));	
                
        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 4, mc.thePlayer.posZ, true));	
        
        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 4, mc.thePlayer.posZ, true));	
    }	 
    }
    }
    if (module.settings.AutoDirection.get() == "DOWN" && module.settings.PhaseMode.get() == "FastClip") {
    if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY + 3, mc.thePlayer.posZ)).getBlock() == Block.getBlockById(20)) {
    auto = true;	
    } else {
    auto = false;
    }
    if (auto == true) {
    phaseY3 = mc.thePlayer.posY;
    
    if (mc.thePlayer.posY == phaseY3) {
    mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY - 3, mc.thePlayer.posZ);	
    }
    }
    if (auto2 == true) {
    phaseY3 = mc.thePlayer.posY;
    
    if (mc.thePlayer.posY == phaseY3) {
    mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY - 3, mc.thePlayer.posZ);	
    }
    }
    if (module.settings.Bedwars.get()) {
    if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY - 1, mc.thePlayer.posZ)).getBlock() == Block.getBlockById(166) && mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY - 3,mc.thePlayer.posZ))) {
    auto2 = true;	
    } else {
    auto2 = false;
    }	
    }
    }
    if (module.settings.AutoDirection.get() == "DOWN" && module.settings.PhaseMode.get() == "SlowPacket") {
    if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY + 3, mc.thePlayer.posZ)).getBlock() == Block.getBlockById(20)) {
    auto = true;	
    } else {
    auto = false;
    }	
    if (auto == true) {
    phaseY3 = mc.thePlayer.posY;
    
    if (mc.thePlayer.posY == phaseY3) {
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 3, mc.thePlayer.posZ, true));	
        
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 3, mc.thePlayer.posZ, true));	
        
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 3, mc.thePlayer.posZ, true));	
    }
    }
    }
    if (module.settings.AutoDirection.get() == "UP" && module.settings.PhaseMode.get() == "FastClip") {
    if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY + 3, mc.thePlayer.posZ)).getBlock() == Block.getBlockById(20)) {
    auto = true;	
    } else {
    auto = false;
    mc.timer.timerSpeed = 1;
    }	
    if (auto == true) {
    phaseY3 = mc.thePlayer.posY;
            
    if (mc.thePlayer.posY == phaseY3) { 
    	
    mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + 4, mc.thePlayer.posZ);	
    mc.thePlayer.sendQueue.addToSendQueue(new C03(true));
    }
    }
    }
    }
    });
});