function draw_spaceship(pos, ang, th)
{
	context.save();
	context.translate(pos.dx, pos.dy);
	context.rotate(ang);	
	context.beginPath();
	if(deploy_shield === true)
		context.fillStyle= getRandomColor();
	else
		context.fillStyle= "white";
	context.moveTo(25, 0);
	context.lineTo(-10, -15);
	context.lineTo(0, 0);
	context.lineTo(-10, 15);
	context.lineTo(25, 0);
	context.fill();
	if(th)
	{
		context.strokeStyle= "red";
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(-10, 3);
		context.moveTo(0, 0);
		context.lineTo(-10, -3);
		context.moveTo(0, 0);
		context.lineTo(-15, 0);
		context.stroke();
	}
	context.restore();
}

function ship_controler(space_ship)
{
	var thrusting= false, braking= false;

	if(shoot === true)
	{
		if(bullet_delay.get_duration() / 1000 >= space_ship.fire_rate)
		{
			bullet_sound.play();
			create_bullets(space_ship.bullets_type);
			bullet_delay.reset();
		}
	}

	if(up === true)
	{
		if(ship_movemt.get_duration() > 450)
		{
			ship_movement_sound.play();
			ship_movemt.reset();
		}
		space_ship.acceleration.set_mag(0.1);
		space_ship.acceleration.set_angle(thrust_angle);
		thrusting= true;
		braking= false;
	}
	else if(down === true)
	{
		space_ship.acceleration.set_mag(0);
		space_ship.velocity.multiply(0.95);
		braking= true;
		thrusting= false;
	}
	else
	{
		space_ship.acceleration.set_mag(0);
		space_ship.apply_friction();
		thrusting= false;
	}

	if(right === true)
	{
		//thrust_angle= thrust_angle - (Math.PI / 360) * 5  * (60 / delta);
		thrust_angle= thrust_angle - 0.05  * (60 / delta);
		space_ship.acceleration.set_angle(thrust_angle);
		
	}

	else if(left === true)
	{
		//thrust_angle= thrust_angle + (Math.PI / 360) * 5  * (60 / delta);
		thrust_angle= thrust_angle + 0.05  * (60 / delta);
		space_ship.acceleration.set_angle(thrust_angle);
	}

	space_ship.accelerate();
	space_ship.update_pos();
	wrapp_around(ship2);
	draw_spaceship(space_ship.position, thrust_angle, thrusting);

	/*if(thrusting || braking)
		draw_vector(space_ship.position, space_ship.acceleration, "blue");
	draw_vector( space_ship.position, space_ship.velocity, "green");	
	draw_bounding_circle(space_ship);*/
	if(deploy_shield === true)
		draw_bounding_circle(space_ship);
}

function enemy_AI(AI, player)
{
	var theta= Math.atan2(player.position.dy - AI.position.dy, player.position.dx - AI.position.dx);	
	AI.velocity.set_angle(theta);
	AI.update_pos();
	//draw_vector(AI.position, AI.velocity, color= "purple");
}

function render_enemies()
{
	for(let i= 0; i < enemies.length; i++)
	{
		enemy_AI(enemies[i], ship2);

		context.beginPath();
		context.fillStyle= "#334353";
		context.strokeStyle= "white";
		context.save();
		context.translate(enemies[i].position.dx, enemies[i].position.dy);
		context.rotate(enemies[i].velocity.get_angle() - Math.PI / 2);
		context.arc(0, 0, enemies[i].size, 0, Math.PI * 2);
		context.moveTo(-(enemies[i].size), 0);
		context.lineTo(-(enemies[i].size * 1.5), -enemies[i].size * 2.5);
		context.moveTo((enemies[i].size), 0);
		context.lineTo((enemies[i].size * 1.5), -enemies[i].size * 2.5);
		context.moveTo(0, -(enemies[i].size));
		context.lineTo(0, -enemies[i].size * 3);
		context.fill();
		context.stroke();
		context.restore();

		check_p2wall_collision(enemies[i], true);
		//draw_bounding_circle(enemies[i]);
	}
}

