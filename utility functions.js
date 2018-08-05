//------------------------------------------------------------------------
var lastTime= 0, fps, delta;
function calculate_framerate(timestamp)
{
	fps= Math.round(1000 / (timestamp - lastTime));
	lastTime= timestamp;
	document.getElementById("framerate").innerHTML= "FPS: " + fps;
    return fps;
}
//------------------------------------------------------------------------
function timer()
{
	this.start_time= Date.now();
	//console.log(this.start_time);

	this.get_duration= function()
	{
		let delay= Date.now() - this.start_time;
		//console.log(delay);
		return delay;
	}

	this.reset= function()
	{
		this.start_time= Date.now();
		//console.log(this.start_time);
	}
}
//------------------------------------------------------------------------
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
//------------------------------------------------------------------------
function getRandomColor() 
{
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) 
	color += letters[Math.floor(Math.random() * 16)];
		return color;
}
//------------------------------------------------------------------------
var up= false,
	down= false,
	left= false,
	right= false,
	enter= false,
	shoot= false;
	mute= false;
var keycode_up, key_up;
function keyup_get_key(event)
{
	keycode_up= event.keyCode;
	key_up= event.key;
	switch(keycode_up)
	{
		case 38 : {up= false; break;}
		case 40 : {down= false; break;} 
		case 37 : {left= false; break;} 
		case 39 : {right= false; break;} 
		case 32 : {shoot= false; break;}
		case 27 : {pause(); break;}
		case 13 : {enter= false; break;}
	}
}

var keycode_down, key_down;
function keydown_get_key(event)
{
	keycode_down= event.keyCode;
	key_down= event.key;
	switch(keycode_down)
	{
		case 38 : {up= true; break;}
		case 40 : {down= true; break;} 
		case 37 : {left= true; break;} 
		case 39 : {right= true; break;} 
		case 32 : {shoot= true; break;}
		case 13 : {enter= true; break;}
		case 77 : {mute= !mute; if(mute){background_music.mute();} else{background_music.unmute();} break;}
		case 122: {setTimeout(function(){location.reload();}, 500); break;}
		case 75 : {if(controls_display_timer){clearInterval(controls_display_timer); initilize(); controls_display_timer= undefined;} break;}
	}
}
//------------------------------------------------------------------------
function draw_vector(pos, vel= pos, color= "red")
{
	context.save();
	context.beginPath();
	context.strokeStyle= color;
	context.translate(pos.dx, pos.dy);
	context.rotate(vel.get_angle());
	context.moveTo(0, 0);
	context.lineTo(30, 0);
	context.lineTo(23, -5);
	context.moveTo(30, 0);
	context.lineTo(23, 5);
	context.stroke();
	context.restore();
}
//------------------------------------------------------------------------
function clone_particle(original)
{
	var clone= new particle(0, 0, 0, 0, 0);
		clone.position.dx= original.position.dx + 0;
		clone.position.dy= original.position.dy + 0;
		clone.velocity.set_mag(original.velocity.get_mag() + 0);
		clone.velocity.set_angle(original.velocity.get_angle() + 0);
		clone.size= original.size;
		clone.color= original.color;

	return clone;
}
//------------------------------------------------------------------------
function check_b2b_collision(b1, b2)
{
	var dx= Math.abs(b1.position.dx - b2.position.dx);
	var dy= Math.abs(b1.position.dy - b2.position.dy);
	return (((dx * dx) + (dy * dy)) <= ((b1.size + b2.size) * (b1.size + b2.size)));
}
//------------------------------------------------------------------------
function check_x2x_collision(b1, b2)
{
	if(b1.position.dx >= b2.position.dx - b2.width && b1.position.dx <= b2.position.dx + b2.width && b1.position.dy >= b2.position.dy - b2.height && b1.position.dy <= b2.position.dy + b2.height) 
	{
		return true;
	}
	else
		return false;
}
//------------------------------------------------------------------------
function check_p2wall_collision(ref, inprison= false, stick= false)
{
	let size, flag= false;

	let position= new vector(ref.position.dx, ref.position.dy);
	size= ref.size; 

	if(ref.position.dx >= width / 2 - size || ref.position.dx <= -width / 2 + size)
	{
		position.dx= Math.sign(ref.position.dx) * (width / 2) + (Math.sign(ref.position.dx) * -1 * (size + 0)); 
		flag= true;
	}

	if(ref.position.dy >= height / 2 - size || ref.position.dy <= -height / 2 + size)
	{
		position.dy= Math.sign(ref.position.dy) * (height / 2) + (Math.sign(ref.position.dy) * -1 * (size + 0));
		flag= true;
	}
	
	if(flag === true)
	{
		if(inprison === true)
			ref.position.set_vect(position);
		if(stick === true)
			ref.velocity.set_mag(0);
		return position;
	}
	else
		return false; 
}
//------------------------------------------------------------------------
function uncolide(pt1, pt2)
{
	var nudge= new vector(0, 0);
	nudge.set_mag(1);
	var tta= Math.atan2(pt1.position.dy - pt2.position.dy, pt1.position.dx - pt2.position.dx);
	//nudge.set_angle(tta);
	//pt1.position.add(nudge);
	nudge.set_angle(tta + Math.PI);
	pt2.position.add(nudge);
}
//------------------------------------------------------------------------
function unstack_particles(array)
{
	for(var e1= 0; e1 < array.length; e1++)
		for(var e2= e1; e2 < array.length ; e2++)
		{
			if(e1 == e2)
				continue;
			while(check_b2b_collision(array[e1], array[e2]))
			{
				uncolide(array[e1], array[e2]);
			}
		}
}
//------------------------------------------------------------------------
function wrapp_around(ref)
{
	if(ref.position.dx >= (width / 2) + ref.size * 1 || ref.position.dx <= -width / 2 - ref.size * 1)
	{
		ref.position.dx= Math.sign(ref.position.dx) * (-width / 2) + (Math.sign(ref.position.dx) * 1); 
	}
	if(ref.position.dy >= height / 2 + ref.size * 1 || ref.position.dy <= (-height / 2) - ref.size * 1)
	{
		ref.position.dy= Math.sign(ref.position.dy) * (-height / 2) + (Math.sign(ref.position.dy) * 1);
	}
}
//------------------------------------------------------------------------
function draw_bounding_circle(par)
{
	context.beginPath();
	context.strokeStyle= "white";
	context.arc(par.position.dx, par.position.dy, par.size, 0, Math.PI * 2)
	context.stroke();
}
//------------------------------------------------------------------------
function fullscreen()
{
   if(document.getElementById('my_canvas').webkitRequestFullScreen) 
       document.getElementById('my_canvas').webkitRequestFullScreen();
  else 
    document.getElementById('my_canvas').mozRequestFullScreen();    
}
//------------------------------------------------------------------------