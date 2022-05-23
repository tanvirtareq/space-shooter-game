var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;

function keyup(event) {
	
	if(!isPaused)
	{
		var player = document.getElementById('player');
		if (event.keyCode == 37) {
			leftPressed = false;
			lastPressed = 'left';
		}
		if (event.keyCode == 39) {
			rightPressed = false;
			lastPressed = 'right';
		}
		if (event.keyCode == 38) {
			upPressed = false;
			lastPressed = 'up';
		}
		if (event.keyCode == 40) {
			downPressed = false;
			lastPressed = 'down';
		}
		
		player.className = 'character stand ' + lastPressed;
		
	
	}	
	
	
}


function move() {
	if(!isPaused)
	{
		var player = document.getElementById('player');
		var positionLeft = player.offsetLeft;
		var positionTop = player.offsetTop;
		if (downPressed) {
			var newTop = positionTop+1;

			var element = document.elementFromPoint(player.offsetLeft, newTop+32);
			if (element.classList.contains('sky') == false) {
				player.style.top = newTop + 'px';	
			}

			if (leftPressed == false) {
				if (rightPressed == false) {
					player.className = 'character walk down';
				}
			}
		}
		if (upPressed) {
			var newTop = positionTop-1;

			var element = document.elementFromPoint(player.offsetLeft, newTop);
			if (element.classList.contains('sky') == false) {
				player.style.top = newTop + 'px';	
			}
			
			if (leftPressed == false) {
				if (rightPressed == false) {
					player.className = 'character walk up';
				}
			}
		}
		if (leftPressed) {
			var newLeft = positionLeft-1;

			var element = document.elementFromPoint(newLeft, player.offsetTop);
			if (element.classList.contains('sky') == false) {
				player.style.left = newLeft + 'px';	
			}


			player.className = 'character walk left';
		}
		if (rightPressed) {
			var newLeft = positionLeft+1;
			
			var element = document.elementFromPoint(newLeft+32, player.offsetTop);
			if (element.classList.contains('sky') == false) {
				player.style.left = newLeft + 'px';		
			}

			player.className = 'character walk right';
		}
	}
	

}


function keydown(event) {
	if(!isPaused)
	{
		if (event.keyCode == 37) {
			leftPressed = true;
		}
		if (event.keyCode == 39) {
			rightPressed = true;
		}
		if (event.keyCode == 38) {
			upPressed = true;
		}
		if (event.keyCode == 40) {
			downPressed = true;
		}
	}
	
}

var inputNameForm;

function myLoadFunction() {
	inputNameForm=document.getElementById('enterNameForm');
	inputNameForm.remove();
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
}

function convertPXToVW(px) {
	return px * (100 / document.documentElement.clientWidth);
}

function convertPXToVH(px) {
	return px * (100 / document.documentElement.clientHeight);
}

function convertVHToPX(vh) {
	vh=vh.substring(0, vh.length-2);
	vh=parseInt(vh);
	console.log(vh);
	var x=(document.documentElement.clientHeight*vh)/100;
	console.log(x);
	return x;
}

document.addEventListener('DOMContentLoaded', myLoadFunction);

var startButton=document.getElementById("startButton");

function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getSpaceshipInRandomPosition(spaceship)
{

	// spaceship.style.top='20vh';
	// spaceship.style.left='45%';

	var top=getRndInteger(0, 35).toString();
	// console.log(top+'vh');
	spaceship.style.top=top+'vh';
	spaceship.style.left=getRndInteger(2, 92)+'%';

	
}

function addforTop(s, i)
{
	s=s.substring(0, s.length-2);
	s=parseInt(s);
	// console.log(s);
	s=s+i;
	// console.log(s);
	s=s+'vh';
	// console.log(s);
	return s;
}

function addforLeft(s, i)
{
	s=s.substring(0, s.length-1);
	s=parseInt(s);
	// console.log(s);
	s=s+i;
	// console.log(s);
	s=s+'%';
	// console.log(s);
	return s;
}

