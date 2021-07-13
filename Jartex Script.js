

/// api_version=2
var script = registerScript({
    name: "Jartex Script",
    version: "1.0",
    authors: ["FaaatPotato"]
});

//hi

//Thanks @Anonzme for the functions that are needed for the AutoUpdate! <3 (I got these from ScriptCloud thats sum amazing work!)
//Credits: @liulihaocai made the AutoL I use it bc im laizy ok
//Also thanks to @CzechHek for helping me with problems i had in the past <3

var C05 = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook')
var C03 = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C08 = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
var HentaiPacket = Java.type("net.minecraft.network.play.server.S02PacketChat");
var Amanee = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var thePlayer = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");
var Block = Java.type('net.minecraft.block.Block');
var Blocks = Java.type('net.minecraft.init.Blocks');
var S08 = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
var RotationUtils = Java.type('net.ccbluex.liquidbounce.utils.RotationUtils');
var Rotation = Java.type('net.ccbluex.liquidbounce.utils.Rotation');
var DCT = Java.type("net.minecraft.network.login.server.S00PacketDisconnect");
var Regen = Java.type("net.minecraft.network.play.server.S06PacketUpdateHealth");

var FreeCam = moduleManager.getModule("FreeCam");
var Fly = moduleManager.getModule("Fly");
var Reach = moduleManager.getModule("Reach");
var Teleport = moduleManager.getModule("Teleport");
var Spammer = moduleManager.getModule("Spammer");

function vClip(d) {
mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + d, mc.thePlayer.posZ);
}

function setTimeout(func, milliseconds) {
    var timer = new Timer("setTimeout", true);
    timer.schedule(function () {
        func();
    }, milliseconds);

    return timer;
}

Math.rad = function(deg) {
    return deg * Math.PI / 180;
}

