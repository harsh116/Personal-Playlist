var openbtn=document.getElementsByClassName("openbtn")[0]; //to open side panel
var sidepanel=document.getElementsByClassName("sidepanel")[0]; //sidepanel
var container=document.getElementsByClassName("container")[0]; //grid containing videos
var para=document.getElementsByClassName("playfair")[0];   //paragraph for web page
var closebtn=document.getElementById("closebtn"); 

var lyrics=document.getElementById("lyrics"); //lyrics lines
var reset=document.getElementById("reset"); //reset lyrics
var lyricstitle=document.getElementById("title");
let playid="";
let f=0; //flag=1 when video is playing

let topstatus=false //topstatus=1 when video is  at top
let topplaystatus=false  //topplaystatus=1 when video is playing at top

let panelstatus=false; //panelstatus=true is sidepanel is open



function openpanel()
{
	let topcell=document.getElementById("topcell");
	let new_margin="350px";

	panelstatus=true;
	sidepanel.style.width="300px";
	sidepanel.style.paddingRight="10px";

	container.style.marginLeft=new_margin;
	para.style.marginLeft=new_margin;
	topcell.style.marginLeft=new_margin;

}



function clearlyrics()
{
	lyrics.textContent="Click/Tap on the title of song to view lyrics";
	lyricstitle.textContent="";
}

function closepanel()
{
	let original_margin="10px";
	panelstatus=false;
	sidepanel.style.width="0";
	sidepanel.style.paddingRight="0px";

	container.style.marginLeft=original_margin;
	para.style.marginLeft=original_margin;
	topcell.style.marginLeft=original_margin;

	clearlyrics();
}



function aligntopbuttons()
{
	let prevbtn=document.getElementsByClassName("prevtrackbtn")[0];
	let nextbtn=document.getElementsByClassName("nexttrackbtn")[0];
	let rembtn=document.getElementsByClassName("rembutton")[0];

	let original_position_prevbtn="37px";
	let original_position_nextbtn="1030px";
	let original_position_rembtn="1060px";

	

	if(panelstatus===true)
	{
		prevbtn.style.left="-30px";
		nextbtn.style.left="955px";
		rembtn.style.left="985px";
	}
	else{
		// prevbtn.style.right="0px";
		prevbtn.style.left=original_position_prevbtn;
		nextbtn.style.left=original_position_nextbtn;
		rembtn.style.left=original_position_rembtn;
	}
}

var cellstitle=[];
reset.addEventListener("click",clearlyrics);

function addid() //Creating id of title with format songname_title
{
	var cells=container.children;
	
	for(var i=0;i<cells.length;i++)
	{
		var attribute=cells[i].children[1].getAttribute("id");
		var new_attribute=attribute+"_title";
		// console.log(new_attribute);
		var p=cells[i].children[0];
		cellstitle.push(p);
		p.setAttribute("id",new_attribute);
		p.classList.add("pointer");
	}
}

addid();



function oneatatime()
{
	let t1=document.getElementById("topcell").children;
	console.log(t1);
	let topvideo;
	if(topstatus===true)
		topvideo=document.getElementById("topcell").children[2].children[1];

	var cells=container.children;
	
	for(var i=0;i<cells.length;i++)
	{
		var video=cells[i].children[1];
		// console.log("video=",video);
		video.addEventListener("play",function(){
			if(playid.length>0)
			{
				let playingvideo=document.getElementById(playid);
				// console.log("getting playid=",playid);
				playingvideo.pause();
				f=1;
				// console.log("playcondition");
				
			}
			playid=this.getAttribute("id");

			if(topstatus===true&&this===topvideo)
			{
				topplaystatus=true;
			}
			// console.log("new play id=",playid);

		});

		video.addEventListener("pause",function(){
			
				if(f==0)
					playid="";

				if(topstatus===true&&this===topvideo)
				{
					topplaystatus=false;
				}
				// console.log("pause",this);
				f=0;
			
		});
	}
}

oneatatime();

function addbuttons() //to add button "Play at top"
{
	var cells=container.children;
	for(let i=0;i<cells.length;i++)
	{
		let newbutton=document.createElement("button");
		let textnode=document.createTextNode("Play at top");
		newbutton.className="button";

		newbutton.appendChild(textnode);
		cells[i].appendChild(newbutton);
	}
}
addbuttons();

function showattop()
{
	let div=this.parentElement;
	let topcell=document.getElementById("topcell");
	// console.log("showattop");

	topcell.innerHTML=div.innerHTML;
	topcell.removeChild(topcell.lastChild);


	let topcell1=topcell.children[0];
	let topvideo=topcell.children[1];
	console.log("topvideo before replacing=",topvideo);
	
	let remdiv=document.createElement("div");
	topcell.replaceChild(remdiv,topvideo);
	console.log("topvideo after replacing=",topvideo);


	remdiv.appendChild(addremovebtn());  //adding "remove cell" button inside remdiv tag
	remdiv.classList.add("flexboxright"); //to move cross button to rightmost corner

	let videodiv=document.createElement("div");

	videodiv.appendChild(addprevbutton());
	videodiv.appendChild(topvideo);
	videodiv.appendChild(addnextbutton());

	videodiv.className="flexbox";

	topcell.appendChild(videodiv);

	topcell1.setAttribute("id",topcell1.getAttribute("id")+"_top");
	topvideo.setAttribute("id",topvideo.getAttribute("id")+"_top");
	// topcell3.setAttribute("id",topcell3.getAttribute("id")+"_top");
	topcell1.classList.add("pointer");

	// topcell3.className="rembutton";

	topvideo.addEventListener("play",function(){
		let playingvideo=document.getElementById(playid);

			if(playid.length>0)
			{
				// console.log("getting playid=",playid);
				playingvideo.pause();
				f=1;
				// console.log("playcondition");
				
			}
			playid=this.getAttribute("id");
			// console.log("new play id=",playid);


	});

	topvideo.addEventListener("pause",function(){
			
				if(f==0)
					playid="";
				// console.log("pause",this);
				f=0;
			
		});

	videodiv.style.margin= "2% auto";
	videodiv.style.marginTop="0px";
	
	topcell1.classList.add("center");
    videodiv.classList.add("center");
    // topcell3.classList.add("center");

   

    topvideo.play();

    // topcell3.textContent= "\u00D7";
    // topcell3.setAttribute("id","removefromtop");

    topvideo.style.width="1024px";
    topvideo.style.height="576px";

    document.body.scrollTop = 350; // For Safari
    document.documentElement.scrollTop = 350; // For Chrome, Firefox, IE and Opera

    topstatus=true;

    
    responsivetoptitle(); //golden color when hovered and lyrics generated on clicking top title
    // addprevnextbutton(); //add button for next and previous track
    addeventtotrackbutton();  //add events to next and previous track buttons
    // aligntopbuttons(); //align prev next and cross button by shifting them towards left

    if(status==="all")
    {
    	add_ended_topevent();
    }


  


}