function creatBomb(spaceship)
{
	var bomb=document.createElement('div');
	bomb.classList.add("bomb");
	bomb.style.top=addforTop(spaceship.style.top, 10);
	bomb.style.left=addforLeft(spaceship.style.left, 1);
	// console.log(spaceship.style.left, bomb.style.left);
	// console.log(spaceship.style.top, bomb.style.top);
	return bomb;
}

var playing=true;
var isPaused=true;

function removeAllSpaceship()
{
	var spaceships=document.getElementsByClassName('alien');
	for(var i=0;i<spaceships.length;i++)
	{
		spaceships[i].remove();
	}
}

function removeAllBomb()
{
	var bombs=document.getElementsByClassName('bomb');
	for(var i=0;i<bombs.length;i++)
	{
		bombs[i].remove();
	}
}

async function gameOver(player)
{
	console.log(isPaused);
	player.classList.add('dead');
	console.log(player.classList);
	await delay(1000);
	var gameEnd=document.createElement('div');
	gameEnd.classList.add('start');
	gameEnd.innerHTML='Game Over ';


	var body=document.getElementsByTagName("BODY")[0];

	body.appendChild(gameEnd);

	inputNameForm.style.top='30%';

	body.appendChild(inputNameForm);

	var submitButton=document.getElementById('submitButton');
	submitButton.onclick=()=>{
		var inputName=document.getElementById('inputName');
		if(inputName.value)
		{
			var list=localStorage.getItem('scores');
			var highScore=localStorage.getItem('highscore');
			highScore=JSON.parse(highScore);
			if(highScore==null || highScore.score<score)
			{
				highScore={name:inputName.value, score: score};
			}
			list=JSON.parse(list);
			if(list==null) list=[];
			list.push({name: inputName.value, score: score});
			// var Highscore= Math.max(...list.map(o => o.score));
			list=JSON.stringify(list);
			localStorage.setItem('scores', list);
			inputNameForm.remove();
			gameEnd.remove();

			var scoreBoard=document.createElement('div');
			scoreBoard.classList.add('start');
			
			console.log(highScore);
			scoreBoard.innerHTML=`Your score : ${score} <br> Highscore : <br> ${highScore.name} : ${highScore.score}`;
			scoreBoard.style.top='20%';
			scoreBoard.style.width='25vw';

			body.appendChild(scoreBoard);

			highScore=JSON.stringify(highScore);
			localStorage.setItem('highscore', highScore);
			var playAgainButton=document.createElement('div');
			playAgainButton.classList.add('start');
			playAgainButton.innerHTML='Play Again';

			playAgainButton.style.top='45%';
			body.appendChild(playAgainButton);



			playAgainButton.onclick=()=>{
				window.location.reload();
			};
		}
	}


	

}

// function playAgain()
// {

// 	var health=document.getElementsByClassName('health')[0];
// 	health.appendChild(document.createElement('li'));
// 	health.appendChild(document.createElement('li'));
// 	health.appendChild(document.createElement('li'));
// 	startGame();
// }

async function playerHit(player)
{
	var health=document.getElementsByClassName('health')[0];
	// console.log(health);
	var children=health.childNodes;
	// console.log(children.length);
	// console.log(children);
	var lastChild=children[children.length-1];
	lastChild.remove();
	children[children.length-1].remove();
	children=health.childNodes;
	// console.log(children.length);
	upPressed = false;	
	downPressed = false;
	leftPressed = false;
	rightPressed = false;
	lastPressed = false;
	isPaused=true;
	if(children.length===1)
	{
		await gameOver(player);
		return;
	}
	// console.log(children);
	player.classList.add('hit');
	player.classList.add('left');
	await delay(1000);

	player.classList.remove('hit');
	player.classList.remove('left');
	isPaused=false;
	console.log(isPaused);
	return;

}