function r(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function setYeet(_yeet) {
	var playerYaw = Math.rad(mc.thePlayer.rotationYaw);
	mc.thePlayer.motionX = _yeet * -Math.sin(playerYaw);
	mc.thePlayer.motionZ = _yeet * Math.cos(playerYaw);
}

var url = "https://raw.githubusercontent.com/FaaatPotato/Scripts/main/Jartex%20Script.js";
var name = "JartexScript";
var pName = "JartexScript.js";

var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var FileOutputStream = Java.type("java.io.FileOutputStream");
var File = Java.type("java.io.File");
var FileReader = Java.type("java.io.FileReader");

function getData(url) {
	
    var data = "";
    var connection = new URL(url);
    var http = connection.openConnection();
    http.setRequestMethod("GET");
    http.setRequestProperty("User-Agent", "Mozilla/5.0");
    var stream = http.getInputStream();
    var input = new InputStreamReader(stream, "utf-8");
    var bufferedReader = new BufferedReader(input);
    var inputLine;
    while ((inputLine = bufferedReader.readLine()) != null)
		data += "\n" + inputLine;
    input.close();
    bufferedReader.close();
    return data;
}

function createNewFile(name) {
	var a = new File(mc.mcDataDir, "LiquidBounce-1.8");
	var b = new File(a, "scripts");
	(new File(b, name)).createNewFile();
}

function writeIn(name, msg) {
	try {
		var msg = getData(url);
		var a = new File(mc.mcDataDir, "LiquidBounce-1.8");
		var b = new File(a, "scripts");
		var f = new File(b, name);
		var out = new FileOutputStream(f);
		out.write(msg.getBytes());
		out.close();
	} catch (err) {
		Chat.print("Error: " + err);
	}
}

function checkScript() {

		var a = new File(mc.mcDataDir, "LiquidBounce-1.8");
		var b = new File(a, "scripts");
        var reader = new BufferedReader(new FileReader(new File(b, pName)));
        var fileData = "";
        var data;
        
        while ((data = reader.readLine()) != null)
        	fileData += "\n" + data;
        	reader.close();
        	
        return fileData;
}

var homeSelected;
var X;
var Y;
var Z;

script.registerModule({
    name: "JartexManager",
    description: "Is config loader and stuff",
    category: "Fun",
    tag: "JS",
    settings: {
        B73: Setting.boolean({
            name: "LoadConfigB73",
            default: false
		}),
        B72: Setting.boolean({
            name: "LoadConfigB72",
            default: false
		}),
        U: Setting.boolean({
            name: "DownloadCurrent",
            default: false
		}),
        x: Setting.boolean({
            name: " ",
            default: false
		}),
        SetTP: Setting.boolean({
            name: "SetHomePoint",
            default: false
		}),
        TP: Setting.boolean({
            name: "TPToHomePoint",
            default: false
		}),
        s: Setting.boolean({
            name: " ",
            default: false
		}),
        HomePoint: Setting.text({
            name: "HomePoint",
            default: ""
        }),
        Reset: Setting.boolean({
            name: "ResetAfterTP",
            default: false
		}),
        Key: Setting.boolean({
            name: "UseKeyBinds",
            default: true
		}),
    }

}, function (module) {
    module.on("enable", function () {
    });
    module.on("disable", function () {
    cancel = false;
    });
    module.on("packet", function (e) {
    var packet = e.getPacket();
    if (packet instanceof C04 && homeSelected == true && module.settings.TP.get() && mc.thePlayer.isInWeb) {
    packet.x = X
    packet.y = Y
    packet.z = Z
    }
    });
    module.on("update", function () {			
    	
    if (module.settings.U.get()) {
    createNewFile(name + ".js");	
    writeIn(name + ".js");
    module.settings.U.set(false);
    Chat.print(" ");
    Chat.print("type .scriptmanager reload to reload the script!");
    Chat.print("the old script has been updated");
    Chat.print(" ");
    }	
    	
    if (module.settings.TP.get() && !mc.thePlayer.isInWeb) {
    module.settings.TP.set(false);	
    Chat.print("You are not in a Web");
    }	
    	
    if (module.settings.SetTP.get()) {
    X = mc.thePlayer.posX;
    Y = mc.thePlayer.posY;
    Z = mc.thePlayer.posZ;	
    homeSelected = true;	
    module.settings.SetTP.set(false);
    module.settings.HomePoint.set(X+", "+Y+", "+Z)
    Chat.print("Homepoint set to "+X+", "+Y+", "+Z);
    }	
    
    if (homeSelected == true && mc.thePlayer.posX == X && mc.thePlayer.posZ == Z && module.settings.TP.get()) {
    module.settings.TP.set(false);
    if (module.settings.Reset.get()) {
    homeSelected = false;	
    module.settings.HomePoint.set("No home selected!");
    }
    }
   
    if (module.settings.B73.get()) {
    commandManager.executeCommands(".config load https://raw.githubusercontent.com/FaaatPotato/Configs/main/JartexB73.txt");
    module.settings.B73.set(false);
    }
    
    if (module.settings.B72.get()) {
    commandManager.executeCommands(".config load https://raw.githubusercontent.com/FaaatPotato/Configs/main/JartexB72.txt");
    module.settings.B72.set(false);
    }
    });
    
    module.on("key", function (e) {
    key = e.getKey();
    if (module.settings.Key.get()) {
    if (key == 210) {
    module.settings.SetTP.set(true);	
    }
    if (key == 211) {
    module.settings.TP.set(true);	
    }
    }
    });
});

var c2;
var c1;

script.registerModule({
    name: "AutoPhase",
    description: "Phases your dick through walls",
    category: "Fun",
    tag: "JS",
    settings: {
    }

}, function (module) {
    module.on("enable", function () {
    c1 = false;
    c2 = false;
    });
    module.on("disable", function () {

    });
    module.on("update", function () {	
    if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY + 3, mc.thePlayer.posZ)).getBlock() == Block.getBlockById(20)) {
    if (mc.thePlayer.ticksExisted % 20 == 0) {
    c1 = true;
    }
    } else {
    c1 = false;	
    } 
    
    if (c1 == true) {
        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 4, mc.thePlayer.posZ, true));	
        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 4, mc.thePlayer.posZ, true));
	    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 0.1, mc.thePlayer.posZ, false));
	    
	    mc.gameSettings.keyBindLeft.pressed = false;
	    mc.gameSettings.keyBindForward.pressed = false;
	    mc.gameSettings.keyBindRight.pressed = false;
	    mc.gameSettings.keyBindBack.pressed = false;
	    mc.gameSettings.keyBindJump.pressed = false;	
    }
		
		if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY + 4, mc.thePlayer.posZ)).getBlock() == Block.getBlockById(166)) {
		if (mc.thePlayer.ticksExisted % 20 == 0) {
        c2 = true;
		}
		} else {
		c2 = false;	
		}
		
		if (c2 == true) {
		    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 5, mc.thePlayer.posZ, true));	
		    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 5, mc.thePlayer.posZ, true));	
		    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 0.1, mc.thePlayer.posZ, false));	
		    
		    mc.gameSettings.keyBindLeft.pressed = false;
		    mc.gameSettings.keyBindForward.pressed = false;
		    mc.gameSettings.keyBindRight.pressed = false;
		    mc.gameSettings.keyBindBack.pressed = false;
		    mc.gameSettings.keyBindJump.pressed = false;	
		}
    });
});
script.registerModule({
    name: "LiquiqWalk",
    description: "Makes you jesus",
    category: "Fun",
    tag: "JS",
    settings: {
        b: Setting.boolean({
            name: "Boost",
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
    if (mc.thePlayer.isInWater() && !mc.thePlayer.isCollidedHorizontally) {

    mc.thePlayer.motionY = 0;

    if (mc.gameSettings.keyBindForward.pressed && module.settings.b.get()) {
    mc.timer.timerSpeed = 1.05;	
    var dir = Math.rad(mc.thePlayer.rotationYaw);
    mc.thePlayer.motionX += -Math.sin(dir) * 0.07;
    mc.thePlayer.motionZ += Math.cos(dir) * 0.07;	
    }
    }
    });
});

var EnglishWords = ['I\'m burying you here now, little brother.', 'you don\'t have speed to compete with me.', 'I\'m like your father. Don\'t you know what\'s going on?', 'a snail like you has no speed to fight against your father and me with these poor words.', 'a little rubbish like you has no power at all.', 'And then you don\'t have the power at all. Do you understand your trash, little trash?', ' I\'m like your father beating your son casually. ', 'I\'m like your father. You don\'t know what\'s going on.', 'Why are you so powerful here? ', 'Now you know what\'s going on, you\'re like garbage.', 'how can you fight me like garbage? ', 'Hee hee hee, can you come out and tell me?', 'you don\'t have the speed at all. Do you understand what\'s going on? Come out and beat me like garbage.', 'so you let me beat you like garbage. Isn\'t that the truth? Brother.', 'you can only insult me like my son or what you want to do?', 'I\'m just like your father beating you like a totally powerless son.', 'Father, I beat you up at will, son.', 'I\'m not beating you up now, autistic youth.', 'you don\'t know the situation or how it is.', 'autistic children start beating up your top dad.', 'how can I feel you and my autistic son\'s resistance to Dad.', 'Son, do you know what your father is fighting against?', ' now you see your father\'s fear of all kinds of speed or how it is. ', 'Now you have fun, son. Do you know what\'s going on?', 'dad hit you at will. Do you know the truth? ', 'You still want to fight against me powerlessly, or what\'s your brother.', 'You don\'t know what\'s going on, or you\'re totally rubbish', 'hee hee hee your b-face', 'your mother put b-face in your mother\'s b-face', 'you don\'t seem to know everything', 'you don\'t find out that you\'re not Dad\'s opponent at all', 'Dad, I\'ll turn over your mother at will', 'your dog and son just flinch away', 'Are you sitting in front of the computer and sweating in your palms?', 'are you nervous? Are you incoherent? ', 'All you can do now is to tap the keyboard at random and hint your fear to me with fear.', 'haven\'t you found that now it\'s like a clown jumping on a beam to please me? ', 'And I\'ll beat you and beat an autistic thing at will ', 'Why can\'t you fuck your mother?', 'it\'s a word you\'ve been tossing around.', ' How about the kids come up with your strength?', 'didn\'t you find out that you\'re not my dad\'s match? ', 'Did you give it to me,', 'my dead boy? ', 'don\'t give it to my dad or me for nothing? ', 'You\'re a tough guy, don\'t you answer me like this?', 'what are you? You\'re a dead boy. You\'re a punk. ', 'Young man, you\'ve come across the sea to fake your father and me.', 'are you a junk dog basket? Can you tell us whether you\'re a junk dog basket?', ' Can you boast about a junk dog basket?', 'what\'s wrong with you Are you afraid of your father and me, are you a dog basket, a boy and your mother are dead, do you admit that you are a half paralyzed garbage dog basket, hurry up, can\'t you improve your speed, can\'t you feel powerless, can\'t you worry about your speed, ', 'Do you know that you are going to lose to your dad and me who is at the top of the world', 'do you have no self-knowledge', 'do you think you are going to lose to your dad and me who is at the top of the world, you are not in a hot mood at first', 'what are you doing, what are your ink marks, what are your autism speed', 'shouldn\'t you attack me with words that are powerful enough to make you shrink back?', 'Why are you so poor, brother?', 'are you a coward, young man?', 'are you boasting about your speed?', 'what capital do you have to boast about?', 'your speed of no one\'s attention? Tell your father me all about it.', 'do you think you can win over your father and me?', 'I see if you think you can win', 'young man, are you a loser', 'are you a powerful loser', 'how can you become a turtle in a jar', 'are you insane and can\'t extricate yourself', 'do you think you can win', 'young man, are you a loser?', 'Why do you use your cheerleading words to attack your wonderful dad and me?', 'do you want to beat your real dad and me with your mother-in-law words? ', 'Do you start to be complacent?', ' do you think you can beat my wonderful dad and me? ', ' do you think you are confused now? ', 'Why is your father typing so fast', 'are you afraid of your father\'s speed', 'do you know nothing about these words', 'don\'t you understand anything', 'how can you be a yes man', 'are you afraid of me', 'are you a coward', 'are you still breathing', 'are you sweating, are you panting?', 'How about the junk Dog Basket keep up with your father and me?', 'attack me with your words', 'how can a frog at the bottom of the well know that the sky is thicker than your height and your face is thicker than yours', 'be your coward honestly', 'what are you doing, attack your father and me repeatedly', 'how can you still be still', 'are you deaf and blind?', 'You don\'t know for sure', 'I asked you to be a real wimp, you are confused', 'you can\'t understand what your father said', 'I asked you to be a wimp', 'what are you doing? Are you starting to get angry', 'why don\'t you still be a real wimp', 'how can you still be a real wimp in front of me?', 'Do you want to continue to use your intermittent words to prove your cowardice', 'you are useless little brother, you don\'t understand', 'little brother, you are a unique coward', 'are you an immortal coward', 'Why are you chirping', 'attack me with your intermittent words quickly', 'If you don\'t have the ability to attack me, don\'t grow things here, son.', 'are you a loser?', 'you tell me. ', ' you attack me with your scattered words. ', ' how can you insult your father and me again and again. ', ' do you think you can defeat me with a little scattered words? ', 'Be careful of your father\'s killing my family', 'get out of here, little brother. Don\'t worry about it', 'I won\'t eat your father\'s', 'what are you doing, don\'t you still move', 'disappear from the earth quickly', 'Why are you still chattering and chattering and chattering', 'don\'t you want to roll away', 'why don\'t you roll away somehow?', 'Are you starting to be unscrupulous?', ' your father and I have seen a lot. Don\'t stay with your mother and dog, OK? ', 'You seem to be rubbish. What\'s your temper? Do you know?', 'do you think you can knock me down in this small online world with your words? ', 'You are just dreaming about how to fight against your father and me, or how to fight against your brother?', 'You know that you\'re rubbish.', 'you don\'t know the fact that I beat you cruelly.', 'you tell me the fact that I beat you cruelly.', 'why don\'t you tell your father about me without speed?', 'why don\'t you tell your father about me', 'why don\'t you tell your father about me', 'why don\'t you get out of here?', 'You disgust your father, I don\'t understand you', 'you don\'t seem to have the level of yourself, but you don\'t understand the situation.', 'I\'ll start with you casually. Why don\'t you admit your own rubbish.', 'I think I\'m your father or how to come out and tell me.', 'you don\'t seem to understand the situation or how to tell everyone.', 'But how can you beat me if you know the situation clearly or how can you beat me?', 'I beat you casually as if they were rebellious', 'I don\'t think you have the ability to resist dad\'s speed at all.', 'I think you\'re a waste product. You don\'t seem to have the cultural understanding.', 'I think you\'re a waste product. How can you resist my speed child?', 'Do you understand? Do you know? Do you understand?', 'do you really think that your illogical and incomplete words can bring you so-called sense of superiority and victory? ', 'Is your vocabulary such a dirty word', 'aren\'t you just a mouth opening and mouth closing mom who is full of thoughts about mom\'s autism?', ' Why are you so incoherent and illogical? ', 'You\'re a garbage brother with no cultural level at all', 'I beat you casually, son, your words and actions don\'t pretend to be clear', 'you garbage speed and I continue to fight right', 'do you really think you can dominate the keyboard industry', 'how can you resist me if you\'re totally garbage like', 'you tell everyone here', 'I can\'t talk about the fact that I beat you casually. How can I tell it?', ' I don\'t think you can start to talk about this rubbish like you.', 'Come out and tell everyone right away. Do you know it completely rubbish like you?', 'you don\'t seem to know the fact that I\'m your father. ', 'You don\'t know the fact that I beat you casually. You tell me the same thing.', 'I\'m like your father. You don\'t know the facts or why you don\'t have some speed.', 'you know, it doesn\'t need any level to beat you mentally retarded garbage.', 'you don\'t seem to have any level to beat you.', 'you don\'t seem to have any level to understand the situation.', 'you know that you don\'t have any level to beat you.', 'you don\'t have speed to run away from me? How are you?', 'You just can\'t resist your father. How can I get out and tell me?', 'I don\'t understand. I think it\'s like I\'m your father. ', 'The crematorium calls to ask your mother how familiar she is. You answer,', ' why don\'t you put a shelter for your family and play games at the dog meat Festival? ', 'You don\'t have a brain or are you mildewed?', ' you answer, ', 'go back to your mother\'s genitals and rebuild yourself as a dog.', 'get out of here, you timid little brother.', 'why don\'t you sit on your mother\'s grave and talk to her slowly?', 'your father and I reward your mother with a leaky urn.', 'I just have a dog farting on the keyboard faster than your hands.', 'Don\'t spray shit, will you? It\'s all over your head. You know what?', ' Dad shoved a bone cleaver into your mother\'s forehead and kicked it to pry open your mother\'s skull. Now your mother\'s brain is flying in the sky. You know what? ', 'I used JB to fool your mother\'s brain. Now your mother boasted that she had a concussion because of her male genitals, ', 'Big dad ripped your son of a bitch\'s ass open with his bare hands and asked your father to put his head in to let your mother\'s shit pin replenish your father\'s biological energy. Do you understand that?', ' don\'t talk to me in that threatening tone. ', 'Do you think you can\'t beat a fool if you scold him a few words?', 'don\'t you be so funny and humorous. ', 'Have you found that all your BB\'s bullshit?', 'I can totally ignore your rubbish language', 'I don\'t think you can resist my flood words', 'you can\'t go back to the sky', 'you can only knock on the keyboard', 'you tell me whether you are crying inside and can\'t go back to the sky', 'why don\'t you think about whether you have the strength to compete with me', 'how boring it is to write with a disabled person for half a day, do you know?', 'Don\'t attack me with your fragmented words.', 'don\'t you think your sparse words are too innocuous?', 'do you want to beat me even if you\'re such a loser?', 'now you\'re a fool talking about fantasy.', 'why can\'t you understand my intention to beat you?', 'why can\'t I help beating you?', 'Are you thinking about how to answer me now?', ' you tell me all about it. ', 'Are you speechless when I hit you?', ' are you in the abyss of disappointment and unable to extricate yourself from the pain. ', 'Do you think you can compete with your elder brother and me just by saying a few words to me?', 'I don\'t want to hit your weak brother any more, ', 'I\'m insulting my Mamba crazy snake keyboard.', ' do you think you can knock me down in the virtual Internet world with your words? ', 'Do you think you can dominate the keyboard world?', 'do you not even have the courage to hit your mother and press the return button?', ' And you are still shaking and losing your focus, ', 'Can you see your father\'s and I\'m attacking you like a flood when your eyes are loose', 'how vulnerable is your crying language in my eyes', 'brother, I trample on your self-esteem and personality at will', 'can you still use your fragmentary language to fight back against me', 'can you speak well? I beg you to improve your toad speed.', 'Will you continue to carry forward your cheeky spirit', 'will you go back and cry with your mother', 'only your mother can comfort you', 'look at your powerless struggle', 'are you going to kneel down and beg me to stop attacking', 'watch how your father teaches you with gorgeous words', 'do you feel unprecedented fear?', 'Is your heart beating for fear of your father\'s speed?', 'brother, are you afraid of me?', 'aren\'t you going away?', 'you can continue to talk to me with your broken language and shameless Kung Fu', 'but what else do you think you have?', 'you are a waste, you know?', 'Can your illogical and incomplete words really bring you happiness and a sense of victory', 'do you want to rush to the reality to find me', 'beat me with your shaking and incomplete hands', 'you can only tear your nth skin to beg me to surround you', 'continue to find excuses to escape me', 'do you cry in your heart now?', 'Talking to you makes me feel a kind of nameless shame', 'I don\'t want to write with the disabled people anymore do you understand', 'why do you forget all the basic words', 'are you nervous', 'your blank brain occasionally thinks about this complex situation', 'do you still want to win me with your words', 'what\'s your situation now?', 'Do you want your father to be merciful', 'are you trying to answer me', 'Why are you dumb', 'why don\'t you dare to type', 'why do you start stuttering when you talk to me', 'why do you still struggle with death', 'do you have to think for half a day before you can utter a word to me', 'How can you be such a loser as no one has ever been before?', 'you really have no medicine to save you. You know what? ', 'Why do you have to teach me how to deal with it in front of me?', ' why do you have to stammer in front of me? ', 'Don\'t you have a sense of shame?', 'your plain language can\'t resist me.', ' I really want to give you a devastating blow, ', 'Your ignorance is just a pile of dirt under my feet. Do you know it?', ' you remember that you should not attack me with your vulgar language in the future. It\'s like letting your father and I define your character. ', 'You don\'t want to see me in a state of fear.', ' you squat in the toilet to see your cowardly image. ', 'I really don\'t know what words to describe your brother, ', 'You can\'t hold your head up in front of your elder brother and me. You know what, younger brother', 'your words are so vulnerable', 'you want to use your words to arouse my anger', 'I just don\'t care to talk nonsense with you. You know what?', 'you don\'t need to pretend to be in front of me in the future.', ' You don\'t feel disgraced if you don\'t have a little power to still brag in front of me.', 'How can you compete with me in your self-confidence', 'your displaced language has been broken by my attack for a long time', 'Do you want me to use these words to describe my most incisive language to you?', 'tell your elder brother that your weak body can bear my sharp language ', ' what\'s your garbage ', ' how to deal with your waste ', ' why do you use such cheap and vulgar language to compete with me? ', 'You can tell me if you\'re a mess.', 'you\'re just waiting for me to deal with you.', 'I can attack you easily with my usual speed of buttoning words.', 'what else can you do?', 'do you want to continue to show me how shameful you are?', 'is it fun to lose face? ', 'Can\'t you die?', 'my language doesn\'t matter to you.', 'Because you\'ve been knocked numb by me for a long time. No.', 'you didn\'t dare to hit me back at all from the beginning. ', 'Your first counterattack was just your instinct, didn\'t you?', 'do you want me to stop your breathing? ', ' I\'m wrong on the keyboard,Your scattered words', 'your hope comes from your occasional flash of inspiration', 'what qualification do you have to talk to me again', 'I\'m not a big hand', 'but I\'ll always be sacred and inviolable in your eyes, you know', 'looking at your sad and funny funny funny, I have a sense of sadness in my heart', 'how did you grow up in the end', 'I really want to say hello to your mother.', 'how did you make such a good living?', 'the century coward who is outstanding and unmatched.', 'you go back to practice for decades and then fight with me.', 'now you don\'t have this ability.', 'you don\'t know that my speed can be completely wiped out. How can you compare with me?', 'How can you talk to me about your angry cowards? How can you be so shameless? how can your loose words match me? how can you hate cowards? how can your words be so cowardly now? ', 'What\'s the matter with you, little brother?', ' how can you talk about your shameless words with me about your angry cowards? ', 'You have the audacity to come to me and brag about how strong your strength is', 'don\'t you really know how to write the word', ' take the buzzwords that have been spread on Baidu a few years ago ', ' how can I not see the meaning in your piecemeal buzzwords ', 'I can wipe out your self-esteem with the highest speed now. Don\'t you know?', ' your speed is comparable to that of me. ', 'Why do you always challenge me to the highest level with your killing power?', 'you think your gouging typing method can defeat my amazing level. ', 'Don\'t think you\'re invincible in the East', 'in fact, you\'re full of money', 'you only have your snail like speed and your crooked words', 'you tell me why you\'re so powerful here', 'you think your disgusting words can hurt your father and me', 'are you just this skill', 'why don\'t you tell your father and me without speed', 'Why do you tell your father I\'m a loser?', ' why don\'t you get out of here? ', 'Why do you disgust your father and me? why do you use your power here? Why are you chirping here? Why are you incoherent? Why do you tell your father I tell me why? why do you live like this?', 'Does it add luster to your ancestors?', 'You see what your poor me put on', 'you tell me', 'I put on everything better than you put on B', 'you don\'t know how embarrassed you are', 'you don\'t know how thick you are underground until your mother and I beat you to the ground', 'now I tell you loser', 'I feel sad for you, do you know', 'you say you want to kill me in a hurry', 'how can you kill me? Little brother ', ' go back to your mother\'s womb to study for a few years and fight with me ', ' what do you do with your might ', ' what do you do with your bullying ', ' you poor thing ', ' you rubbish ', ' I\'ve seen a lot ', ' don\'t be in my parents, OK ', ' I\'ll kneel down ten meters away from you later to know ', ' don\'t always use your loser ', 'It\'s a careless word to live a lifetime', 'it\'s so humiliating to China\'s 1 billion people just like you', 'your language is not fast, you need to learn and education', 'I really feel very sad for your mother', 'you don\'t have to always brag with me', 'you don\'t have to talk with me in that disorderly language, OK?', 'Tell me what\'s wrong with you', 'do you have a deck of cards? Of course not', 'what do you play with me', 'what do you play with me', 'you can\'t keep up with dad\'s flying speed', 'you tell me how your mom brought you to the earth', 'you tell me what\'s wrong with your dad', 'you tell me what\'s wrong with your mom', 'do you know if your mom died', 'Do you know that your father and mother are dead, and you are still in the mood to surf the Internet', 'Why are you so unfilial', 'you tell me it\'s OK', 'why don\'t you tell me', 'you speak it\'s OK', 'are you afraid', 'do you shrink back', 'why don\'t you take out your words to reject my theory', 'Why are you so terrible?', 'My little hand, why are you afraid of me', 'why don\'t you talk', 'don\'t you pretend to be forced or not', 'when you pretend to be me, I\'ll tear your mother up and put it in your mouth', 'are you crying', 'I know you\'re crying', 'you\'re all in tears now, right', 'you tell me', 'are you male or female', 'I\'m your father, you tell me', 'Dad knows you\'re excited', 'Why are you excited', 'are you nervous', 'are you nervous when you meet Dad', 'why do you meet Dad and me', 'because dad is a dog beating expert', 'why does Dad want to beat dogs', 'because you\'re a dog', 'Why are you a dog', 'because your mom didn\'t teach you well', 'why didn\'t you teach well', 'Because your mother is busy selling B', 'why is your mother busy selling B', 'because she wants to earn money to support you', 'why does your mother want to support you', 'why does she want to support you', 'why does she want to raise you as an animal', 'why does she raise you up and you don\'t behave well', 'and run to be a dog? Go home and ask your mother', 'why do so much', 'why do you know exactly why?', 'It\'s because of your dog\'s misfortune', 'don\'t you know what\'s wrong', 'why do you still insist', 'why do you insist', 'why don\'t you return to the original', 'children, do you know, it\'s better to be human', 'to be a low-key online character can be respected by others', 'I know you\'re afraid of me', 'why do you want to be afraid of me', 'Can you not be afraid of me?', 'I don\'t want pride to make people fall back on my father.', 'why do your palms sweat?', 'why do your keyboard get wet?', 'why do you have this phenomenon?', 'are you really nervous?', 'do you feel cold?', 'are you shaking?', 'are you relaxing?', 'your father is very kind. ', 'Don\'t you feel like you\'re running away from me, OK?', 'I don\'t want to leave you, do you know? ', 'Dad has found infinite confidence in you.', ' give him some passion.', ' You let me know how fast you are.', 'how rich the language is. ', 'Why do you run away from me so balabalabala.', ' give me an explanation, I really don\'t want to be talked about as bullying you', 'why do you cry', 'you let me see your tears', 'can you be more mature', 'you even pretend that you don\'t know how powerless you are hitting me', 'do you think you have speed or how you can come out and resist me', 'think you don\'t have speed at all, do you understand or how you can come out?', 'I don\'t think you have any level at all. Do you understand or how you can come out?', 'can you come out and resist me or what you tell me?', 'don\'t you know that you don\'t have speed garbage?', 'don\'t you know that you don\'t have speed garbage?', 'You don\'t have speed at all like a snail, a tortoise and a tortoise. What do you know?', 'don\'t you know that you are the garbage without speed? Did you tell me? ', 'Don\'t you know that you are the garbage without speed? Did you tell me that you can.', ' is it interesting that you can lie to me if you are paralyzed? ', 'Don\'t move, right? Can you make it to the top now? Can you start right now? can you beat me to the top right now? Can you make it to the top now? Can you start right now? What do you mean, Are you angry and gnashing your teeth now', 'can you take your father\'s and my magnificent and sacred language now', 'do you start to chat with your father and me now', 'do you start to bully your father now', 'do you start to be rebellious now', 'do you know that you can only be trampled on the mud under your feet', 'Don\'t you know that your father and my nagging are fantastic', 'what are you shouting with your father now', 'you don\'t understand your speed at all, don\'t you', 'you don\'t know what words you are when your grandmother and grandson talk out', 'I don\'t understand your speed, don\'t you know yourself', 'you\'re incoherent, your mother, B, you\'re a big garbage', 'You\'re totally your mother\'s old basket thing', 'you don\'t know what you are completely, do you? don\'t you think you have no road, no skill, no level, no combat power, no lethality. You don\'t have a word to challenge me, do you, little brother? If you have a little attack power now, I\'ll give you a hand. You can\'t compete with me at all, you know, young man. Are you qualified to let me challenge you now? Are you totally incompetent? Your words are not lethal at all? What are you measuring now? Are you totally incompetent? Are you clear about yourself. You can\'t be compared with my level at all you know', 'you can\'t do anything at all', 'you can\'t do anything now', 'you can\'t do anything with your grandmother\'s legs', 'you can still be compared with each other', 'you don\'t have the speed at all, if you don\'t have the fighting power at all, you can\'t attack anything at all', 'you don\'t know what\'s your speed at all', 'What are you talking about now?',
	'I fucked your life', 'Go die mothafucker', 'I would not play on a server that allows to teleport...', 'You insulting a hacker? Kid...', 'Ur mad because someone is cheating in a blockgame? Ur just sad...', 'Even minecraft said your to bad lmao', 'Why Jartex is allowing this? I don\'t know, ask the staff! xD', 'Ur asking for my client even if your legit?! That means im just to good for you...', 'Hacks > Legit', 'Haha lmao you got killed by a hacker... Whose fault is this? The servers or mine xd'];

var AdL = ['u got killed? Watch this:', 'ha u bad! Your reward:', 'man ur bad! Here your price:', 'you can\'t complain:', 'now i know why everyone saying ur bad:', 'watch thizz:', 'quality content!', 'dont waste your time! Watch this instead:', 'tryharding < hacking... so watch this:', 'jartex isn\'t worth it...:', 'anticheat doin great isn\'t it?:'];

var HF = ['im not hacking im just testing anticheats. ALL 100% HARAM FREE!', 'sigma best client 100% HARAM FREE', 'all other CLIENTS 100% HARAM - ONLY SIGMA BEST', '10000% Haram Free hacks all legit proof', 'sigma best client 2021 virus free no BTC miner', 'sigma user is haram free download now the best sex client'];

var SAUCE = ['oh sorry bro! Watch dizz: https://wimg.rule34.xxx//images/4073/b7955655243cc132a3858dd4903b5cb9.jpeg?4624848', 'ohh you got killed? Need sum sauce? https://hanime.tv/videos/hentai/green-eyes-ane-kyun-yori-1', 'mhhmmm... i see. Just relax: https://nhentai.net/g/275085/1/', 'mhm a doctor won\'t help anymore.. try this: https://nhentai.net/g/174820/15/', 'someone said once, milfs are best: https://hanime.tv/videos/hentai/amanee-1', 'sometimes wholesum content helps... https://hanime.tv/videos/hentai/kimi-ga-suki-2', 'u need to calm down okay? Try this maybe: https://hanime.tv/videos/hentai/ane-wa-yanmama-junyuu-chuu-1', 'sometimes you just need that: https://rule34.xxx//samples/4077/sample_4d55d7241e6d55e82fc5b89f08d4808b.jpg?4629898', 'probably you just read? Read this? :3 https://nhentai.net/g/355273/'];


	var target;
	var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');

	script.registerModule({
		name: "JartexL",
		description: "Sending sex automaticly",
	    category: "Fun",
	    tag: "JS",
		settings: {
	        Mode: Setting.list({
	            name: "LMode",
	            default: "Normal",
	            values: ["Normal","Advertise", "HaramFree", "Sauce (NFSW 18+ or smth)"]
	        }),
	        X: Setting.boolean({
	            name: " ",
	            default: false
			}),
	        Help: Setting.boolean({
	            name: "How to set my URL?",
	            default: false
			}),
	        ad: Setting.text({
	            name: "URL",
	            default: ""
	        }),
		}

	}, function (module) {
		module.on("enable", function () {
			target = null;
	    })
		module.on("attack", function (event) {
			if(event.getTargetEntity() instanceof EntityPlayer){
				target = event.getTargetEntity();
			}
	    })
	    module.on("packet", function (e) {
	    var packet = e.getPacket();
	    })
		module.on("update", function () {
	        if (target != null) {
	            if (target.isDead) {
	            	        if (module.settings.Mode.get() == "Normal") {
	                        mc.thePlayer.sendChatMessage("!L "+target.getName()+" "+EnglishWords[parseInt(Math.random()*EnglishWords.length)] );	
	            	        }
	            	        if (module.settings.Mode.get() == "Advertise") {
		                    mc.thePlayer.sendChatMessage("! "+target.getName()+" "+AdL[parseInt(Math.random()*AdL.length)]+" "+module.settings.ad.get() );		
	            	        }
	            	        if (module.settings.Mode.get() == "HaramFree") {
	            	        mc.thePlayer.sendChatMessage("! "+target.getName()+" "+HF[parseInt(Math.random()*HF.length)] );		
	            	        }
	            	        if (module.settings.Mode.get() == "Sauce (NFSW 18+ or smth)") {
		            	    mc.thePlayer.sendChatMessage("! "+target.getName()+" "+SAUCE[parseInt(Math.random()*SAUCE.length)] );		
	            	        }
	                    }
	                }
	        target = null;
	        
	        if (module.settings.Help.get()) {
	        Chat.print(" ");
	        Chat.print("To set ad URL:");	
	        Chat.print("set the URL in settings!");
	        Chat.print(" ");
	        Chat.print("Example: .JartexL URL https://hanime.tv/");
	        Chat.print(" ");
	        module.settings.Help.set(false);
	        }
	    })
	})

var SL = ['login'];
var SR = ['register'];
var sendReminder;

script.registerModule({
    name: "JartexRegister",
    description: "Makes your register on jartex also login ok",
    category: "Fun",
    tag: "JS",
    settings: {
        pw: Setting.text({
            name: "Password",
            default: ""
        }),
        r: Setting.boolean({
            name: "Reminder",
            default: false
		}),
    }

}, function (module) {
    module.on("enable", function () {
    if (module.settings.pw.get() == "Potato" && module.settings.r.get()) {
    Chat.print(" ")
    Chat.print("Password is set to ?c?ldefault")
    Chat.print("Change it with: .JartexRegister Password")
    Chat.print(" ")
    }
    });
    module.on("disable", function () {

    });
    module.on("packet", function (event) {
    var packet = event.getPacket();
    if (packet instanceof HentaiPacket) {
    if(packet.getChatComponent().getUnformattedText().contains(SR[parseInt(Math.random()*SR.length)])) {
    mc.thePlayer.sendChatMessage("/register " +module.settings.pw.get() + " " +module.settings.pw.get() );
    }
    if(packet.getChatComponent().getUnformattedText().contains(SL[parseInt(Math.random()*SL.length)])) {
    mc.thePlayer.sendChatMessage("/login " +module.settings.pw.get() );
    }
    }
    });
    module.on("update", function () { 
    sendReminder = false;	
    });
});

var Y;
var isBoost;
var isBoat;
var sneakPossible;

script.registerModule({
    name: "MatrixFlyz",
    description: "Makes your dick hard so you can fly in air",
    category: "Fun",
    tag: "JS",
    settings: {
		Mode: Setting.list({
			name: "Mode",
			default: "MatrixBoat",
			values: ["MatrixBoat", "JartexOld"]
		}),
		Y: Setting.float({
			name: "BoatY",
			default: 0.65,
			min:0.5,
			max:5
		}),
		Boost: Setting.float({
			name: "Boost",
			default: 4.5,
			min:0.5,
			max:10
		}),
        UseTimer: Setting.boolean({
            name: "UseTimer (Only for old fly)",
            default: false
		}),
	    SneakStop: Setting.boolean({
	        name: "SneakStop",
	        default: true
        }),
	    Latest: Setting.boolean({
	        name: "LatestMatrix",
	        default: false
        }),
    }

}, function (module) {
    module.on("enable", function () {
    if (module.settings.Mode.get() == "JartexOld" && mc.thePlayer.onGround) {
    mc.thePlayer.jump();
    }
    if (module.settings.Mode.get() == "Jartex") {
    mc.timer.timerSpeed = 0.3;	
    mc.thePlayer.jump();
    }
    isBoat = false;
    isBoost = false;
    Y = false;
    sneakPossible = false;
    });
    module.on("disable", function () {
    isBoat = false;
    isBoost = false;
    mc.thePlayer.speedInAir = 0.02;
    mc.timer.timerSpeed = 1;
    });
    module.on("packet", function (e) {
    var packet = e.getPacket();
    if (Y == true) {
    if (module.settings.Latest.get()) {
    mc.thePlayer.sendQueue.addToSendQueue(new C03(true));
    }	
    }
    if (Y == true) {
    if (packet instanceof C04) {
    e.cancelEvent();	
    }	
    }
    });
    module.on("update", function () {
    if (module.settings.Mode.get() == "MatrixBoat") {
    if (mc.thePlayer.isRiding()) {
    isBoat = true;
    isSneak = true;
    mc.gameSettings.keyBindSneak.pressed = true;
    } else {	
    if (isBoat == true) {
    mc.gameSettings.keyBindSneak.pressed = false;
    mc.thePlayer.motionY = module.settings.Y.get()
    mc.timer.timerSpeed = 0.1;
    isBoat = false;
    isBoost = true;
    }
    if (isBoost == true) {
    sneakPossible = true;	
    mc.timer.timerSpeed = 1;
    if (module.settings.Latest.get() == false) {
    var dir = Math.rad(mc.thePlayer.rotationYaw);
    mc.thePlayer.motionX += -Math.sin(dir) * module.settings.Boost.get()
    mc.thePlayer.motionZ += Math.cos(dir) * module.settings.Boost.get()	
    }
    if (module.settings.Latest.get() == true) {
    if (module.settings.Boost.get() < 3.35) {
    var dir = Math.rad(mc.thePlayer.rotationYaw);
    mc.thePlayer.motionX += -Math.sin(dir) * module.settings.Boost.get()
    mc.thePlayer.motionZ += Math.cos(dir) * module.settings.Boost.get()		
    }	
    }
    isBoost = false;
    }
    }
    if (sneakPossible == true && module.settings.SneakStop.get() == true) {
    if (mc.gameSettings.keyBindSneak.pressed) {
    mc.thePlayer.motionX = 0;
    mc.thePlayer.motionZ = 0;
    sneakPossible = false;
    }	
    }
    if (module.settings.Latest.get() == true) {
    if (module.settings.Boost.get() > 3.36) {
    Chat.print("On latest matrix the boost maximum is 3.35!");
    module.settings.Boost.set(3.35);
    }
    }
    }
    
    if (module.settings.Mode.get() == "JartexOld") {
    if (mc.thePlayer.fallDistance > 1) {
    Y = true;	
    if (!mc.gameSettings.keyBindJump.pressed) {
    mc.thePlayer.motionY = 0.405;
    }
    if (mc.gameSettings.keyBindJump.pressed) {
    mc.thePlayer.motionY = 0.65;	
    }
    mc.thePlayer.fallDistance = 0;
    }
    if (mc.gameSettings.keyBindSneak.pressed) {
    mc.thePlayer.fallDistance = 0;	
    }
    Y = false;
    if (module.settings.UseTimer.get()) {
    mc.timer.timerSpeed = 1.05;	
    }
    }
    });
});

script.registerModule({
    name: "TPAddon",
    description: "It lets you teleport on matrix on all Y cords (no longer important wich y u select!!! :D)",
    category: "Fun",
    tag: "JS",
    settings: {
	    Mode: Setting.list({
			name: "Mode",
			default: "Exploit",
			values: ["Exploit", "Slab", "Old"]
		}),
	    Sex: Setting.boolean({
	        name: "Wich blocks are possible to exploit?",
	        default: false
        }),
    }

}, function (module) {
    module.on("enable", function () {
    });
    
    module.on("disable", function () {
    mc.timer.timerSpeed = 1;
    });
    module.on("packet", function (e) {
    var packet = e.getPacket();
    });
    module.on("update", function () {	
    	
    if (module.settings.Sex.get()) {
    module.settings.Sex.set(false);
    Chat.print(" ");
    Chat.print("?List of blocks and other:");
    Chat.print(" ");
    Chat.print("Ladder, Web, Boat");
    Chat.print(" ");
    }	
    	
    if (module.settings.Mode.get() == "Slab") {
    if (mc.theWorld.getBlockState(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY - 0.1, mc.thePlayer.posZ)).getBlock() == Block.getBlockById(126) && mc.gameSettings.keyBindSneak.pressed && Teleport.getState() == true) {
    mc.timer.timerSpeed = 1;	
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 0.1, mc.thePlayer.posZ, true));
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 0.1, mc.thePlayer.posZ, true));
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 0.1, mc.thePlayer.posZ, true));
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 0.1, mc.thePlayer.posZ, true));
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 100, mc.thePlayer.posZ, true));
    } else {
    if (Teleport.getState() == true && mc.gameSettings.keyBindSneak.pressed) {	
    mc.timer.timerSpeed = 1;
    Teleport.setState(false);
    Chat.print("Arrived or wrong Block/Entity!");
    }
    }
    
    if (!mc.gameSettings.keyBindSneak.pressed) {
    mc.timer.timerSpeed = 1;	
    }
    }
    
    if (module.settings.Mode.get() == "Old") {
    if (Teleport.getState() == true && mc.gameSettings.keyBindSneak.pressed) {
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 15, mc.thePlayer.posZ, false));
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 1, mc.thePlayer.posZ, true));
    }	
    }
    
    if (module.settings.Mode.get() == "Exploit") {
    if (mc.thePlayer.isRiding() || mc.thePlayer.isInWeb || mc.thePlayer.isOnLadder()) {
    if (Teleport.getState() == true && mc.gameSettings.keyBindSneak.pressed) {	
    if (mc.thePlayer.isRiding()) {	
    mc.timer.timerSpeed = 7;
    } else {	
    mc.timer.timerSpeed = 1;	
    }
    
    if (mc.thePlayer.isRiding()) {	
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 100, mc.thePlayer.posZ, true));
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 0.1, mc.thePlayer.posZ, false));
    }
    
    if (mc.thePlayer.isOnLadder()) {
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 100, mc.thePlayer.posZ, false));
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 100, mc.thePlayer.posZ, false));
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 100, mc.thePlayer.posZ, false));
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 100, mc.thePlayer.posZ, false));
    }
    
    if (mc.thePlayer.isInWeb) {
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX + r(-0.1,0.1), mc.thePlayer.posY, mc.thePlayer.posZ + r(-0.1,0.1), true));
    
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY - 0.1, mc.thePlayer.posZ, true));
    
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 20, mc.thePlayer.posZ, true));
    }
    }
    } else {	
    if (mc.gameSettings.keyBindSneak.pressed && Teleport.getState() == true) {
    Teleport.setState(false);
    Chat.print("Arrived or wrong Block/Entity!");
    }
    mc.timer.timerSpeed = 1;	
    }
    }
    }); 
});