function create_bullets(type)
{
	switch(type)
	{
		case(1) : 
		{
			let bullet= new particle(ship2.position.dx + (Math.cos(thrust_angle) * 10), ship2.position.dy + (Math.sin(thrust_angle) * 10), thrust_angle, 25, 4);
				bullet_stack.push(bullet);
			break;
		}
		case(2) : 
		{
			let bullet= new particle(ship2.position.dx + (Math.cos(thrust_angle + Math.PI / 2) * 15), ship2.position.dy + (Math.sin(thrust_angle + Math.PI / 2) * 15), thrust_angle, 25, 4);
			bullet_stack.push(bullet);
			bullet= new particle(ship2.position.dx + (Math.cos(thrust_angle - Math.PI / 2) * 15), ship2.position.dy + (Math.sin(thrust_angle - Math.PI / 2) * 15), thrust_angle, 25, 4);
			bullet_stack.push(bullet);
			break;
		}
		case(3) : 
		{
			let bullet= new particle(ship2.position.dx + (Math.cos(thrust_angle) * 10), ship2.position.dy + (Math.sin(thrust_angle) * 10), thrust_angle, 25, 4);
				bullet_stack.push(bullet);
				bullet= new particle(ship2.position.dx + (Math.cos(thrust_angle) * 10), ship2.position.dy + (Math.sin(thrust_angle + Math.PI / 1.5) * 10), (thrust_angle + Math.PI / 1.5), 25, 4);
				bullet_stack.push(bullet);
				bullet= new particle(ship2.position.dx + (Math.cos(thrust_angle) * 10), ship2.position.dy + (Math.sin(thrust_angle - Math.PI / 1.5) * 10), (thrust_angle - Math.PI / 1.5), 25, 4);
				bullet_stack.push(bullet);
			break;
		}
		default :
		{
			let bullet= new particle(ship2.position.dx + (Math.cos(thrust_angle) * 10), ship2.position.dy + (Math.sin(thrust_angle) * 10), thrust_angle, 25, 4);
				bullet_stack.push(bullet);
			break;
		}
	}
	
}

function render_bullets()
{
	for(let i= bullet_stack.length - 1; i >= 0; i--)
	{
		context.beginPath();
		context.fillStyle= "white";
		context.arc(bullet_stack[i].position.dx, bullet_stack[i].position.dy, bullet_stack[i].size, 0, Math.PI * 2);
		context.fill();

		bullet_stack[i].update_pos();
		if(check_p2wall_collision(bullet_stack[i]))
		{
			bullet_stack.splice(i, 1);
			//console.log(bullet_stack.length);
		}
	}
}

function check_ship2asteroid_collision()
{
	for(var i= asteroids.length - 1; i >= 0; i--)
	{
		if(check_b2b_collision(ship2, asteroids[i]))
		{
			if(deploy_shield === true)
			{
				score= score + 50;
				shield_collision.play();
				asteroids.splice(i, 1);
				//uncolide(ship2, asteroids[i]);
			}
			else
			{
				background_music.stop();
				game_over_sound.play();
				game_over();
			}
		}
	}
}

function check_ship2enemy_collision()
{
	for(var i= enemies.length - 1; i >= 0; i--)
	{
		if(check_b2b_collision(ship2, enemies[i]))
		{
			if(deploy_shield === true)
			{
				score= score + 50;
				shield_collision.play();
				enemies.splice(i, 1);
				//uncolide(ship2, enemies[i]);
			}
			else
			{
				background_music.stop();
				game_over_sound.play();
				game_over();
			}
		}
	}
}

function check_enemy2asteroid_collosion()
{
	for(var i= enemies.length - 1; i >= 0; i--)
	{
		for(var j= asteroids.length - 1; j >= 0; j--)
		{
			if(check_b2b_collision(asteroids[j], enemies[i]))
			{
				/*enemies.splice(i, 1);
				asteroids.splice(j, 1);
				score= score + 60;*/
				uncolide(asteroids[j], enemies[i]);
			}	
		}	
	}
}

function check_bullet2enemy_collision()
{
	for(var i= enemies.length - 1; i >= 0; i--)
	{
		for(var j= bullet_stack.length - 1; j >= 0; j--)
		{
			if(check_b2b_collision(bullet_stack[j], enemies[i]))
			{
				enemy_explosion_1.play();
				create_explosion(bullet_stack[j].position.dx, bullet_stack[j].position.dy);
				enemies.splice(i, 1);
				bullet_stack.splice(j, 1);
				score= score + (50 * score_multiplier);
				break;
			}	
		}	
	}
}