function addlistener() //add click event to buttons "Play at top"
{
	var cells=container.children;
	for(let i=0;i<cells.length;i++)
	{
		let button=cells[i].children[2];
		button.addEventListener("click",showattop);
	}
}

addlistener();

function removefromtop()
{
	let button=document.getElementById("removefromtop");

	let cell=button.parentElement.parentElement;
	cell.innerHTML="";

	topstatus=false;
}

function addremovebtn()
{
	let button=document.createElement("button");
	button.textContent= "\u00D7";
	button.setAttribute("id","removefromtop");
	// console.log(button);
	button.addEventListener("click",removefromtop);
	button.className="rembutton";
	return button;
}






function last_resort_lyrics() {
	if(panelstatus==false)
		return;

	var str="[Verse 1]<br>\
She came from Providence<br>\
The one in Rhode Island<br>\
Where the old world shadows hang<br>\
Heavy in the air<br>\
She packed her hopes and dreams<br>\
Like a refugee<br>\
Just as her father came across the sea<br>\
<br>\
\
\
[Verse 2]<br>\
She heard about a place people were smiling<br>\
They spoke about the red man's way<br>\
And how they loved the land<br>\
And they came from everywhere<br>\
To the Great Divide<br>\
Seeking a place to stand<br>\
Or a place to hide<br>\
<br>\
[Verse 3]<br>\
Down in the crowded bars<br>\
Out for a good time<br>\
Can't wait to tell you all<br>\
What it's like up there<br>\
And they called it paradise<br>\
I don't know why<br>\
Somebody laid the mountains low<br>\
While the town got high<br>\
<br>\
[Verse 4]<br>\
Then the chilly winds blew down<br>\
Across the desert<br>\
Through the canyons of the coast<br>\
To the Malibu<br>\
Where the pretty people play<br>\
Hungry for power<br>\
To light their neon way<br>\
And give them things to do<br>\
<br>\
[Verse 5]<br>\
Some rich men came and raped the land<br>\
Nobody caught them<br>\
Put up a bunch of ugly boxes<br>\
And Jesus people bought them<br>\
And they called it paradise<br>\
The place to be<br>\
They watched the hazy sun, sinking in the sea<br>\
<br>\
[Verse 6]<br>\
You can leave it all behind<br>\
And sail to Lahaina<br>\
Just like the missionaries did, so many years ago<br>\
They even brought a neon sign: \"Jesus is coming\"<br>\
Brought the white man's burden down<br>\
Brought the white man's reign<br>\
<br>\
[Verse 7]<br>\
Who will provide the grand design?<br>\
What is yours and what is mine?<br>\
Because there is no more new frontier<br>\
We have got to make it here<br>\
We satisfy our endless needs and<br>\
Justify our bloody deeds<br>\
In the name of destiny<br>\
And in the name of God<br>\
<br>\
[Verse 8]<br>\
And you can see them there<br>\
On Sunday morning<br>\
Stand up and sing about<br>\
What it's like up there<br>\
They call it paradise<br>\
I don't know why<br>\
You call someplace paradise<br>\
Kiss it goodbye";
lyricstitle.innerHTML=this.innerHTML;
lyrics.innerHTML=str;


}

function numb_lyrics()
{
	if(panelstatus==false)
		return;

	var str="[Verse 1: Chester Bennington]<br>\
I'm tired of being what you want me to be<br>\
Feeling so faithless, lost under the surface<br>\
I don't know what you're expecting of me<br>\
Put under the pressure of walking in your shoes<br>\
<br>\
[Pre-Chorus: Chester Bennington & Mike Shinoda]<br>\
Caught in the undertow, just caught in the undertow<br>\
Every step that I take is another mistake to you<br>\
Caught in the undertow, just caught in the undertow<br>\
<br>\
[Chorus: Chester Bennington]<br>\
I've become so numb, I can't feel you there<br>\
Become so tired, so much more aware<br>\
I'm becoming this, all I want to do<br>\
Is be more like me and be less like you<br>\
<br>\
[Verse 2: Chester Bennington]<br>\
Can't you see that you're smothering me?<br>\
Holding too tightly, afraid to lose control<br>\
'Cause everything that you thought I would be<br>\
Has fallen apart, right in front of you<br>\
<br>\
[Pre-Chorus: Chester Bennington & Mike Shinoda]<br>\
Caught in the undertow, just caught in the undertow<br>\
Every step that I take is another mistake to you<br>\
Caught in the undertow, just caught in the undertow<br>\
And every second I waste is more than I can take<br>\
[Chorus: Chester Bennington]<br>\
I've become so numb, I can't feel you there<br>\
Become so tired, so much more aware<br>\
I'm becoming this, all I want to do<br>\
Is be more like me and be less like you<br>\
<br>\
[Bridge: Chester Bennington]<br>\
And I know I may end up failing, too<br>\
But I know you were just like me<br>\
With someone disappointed in you<br>\
<br>\
[Chorus: Chester Bennington]<br>\
I've become so numb, I can't feel you there<br>\
Become so tired, so much more aware<br>\
I'm becoming this, all I want to do<br>\
Is be more like me and be less like you<br>\
<br>\
[Outro: Chester Bennington]<br>\
I've become so numb, I can't feel you there<br>\
I'm tired of being what you want me to be<br>\
I've become so numb, I can't feel you there<br>\
I'm tired of being what you want me to be";
lyricstitle.innerHTML=this.innerHTML;
lyrics.innerHTML=str;
}

