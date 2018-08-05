
var number_of_asteroids= Math.round(Math.random() * 10) + 10,
	ship_movemt,
	controls_display_timer,
	controls_display_counter= 6,
	enemy_spawn_timer,
	asteroid_spawn_timer,
	powerup_spawn_timer,
	bullet_delay= new timer(),
	delta= 0,
	explosions_stack= [],
	number_of_enemies= 0, 
	enemies= [],
	bullet_stack= [], 
	asteroids= [], 
	thrust_angle= 0,
	score= 0,
	powerup= undefined,
	difficulty_setting= 1,
	score_multiplier= 1,
	powerup_active= false,
	deploy_shield= false,
	explosion_clock= [],
	pow_timeout= 10,
	dt,
	pow_type= "",
	heigh_score= {},
	save_flag= false,
	http;

for(var j= 0; j < number_of_asteroids; j++)
{
	let aa= new asteroid(((Math.random() * width / 2) + 500) * Math.cos((Math.random() * 360) * Math.PI / 180), ((Math.random() * height / 2) + 500) * Math.sin((Math.random() * 360) * Math.PI / 180), (Math.random() * 360) * Math.PI / 180, Math.random() * 2, Math.random() * 60 + 10, Math.random() * 15 + 10);
		asteroids.push(aa);
}

for(var e= 0; e < number_of_enemies; e++)
{
	var dir= (Math.random() * 360) * Math.PI / 180,
	a= (width / 2) * Math.cos(dir),
	b= (width / 2) * Math.sin(dir);

	var enemy= new particle(a, b, Math.PI / 2, Math.random() * 3, 12);
	enemies.push(enemy);
}

var ship2= new spaceShip(0, 0, 0, 0, 0, 0.99, 15);
