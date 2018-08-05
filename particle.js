var point= function(a, b)
{
	this.x= a;
	this.y= b;
}

var particle= function(x, y, direction, speed, sz)
{
	this.size= sz;
	this.position= new vector(x, y);
	this.velocity= new vector(0, 0);
	this.velocity.set_mag(speed);
	this.velocity.set_angle(direction);

	this.update_pos= function()
	{
		var temp= new vector(0, 0);

		if(delta == 0 || delta == undefined || delta == null)
		{
			this.position.add(this.velocity);
		}
		else
		{
			temp.set_mag(this.velocity.get_mag() * (60 / delta));
			temp.set_angle(this.velocity.get_angle());
			this.position.add(temp);
		}
	}
}

var spaceShip= function(x, y, direction, speed, xlr8= 0, friction= 0, sz)
{
	this.size= sz;
	this.topspeed= 15;
	this.fire_rate= 0.20;
	this.bullets_type= 1;

	this.position= new vector(x, y);
	this.velocity= new vector(0, 0);
	this.velocity.set_mag(speed);
	this.velocity.set_angle(direction);
	this.acceleration= new vector(0, 0);
	this.acceleration.set_mag(xlr8);

	this.update_pos= function()
	{
		var temp= new vector(0, 0);

		if(delta == 0 || delta == undefined || delta == null)
		{
			this.position.add(this.velocity);
		}
		else
		{
			temp.set_mag(this.velocity.get_mag() * (60 / delta));
			temp.set_angle(this.velocity.get_angle());
			this.position.add(temp);
		}
	}

	this.accelerate= function(decelerate= false)
	{
		this.velocity.add(this.acceleration);
		if(this.velocity.get_mag() > this.topspeed)
			this.velocity.set_mag(this.topspeed);
	}

	this.apply_friction= function()
	{
		this.velocity.multiply(friction);
	}
}

var asteroid= function(x, y, direction, speed, sz= 20, v)
{
	this.size= sz;
	this.vertex_array= [];
	this.vertices= v;
	this.position= new vector(x, y);
	this.velocity= new vector(0, 0);
	this.velocity.set_mag(speed);
	this.velocity.set_angle(direction);

	let slice= (Math.PI * 2) / this.vertices, 
		angle= 0;
	for(let i= 0; i < this.vertices; i++)
	{
		let vx= Math.cos(angle) * (this.size - Math.random() * this.size / 3);
		let vy= Math.sin(angle) * (this.size - Math.random() * this.size / 3);	
		let vertex= new point(vx, vy);

		this.vertex_array.push(vertex);
		angle= angle + slice;
	}

	this.update_pos= function()
	{
		var temp= new vector(0, 0);

		if(delta == 0 || delta == undefined || delta == null)
		{
			this.position.add(this.velocity);
		}
		else
		{
			temp.set_mag(this.velocity.get_mag() * (60 / delta));
			temp.set_angle(this.velocity.get_angle());
			this.position.add(temp);
		}
	}
}