function check_bullet2asteroid_collision()
{
	for(var i= asteroids.length - 1; i >= 0; i--)
	{
		for(var j= bullet_stack.length - 1; j >= 0; j--)
		{
			if(check_b2b_collision(bullet_stack[j], asteroids[i]))
			{
				score = score + (10 * score_multiplier);
				create_explosion(bullet_stack[j].position.dx, bullet_stack[j].position.dy);
				bullet_stack.splice(j, 1);

				if(asteroids[i].size <= 35)
				{
					asteroid_explosion_1.play();
					asteroids.splice(i, 1);
				}
				else
				{
					asteroid_explosion_2.play();
					var new_ast= [];
					var ast= new asteroid(asteroids[i].position.dx, asteroids[i].position.dy, (Math.random() * 360) * Math.PI / 180, Math.random() * 2, asteroids[i].size / 2, Math.random() * 15 + 10);
					new_ast.push(ast);
					var ast= new asteroid(asteroids[i].position.dx, asteroids[i].position.dy, (Math.random() * 360) * Math.PI / 180, Math.random() * 2, asteroids[i].size / 2, Math.random() * 15 + 10);
					new_ast.push(ast);
					asteroids.splice(i, 1);
					asteroids.push(new_ast[0]);
					asteroids.push(new_ast[1]);
				}
				break;
			}	
		}	
	}
}

function draw_asteroid(asteroids)
{
	for(let j= asteroids.length - 1; j >= 0; j--)
	{
		for(let i= 0; i < asteroids.length; i++)
		check_p2wall_collision(asteroids[i]);

		context.save();
		context.translate(asteroids[j].position.dx, asteroids[j].position.dy);
		context.rotate(asteroids[j].velocity.get_angle());
		context.beginPath();
		context.strokeStyle= "white";
		context.fillStyle= "#232322";
		context.moveTo(asteroids[j].vertex_array[0].x, asteroids[j].vertex_array[0].y);
		for(let i= 1; i < asteroids[j].vertex_array.length; i++)
		{
			context.lineTo(asteroids[j].vertex_array[i].x, asteroids[j].vertex_array[i].y);
		}
		context.lineTo(asteroids[j].vertex_array[0].x, asteroids[j].vertex_array[0].y);
		context.stroke();
		context.fill();
		context.restore();

		asteroids[j].update_pos();
		wrapp_around(asteroids[j]);

		//draw_bounding_circle(asteroids[j]);
	}
	unstack_particles(asteroids);
}


function spawn_new_enemies()
{
	let dir= (Math.random() * 360) * Math.PI / 180,
		a= (width / 2) * Math.cos(dir),
		b= (width / 2) * Math.sin(dir);

		let enemy= new particle(a, b, dir, Math.random() * 3, 15);
		enemies.push(enemy);
}

function spawn_new_asteroids()
{
	let dir= (Math.random() * 360) * Math.PI / 180,
		a= (ship2.position.get_mag() + 400) * Math.cos(dir),
		b= (ship2.position.get_mag() + 400) * Math.sin(dir);

	let ast= new asteroid(a, b, dir, Math.random() * 2, Math.random() * 60 + 10, Math.random() * 15 + 10);
	asteroids.push(ast);
}

function pause()
{
	context.save();
	context.scale(1, -1);
	context.fillStyle = "white";
	context.font = "70px impact";
	context.textAlign = "center";
	context.fillText("PAUSED!", 0, 0);
	context.restore();
}

function intro()
{
	context.fillRect(-width / 2, -height / 2, width, height);
	context.save();
	context.scale(1, -1);
	context.fillStyle = "grey";
	context.font = "15px ariel";
	context.textAlign = "center";
	context.fillText("press F11 to toggle fullscreen", 0, 200);
	context.fillStyle = "white";
	context.font = "70px impact";
	context.textAlign = "center";
	context.fillText("ASTEROIDS!!!", 0, 0);
	context.font = "20px ariel";
	context.fillText("press enter to start", 0, 100);
	context.restore();
	if(enter === true)
	{
		cancelAnimationFrame(ani_id); 
		controls_display_timer= setInterval(controls, 1000);
	}
	else
	{
		ani_di= requestAnimationFrame(intro);
	}
}

