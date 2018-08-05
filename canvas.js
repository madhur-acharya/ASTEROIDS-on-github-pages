window.addEventListener("load", ready);
window.onerror= (function()
	{
		/*console.log("explosions stack", explosions_stack.length);
		console.log("enemies stack", enemies.length);
		console.log("asteroid stack", asteroids.length);
		console.log("bullet_stack stack", bullet_stack.length);
		/*if(window.confirm("WHOOPS!.. Unfortunately your game has crashed. press OK! to reset"));
			location.reload();
		ani_id= requestAnimationFrame(animate);*/
	});
document.getElementById("pause").addEventListener("click", pause);

var an_flag= false, ani_id, context, game_music;

//var width= document.getElementById("my_canvas").width= "1336";
var width= document.getElementById("my_canvas").width= window.innerWidth;
var height= document.getElementById("my_canvas").height= window.innerHeight;

var background= document.getElementById('game_background'),
	ship_img1= document.getElementById('ship_img1');
	ship_img2= document.getElementById('ship_img2');
	ship_img3= document.getElementById('ship_img4');
	enemy_img1= document.getElementById('enemy_img1');
	asteroid_img1= document.getElementById('asteroid_img1');

function pause()
{	
	an_flag= !an_flag;
	switch(an_flag)
	{
		case true: 
		{
			cancelAnimationFrame(ani_id); 
			console.log("paused!"); 
			context.save();
			context.scale(1, -1);
			context.fillStyle = "white";
			context.font = "50px impact";
			context.textAlign = "center";
			context.fillText("PAUSED!", 0, -100);
			context.restore();
			background_music.pause();
			window.alert("paused");
			break;
		}
		case false: 
		{
			ani_id= requestAnimationFrame(animate); 
			console.log("playing!"); 
			background_music.play();
			break;
		}
	}
}

function ready()
{
	context= document.getElementById("my_canvas").getContext("2d");
	console.log("begin animation!");
	context.translate(width / 2, height / 2);
	context.transform(1, 0, 0, -1, 0, 0)
	//context.transform(1, 0, 0, -1, 0, canvas.height)  for cartecian cordinate system with origin at bottom left of screen

	document.body.addEventListener("keydown", keydown_get_key);
	document.body.addEventListener("keyup", keyup_get_key);

	ani_di= requestAnimationFrame(intro);
}
