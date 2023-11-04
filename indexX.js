let obj=JSON.parse(localStorage.getItem("info"));
// console.log(obj);
let ip=obj.ip;
let latitude =obj.latitude;
let longitude =obj.longitude;
let city=obj.city;
let region=obj.region;
let organisation=obj.org;
let hostname=obj.network;

let TimeZone=obj.timezone;
let DateTime=new Date().toLocaleString("en-US",{timeZone:TimeZone});
let postalPin=obj.postal;

document.getElementById("timezone").innerText=TimeZone;
document.getElementById("datetime").innerText=DateTime;
document.getElementById("pincode").innerText=postalPin;

document.getElementById("ip").innerText=ip;
document.getElementById("lat").innerText=latitude;
document.getElementById("long").innerText=longitude;
document.getElementById("city").innerText=city;
document.getElementById("region").innerText=region;
document.getElementById("org").innerText=organisation;
document.getElementById("host").innerText=hostname;


getPostOffices(postalPin);



let input=document.querySelector("input");
input.addEventListener('keyup',(event)=>{
    // console.log(event)
    // console.log(event.keyCode)
    // console.log(event.target.value)
    let value=event.target.value;
    console.log(value)
    let divs=document.querySelectorAll(".Box");

    if(value.length==0){
        for(let i=0;i<divs.length;i++){
            let div=divs[i];
            div.classList.remove("hide");
        } 
    }
    for(let i=0;i<divs.length;i++){
        let div=divs[i];
        let name=div.children[0].children[0].innerText;
        name=name.toLowerCase();
        value=value.toLowerCase();
        let type=div.children[1].children[0].innerText;
        if(!name.includes(value)){
             div.classList.add("hide");
        }else if(name.includes(value)&& div.classList.contains("hide")){
            div.classList.remove("hide")
        }
    }

})


async function getPostOffices(postalPin){
    let response=await  fetch(`https://api.postalpincode.in/pincode/${postalPin}`) 
    let data=await response.json();
  //   console.log(data);
  
    document.getElementById("msg").innerText=data[0].Message;
  
    let mainContainer=document.querySelector(".container")
  
    for(let i=0;i<data[0].PostOffice.length;i++){
       let office=data[0].PostOffice[i];
      let div=document.createElement("div");
      div.className="Box";
      div.innerHTML=`<p>Name:&nbsp;&nbsp;&nbsp; <span>${office.Name}</span></p>
      <p>Branch Type:&nbsp;&nbsp;&nbsp; <span>${office.BranchType}</span></p>
      <p>Delivery Status:&nbsp;&nbsp;&nbsp; <span>${office.DeliveryStatus}</span></p>
      <p>District:&nbsp;&nbsp;&nbsp; <span>${office.District}</span></p>
      <p>Division:&nbsp;&nbsp;&nbsp; <span>${office.Division}</span></p>`
      mainContainer.append(div);
  
    }
   
  }


let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 14,
  });

  let marker=new google.maps.Marker({
    position:{
        lat:latitude,
        lng:longitude
    },
    map:map,
    title:"You are here",
    animation:google.maps.Animation.BOUNCE
  })


}

initMap();