var combat;

script.registerModule({
    name: "MatrixSpeedz",
    description: "makes you fast af (feels like you turn black)",
    category: "Fun",
    tag: "JS",
    settings: {
		M: Setting.list({
			name: "Mode",
			default: "TimerHop",
			values: ["TimerHop", "Test"]
		}),
    }

}, function (module) {
    module.on("enable", function () {

    });
    module.on("packet", function (e) {
    var packet = e.getPacket();	
    });
    module.on("disable", function () {
    mc.timer.timerSpeed = 1;
    mc.thePlayer.speedInAir = 0.02;
    });
    module.on("update", function () {

    if (module.settings.M.get() == "TimerHop") {
    if (mc.thePlayer.onGround && thePlayer.isMoving()) {
    combat = false;	
    if (combat == false) {	
    mc.thePlayer.speedInAir = 0.0204;	
    mc.timer.timerSpeed = 0.65;
    } else {
    mc.thePlayer.speedInAir = 0.02
    mc.timer.timerSpeed = 1;
    }
    mc.gameSettings.keyBindJump.pressed = true;
    } else {
    mc.timer.timerSpeed = 1;	
    mc.gameSettings.keyBindJump.pressed = false;
    }
    	
    if (thePlayer.isMoving() && combat == false) {
    if (mc.thePlayer.fallDistance < 0.1) {
    mc.timer.timerSpeed = 1.81;
    }
    if (mc.thePlayer.fallDistance > 0.2) {
    mc.timer.timerSpeed = 0.42;
    }
    if (mc.thePlayer.fallDistance > 0.6) {
    mc.timer.timerSpeed = 1.05;
    mc.thePlayer.speedInAir = 0.02019
    }
    }
    
    if (mc.thePlayer.fallDistance > 1) {
    mc.timer.timerSpeed = 1;
    mc.thePlayer.speedInAir = 0.02;
    }
    }
    
    if (module.settings.M.get() == "Test") {
    }
    });
    module.on("attack", function () {
    if (mc.thePlayer.hurtTime > 0 && module.settings.M.get() == "TimerHop") {
    mc.timer.timerSpeed = 1
    mc.thePlayer.speedInAir = 0.02
    combat = true;
    }
    });
});