function you_know_my_name_lyrics()
{
	if(panelstatus==false)
		return;

	var str="[Verse 1]<br>\
If you take a life do you know what you'll give?<br>\
Odds are, you won't like what it is<br>\
When the storm arrives, would you be seen with me?<br>\
By the merciless eyes I've deceived?<br>\
<br>\
[Pre-Chorus 1]<br>\
I've seen angels fall from blinding heights<br>\
But you yourself are nothing so divine<br>\
Just next in line<br>\
<br>\
[Chorus]<br>\
Arm yourself because no one else here will save you<br>\
The odds will betray you<br>\
And I will replace you<br>\
You can't deny the prize, it may never fulfill you<br>\
It longs to kill you<br>\
Are you willing to die?<br>\
The coldest blood runs through my veins<br>\
You know my name<br>\
<br>\
[Verse 2]<br>\
If you come inside things will not be the same<br>\
When you return to the night<br>\
And if you think you've won<br>\
You never saw me change<br>\
The game that we have been playing<br>\
[Pre-Chorus 2]<br>\
I've seen this diamond cut through harder men<br>\
Than you yourself, but if you must pretend<br>\
You may meet your end<br>\
<br>\
[Chorus]<br>\
Arm yourself because no one else here will save you<br>\
The odds will betray you<br>\
And I will replace you<br>\
You can't deny the prize, it may never fulfill you<br>\
It longs to kill you<br>\
Are you willing to die?<br>\
The coldest blood runs through my veins<br>\
<br>\
[Bridge]<br>\
Try to hide your hand<br>\
Forget how to feel<br>\
(Forget how to feel)<br>\
Life is gone with just a spin of the wheel<br>\
(Spin of the wheel)<br>\
<br>\
[Chorus]<br>\
Arm yourself because no one else here will save you<br>\
The odds will betray you<br>\
And I will replace you<br>\
You can't deny the prize, it may never fulfill you<br>\
It longs to kill you<br>\
Are you willing to die?<br>\
The coldest blood runs through my veins<br>\
You know my name<br>\
<br>\
[Outro]<br>\
You know my name<br>\
You know my name<br>\
You know my name<br>\
You know my name<br>\
You know my name<br>\
You know my name";
lyricstitle.innerHTML=this.innerHTML;
lyrics.innerHTML=str;
}

function nobody_can_save_me_lyrics() 
{
	if(panelstatus==false)
		return;

	var str="[Verse 1]<br>\
I'm dancing with my demons<br>\
I'm hanging off the edge<br>\
Storm clouds gather beneath me<br>\
Waves break above my head<br>\
Headfirst hallucination<br>\
<br>\
[Pre-Chorus 1]<br>\
I wanna fall wide awake now<br>\
You tell me it's alright<br>\
Tell me I'm forgiven, tonight<br>\
<br>\
[Chorus]<br>\
But nobody can save me now<br>\
I'm holding up a light<br>\
I'm chasing out the darkness inside<br>\
'Cause nobody can save me<br>\
<br>\
[Verse 2]<br>\
Stared into this illusion<br>\
For answers yet to come<br>\
I chose a false solution<br>\
But nobody proved me wrong<br>\
Headfirst hallucination<br>\
<br>\
[Pre-Chorus 2]<br>\
I wanna fall wide awake<br>\
Watch the ground giving way now<br>\
You tell me it's alright<br>\
Tell me I'm forgiven, tonight<br>\
[Chorus]<br>\
But nobody can save me now<br>\
I'm holding up a light<br>\
I'm chasing out the darkness inside<br>\
'Cause nobody can save me<br>\
<br>\
[Bridge]<br>\
Been searching somewhere out there<br>\
For what's been missing right here (I wanna fall wide awake now)<br>\
I've been searching somewhere out there<br>\
For what's been missing right here (I wanna fall wide awake now)<br>\
I wanna fall wide awake now<br>\
So tell me it's alright<br>\
Tell me I'm forgiven, tonight<br>\
<br>\
[Outro]<br>\
And only I can save me now<br>\
I'm holding up a light<br>\
Chasing out the darkness inside<br>\
And I don't wanna let you down<br>\
But only I can save me!<br>\
<br>\
Been searching somewhere out there<br>\
For what's been missing right here";
lyricstitle.innerHTML=this.innerHTML;
lyrics.innerHTML=str;
}	

