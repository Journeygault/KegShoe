window.onload = function(){
    "use strict";

    //VARIABLES FOR CALLING AND DISPLAYING FUNCTION

    var checkStateButton =document.getElementById("checkStateButton");
    var apiInfoHolder = document.getElementById("apiInfoHolder");

    //LISTENERS
    checkStateButton.onclick = apiRequest;

    //FUNCTION

    async function apiRequest(){

        // GET USER INPUTED VALUE
        var infoHolder=document.getElementById("stateInput").value;
        
        // CHECK FOR NULL INPUT
        if(infoHolder === "" || infoHolder === null){
            apiInfoHolder.innerHTML="<p class ='center' style='color:red'>Please enter a state</p>"
        }else{
            // API REQUEST

            //The following api request is specifically for API's by state
            //If A different query is required,
            //change the ?by_state= to ?by_searchVariableHere=
            var request = `https://api.openbrewerydb.org/breweries?by_state=${infoHolder}`;
            var response = await fetch (request);
            var data = await response.json();

            //The following defines what items are in the loop
            var items=data.items;

            // CLEAR DIV BETWEEN SEARCHES
            apiInfoHolder.innerHTML = "";

            // ERROR MESSAGE FOR INVALID U.S. STATE 
            if(data.length===0){
                apiInfoHolder.innerHTML="<p class ='center' style='color:red'>Please enter a valid US state</p>"
            }


            //LOOP TO GET REQUIRED DATA

            //All though I do not use all of this data,
            // I still collected everything I thought could be relevant,
            //this way the code is more easily maintainable in the long run.
            
            for (items in data){
                var id=data[items].id;
                var obdb_id=data[items].obdb_id;
                var name=data[items].name;
                var brewery_type=data[items].brewery_type;
                var street=data[items].street;
                var city=data[items].city;
                var state=data[items].state;
                var county_province=data[items].county_province;
                var postal_code=data[items].postal_code;
                var country=data[items].country;
                var longitude=data[items].longitude;
                var latitude=data[items].latitude;
                var phone=data[items].phone;
                var website_url=data[items].website_url;
                var updated_at=data[items].updated_at;
                var created_at=data[items].created_at;
                // The following variables are for creating the card layouts
                // I'm creating the elements individually to allow for maximum control
                // as well as easy attribute addition and readability
                var card =document.createElement("div");
                var img = document.createElement("img");
                var breweryname = document.createElement("h2");
                var breweryType = document.createElement("p");
                var websiteURL = document.createElement("a");
                var breweryAddressTitle = document.createElement("h3");
                var breweryAddress = document.createElement("p");
                var breweryContactInfoTitle = document.createElement("h3");
                var breweryContactInfo = document.createElement("p");

                //The following is to give default values in case the values provided are null
                if(street === null ||street ==="" || street === false ){
                    street = " Not Provided";
                }
                if(city === null ||city === "" || city === false ){
                    city = " Not Provided";
                }
                if(postal_code === null ||postal_code ==="" || postal_code === false ){
                    postal_code=" Not Provided";
                }
                if(phone === null ||phone === "" || phone === false ){
                    phone = " Not Provided" ;
                }
                if(state === null ||state === "" || state === false ){
                    state = " Not Provided" ;
                }
                //Even though we are searching by state,I still provided a default answers,
                //in case other search parameters are added down the line
                
                //Create a bootstrap card for easy viewing

                card.className = "card";
                apiInfoHolder.appendChild(card);


                // IF STATEMENTS TO PROVIDE DIFFERENT IMAGES BASED ON BREWERY TYPE
                img.className = "img";
                if(brewery_type === "micro" ){
                    img.src = `./images/micro.png`;
                }else if(brewery_type==="planning"){
                    img.src = `./images/planning.png`;
                }else if(brewery_type==="brewpub"){
                    img.src = `./images/brewpub.png`;
                }else if(brewery_type==="large"){
                    img.src = `./images/large.png`;
                }else if(brewery_type==="closed"){
                    img.src = `./images/closed.png`;
                }else {
                    //The following is incase any new brewery types are added down the line
                    img.src = `./images/blank-profile-picture-png.png`;
                }

                card.appendChild(img);

                // TITLE
                breweryname.textContent=name;
                breweryname.className = "title";
                card.appendChild(breweryname);

                // BREWERY TYPE
                breweryType.textContent="Brewery Type: "+brewery_type;
                card.appendChild(breweryType);

                //BREWERY WEBSITE
                if(website_url !== null ||website_url !=="" || website_url !== false ){
                    websiteURL.className = "URL";
                    websiteURL.textContent="Check Out "+ name+ "'s Website";
                    websiteURL.href=website_url;
                    card.appendChild(websiteURL);
                // Else statement for if no website provided
                }else{
                    websiteURL = document.createElement("p");
                    websiteURL.innerHTML="No Website Provided";
                    card.appendChild(websiteURL);
                }

                //ADDRESS TITLE
                breweryAddressTitle.textContent="Address";
                card.appendChild(breweryAddressTitle);
                
                //ADDRESS INFO
                breweryAddress.innerHTML="Street:"+street+"<br>"+"City:"+city+"<br>"+"State:"+state;
                card.appendChild(breweryAddress);
                
                //CONTACT TITLE
                breweryContactInfoTitle.textContent="Contact Info ";
                card.appendChild(breweryContactInfoTitle);

                //CONTACT INFO
                breweryContactInfo.innerHTML="Postal Code: "+postal_code+"<br>"+"Phone:"+phone;
                card.appendChild(breweryContactInfo);
            }
        }
    }
};