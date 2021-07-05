window.addEventListener("load", function() {
   function allnumeric(inputtxt)
   {
      var numbers = /^[0-9]+$/;
      if(inputtxt.value.match(numbers))
      {
      return true;
      }
      else
      {
      return false;
      }
   }

   function alltext(inputtxt)
   {
      var letters = /^[a-zA-Z]+$/;
      if(inputtxt.value.match(letters))
      {
      return true;
      }
      else
      {
      return false;
      }
   }


   function randomNumber(min, max) {
      return Math.random() * (max - min) + min;
   };
   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
               response.json().then( function(json) {
                  let i = Math.floor( randomNumber(0, 5));
                  document.getElementById("missionTarget").innerHTML = `
                  <h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${json[i].name}</li>
                     <li>Diameter: ${json[i].diameter}</li>
                     <li>Star: ${json[i].star}</li>
                     <li>Distance from Earth: ${json[i].distance}</li>
                     <li>Number of Moons: ${json[i].moons}</li>
                  </ol>
                  <img src="${json[i].image}">
                  `;
               });
   });
   let button = document.getElementById("formSubmit");
   function validation (){
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      if (pilotNameInput.value === "" || copilotNameInput.value === ""|| fuelLevelInput.value === ""  || cargoMassInput.value === "" ) {
         alert("All fields are required!");
      }

      if(parseInt(cargoMassInput.value) >= 10000){
         alert("Cargo Mass weight must be under 10,000 KG")
      };

      if(parseInt(fuelLevelInput.value) <= 10000 ){
         alert("Fuel Level  must be above 10,000")
      };

      if(allnumeric(fuelLevelInput) != true || allnumeric(cargoMassInput) != true){
         alert("Fuel Level / Cargo Mass must contain numbers only")
      };

      if(alltext(pilotNameInput) != true || alltext(copilotNameInput) != true){
         alert("Pilot / Co-Pilot name must contain only letters")
      };

      let pStatus = false;
      let cpStatus = false;
      let fStatus = false;
      let cStatus = false;

      if (pilotNameInput.value === ""){
         document.getElementById("pilotStatus").innerHTML = "Pilot Not Ready";
         pStatus = false;
      }else{
         document.getElementById("pilotStatus").innerHTML = "Pilot Ready - " + pilotNameInput.value;
         pStatus = true;
      }

      if (copilotNameInput.value === ""){
         document.getElementById("copilotStatus").innerHTML = "Co-Pilot Not Ready";
         cpStatus = false;
      }else{
         document.getElementById("copilotStatus").innerHTML = "Co-Pilot Ready - " + copilotNameInput.value;
         cpStatus = true;
      }

      if (parseInt(fuelLevelInput.value) >= 10000){
         document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch - " + fuelLevelInput.value;
         fStatus = true;
      }else{
         document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch - " + fuelLevelInput.value;;
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style = "color: red";
         fStatus = false;
      }

      if (parseInt(cargoMassInput.value) <= 10000){
         document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch - " + cargoMassInput.value;
         cStatus = true;
      }else{
         document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch - " + cargoMassInput.value;;
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style = "color: red";
         cStatus = false;
      }

      if (pStatus == true && cpStatus == true && fStatus == true && cStatus == true){
      document.getElementById("launchStatus").innerHTML = "Shuttle ready for launch";
      document.getElementById("launchStatus").style = "color: green";
      }

      document.getElementById("faultyItems").style = "visibility: visible";
   }

   button.addEventListener("click", function(event) {
      event.preventDefault();
      validation();
   });
});

