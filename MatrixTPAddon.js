/// api_version=2
var script = registerScript({
    name: "MatrixTPAddon",
    version: "1.0",
    authors: ["FaaatPotato"]
});

var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C03 = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var Block = Java.type('net.minecraft.block.Block');
var Blocks = Java.type('net.minecraft.init.Blocks');
var MovementUtils = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");
var Teleport = moduleManager.getModule("Teleport");

	function setTimeout(func, milliseconds) {
  	    var timer = new Timer("setTimeout", true);
  	    timer.schedule(function () {
  	        func();
  	    }, milliseconds);

  	    return timer;
  	}

script.registerModule({
    name: "MatrixTPAddon",
    description: "It lets you teleport on matrix on all Y cords (no longer important wich y u select!!! :D)",
    category: "Fun",
    settings: {
    	DisableOnDamage: Setting.boolean({
            name: "DisableOnDamage",
            default: true
		}),
    }

}, function (module) {
    module.on("enable", function () {
    });
    
    module.on("disable", function () {
   
    });
    module.on("update", function () {
    if (module.settings.DisableOnDamage.get()) {
    if (mc.thePlayer.hurtTime > 0 && Teleport.getState() == true) {
    Teleport.setState(false);	
    }	
    }
    
    if (Teleport.getState() == true) {
    
    sendY = true;
    isLegitY = mc.thePlayer.posY;	
    
    if (mc.gameSettings.keyBindSneak.pressed && sendY == true) {		
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 15, mc.thePlayer.posZ, false));	
    }
    }
    
    if (Teleport.getState() == true && mc.thePlayer.posY > isLegitY+15 || mc.thePlayer.posY > isLegitY-15) {	
    sendY = false;
    }
    }); 
});
