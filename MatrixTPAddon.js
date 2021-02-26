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

script.registerModule({
    name: "MatrixTPAddon",
    description: "It lets you teleport on matrix on all Y cords (no longer important wich y u select!!! :D)",
    category: "Fun",
    settings: {}

}, function (module) {
    module.on("enable", function () {
    timer = 0;
    });
    module.on("disable", function () {
   
    });
    module.on("update", function () {
    if (Teleport.getState() == true) {
    sendY = true;	
    }
    if (mc.gameSettings.keyBindSneak.pressed && Teleport.getState() == true && sendY == true) {	
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 20, mc.thePlayer.posZ, false));	
    timer += 1;
    }
    
    if (timer > 100) {
    sendY = false;
    } 
    
    if (Teleport.getState() == false) {
    timer = 0;	
    sendY = true;
    }
    }); 
});