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
function stopwatch()
{
	var start= Date.now();
	//console.log(start);
	function get_duration()
	{
		var d= Date.now() - start;
		//console.log(d)
		//start= Date.now();
		return d;
	}
	return get_duration;
}
//------------------------------------------------------------------------
function enemy_spawn_timer()
{
	let start= Date.now();
	//console.log(start);
	function get_duration()
	{
		var d= Date.now() - start;
		//console.log(d)
		//start= Date.now();
		return d;
	}
	return get_duration;
}
//------------------------------------------------------------------------
function powerup_timer()
{
	var start= Date.now();
	//console.log(start);
	function get_duration()
	{
		var d= Date.now() - start;
		//console.log(d)
		//start= Date.now();
		return d;
	}
	return get_duration;
}
//------------------------------------------------------------------------
function asteroid_spawn_timer()
{
	let start= Date.now();
	//console.log(start);
	function get_duration()
	{
		var d= Date.now() - start;
		//console.log(d)
		//start= Date.now();
		return d;
	}
	return get_duration;
}
//--------------------------------------------------------------------------