function a_place_for_my_head_lyrics()
{
	if(panelstatus==false)
		return;

	var str="[Verse 1: Mike Shinoda]<br>\
I watch how the moon sits in the sky in the dark night<br>\
Shining with the light from the sun<br>\
The sun doesn't give light to the moon assuming<br>\
The moon's gonna owe it one<br>\
It makes me think of how you act to me<br>\
You do favors, then rapidly<br>\
Just turn around and start askin' me about<br>\
Things that you want back from me<br>\
<br>\
[Pre-Chorus: Mike Shinoda]<br>\
I'm sick of the tension, sick of the hunger<br>\
Sick of you actin' like I owe you this<br>\
Find another place to feed your greed<br>\
While I find a place to rest<br>\
<br>\
[Chorus: Chester Bennington & Mike Shinoda]<br>\
I wanna be in another place<br>\
I hate when you say you don't understand<br>\
(You'll see it's not meant to be)<br>\
I wanna be in the energy, not with the enemy<br>\
A place for my head<br>\
<br>\
[Verse 2: Mike Shinoda]<br>\
Maybe someday, I'll be just like you and<br>\
Step on people like you do and<br>\
Run away all the people I thought I knew<br>\
I remember back then who you were<br>\
You used to be calm, used to be strong<br>\
Used to be generous, but you shoulda known<br>\
That you'd wear out your welcome<br>\
And now, you see how quiet it is all alone<br>\
[Pre-Chorus: Mike Shinoda]<br>\
I'm so sick of the tension, sick of the hunger<br>\
Sick of you actin' like I owe you this<br>\
Find another place to feed your greed<br>\
While I find a place to rest<br>\
I'm so sick of the tension, sick of the hunger<br>\
Sick of you actin' like I owe you this<br>\
Find another place to feed your greed<br>\
While I find a place to rest<br>\
<br>\
[Chorus: Chester Bennington & Mike Shinoda]<br>\
I wanna be in another place<br>\
I hate when you say you don't understand<br>\
(You'll see it's not meant to be)<br>\
I wanna be in the energy, not with the enemy<br>\
A place for my head<br>\
<br>\
[Interlude: Chester Bennington]<br>\
You try to take the best of me, go away<br>\
You try to take the best of me, go away<br>\
You try to take the best of me, go away<br>\
You try to take the best of me, go away<br>\
<br>\
[Bridge: Chester Bennington]<br>\
You try to take the best of me, go away<br>\
You try to take the best of me, go away<br>\
You try to take the best of me, go away<br>\
You try to take the best of me, go away<br>\
<br>\
[Chorus: Chester Bennington & Mike Shinoda]<br>\
I wanna be in another place<br>\
I hate when you say you don't understand<br>\
(You'll see it's not meant to be)<br>\
I wanna be in the energy, not with the enemy<br>\
A place for my head<br>\
<br>\
[Outro: Chester Bennington & Mike Shinoda]<br>\
Stay away<br>\
I am so sick of the tension, sick of the hunger (Sick)<br>\
Sick of you actin' like I owe you this<br>\
Find another place to feed your greed (Go)<br>\
While I find a place to rest<br>\
I'm so sick of the tension, sick of the hunger (Why?)<br>\
Sick of you actin' like I owe you this<br>\
Find another place to feed your greed (Stay away from me)<br>\
While I find a place to rest";
lyricstitle.innerHTML=this.innerHTML;
lyrics.innerHTML=str;
}

function start_again_lyrics()
{
	if(panelstatus==false)
		return;

	var str="[Chorus: Ryan Tedder]<br>\
Can't I just turn back the clock?<br>\
Forgive my sins<br>\
I just wanna roll my sleeves up<br>\
And start again<br>\
I know that I messed it up<br>\
Time and time again<br>\
I just wanna roll my sleeves up<br>\
And start again<br>\
<br>\
[Verse 1: Ryan Tedder]<br>\
I was switchin' up the lanes<br>\
Steppin' out the frame I'm in<br>\
I was pulling on the reins<br>\
Sick of all the same happenin'<br>\
I swear I was looking for disaster<br>\
Mixed with a bottle of gin<br>\
And just because I come home after<br>\
Doesn't mean you'll take me in<br>\
<br>\
[Pre-Chorus: Ryan Tedder]<br>\
You see my world is spinning like there's nothing below<br>\
You see my world is feeling like it just might explode<br>\
And yes I know it's hard to take it backwards from my mind<br>\
I need to get it right, need to see some light come in<br>\
[Chorus: Ryan Tedder]<br>\
Can't I just turn back the clock?<br>\
Forgive my sins<br>\
I just wanna roll my sleeves up<br>\
And start again<br>\
I know that I messed it up<br>\
Time and time again<br>\
I just wanna roll my sleeves up<br>\
And start again<br>\
<br>\
[Verse 2: Logic]<br>\
Feelin' like maybe I'm unappreciated<br>\
Like my presence in your life has been alleviated<br>\
I feel like everything I've done before is different now<br>\
But I can see clearer than ever from a distance now<br>\
Every day I do it, I been goin' through it<br>\
But you never knew it 'cause I never showed you<br>\
You gave me the world, so I feel I owed you<br>\
I been lookin' through the mirror and that's the old you<br>\
I'ma get it right now, don't know how<br>\
But I promise that we're gonna make it somehow<br>\
I'm all in, it's from the heart again<br>\
Open up your mind and maybe we could start again<br>\
<br>\
[Chorus: Ryan Tedder]<br>\
Can't I just turn back the clock?<br>\
Forgive my sins<br>\
I just wanna roll my sleeves up<br>\
And start again<br>\
I know that I messed it up<br>\
Time and time again<br>\
I just wanna roll my sleeves up<br>\
And start again<br>\
[Refrain: Ryan Tedder]<br>\
Oh-oh-oh, oh-oh-oh<br>\
Oh-oh-oh, oh-oh-oh<br>\
<br>\
[Outro: Ryan Tedder]<br>\
And yes I know it's hard to take it backwards from my mind<br>\
I need to get it right, need to see some light come in<br>\
Can't I just turn back the clock?<br>\
Forgive my sins<br>\
I just wanna roll my sleeves up<br>\
And start again";
lyricstitle.innerHTML=this.innerHTML;
lyrics.innerHTML=str;
}

