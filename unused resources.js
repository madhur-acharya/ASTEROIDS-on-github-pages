function spawn_new_enemies()
{
	if(enemy_spawn_delay.get_duration() >= 4000)
	{
		let dir= (Math.random() * 360) * Math.PI / 180,
		a= (width / 2) * Math.cos(dir),
		b= (width / 2) * Math.sin(dir);

		let enemy= new particle(a, b, dir, Math.random() * 3, 15);
		enemies.push(enemy);
		enemy_spawn_delay.reset();
	}
}

function spawn_new_asteroids()
{
	if(asteroid_spawn_delay.get_duration() >= 1500)
	{
		let dir= (Math.random() * 360) * Math.PI / 180,
			a= (ship2.position.get_mag() + 400) * Math.cos(dir),
			b= (ship2.position.get_mag() + 400) * Math.sin(dir);

		let ast= new asteroid(a, b, dir, Math.random() * 2, Math.random() * 60 + 10, Math.random() * 15 + 10);
		asteroids.push(ast);
		asteroid_spawn_delay.reset();
	}	
}

function spawn_powerup()
{
	let pow;
	if(powerup_delay() >= 30000)
	{
		pow= new particle((Math.random() * width / 2) - (Math.random() * width / 2), (Math.random() * height / 2) - (Math.random() * height / 2));
		powerup_stack.push(pow);
		powerup_delay= powerup_timer();
	}

	for(let i= powerup_stack.length - 1; i >= 0; i--)
	{
		context.beginPath();
		context.fillStyle= "orange";
		context.arc(powerup_stack[i].position.dx, powerup_stack[i].position.dy, 20, 0, Math.PI * 2);
		context.fill();
	}
}

function end_game()
{
	if(asteroids.length === 0 && enemies.length === 0)
	{
		context.fillStyle= "black";
		context.fillRect(-width / 2, -height / 2, width, height);
		pause()
		context.save();
		context.scale(1, -1);
		context.fillStyle = "white";
		context.font = "50px impact";
		context.textAlign = "center";
		context.fillText("Congratulations!!!", 0, -90);
		context.fillText("You Beat The Game.", 0, -30);
		context.fillText(score, 0, 50);
		context.restore();
		cancelAnimationFrame(ani_id);
		setInterval(function()
		{
			if(window.confirm("play again?"))
			location.reload();
		}, 5000);
	}
}


enemy_spawn_timer.reset();
asteroid_spawn_timer.reset();
powerup_spawn_timer.reset();

var enemy_spawn_timer= new timer();
	asteroid_spawn_timer= new timer();
	powerup_spawn_timer= new timer();

var background_music= document.createElement("audio");
	background_music.src= 'resources/sound/background music.mp3';
	background_music.loop= true;

var bullet_sound= document.createElement("audio");
    bullet_sound.src= 'resources/sound/bullets 3.wav';

var asteroid_explosion_1= document.createElement("audio");
	asteroid_explosion_1.src= 'resources/sound/asteroid explosion 1.wav';

var asteroid_explosion_2= document.createElement("audio");
	asteroid_explosion_2.src= 'resources/sound/asteroid explosion 2.wav';

var enemy_explosion_1= document.createElement("audio");
	enemy_explosion_1.src= 'resources/sound/enemy explosion 1.wav';

var powerup_1= document.createElement("audio");
	powerup_1.src= 'resources/sound/powerup 1.wav';

var ship_movement_sound= document.createElement("audio");
	ship_movement_sound.src= 'resources/sound/ship movement sound.wav';

var game_over_sound= document.createElement("audio");
	game_over_sound.src= 'resources/sound/game over.mp3';

var bulletsplosion_sound= document.createElement("audio");
	bulletsplosion_sound.src= 'resources/sound/bulletsplosion.wav';

var shield_collision= document.createElement("audio");
	shield_collision.src= 'resources/sound/shield collision.wav';