var falseground;
var waitFlag;
var hasFallen;

script.registerModule({
    name: "MatrixNoFallz",
    description: "Shitty dmg reducer",
    category: "Fun",
    tag: "JS",
    settings: {
		NM: Setting.list({
			name: "Mode",
			default: "Normal",
			values: ["Normal", "MatrixPremium"]
		}),
		M: Setting.list({
			name: "SetBackAction",
			default: "wait",
			values: ["wait", "disable"]
		}),
        c: Setting.boolean({
            name: "SetBackCheck",
            default: false
		}),
        nomove: Setting.boolean({
            name: "NoMove",
            default: true
		}),
    }

}, function (module) {
    module.on("enable", function () {
    hasFallen = false;
    waitFlag = false;
    falseground = false;
    Chat.print("?8?l[?c?lJS?8?l]?7 This sadly only reduces your falldmg!");
    });
    module.on("disable", function () {
    hasFallen = false;
    mc.timer.timerSpeed = 1;
    });
    module.on("packet", function (e) {
    var packet = e.getPacket();
    
    if (module.settings.NM.get() == "MatrixPremium") {
    if (falseground == true) {
    if (packet instanceof C03) {
    packet.onGround = false;	
    }	
    }
    }
    
    if (module.settings.NM.get() == "Normal") {
    if (hasFallen == true && waitFlag == false) {
    if (packet instanceof C03) {	
    packet.onGround = false;
    mc.timer.timerSpeed = 1;
    if (mc.thePlayer.ticksExisted % 5 == 0) {
    packet.onGround = true;
    packet.onGround = true;
    }
    }
    } 
    }
    });
    module.on("update", function () {	
    	
    if (module.settings.NM.get() == "Normal") {	
    if (mc.thePlayer.onGround) {	
    flagCheck = mc.thePlayer.posY;
    } 
    
    if (mc.thePlayer.fallDistance > 4) {
    hasFallen = true;	
    mc.gameSettings.keyBindLeft.pressed = false;
    mc.gameSettings.keyBindRight.pressed = false;
    mc.gameSettings.keyBindBack.pressed = false;
    mc.gameSettings.keyBindForward.pressed = false;
    }
    
    if (hasFallen == true && !mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY - 0.1,mc.thePlayer.posZ))) {
    mc.timer.timerSpeed = 1;	
    hasFallen = false;
    }
    
    if (mc.thePlayer.posY == flagCheck && hasFallen == true && module.settings.c.get()) {
    if (mc.thePlayer.ticksExisted % 2 == 0) {	
    Chat.print(" ")	
    Chat.print("Detected a setback!");
    Chat.print(" ");
    }
    hasFallen = false;
    if (module.settings.M.get() == "disable") {
    module.setState(false);	
    }
    if (module.settings.M.get() == "wait") {
    waitFlag = true;	
    }
    }
    
    if (module.settings.M.get() == "wait" && waitFlag == true) {
	if (mc.thePlayer.ticksExisted % 700 == 0) {	
	waitFlag = false;
    Chat.print(" ");
    Chat.print("You can use NoFall again!");
    Chat.print(" ");
	}
    }
    }
    
    if (module.settings.NM.get() == "MatrixPremium") {
    if (mc.thePlayer.fallDistance > 4 && mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY - 0.1,mc.thePlayer.posZ))) {
    falseground = true;	
    }
    
    if (falseground == true && module.settings.nomove.get() && mc.thePlayer.fallDistance > 4 && !mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY - 10,mc.thePlayer.posZ))) {
    mc.gameSettings.keyBindBack.pressed = false;
    mc.gameSettings.keyBindRight.pressed = false;
    mc.gameSettings.keyBindLeft.pressed = false;
    mc.gameSettings.keyBindJump.pressed = false;	
    mc.gameSettings.keyBindForward.pressed = false;
    mc.thePlayer.motionX = 0;
    mc.thePlayer.motionZ = 0;
    }
    
    if (falseground == true && !mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX,mc.thePlayer.posY - 0.1,mc.thePlayer.posZ)) && !mc.thePlayer.isInWeb && !mc.thePlayer.isInWater() && !mc.thePlayer.isOnLadder()) {
    mc.thePlayer.sendQueue.addToSendQueue(new C05(mc.thePlayer.rotationYaw, 91, false));
    if (mc.thePlayer.ticksExisted % 5 == 0 && mc.thePlayer.fallDistance < 80) {
    falseground = false;
    }
    if (mc.thePlayer.ticksExisted % 20 == 0 && mc.thePlayer.fallDistance > 81) {
    falseground = false;	
    }
    }
    }
    });
});