function controls()
{
	controls_display_counter--;
	context.fillRect(-width / 2, -height / 2, width, height);
	context.save();
	context.scale(1, -1);
	context.fillStyle = "grey";
	context.font = "20px ariel";
	context.textAlign = "center";
	context.fillText("press K to skip", 0, 300);
	context.fillStyle = "white";
	context.font = "25px impact";
	context.textAlign = "left";
	context.fillText(": THRUST", 10, -200);
	context.fillText(": BREAK", 10, -150);
	context.fillText(": ROTATE LEFT", 10, -100);
	context.fillText(": ROTATE RIGHT", 10, -50);
	context.fillText(": SHOOT", 10, 0);
	context.fillText(": MUTE/UNMUTE", 10, 50);
	context.fillText(": PAUSE", 10, 100);
	context.textAlign = "right";
	context.fillText("UP-ARROW", -10, -200);
	context.fillText("DOWN-ARROW", -10, -150);
	context.fillText("LEFT-ARROW", -10, -100);
	context.fillText("RIGHT-ARROW", -10, -50);
	context.fillText("SPACE", -10, 0);
	context.fillText("M", -10, 50);
	context.fillText("ESC", -10, 100);

	context.font = "40px impact";
	context.textAlign = "center";
	context.fillText("GAME STARTS IN: " + controls_display_counter, 0, 200);
	context.restore();

	if(controls_display_counter <= 0)
	{
		clearInterval(controls_display_timer);
		initilize();
	}
}

function scoreboard()
{
	context.save();
	context.scale(1, -1);
	context.fillStyle = "red";
	context.font = "30px impact";
	context.fillText("SCORE: " + score, -(width / 2 - 20), -(height / 2 - 50));
	context.restore();
}

function save_score()
{
	http= new XMLHttpRequest();
	http.onreadystatechange= function()
	{
		if(http.readyState == 4 && http.status == 200)
		{
			let score_data= JSON.parse(http.response);
			console.log("score saved!");
			console.log(score_data);
			heigh_score= score_data;
			console.log(heigh_score.name, heigh_score.score);
		}
	};
	http.open('POST', '#', true);
	http.setRequestHeader("Content-type", "application/json");
	var name= window.prompt("enter your name");
	http.send(JSON.stringify({"name": name, "score": score}));
}

function game_over()
{
	cancelAnimationFrame(ani_id);
	if(save_flag === false)
	{
		save_score();
		save_flag= true;
	}
	context.fillStyle= "black";
	context.fillRect(-width / 2, -height / 2, width, height);
	context.save();
	context.scale(1, -1);
	context.fillStyle = "white";
	context.font = "50px impact";
	context.textAlign = "center";
	context.fillText("GAME OVER!!!", 0, 0);
	context.fillText(score, 0, 50);
	context.fillText("Height Score: " + heigh_score.name + " " + heigh_score.score, 0, 100);
	context.restore();

	if(enter === true)
	{
		location.reload();
	}
	else
		ani_di= requestAnimationFrame(game_over);
}

function create_explosion(ex, ey)
{
	let ex_particles= [];
	for(let i= 0; i < 10; i++)
	{
		let p= new particle(ex, ey, (Math.random() * 360) * Math.PI / 180, Math.random() * 2, Math.random() * 2);
		ex_particles.push(p);
	}
	explosions_stack.push(ex_particles);
	explosion_clock.push(0);
}

function explode()
{
	for(let j= explosions_stack.length - 1; j >= 0; j --)
	{
		for(let i= explosions_stack[j].length - 1; i >= 0 ; i--)
		{
			context.beginPath();
			context.fillStyle= "orange";
			context.arc(explosions_stack[j][i].position.dx, explosions_stack[j][i].position.dy, 1, 0, Math.PI * 2);
			explosions_stack[j][i].update_pos();
			context.fill();
			explosion_clock[j]++;
			if(explosion_clock[j] >= 200)
			{
				explosions_stack.splice(j, 1);
				explosion_clock.splice(j, 1);
			}
		}
	}
}

function spawn_powerup()
{
	powerup= new particle((Math.random() * width / 2) - (Math.random() * width / 2), (Math.random() * height / 2) - (Math.random() * height / 2), 0, 0, 20);
	dt= setTimeout(function()
	{
		if(powerup_active === false)
		{
			powerup= undefined;
			powerup_spawn_timer= setTimeout(spawn_powerup, 20000);
			powerup_despawn_sound.play();
		}
	}, 10000);
}