function waiting_for_the_end_lyrics()
{
	if(panelstatus==false)
		return;

	var str="[Intro: Mike Shinoda]<br>\
This is not the end, this is not the beginning<br>\
Just a voice like a riot rocking every revision<br>\
But you listen to the tone and the violent rhythm<br>\
And though the words sound steady, something empty's within them<br>\
We say yeah, with fists flying up in the air<br>\
Like we're holding onto something that's invisible there<br>\
'Cause we're living at the mercy of the pain and the fear<br>\
Until we dead it, forget it, let it all disappear<br>\
<br>\
[Verse 1: Chester Bennington]<br>\
Waiting for the end to come<br>\
Wishing I had strength to stand<br>\
This is not what I had planned<br>\
It's out of my control<br>\
<br>\
[Verse 2: Chester Bennington]<br>\
Flying at the speed of light<br>\
Thoughts were spinning in my head<br>\
So many things were left unsaid<br>\
It's hard to let you go<br>\
<br>\
[Chorus: Chester Bennington]<br>\
I know what it takes to move on<br>\
I know how it feels to lie<br>\
All I want to do is trade this life for something new<br>\
Holding on to what I haven't got<br>\
[Verse 3: Chester Bennington]<br>\
Sitting in an empty room<br>\
Trying to forget the past<br>\
This was never meant to last<br>\
I wish it wasn't so<br>\
<br>\
[Chorus: Chester Bennington]<br>\
I know what it takes to move on<br>\
I know how it feels to lie<br>\
All I want to do is trade this life for something new<br>\
Holding on to what I haven't got<br>\
<br>\
[Bridge: Mike Shinoda]<br>\
What was left when that fire was gone?<br>\
I thought it felt right, but that right was wrong<br>\
All caught up in the eye of the storm<br>\
And trying to figure out what it's like moving on<br>\
And I don't even know what kind of things I said<br>\
My mouth kept moving and my mind went dead<br>\
So, I'm picking up the pieces now, where to begin<br>\
The hardest part of ending is starting again<br>\
<br>\
[Outro: Chester Bennington & Mike Shinoda]<br>\
All I want to do is trade this life for something new<br>\
Holding on to what I haven't got<br>\
This is not the end, this is not the beginning<br>\
Just a voice like a riot, rocking every revision<br>\
I'm holding on to what I haven't got<br>\
But you listen to the tone and the violent rhythm<br>\
Though the words sound steady<br>\
Something empty's within them<br>\
We say yeah, with fists flying up in the air<br>\
Like we're holding onto something that's invisible there<br>\
Holding on to what I haven't got<br>\
'Cause we're living at the mercy of the pain and the fear<br>\
Until we get it, forget it, let it all disappear";
lyricstitle.innerHTML=this.innerHTML;
lyrics.innerHTML=str;
}

function lost_in_the_echo_lyrics()
{
	if(panelstatus==false)
		return;

	var str="[Intro: Mike Shinoda]<br>\
Yeah, yo<br>\
<br>\
[Verse 1: Mike Shinoda]<br>\
You were that foundation<br>\
Never gonna be another one, no<br>\
I followed, so taken<br>\
So conditioned, I could never let go<br>\
Then sorrow, then sickness<br>\
Then the shock when you flip it on me<br>\
So hollow, so vicious<br>\
So afraid, I couldn't let myself see<br>\
That I could never be held<br>\
Back or up, no, I hold myself<br>\
Check the rep, yep, you know mine well<br>\
Forget the rest, let them know my Hell<br>\
There and back, yet my soul ain't sell<br>\
Kept respect up, the best they fell<br>\
Let the rest be the tale they tell<br>\
That I was there, saying<br>\
<br>\
[Chorus: Chester Bennington]<br>\
In these promises broken, deep below<br>\
Each word gets lost in the echo<br>\
So, one last lie I can see through<br>\
This time, I finally let you go, go, go<br>\
[Verse 2: Mike Shinoda]<br>\
Test my will, test my heart<br>\
Let me tell you how the odds gonna stack up<br>\
Y'all go hard, I go smart<br>\
How's that working out for y'all in the back, huh?<br>\
I've seen that, frustration<br>\
Been crossed and lost and told no<br>\
And I've come back, unshaken<br>\
Let down and lived and let go<br>\
So, you can let it be known<br>\
I don't hold back, I hold my own<br>\
I can't be mapped, I can't be cloned<br>\
I can't C-flat, it ain't my tone<br>\
I can't fall back, I came too far<br>\
Hold myself up and love my scars<br>\
Let the bells ring wherever they are<br>\
'Cause I was there, saying<br>\
<br>\
[Chorus: Chester Bennington]<br>\
In these promises broken, deep below<br>\
Each word gets lost in the echo<br>\
So, one last lie I can see through<br>\
This time, I finally let you go!<br>\
<br>\
[Bridge: Mike Shinoda]<br>\
No, you can tell 'em all now<br>\
I don't back up, I don't back down<br>\
I don't fold up and I don't bow<br>\
I don't roll over, don't know how<br>\
I don't care where the enemies are<br>\
Can't be stopped, all I know, go hard<br>\
Won't forget how I got this far<br>\
For every time, saying<br>\
[Chorus: Chester Bennington]<br>\
In these promises broken deep below<br>\
Each word gets lost in the echo<br>\
So, one last lie I can see through<br>\
This time, I finally let you go, go, go<br>\
Go, go, go, go";
lyricstitle.innerHTML=this.innerHTML;
	lyrics.innerHTML=str;
}