async function exploidBomb(bomb)
{
	
	var player=document.getElementById('player');
	var playerPos=player.getBoundingClientRect();
	var bombPos=bomb.getBoundingClientRect();
	var x=Math.abs(playerPos.x-bombPos.x);
	var y=Math.abs(playerPos.y-bombPos.y);


	bomb.classList.remove('bomb');
	bomb.classList.add('explosion:before');
	await delay(100);
	bomb.classList.remove('explosion:before');
	bomb.classList.add('explosion');
	await delay(100);
	bomb.classList.remove('explosion');
	bomb.classList.add('explosion:after');
	bomb.remove();
	if(x<=60 && y<=60)
	{
		playerHit(player);
	}
	else
	{
		score++;
	}
	// playerHit(player);

	
}



// async function fireBombBySpaceShip(spaceship)
// {

// 	for(var i=0;;i++){
// 		if(playing===false) break;
// 		var bomb=creatBomb(spaceship);

// 		var body=document.getElementsByTagName("BODY")[0];

// 		body.appendChild(bomb);

		// moveAndExploidBomb(bomb, getRndInteger(72, 97));
// 		await delay(10000);
// 	}
	

// }

class Bomb{
	constructor(spaceship)
	{
		this.spaceship=spaceship;
		this.bomb=creatBomb(spaceship);
		body.appendChild(this.bomb);
		this.expoidPosition=getRndInteger(72, 97);
	}
}

var Bombs=[];

var generateBombs=setInterval(()=>{
	// console.log('ekhane');
	if(!isPaused)
	{
		var spaceships=document.getElementsByClassName('alien');
		for(var i=0;i<spaceships.length;i++)
		{
			var spaceship=spaceships[i];
			var bomb=new Bomb(spaceship);
			Bombs.push(bomb);
			// var bomb=creatBomb(spaceship);
			// body.appendChild(bomb);


		}
	}
	
}, 5000);

// async function moveAndExploidBomb(bomb, pos)
// {
// 	console.log("pos", pos);
// 	for(var i=0;;i++)
// 	{
// 		if(playing===false) break;
// 		await delay(100);
// 		bomb.style.top=addforTop(bomb.style.top, 2);
// 		if(Math.abs(parseInt(pos)-parseInt(bomb.style.top.substring(0, bomb.style.top.length-2)))<=1) break;
// 		// console.log(bomb.getBoundingClientRect());
// 	}
// 	exloidBomb(bomb)

// }

var moveBombs=setInterval(()=>{
	// var bombs=document.getElementsByClassName('bomb');
	if(!isPaused)
	{
		for(var i =0;i<Bombs.length;i++)
		{
			var bomb=Bombs[i];
			// console.log(bomb.bomb.style.top);
			bomb.bomb.style.top=addforTop(bomb.bomb.style.top, 2);
			if(Math.abs(parseInt(bomb.expoidPosition)-parseInt(bomb.bomb.style.top.substring(0, bomb.bomb.style.top.length-2)))<=2)
			{
				exploidBomb(bomb.bomb);
				// bomb.bomb.remove();
				Bombs=Bombs.filter((b)=> { b!==bomb});
			}
			// console.log(bomb.getBoundingClientRect());
		}
	}
	
}, 100);

var body=document.getElementsByTagName("BODY")[0];

function createSpaceShip()
{
	var spaceship=document.createElement('div');
	var body=document.getElementsByTagName("BODY")[0];

	body.appendChild(spaceship);
	spaceship.classList.add('alien');
	getSpaceshipInRandomPosition(spaceship);
	
	return spaceship;
}
var score=0;

var level=0;

const spaceshipIncresePerLevel=3;

function createSpaceShips()
{
	for(var i=1;i<=spaceshipIncresePerLevel;i++)
	{
		createSpaceShip();
	}
}

function  startGame()
{
	// playing=true;
	isPaused=false;
	score=0;
	level=1;
	removeAllSpaceship();
	var spaceships=createSpaceShips();
	// console.log(spaceship);	
	// var spaceship=document.getElementById('alien');
	// getSpaceshipInRandomPosition(spaceship);
	// fireBombBySpaceShip(spaceship);
	

}


startButton.onclick=()=>{
	startButton.classList.add('start:before');
	// await delay(1000);
	startButton.classList.remove('start');
	startGame();

	
	// isPaused=true;
	// var player=document.getElementById('player');
	// gameOver(player);
	
	
	
}