//14ms reminded me that this shit works okkk

script.registerModule({
    name: "FastClimbz",
    description: "Climbs you fast on ladders bc sex",
    category: "Fun",
    tag: "JS",
    settings: {
		M: Setting.list({
			name: "Mode",
			default: "Teleport",
			values: ["Teleport", "Motion"]
		}),
		TPDistance: Setting.float({
			name: "TPDistance",
			default: 0.3,
			min:0.1,
			max:0.31
		}),
		MotionY: Setting.float({
			name: "MotionY",
			default: 3,
			min:1,
			max:3.6
		}),
    }

}, function (module) {
    module.on("enable", function () {

    });
    module.on("disable", function () {

    });
    module.on("packet", function (e) {
    var packet = e.getPacket();
    if (packet instanceof C03 && mc.thePlayer.isOnLadder() && mc.thePlayer.motionY > 0) {
    packet.onGround = true;
    }
    });
    module.on("update", function () {
    if (module.settings.M.get() == "Teleport") {
    if (mc.thePlayer.isOnLadder() && mc.gameSettings.keyBindForward.pressed && !mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY + 0.1, mc.thePlayer.posZ)) && mc.thePlayer.motionY > 0) {
    vClip(module.settings.TPDistance.get())
    } 	
    }
    
    if (module.settings.M.get() == "Motion") {
    if (mc.thePlayer.isOnLadder() && mc.gameSettings.keyBindForward.pressed && !mc.theWorld.isAirBlock(new BlockPos(mc.thePlayer.posX, mc.thePlayer.posY + 0.1, mc.thePlayer.posZ)) && mc.thePlayer.motionY > 0) {
    mc.thePlayer.motionY *= module.settings.MotionY.get()
    }
    }
    });
});

