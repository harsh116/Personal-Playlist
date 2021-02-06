let status="off"; //repeat status(off all)

let button=document.getElementsByClassName("repeatbtn")[0];
// let topvideoended=false //true if top video is ended not just paused

function showattopbyindex(position)
{
	let cell=container.children[position];

	let div=cell;
	let topcell=document.getElementById("topcell");
	// console.log("showattop");

	topcell.innerHTML=div.innerHTML;
	topcell.removeChild(topcell.lastChild);


	let topcell1=topcell.children[0];
	let topvideo=topcell.children[1];
	
	let remdiv=document.createElement("div");
	topcell.replaceChild(remdiv,topvideo);

	remdiv.appendChild(addremovebtn());  //adding "remove cell" button inside remdiv tag
	remdiv.classList.add("flexboxright"); //to move cross button to rightmost corner

	let videodiv=document.createElement("div");

	videodiv.appendChild(addprevbutton());
	videodiv.appendChild(topvideo);
	videodiv.appendChild(addnextbutton());

	videodiv.className="flexbox";



	topcell1.setAttribute("id",topcell1.getAttribute("id")+"_top");
	topvideo.setAttribute("id",topvideo.getAttribute("id")+"_top");
	// topcell3.setAttribute("id",topcell3.getAttribute("id")+"_top");
	topcell1.classList.add("pointer");

	topcell.appendChild(videodiv);

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

   

    // topcell2.play();

    // topcell3.textContent= "\u00D7";
    // topcell3.setAttribute("id","removefromtop");

    topvideo.style.width="1024px";
    topvideo.style.height="576px";
    document.body.scrollTop = 350; // For Safari
    document.documentElement.scrollTop = 350; // For Chrome, Firefox, IE and Opera

    topstatus=true;

    // addremoveevent(); //adding "remove cell" event
    responsivetoptitle(); //golden color when hovered and lyrics generated on clicking top title
    // addprevnextbutton(); //add button for next and previous track
    addeventtotrackbutton();  //add events to next and previous track buttons
    // aligntopbuttons(); //align prev next and cross button by shifting them towards left

    if(status==="all")
    {
    	add_ended_topevent();
    }
  


}


function nexttrack() //to play next track by finding video id
{
	let topvideo=document.getElementById("topcell").children[2].children[1];
	let topvideoid;
	

	let index;
	let videoidkey=this.getAttribute("id");

	if(this===topvideo)
	{
		topvideoid=topvideo.getAttribute("id");
		topvideoid=remove_topword(topvideoid);
	}

	let cells=container.children;
	let i;

	for( i=0;i<cells.length;i++)
	{
		let video=cells[i].children[1];
		let videoid=video.getAttribute("id");
		if(this===topvideo)
		{
			videoidkey=topvideoid
		}
		if(videoid===videoidkey)
		{
			index=i;
			break;
		}
	}
	if(i!==cells.length)
		index=(index+1)%cells.length;


	if(this!==topvideo)
	{
		console.log("topplaystatus=false");
		cells[index].children[1].play();
	}
	else
	{
		console.log("topplaystatus=true");
		console.log("index=",index);
		let top_nextid=cells[index].children[1].getAttribute("id")+"_top";
		console.log("top_nextid=".top_nextid);
		removefromtop();
		showattopbyindex(index);
		let videoattop=document.getElementById(top_nextid);
		videoattop.play();
	}


}

function add_ended_event() //add "ended" event to every video
{
	let cells=container.children;
	

	for(let i=0;i<cells.length;i++)
	{
		let video=cells[i].children[1];
		video.addEventListener("ended",nexttrack);
	}
	
	
}

function remove_ended_event()
{
	let cells=container.children;
	

	for(let i=0;i<cells.length;i++)
	{
		let video=cells[i].children[1];
		video.removeEventListener("ended",nexttrack);
	}
	
}


