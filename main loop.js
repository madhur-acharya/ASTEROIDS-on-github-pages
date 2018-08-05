function initilize()
{
	enemy_spawn_timer= setInterval(spawn_new_enemies, 3000);
	asteroid_spawn_timer= setInterval(spawn_new_asteroids, 1500);
	powerup_spawn_timer= setTimeout(spawn_powerup, 5000);
	ship_movemt= new timer(); 
	background_music.play();

	ani_id= requestAnimationFrame(animate);
}

function animate(timestamp)
{
	delta= calculate_framerate(timestamp);
	context.lineWidth= 3;
	context.fillStyle= "black";
	context.fillRect(-width / 2, -height / 2, width, height);
	
	render_bullets();
	draw_asteroid(asteroids);
	ship_controler(ship2);
	render_enemies();
	check_ship2asteroid_collision();
	check_ship2enemy_collision();
	check_bullet2asteroid_collision();
	check_bullet2enemy_collision();
	check_enemy2asteroid_collosion();
	explode();
	handle_powerup();
	scoreboard();

	if(an_flag == false)
		ani_id= requestAnimationFrame(animate);
}