var jump;

script.registerModule({
    name: "LongJumpzz",
    description: "Left click + web = disable matrix lmao",
    category: "Fun",
    settings: {
		XZBoost: Setting.float({
			name: "XZBoost",
			default: 4.7,
			min:0.5,
			max:5
		}),
		YBoost: Setting.float({
			name: "YBoost",
			default: 1,
			min:0.5,
			max:4
		}),
    }

}, function (module) {
    module.on("enable", function () {
    jump = 0
    });
    module.on("disable", function () {
    });
    module.on("update", function () {
    if (mc.thePlayer.onGround) {	
    mc.thePlayer.motionY = module.settings.YBoost.get()
    setYeet(module.settings.XZBoost.get())
    jump = 1
    }
    
    if (jump == 1 && mc.thePlayer.onGround) {
    module.setState(false)	
    jump = 0;
    }
    });
});

var send;
var targetX;
var targetY;
var targetZ;

script.registerModule({
    name: "WebTP",
    description: "Nutting in cats is illegal",
    category: "Fun",
    settings: {}

}, function (module) {
    module.on("enable", function () {
    send = false;
    Reach.setState(true);
	moduleManager.getModule("Reach").getValue("buildreach").set(500);
	moduleManager.getModule("Reach").getValue("combatreach").set(moduleManager.getModule("KillAura").getValue("Range").get());
    });
    module.on("disable", function () {
    Reach.setState(false);
    });
    module.on("packet", function (e) {
    var packet = e.getPacket();	
    if (send == true && packet instanceof C04 && mc.thePlayer.isInWeb) {
    packet.x = targetX
    packet.y = targetY+1
    packet.z = targetZ
    }
    });
    module.on("update", function () {	
    	
    if (!mc.thePlayer.isInWeb) {
    module.setState(false);
    Chat.print("You are not in a Web");
    }	
    
    if (mc.thePlayer.posX == targetX && mc.thePlayer.posZ == targetZ && mc.thePlayer.posY == targetY+1) {
    module.setState(false);
    send = false;
    }
    });
    module.on("clickBlock", function (e) {
    if (send == false) {	
    tp = e.getClickedBlock();		
    targetX = tp.getX();
    targetY = tp.getY();
    targetZ = tp.getZ();
    send = true;
    }
    });
});