function add_ended_topevent() //add ended event to top video only
{
	let topvideo=document.getElementById("topcell").children[2].children[1];
	topvideo.addEventListener("ended",nexttrack);
}

function remove_ended_topevent()
{
	let topvideo=document.getElementById("topcell").children[2].children[1];
	topvideo.removeEventListener("ended",nexttrack);
}



function repeatoff()
{
	status="off";
	remove_ended_event();

	if(topstatus===true)
	{
		remove_ended_topevent();
	}



}

function repeatall()
{
	status="all";
	add_ended_event();

	if(topstatus===true)
	{
		add_ended_topevent();
	}


}

function repeat()
{


	if(status==="off")
	{
		repeatall();
		button.textContent="Repeat: all";
	}
	else
	{
		repeatoff();
		button.textContent="Repeat: off";
	}
}

function addlistenertobutton(){
	button.addEventListener("click",repeat);
}

addlistenertobutton();

function addprevbutton() //add prev button
{
	

	let prevbtn=document.createElement("button");
	

	let prevtext=document.createTextNode("<");
	

	prevbtn.appendChild(prevtext);
	

	

	

	prevbtn.className="prevtrackbtn";

	return prevbtn;
	
}

function addnextbutton() //add next button
{
	

	
	let nextbtn=document.createElement("button");

	
	let nexttext=document.createTextNode(">");

	
	nextbtn.appendChild(nexttext);

	nextbtn.className="nexttrackbtn";

	return nextbtn;
}

function prevtrackbtn() //function for previous button
{
	let prevbtn=document.getElementsByClassName("prevtrackbtn")[0];
	prevbtn.style.border="none";

	let topvideo=document.getElementById("topcell").children[2].children[1];
	let topvideoid;
	

	let index;
	let videoidkey;

	topvideoid=topvideo.getAttribute("id");
		topvideoid=remove_topword(topvideoid);
		videoidkey=topvideoid
	

	let cells=container.children;
	let i;

	for( i=0;i<cells.length;i++)
	{
		let video=cells[i].children[1];
		let videoid=video.getAttribute("id");
		
		
			
		
		if(videoid===videoidkey)
		{
			index=i;
			break;
		}
	}
	if(index==0)
		index=cells.length-1;
	else
		index-=1;


	
	
		console.log("topplaystatus=true");
		console.log("index=",index);
		let top_nextid=cells[index].children[1].getAttribute("id")+"_top";
		console.log("top_nextid=".top_nextid);
		removefromtop();
		showattopbyindex(index);
		let videoattop=document.getElementById(top_nextid);
		videoattop.play();
	


}

function nexttrackbtn() //function for previous button
{
	let nextbtn=document.getElementsByClassName("nexttrackbtn")[0];
	nextbtn.style.border="none";

	let topvideo=document.getElementById("topcell").children[2].children[1];
	let topvideoid;
	

	let index;
	let videoidkey;

	topvideoid=topvideo.getAttribute("id");
		topvideoid=remove_topword(topvideoid);
		videoidkey=topvideoid;
	

	let cells=container.children;
	let i;

	for( i=0;i<cells.length;i++)
	{
		let video=cells[i].children[1];
		let videoid=video.getAttribute("id");
		
		
			
		
		if(videoid===videoidkey)
		{
			index=i;
			break;
		}
	}
	index=(index+1)%cells.length;


	
	
		console.log("topplaystatus=true");
		console.log("index=",index);
		let top_nextid=cells[index].children[1].getAttribute("id")+"_top";
		console.log("top_nextid=".top_nextid);
		removefromtop();
		showattopbyindex(index);
		let videoattop=document.getElementById(top_nextid);
		videoattop.play();
}

function addeventtotrackbutton()
{
	let prevbtn=document.getElementsByClassName("prevtrackbtn")[0];
	let nextbtn=document.getElementsByClassName("nexttrackbtn")[0];

	prevbtn.addEventListener("click",prevtrackbtn);
	nextbtn.addEventListener("click",nexttrackbtn);
}

