// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCbnzWi8dy41yc42_wT0XPFhGbNlsQReBg",
  authDomain: "tristane-181aa.firebaseapp.com",
  databaseURL: "https://tristane-181aa.firebaseio.com",
  projectId: "tristane-181aa",
  storageBucket: "tristane-181aa.appspot.com",
  messagingSenderId: "42602666215",
  appId: "1:42602666215:web:12e49c0e3cafe3e4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let scoreboard = {}
let database = firebase.database()

 let start= document.getElementById("start")
 let x
let y
let direction
let score
let level=1
let speed
let more
let time
function setup() {
  createCanvas(windowWidth,windowHeight);
  s = width/946
  x=22
  y=50
  x2=23
  y2=450
  x3=[100,450,900]
  y3=[60,20,30]
  direction=[1,1,1,1]
  score=50
  speed=100
  more=3
  time=85
}

function draw() {
  if (time > 0) {
  background(100,120,200);
  fill(10,40,100)
  circle(x*s,y,30*s)
  fill(200,50,22)
  circle(x2*s,y2,30*s)
  x2 = x2 + 15*direction[0]
   if (keyIsDown(LEFT_ARROW)) {
    x = x - 17
  }
   if (keyIsDown(RIGHT_ARROW)) {
    x = x + 17
  }
 if (keyIsDown(UP_ARROW)) {
    y = y - 17
  }
 if (keyIsDown(DOWN_ARROW)) {
    y = y + 17
  }
if (x2*s > width || x2*s < 0) {
  //x2 = 0
  direction[0]= direction[0]*-1
}
    textSize(50)
  text("score:"+score,40,50) 
  if (dist( x*s, y, x2*s, y2) < 30*s + 30*s) {
	score = score + 1
} 
    for (i=0; i<more; i=i+1) {
      fill(100,50,22)
    circle(x3[i]*s,y3[i],20*s)
    y3[i] = y3[i] + 10*direction[i+1]
     if ( y3[i] > height || y3[i] < 0) {
      //x2 = 0
      direction[i+1]= direction[i+1]*-1
    }
    
    text("time:"+time.toFixed(0),70,90)
      time=time-0.02
    if (dist( x*s, y, x3[i]*s, y3[i]) < 30*s + 27*s) {
      score = score - 3
  }
    }
  if (score> 70 && level == 1) {
    x3= [200,350,500]
    level = 2 
    more=more+3
    x3.push.apply(x3, [400,700,900,200,300,350,450,600])
    y3.push.apply(y3, [230,330,430,500,600,750,850,950])
    direction.push.apply(direction, [1,1,1,1,1,1,1,1,1])
  }
if (score > 80 && level== 2) {
  more=more + 4
  speed = speed + 15
  level = 3
 }


  }

     else {
start.innerHTML = "Name? <input id=ty><button onclick='restart()'>Restart</button>"
noLoop()

}    
   
}

 function restart() { 
      let ty = document.getElementById("ty")
		name = ty.value 
   database.ref(name).set(score)
		if (name != "") { 
			scoreboard[name] = score
		}
alert("scoreboard:" +JSON.stringify(scoreboard,null,1)) 
		time = 85
		score = 0
		loop()
		start.innerHTML = ""
   generate_leaderboard()
}
function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}

function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()
   
