let sides=0,ts=0;//sides and total sides
let ac = 0;//auto clickers
let c = 1;//click multiplayer
const multiplayer = 2;//cost multiplayer
let seconds = 0;//seconds for current session
function update()
	{
		document.getElementById("sides").innerHTML = sides + " - your sides"
		stats()
	}
setInterval(function tick(){
	//run every second
	sides = sides + ac
	seconds++;
	ts = ts + ac
	update()
	if(ac>0)
	{
			document.getElementById("sides").style ="animation-play-state: running;"
			document.getElementById("bar").style="animation-play-state: running;"
			document.getElementById("progress").style="display: block;"
	}
}, 1000,(0));
function side_click()
	{
		sides = sides + c;
		ts = ts + 1;
		update();
	}
function buy(cost,autoclick,click,costId,ele)
	{
		//autoclick = how many sides per second u get from bying it
		if(sides<cost)
		{
			message("you don't have enough sides :(");
		}
		else
		{
			ac = ac + autoclick;
			c = c + click;
			sides = sides - cost;
			//get text with cost
			set = document.getElementById(costId).textContent;
			//new cost for item
			newCost = parseInt(set) * multiplayer;
			//set new cost to item
			setHTML = document.getElementById(costId).innerHTML = newCost;

			document.getElementById(ele).onclick = function(){
				buy(parseInt(document.getElementById(costId).textContent),autoclick,click,costId,ele);
			}

		}
		update()
	}
function stats()
	{
		document.getElementById("total_sides").innerHTML = ts;
		document.getElementById("total_clickers").innerHTML = ac;
		document.getElementById("per_click").innerHTML = c;
		document.getElementById("seconds").innerHTML = seconds;
		document.cookie = "sides = " + sides + "; Secure";
		document.cookie = "ts = " + ts + "; Secure";
		document.cookie = "ac = " + ac + "; Secure";
		document.cookie = "c = " + c + "; Secure";
		document.cookie = "seconds = " + seconds + "; Secure";
		
	}
function load()
	{
		eval(document.cookie)
	}
//thanks to stack overflow
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
function clear_proggres()
	{
		if(confirm("Are you sure you want to delete all your progress?")){
		sides=0,ts=0;
		ac = 0;
		c = 1;
		seconds = 0;
		deleteAllCookies()
		location.reload();
		}
	}
function message(text)
	{
		document.getElementById("screenOverlay").style = "display:block;";
		document.getElementById("cancel").style = "display:none;"
		document.getElementById("messageText").innerHTML = text;
		document.getElementById("message").style = "display:block;";
	}