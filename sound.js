var background_music= new Howl(
{
    urls: ['resources/sound/background music.mp3'],
    loop: true,
    onload: function () 
    {
    	background_music.volume(0.6);
        //console.log("Loaded asset: background_music");
    }
});

var bullet_sound= new Howl(
{
    urls: ['resources/sound/bullets 3.wav'],
    onload: function () 
    {
        //console.log("Loaded asset: bullet_sound");
        bullet_sound.volume(0.1);
    }
});

var asteroid_explosion_1= new Howl(
{
    urls: ['resources/sound/asteroid explosion 1.wav'],
    onload: function () 
    {
        //console.log("Loaded asset: asteroid_explosion_1");
        asteroid_explosion_1.volume(0.5);
    }
});

var asteroid_explosion_2= new Howl(
{
    urls: ['resources/sound/asteroid explosion 2.wav'],
    onload: function () 
    {
        //console.log("Loaded asset: asteroid_explosion_2");
        asteroid_explosion_2.volume(0.5);
    }
});

var enemy_explosion_1= new Howl(
{
    urls: ['resources/sound/enemy explosion 1.wav'],
    onload: function () 
    {
        //console.log("Loaded asset: enemy_explosion_1");
        enemy_explosion_1.volume(1);
    }
});

var powerup_1= new Howl(
{
    urls: ['resources/sound/powerup 1.wav'],
    onload: function () 
    {
        //console.log("Loaded asset: powerup_1");
        powerup_1.volume(0.5);
    }
});

var ship_movement_sound= new Howl(
{
    urls: ['resources/sound/ship movement sound.wav'],
    onload: function () 
    {
       // console.log("Loaded asset: ship_movement_sound");
        ship_movement_sound.volume(1);
    }
});

var game_over_sound= new Howl(
{
    urls: ['resources/sound/game over.mp3'],
    onload: function () 
    {
        //console.log("Loaded asset: game_over_sound");
        game_over_sound.volume(1);
    }
});

var bulletsplosion_sound= new Howl(
{
    urls: ['resources/sound/bulletsplosion.wav'],
    onload: function () 
    {
        //console.log("Loaded asset: game_over_sound");
        bulletsplosion_sound.volume(1);
    }
});

var shield_collision= new Howl(
{
    urls: ['resources/sound/shield collision.wav'],
    onload: function () 
    {
        //console.log("Loaded asset: shield_collision");
        shield_collision.volume(1);
    }
});

var powerup_despawn_sound= new Howl(
{
    urls: ['resources/sound/powerup despawn.wav'],
    onload: function () 
    {
        //console.log("Loaded asset: powerup_despawn_sound");
        powerup_despawn_sound.volume(1);
    }
});