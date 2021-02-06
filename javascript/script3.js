let qualitystatus="medium";

let lowquality=[
	{
		name: "last_resort",
	 	link: "https://drive.google.com/uc?export=download&id=17tGAeWjScDHPPIx2FWBqolzQaqvneCTB"
	}
	
];

let mediumquality=[

	{
		name: "twenty_eight",
		link: "https://drive.google.com/uc?export=download&id=1qrduxAbtZLGXYq45XdM2HW5ZxuY-dC7q" 
	},
	{
		name: "the_town",
		link:   "https://drive.google.com/uc?export=download&id=1alEqIaaypbmAS2P5aFoVgiis-VIG7MqI"
	},
	{
		name: "lost_in_the_echo",
		link:  "https://drive.google.com/uc?export=download&id=11--hDMx3SHDIkFfSBuJzw8zwYiGYLnOK"
	},
	{
		name: "start_again",
		link:  "https://drive.google.com/uc?export=download&id=14e67INwkwKjw9e8ma2ftv0G5IwVTdWnv"
	},
	{
		name: "last_resort",
		link: "https://drive.google.com/uc?export=download&id=1j3sVMgzLQId9BmJxpC0KMMNu4Rn6mTlu"
	}


];

let highquality=[
	{
		name: "twenty_eight",
		link: "https://drive.google.com/uc?export=download&id=1wRHFXrh1Uxu9C3lBcpCLfY8EuYlsYm9v"
	} ,
	{
		name: "the_town",
		link:   "https://drive.google.com/uc?export=download&id=1ga8KdE7vCWgqylZSeHokvJriv1dN_gfj"
	},
	{
		name: "lost_in_the_echo",
		link:  "https://drive.google.com/uc?export=download&id=1JCDi9zEO8rQNw7zQgks5NpJFIAG6FyV-"
	},
	{	name: "start_again",
		link:  "https://drive.google.com/uc?export=download&id=1j3mwuLl2C7XO3EeF6gdPPD0AE3Zy0qfz"
	}
]

function changelink(video,link)
{

	let videoid=video.getAttribute("id");
	let videoposter=video.getAttribute("poster");
	let source=video.children[0];


	let videosrc=source.getAttribute("src");
	let videotype=source.getAttribute("type");

	let cell=video.parentElement;
	let removebtn=cell.children[2];
	cell.removeChild(video);  //Removing previous video tag


	//Adding new video tag
	 video=document.createElement("video");
	video.setAttribute("id",videoid);
	video.setAttribute("class","border");
	video.setAttribute("width","320");
	video.setAttribute("height","240");
	video.setAttribute("controls","controls");
	video.setAttribute("preload","none");
	video.setAttribute("poster",videoposter);


	source=document.createElement("source")
	source.setAttribute("src",link);
	source.setAttribute("type",videotype);

	video.appendChild(source);
	cell.insertBefore(video,removebtn);

	console.log("video=",video.getAttribute("id"));
	// source.setAttribute("src",link);
	console.log("link=",link);
}

// function returnvideoindex(qualityid){
// 	let cells=container.children;
// 	let i;
// 	for( i=0;i<cells.length;i++)
// 	{
// 		let videoid=cells[i].children[1].getAttribute("id");
// 		if(qualityid===videoid)
// 		{
// 			break;
// 		}

// 	}
// 	return i;

// }

function qualitylow(){
	for(let i=0;i<lowquality.length;i++)
	{
		
		let video=document.getElementById(lowquality[i].name);
		console.log("lowquality name at index ",i,"=",lowquality[i].name)
		// if(lowquality[i].name===playid)
		// {
		// 	playid="";
		// 	video.pause();
		// }
		changelink(video,lowquality[i].link);


	}
}

function qualitymedium(){
	for(let i=0;i<mediumquality.length;i++)
	{
		
		let video=document.getElementById(mediumquality[i].name);
		console.log("mediumquality name at index ",i,"=",mediumquality[i].name);
		if(mediumquality[i].name===playid)
		{
			playid="";
			video.pause();
		}
		changelink(video,mediumquality[i].link);


	}
}

function qualityhigh(){
	for(let i=0;i<highquality.length;i++)
	{
		
		let video=document.getElementById(highquality[i].name);
		console.log("highquality name at index ",i,"=",highquality[i].name);
		if(highquality[i].name===playid)
		{
			playid="";
			video.pause();
		}
		changelink(video,highquality[i].link);


	}
}

function quality(){
	let qualitybtn=document.getElementsByClassName("quality")[0];

	if(qualitystatus==="medium")
	{
		qualitybtn.textContent="Quality: Low";
		qualitylow();
		qualitystatus="low";

	}
	else if(qualitystatus==="low")
	{
		qualitybtn.textContent="Quality: High";	
		qualityhigh();
		qualitystatus="high";
	}
	else{
		qualitybtn.textContent="Quality: Medium";
		qualitymedium();
		qualitystatus="medium";
	}
}

function addlistenerto_qualitybutton()
{
	let qualitybtn=document.getElementsByClassName("quality")[0];
	qualitybtn.addEventListener("click",quality);


}

addlistenerto_qualitybutton();