function i_was_never_there_lyrics()
{
	if(panelstatus==false)
		return;

	var str="[Verse]<br>\
What makes a grown man wanna cry?<br>\
(Cry, cry, cry, cry)<br>\
What makes him wanna take his life?<br>\
(Yeah)<br>\
His happiness is never real<br>\
(Real, real, real, real)<br>\
And mindless sex is how he feels, ooh, he heals<br>\
<br>\
[Chorus]<br>\
When it's time, when it's time, when it's time<br>\
It won't matter (it don't matter)<br>\
It won't matter (matter)<br>\
When it's time, when it's time, when it's time (time, it's time, babe)<br>\
It won't matter (it won't matter, babe)<br>\
It won't matter (ya)<br>\
It was like he was never there<br>\
(It was like he was never there)<br>\
It was like he was gone in thin air, oh<br>\
When it's time, when it's time, when it's time, oh, baby<br>\
It won't matter (It won't matter, baby)<br>\
It won't matter<br>\
<br>\
[Post-Chorus]<br>\
When it's time, when it's time, when it's time<br>\
It won't matter<br>\
It won't matter<br>\
When it's time, when it's time, when it's time<br>\
It won't matter<br>\
It won't matter<br>\
It was like he was never there<br>\
It was like he was gone in thin air<br>\
When it's time, when it's time, when it's time<br>\
It won't matter, it won't matter<br>\
[Interlude]<br>\
When it's time, when it's time, when it's time<br>\
It won't matter, it won't matter<br>\
When it's time, when it's time, when it's time<br>\
It won't matter, it won't matter<br>\
<br>\
[Bridge]<br>\
Ooh, now I know what love is<br>\
And I know it ain't you for sure<br>\
You'd rather something toxic<br>\
So, I poison myself again, again<br>\
'Til I feel nothing<br>\
In my soul (in my soul)<br>\
I'm on the edge of something breaking<br>\
I feel my mind is slowly fadin'<br>\
If I keep going, I won't make it<br>\
If I keep going, I won't make it<br>\
<br>\
[Outro]<br>\
And it's all because of you<br>\
It's all because of you<br>\
It's all because of you<br>\
It's all because of you<br>\
Woah, woah<br>\
Don't you, baby, hey<br>\
It won't matter, baby<br>\
Don't you know?<br>\
Don't you know?<br>\
Ooh, no<br>\
";
lyricstitle.innerHTML=this.innerHTML;
	lyrics.innerHTML=str;
}

function what_we_dont_know_lyrics()
{
	if(panelstatus==false)
		return;

	var str="If everything would just stop<br>\
Then maybe I could collect my thoughts<br>\
If everything would stand still<br>\
I could've hidden how lost I feel<br>\
<br>\
I should've said what I hear<br>\
I should've let myself fear<br>\
I should've made myself clear<br>\
<br>\
So this is how we fall apart<br>\
This is how the ending starts<br>\
And when we find we've lost our mark<br>\
We fake what we don't know<br>\
<br>\
I never asked to let go<br>\
I never thought I could sink so low<br>\
I never let myself down<br>\
Until the second I did right now<br>\
<br>\
I should've said what I hear<br>\
I should've let myself fear<br>\
I should've made myself clear<br>\
<br>\
So this is how we fall apart<br>\
This is how the ending starts<br>\
And when we find we've lost our mark<br>\
We fake what we don't know<br>\
<br>\
This is how we fall apart<br>\
This is how the ending starts<br>\
'Cause when our heads betray our hearts<br>\
We fake what we don't know<br>\
<br>\
'Cause all we are is everything we've done<br>\
All we are is how quickly we run<br>\
And all we are<br>\
We are<br>\
<br>\
This is how we fall apart<br>\
But this is how beginnings start<br>\
'Cause when our heads betray our hearts<br>\
We fake what we don't know<br>\
<br>\
And if our doubt begins again<br>\
The answers find us in the end<br>\
So in the meantime we'll pretend<br>\
And fake what we don't know<br>\
<br>\
This is how we fall apart<br>\
But this is how beginnings start<br>\
'Cause when our heads betray our hearts<br>\
We fake what we don't know<br>\
<br>\
And if our doubt begins again<br>\
The answers find us in the end<br>\
So in the meantime we'll pretend<br>\
And fake what we don't know<br>\
";
lyricstitle.innerHTML=this.innerHTML;
	lyrics.innerHTML=str;
}

function twenty_eight_lyrics()
{
	if(panelstatus==false)
		return;

	var str="[Verse 1]<br>\
This house is not a home to you<br>\
But you decide to go ahead and lay down, lay down<br>\
There are no words to describe the depth of your indifference<br>\
'Cause I see you're here to stay<br>\
Should've known to pick my fate<br>\
<br>\
[Chorus]<br>\
I'm so wrong, I'm so wrong<br>\
(To let you in my)<br>\
To let you in my home<br>\
(Now you know where I sleep)<br>\
Now you know where I sleep<br>\
(Never felt so damn weak)<br>\
<br>\
[Verse 2]<br>\
Hey there, lonely girl<br>\
Did you have to tell your friends<br>\
About the way I got you screaming my name?<br>\
Did you have to tell the world?<br>\
Now your girls all wanna fuck<br>\
Girl you could've been the one<br>\
Gotta change my number twice a month<br>\
When you could have simply kept it on the down low<br>\
<br>\
[Chorus]<br>\
I'm so wrong, I'm so wrong<br>\
(To let you in my)<br>\
To let you in my home<br>\
(Now you know where I sleep)<br>\
Now you know where I sleep<br>\
(Never felt so damn weak)<br>\
[Verse 3]<br>\
Baby if I knew you'd be living in my sheets<br>\
I wouldn't have shown you any love<br>\
I would have left you in the club<br>\
You said you don't belong<br>\
You keep saying there's no one<br>\
And there's no where to go<br>\
But who keeps calling on your phone?<br>\
I'm so wrong, I'm so wrong, I'm so wrong<br>\
<br>\
[Chorus]<br>\
I'm so wrong, I'm so wrong<br>\
(To let you in my)<br>\
To let you in my home<br>\
(Now you know where I sleep)<br>\
Now you know where I sleep<br>\
(Never felt so damn weak)<br>\
I'm so wrong, I'm so wrong<br>\
(To let you in my)<br>\
To let you in my home<br>\
(Now you know where I sleep)<br>\
Now you know where I sleep<br>\
(Never felt so damn weak)<br>\
<br>\
[Outro]<br>\
Girl, if your man call your phone again<br>\
Girl, if your man call your phone again<br>\
";
lyricstitle.innerHTML=this.innerHTML;
	lyrics.innerHTML=str;
}

