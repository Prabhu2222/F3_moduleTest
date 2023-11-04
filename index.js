
        function collectIPAddress() {
            // Your code to collect the IP address goes here
            fetch('https://api64.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    console.log(data.ip);
                    document.getElementById("idSpan").innerText= data.ip;
                    getDetailsInfo(data.ip);   
                })
                .catch(error => console.error('Error:', error));
        }

       async function getDetailsInfo(ip){
          let response=await  fetch(`https://ipapi.co/${ip}/json/`);
          let data=await response.json();
        //   console.log(data)
          localStorage.setItem("info",JSON.stringify(data));

        }

  let button=document.querySelector("button");
  button.addEventListener('click',()=>{
    window.location.href="indexX.html";
  })      

 collectIPAddress();
     
   