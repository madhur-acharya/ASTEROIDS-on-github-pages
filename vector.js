function vector(x= 1, y= 0)
{
	this.dx= x;
	this.dy= y;
		
	this.set_dxy= function(x, y)
	{
		this.dx= x;
		this.dy= y;
	}

	this.set_dx= function(x)
	{
		this.dx= x;
	}

	this.set_dy= function(y)
	{
		this.dy= y;
	}

	this.get_angle= function()
	{
		return Math.atan2(this.dy, this.dx);
	}

	this.get_mag= function()
	{
		return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
	}

	this.set_angle= function(angle)
	{
		var mag= this.get_mag();
		this.dx= Math.cos(angle) * mag;
		this.dy= Math.sin(angle) * mag;
	}
	
	this.set_mag= function(mag)
	{
		var angle= this.get_angle();
		this.dx= Math.cos(angle) * mag;
		this.dy= Math.sin(angle) * mag;	
	}

	this.add= function(vect)
	{
		this.dx= this.dx + vect.dx; 
		this.dy= this.dy + vect.dy;
	}
		
	this.subtract= function(vect)
	{
		this.dx= this.dx - vect.dx; 
		this.dy= this.dy - vect.dy;	
	}
	
	this.multiply= function(scalar)
	{
		this.dx= this.dx * scalar;
		this.dy= this.dy * scalar;
	}

	this.divide= function(scalar)
	{
		this.dx= this.dx / scalar;
		this.dy= this.dy / scalar;
	}

	this.set_vect= function(vect)
	{
		this.dx= vect.dx;
		this.dy= vect.dy;
	}
}