function faith_lyrics()
{
	if(panelstatus==false)
		return;

	var str="[Intro]<br>\
No, no, no, no, no-no<br>\
Ooh<br>\
No, no, no, no, no-no<br>\
Ooh<br>\
<br>\
[Verse 1]<br>\
Light a blunt up with the flame<br>\
Put that cocaine on a plate<br>\
Molly with the purple rain<br>\
'Cause I lost my faith<br>\
So I cut away the pain, uh<br>\
Got it swimming in my veins<br>\
Now my mind is outta place, yeah, uh<br>\
'Cause I lost my faith<br>\
<br>\
[Chorus]<br>\
And I feel everything<br>\
I feel everything from my body to my soul<br>\
No, no<br>\
Well, I feel everything<br>\
When I'm coming down is the most I feel alone<br>\
No, no<br>\
<br>\
[Post-Chorus]<br>\
I've been sober for a year, now it's time for me<br>\
To go back to my old ways, don't you cry for me<br>\
Thought I'd be a better man, but I lied to me and to you<br>\
[Verse 2]<br>\
I take half a Xan' and I still stay awake<br>\
All my demons wanna pull me to my grave<br>\
I choose Vegas if they offer Heaven's gate<br>\
I tried to love, but you know I'd never stay<br>\
I'd never stay<br>\
But if I OD, I want you to OD right beside me<br>\
I want you to follow right behind me<br>\
I want you to hold me while I'm smiling<br>\
While I'm dying<br>\
And if you know me<br>\
When I go missing, you know where to find me<br>\
Driving down the boulevard is blinding<br>\
Always blinded by the desert lights and<br>\
I'm alive when<br>\
<br>\
[Chorus]<br>\
I feel everything<br>\
I feel everything from my body to my soul<br>\
No, no<br>\
Girl, I feel everything<br>\
When I'm coming down is the most I feel alone<br>\
No, no<br>\
<br>\
[Bridge]<br>\
I lost my faith<br>\
I'm losing my religion every day<br>\
Time hasn't been kind to me, I pray<br>\
When I look inside the mirror and see someone I love<br>\
Oh, someone I love<br>\
Faith<br>\
I'm losing my religion every day<br>\
Time hasn't been kind to me, I pray<br>\
When I look inside the mirror and see someone I love<br>\
Oh, someone I love<br>\
[Outro]<br>\
I ended up in the back of a flashing car<br>\
With the city shining on my face<br>\
The lights are blinding me again<br>\
I ended up in the back of a flashing car<br>\
With the city shining on my face<br>\
The lights are blinding me again<br>\
I ended up (I ended up), in the back of a flashing car (Back of a flashing car)<br>\
";
lyricstitle.innerHTML=this.innerHTML;
	lyrics.innerHTML=str;
}

function papercut_lyrics()
{
	if(panelstatus==false)
		return;

	var str="[Verse 1: Mike Shinoda]<br>\
Why does it feel like night today?<br>\
Something in here's not right today<br>\
Why am I so uptight today?<br>\
Paranoia's all I got left<br>\
I don't know what stressed me first<br>\
Or how the pressure was fed<br>\
But I know just what it feels like<br>\
To have a voice in the back of my head<br>\
<br>\
[Pre-Chorus: Mike Shinoda]<br>\
Like a face that I hold inside<br>\
A face that awakes when I close my eyes<br>\
A face that watches every time I lie<br>\
A face that laughs every time I fall<br>\
(And watches everything)<br>\
So I know that when it's time to sink or swim<br>\
That the face inside is here in me<br>\
Right underneath my skin<br>\
<br>\
[Chorus: Chester Bennington & Mike Shinoda]<br>\
It's like I'm paranoid, looking over my back<br>\
It's like a whirlwind inside of my head<br>\
It's like I can't stop what I'm hearing within<br>\
It's like the face inside is right beneath my skin<br>\
[Verse 2: Mike Shinoda]<br>\
I know I've got a face in me<br>\
Points out all my mistakes to me<br>\
You've got a face on the inside, too<br>\
And your paranoia's probably worse<br>\
I don't know what set me off first<br>\
But I know what I can't stand<br>\
Everybody acts like the fact of the matter<br>\
Is I can't add up to what you can<br>\
<br>\
[Pre-Chorus: Mike Shinoda]<br>\
But everybody has a face that they hold inside<br>\
A face that awakes when I close my eyes<br>\
A face that watches every time they lie<br>\
A face that laughs every time they fall<br>\
(And watches everything)<br>\
So you know that when it's time to sink or swim<br>\
That the face inside is watching you, too<br>\
Right inside your skin<br>\
<br>\
[Chorus: Chester Bennington & Mike Shinoda]<br>\
It's like I'm paranoid, looking over my back<br>\
It's like a whirlwind inside of my head<br>\
It's like I can't stop what I'm hearing within<br>\
It's like the face inside is right beneath the skin<br>\
It's like I'm paranoid, looking over my back<br>\
It's like a whirlwind inside of my head<br>\
It's like I can't stop what I'm hearing within<br>\
It's like the face inside is right beneath my skin<br>\
[Refrain: Mike Shinoda]<br>\
The face inside is right beneath your skin<br>\
The face inside is right beneath your skin<br>\
The face inside is right beneath your skin<br>\
<br>\
[Bridge: Chester Bennington]<br>\
The sun goes down<br>\
I feel the light betray me<br>\
The sun goes down<br>\
I feel the light betray me<br>\
<br>\
[Chorus: Chester Bennington & Mike Shinoda]<br>\
(The sun) It's like I'm paranoid, looking over my back<br>\
It's like a whirlwind inside of my head<br>\
It's like I can't stop what I'm hearing within<br>\
It's like the face inside is right beneath the skin (I feel the light betray me)<br>\
(The sun) It's like I'm paranoid, looking over my back<br>\
It's like a whirlwind inside of my head<br>\
It's like I can't stop what I'm hearing within<br>\
It's like I can't stop what I'm hearing within (I feel the light betray me)<br>\
It's like I can't stop what I'm hearing within<br>\
(It's like) It's like the face inside is right beneath my skin<br>\
";
lyricstitle.innerHTML=this.innerHTML;
	lyrics.innerHTML=str;
}