function handle_powerup()
{
	if(powerup)
	{
		context.beginPath();
		context.fillStyle= getRandomColor();
		context.arc(powerup.position.dx, powerup.position.dy, Math.random() * powerup.size, 0, Math.PI * 2);
		context.fill();

		if(check_b2b_collision(powerup, ship2))
		{
			powerup_1.play();
			var powerup_type= getRandomNumber(1, 5);
			powerup_active= true;
			clearTimeout(dt);
			switch(powerup_type)
			{
				case(1) : 
				{
					ship2.fire_rate= 0.05;
					pow_timeout= 5;
					let pt= setInterval(function(){pow_timeout--; if(pow_timeout < 0){clearInterval(pt);}}, 1000);
					pow_type= "BULLET STORM!!!";

					setTimeout(function()
					{
						ship2.fire_rate= 0.20; 
						powerup_active= false; 
						powerup= undefined;
						powerup_spawn_timer= setTimeout(spawn_powerup, 20000);
					}, 5000);
					break;
				}
				case(2) : 
				{
					ship2.bullets_type= 2;
					pow_timeout= 15;
					let pt= setInterval(function(){pow_timeout--; if(pow_timeout < 0){clearInterval(pt);}}, 1000);
					pow_type= "DOUBBLE TROUBLE!!!";

					setTimeout(function()
					{
						ship2.bullets_type= 1; 
						powerup_active= false;
						powerup= undefined; 
						powerup_spawn_timer= setTimeout(spawn_powerup, 20000);
					}, 15000);
					break;
				}
				case(3) :
				{
					deploy_shield= true;
					pow_timeout= 10;
					ship2.size= 30;
					let pt= setInterval(function(){pow_timeout--; if(pow_timeout < 0){clearInterval(pt);}}, 1000);
					pow_type= "CANT TOUCH THIS!!!";

					setTimeout(function()
					{
						deploy_shield= false; 
						powerup_active= false; 
						powerup= undefined;
						ship2.size= 15;
						powerup_spawn_timer= setTimeout(spawn_powerup, 20000);
					}, 10000);
					break;
				}
				case(4) : 
				{
					let slice= (Math.PI * 2) / 30, 
						angle= 0;
					for(let i= 0; i < 30; i++)
					{
						let bullet= new particle(ship2.position.dx + (Math.cos(angle) * 30), ship2.position.dy + (Math.sin(angle) * 30), angle, 5, 7);
							bullet_stack.push(bullet);
						angle= angle + slice;
					}
					bulletsplosion_sound.play();

					pow_type= "BULLETSPLOSION !!!";
					pow_timeout= 2;
					let pt= setInterval(function(){pow_timeout--; if(pow_timeout < 0){clearInterval(pt);}}, 1000);

					setTimeout(function()
					{
						let slice= (Math.PI * 2) / 30, 
						angle= 0;
						for(let i= 0; i < 30; i++)
						{
							let bullet= new particle(ship2.position.dx + (Math.cos(angle) * 30), ship2.position.dy + (Math.sin(angle) * 30), angle, 5, 7);
								bullet_stack.push(bullet);
							angle= angle + slice;
						}
						bulletsplosion_sound.play();

						powerup_active= false; 
						powerup= undefined;
						powerup_spawn_timer= setTimeout(spawn_powerup, 20000);
					}, 2000);
					break;
				}
				case(5) :
				{
					ship2.bullets_type= 3;
					pow_timeout= 10;
					let pt= setInterval(function(){pow_timeout--; if(pow_timeout < 0){clearInterval(pt);}}, 1000);
					pow_type= "TRIPPLE THREAT !!!";

					setTimeout(function()
					{
						ship2.bullets_type= 1; 
						powerup_active= false; 
						powerup= undefined;
						powerup_spawn_timer= setTimeout(spawn_powerup, 20000);
					}, 10000);
					break;
				}
				default :
				{
					ship2.bullets_type= 2;
					pow_timeout= 10;
					let pt= setInterval(function(){pow_timeout--; if(pow_timeout < 0){clearInterval(pt);}}, 1000);
					pow_type= "DOUBBLE TROUBLE!!!";

					setTimeout(function()
					{
						ship2.bullets_type= 1; 
						powerup_active= false; 
						powerup= undefined;
						powerup_spawn_timer= setTimeout(spawn_powerup, 20000);
					}, 10000);
					break;
				}
			}
			powerup= undefined;
		}
	}
	if(powerup_active === true)
	{
		context.save();
		context.scale(1, -1);
		context.fillStyle = getRandomColor();
		context.font = "30px impact";
		context.textAlign = "center";
		context.fillText(pow_type, 0, -(height / 2 - 50));
		context.font = "40px impact";
		if(pow_type!= "BULLETSPLOSION !!!")
			context.fillText(pow_timeout, 0, -(height / 2 - 100));
		context.restore();
	}
}

