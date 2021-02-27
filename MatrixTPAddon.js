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
		PacketY: Setting.float({
			name: "PacketY",
			default: 50,
			min:30,
			max:100
		}),
    	CancelOnDamage: Setting.boolean({
            name: "CancelOnDamage",
            default: true
		}),
    	AntiKick: Setting.boolean({
            name: "AntiKick",
            default: false
		}),
    }

}, function (module) {
    module.on("enable", function () {	
    });
    
    module.on("disable", function () {
   
    });
    module.on("update", function () {
    	
    if (Teleport.getState() == true && module.settings.AntiKick.get() && mc.gameSettings.keyBindSneak.pressed) {
    setTimeout(function () {
    mc.gameSettings.keyBindSneak.pressed = false;	
    },3500);
    }	
    	
    if (module.settings.CancelOnDamage.get() && mc.gameSettings.keyBindSneak.pressed) {
    if (mc.thePlayer.hurtTime > 0 && Teleport.getState() == true) {
    mc.gameSettings.keyBindSneak.pressed = false;
    }	
    }
    
    if (Teleport.getState() == true) {
    	
    sendY = true;
    isLegitY = mc.thePlayer.posY;	
    
    if (mc.gameSettings.keyBindSneak.pressed && sendY == true) {		
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + module.settings.PacketY.get(), mc.thePlayer.posZ, false));	
    }
    }
    
    if (Teleport.getState() == true && mc.thePlayer.posY > isLegitY+15 || mc.thePlayer.posY > isLegitY-15) {	
    sendY = false;
    }
    }); 
});
