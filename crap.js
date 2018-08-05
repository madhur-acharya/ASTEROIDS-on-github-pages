// calculate the point of collision 
collisionPointX = ((firstBall.x * secondBall.radius) + (secondBall.x * firstBall.radius)) / (firstBall.radius + secondBall.radius);
 
collisionPointY = ((firstBall.y * secondBall.radius) + (secondBall.y * firstBall.radius)) / (firstBall.radius + secondBall.radius);

function stopwatch()
{
	var start= Date.now();
	console.log(start);
	function get_duration()
	{
		var d= Date.now() - start;
		console.log(d)
		start= Date.now();
		return d;
	}
	return get_duration;
}

let vertex= new point(Math.cos(angle) * this.size + (Math.sign(Math.cos(angle)) * (Math.random() * this.size / 2)), Math.sin(angle) * this.size + (Math.sign(Math.sin(angle)) * (Math.random() * this.size / 2)));
let vertex= new point(Math.cos(angle) * (this.size ) - (Math.sign(Math.cos(angle)) * (Math.random() * this.size / 4)), Math.sin(angle) * (this.size ) - (Math.sign(Math.sin(angle)) * (Math.random() * this.size / 4)));

for(let i= 0; i < this.vertices; i++)
{
	let vertex= new point(Math.cos(angle) * this.size - (-Math.sign(Math.cos(angle)) * Math.random() * this.size / 3), Math.sin(angle) * this.size - (-Math.sign(Math.cos(angle)) * Math.random() * this.size / 3));
	this.vertex_array.push(vertex);
	angle= angle + slice;
}

context.beginPath();
context.fillStyle= "#334353";
context.strokeStyle= "black";
context.save();
context.translate(enemies[i].position.dx, enemies[i].position.dy);
context.rotate(enemies[i].position.get_angle());
//context.rotate((Math.random() * 360) * Math.PI / 180);
context.arc(0, 0, enemies[i].size, 0, Math.PI * 2);
context.moveTo(-(enemies[i].size * 2.5), 0);
context.lineTo((enemies[i].size * 2.5), 0);
context.lineTo(0, enemies[i].size / 2);
context.lineTo(-(enemies[i].size * 2.5), 0);
context.lineTo(0, -enemies[i].size / 2);
context.lineTo((enemies[i].size * 2.5), 0);
context.fill();
context.moveTo(-(enemies[i].size * 2.5), 0);
context.lineTo((enemies[i].size * 2.5), 0);
context.strokeStyle= "black";
context.stroke();
context.restore();

//draw asteroid vertices
context.save();
context.translate(asteroids[j].position.dx, asteroids[j].position.dy);
context.rotate(asteroids[j].velocity.get_angle());
context.beginPath();
context.lineWidth= 1;
for(let i= 0; i < asteroids[j].vertex_array.length; i++)
{
	context.strokeStyle= "white";
	context.lineWidth= 1;
	context.moveTo(0, 0);
	context.lineTo(asteroids[j].vertex_array[i].x, asteroids[j].vertex_array[i].y);
	context.stroke();
}
context.restore();