function the_town_lyrics()
{
	if(panelstatus==false)
		return;

	var str="[Hook]<br>\
You did many things<br>\
That I liked, that I liked<br>\
And you like diamond rings<br>\
I can provide, I can provide for you<br>\
You made me feel so good<br>\
Before I left<br>\
On the road<br>\
And you deserve your name<br>\
On a crown, on a throne<br>\
You did many things<br>\
That I liked, that I liked<br>\
And you like diamond rings<br>\
I can provide, I can provide for you<br>\
You made me feel so good<br>\
Before I left<br>\
On the road<br>\
And you deserve your name<br>\
On a crown, on a throne<br>\
<br>\
[Verse 1]<br>\
I haven't been around my town in a long while<br>\
I apologize, but I<br>\
I've been trying to get this money like I got a couple kids who rely<br>\
On me<br>\
But I remember on the bathroom floor<br>\
'Fore I went on tour<br>\
Like you said we couldn't do it again<br>\
Cause you had a thing with some other man<br>\
You said it was love<br>\
And you said you were lost<br>\
Then you wished me good luck<br>\
To find somebody to love<br>\
But, oooh<br>\
Now I've heard that you're single<br>\
And uh huh, I'll give you something to live for<br>\
Yes, I will<br>\
[Verse 2]<br>\
Honey, please<br>\
You never thought you'd ever see my face again<br>\
But your love just swayed the lies<br>\
When he stared into your eyes<br>\
He just might be too good for you<br>\
You're almost dead to him<br>\
You're sleeping with a frozen heart<br>\
Well baby girl it's over now<br>\
And you can always count on me<br>\
Your unshackled boy, unrestrained to touch<br>\
So immune to love<br>\
And it feels so priceless to me<br>\
That you're always free<br>\
That you'll take me in<br>\
Now I'm everything, your everything<br>\
I bet you'll take me in<br>\
I know you'll take me in now<br>\
The same place I left you in (we)<br>\
I bet you'll take me in<br>\
I know you'll take me in, I know you'll take me in<br>\
The same place I left you in<br>\
<br>\
[Breakdown]<br>\
We<br>\
Who?<br>\
Oooh...<br>\
Oooooooh...<br>\
No ho...<br>\
Let her know...<br>\
<br>\
[Hook]<br>\
You did many things<br>\
That I liked, that I liked<br>\
And you like diamond rings<br>\
I can provide, I can provide for you<br>\
You made me feel so good<br>\
Before I left<br>\
On the road<br>\
And you deserve your name<br>\
On a crown, on a throne<br>\
<br>";

	lyricstitle.innerHTML=this.innerHTML;

	lyrics.innerHTML=str;
}

// const growlarger=(p)=>{
// 	p.style.fontSize="0.7em";
// }

function remove_topword(name)
{
	let len=name.length;
	let str=name.slice(0,len-4);
	return str;
}

function responsivetitle() //hovering on title creates golden color 
{
	

	for(let i=0;i<cellstitle.length;i++)
	{
		origin_color=cellstitle[i].style.color;

		cellstitle[i].addEventListener("mouseenter",function(){
			let p=cellstitle[i];
			let cell=cellstitle[i].parentElement;
			p.classList.add("stroke");
			// cell.style.marginLeft="15px";
			// cell.style.marginRight="15px";
		});
		cellstitle[i].addEventListener("mouseleave",function(){
			let p=cellstitle[i];
			p.style.color=origin_color;
			p.classList.remove("stroke");
			// cell.style.marginLeft="25px";
			// cell.style.marginRight="25px";
		});

	}

	




}

responsivetitle();

function responsivetoptitle() //hovering on top title creates golden color and clicking it will generate lyrics
{
	let toptitle=document.getElementById("topcell").children[0];
	let t1=document.getElementById("topcell").children;
	console.log(t1);
	let topvideo=document.getElementById("topcell").children[2].children[1];

	toptitle.addEventListener("mouseenter",function(){
			let p=toptitle;
			let cell=p.parentElement;
			p.classList.add("stroke");
			// cell.style.marginLeft="15px";
			// cell.style.marginRight="15px";
		});
		toptitle.addEventListener("mouseleave",function(){
			let p=toptitle;
			p.style.color=origin_color;
			p.classList.remove("stroke");
			// cell.style.marginLeft="25px";
			// cell.style.marginRight="25px";
		});

		let functionname=topvideo.getAttribute("id");
		// console.log("topvideoid=",functionname);
		functionname=remove_topword(functionname);
		// console.log("removedtopword=",functionname);
		functionname+="_lyrics";
		// console.log("addlyrics=",functionname);
		toptitle.addEventListener("click",window[functionname]); 
}






openbtn.addEventListener("click",openpanel);
closebtn.addEventListener("click",closepanel);

cellstitle[0].addEventListener("click",last_resort_lyrics);
cellstitle[1].addEventListener("click",numb_lyrics);
cellstitle[2].addEventListener("click",you_know_my_name_lyrics);
cellstitle[3].addEventListener("click",nobody_can_save_me_lyrics);
cellstitle[4].addEventListener("click",a_place_for_my_head_lyrics);
cellstitle[5].addEventListener("click",start_again_lyrics);
cellstitle[6].addEventListener("click",waiting_for_the_end_lyrics);
cellstitle[7].addEventListener("click",lost_in_the_echo_lyrics);
cellstitle[8].addEventListener("click",i_was_never_there_lyrics);
cellstitle[9].addEventListener("click",what_we_dont_know_lyrics);
cellstitle[10].addEventListener("click",twenty_eight_lyrics);
cellstitle[11].addEventListener("click",faith_lyrics);
cellstitle[12].addEventListener("click",papercut_lyrics);
cellstitle[13].addEventListener("click",the_town_lyrics);


