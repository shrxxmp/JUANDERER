const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '031f09e4e4mshfb658561c281222p115a75jsn6159f027ad1c',
		'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
	}
};

      async function getLocationDetails(location) {


        let link =
          `https://travel-advisor.p.rapidapi.com/locations/search?query=${location}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`;
        const response = await fetch(link, options);
        let data = await response.json();
        console.log(data)
        

        let txt = "<h6>Search Result for: <span></span></h6>"
                    ;
for (let x in data.data) {
            txt +=` 
          
            <ul class="d-flex">
                        <div class="border shadow-sm rounded" id="thumbmain" onclick="getRestoDetails(${data.data[x].result_object.location_id})">
                            <div>${data.data[x].result_object.location_id}</div>
                                <div class="thumbimg border">
                                    <div class="col-12>
                                </div>
                            </div>
                            <div class="thuminfo">
                                <div>${data.data[x].result_object.name}</div>
                                <div class="d-flex"><p>Rating: </p>${data.data[x].result_object.rating}</div>
                            </div>
                        </div>
                    </ul>`
          }  
                txt += "";
                document.getElementById("content").innerHTML = txt;
      }
  

      async function getRestoDetails(location_id){
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '031f09e4e4mshfb658561c281222p115a75jsn6159f027ad1c',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };
               let link =`https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=${location_id}&restaurant_tagcategory=10591&restaurant_tagcategory_standalone=10591&currency=USD&lunit=km&limit=30&open_now=false&lang=en_US`;
                const response = await fetch(link, options);
                let data = await response.json();
                let txt = "<ul>"
                for (let x in data.data) {
                     if (data.data[x].hasOwnProperty("name")){
                    txt +=` 
                                <div class="main-card row border p-2 shadow rounded mb-3">
                                <div class="card-image col-2 border">
                                    <div class="col-12 border"
                                    style="background-image: url(`
                                    if (data.data[x].hasOwnProperty("photo")){
                                        txt += data.data[x].photo.images.small.url
                                    }
                                    txt += `);
                                            background-size: cover;
                                            height: 200px;">
                                    </div>
                                </div>
                                <div class="col-7">
                                    <h5 class="border-bottom border-3">${data.data[x].name}</h5>
                                    <div class="d-grid gap-4">
                                        <div class="col">
                                            <div class="d-flex gap-5 mt-3 align-items-center">
                                                <div class="gap-2"><i class="fa-solid fa-map-location-dot fa-lg"></i><a class="ps-2">`
                                                if (data.data[x].hasOwnProperty("address_obj")){
                                                    txt += data.data[x].address_obj.street1
                                                }
        
                                                txt += 
                                                `</a></div>
                                                <div class="gap-2"><a>`
                                                if (data.data[x].hasOwnProperty("address_obj")){
                                                    txt += data.data[x].address_obj.city
                                                }
        
                                                txt += 
                                                `</a></div>
                                                <div class="gap-2"><i class="fa-solid fa-store fa-lg"></i> <a class="ps-2">
                                                `
                                                if (data.data[x].hasOwnProperty("category")){
                                                    txt += data.data[x].category.name 
                                                }
                    
                                                txt += 
                                                `
                                                </a></div>
                                            </div>
                                        </div>
                                        <div class="col d-flex gap-5 align-items-center justify-content-between">
                                            <div><i class="fa-solid fa-phone"></i><a class="ps-2">
                                            `
                                            if (data.data[x].hasOwnProperty("phone")){
                                                txt += data.data[x].phone 
                                            }
    
                                            txt += 
                                            `
                                            </a></div>        
                                            <div><i class="fa-solid fa-star"></i><a class="ps-2">
                                            `
                                            if (data.data[x].hasOwnProperty("rating")){
                                                txt += data.data[x].rating 
                                            }
                
                                            txt += 
                                            `
                                            </a></div>
                                            <div><i class="fa-solid fa-tag"></i><a class="ps-2">`
                                            if (data.data[x].hasOwnProperty("price_level")){
                                                txt += data.data[x].price_level
                                            }
                
                                            txt += 
                                            `</a></div>
                                            <div><i class="fa-solid fa-clock"></i><a class="ps-2">`
                                            if (data.data[x].hasOwnProperty("open_now_text")){
                                                txt += data.data[x].open_now_text 
                                            }
                
                                            txt += 
                                            `</a></div>
                                        </div>
                                        <div class="col border-top d-flex align-content-end gap-5">
                                            <div><i class="fa-solid fa-magnifying-glass-location"></i><a class="ps-2" href="${data.data[x].write_review}">Write a Review</a></div>
                                            <div><i class="fa-solid fa-globe"></i><a class="ps-2" href="${data.data[x].web_url}">Website Url</a></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 border">
                                            <h6 class="pb-2">Store Description</h6>
                                   <a pt-4>`
                                    if (data.data[x].hasOwnProperty("description")){
                                        txt += data.data[x].description 
                                    }

                                    txt += 
                                    `</a>
                                </div>
                                </div>
                          `        
                  } console.log(data.data[x]);
                  }
                  txt += "</ul>" 
                  document.getElementById("content").innerHTML = txt;
                  
                 
                
                console.log(data);
    }

document.getElementById('searchbtn').addEventListener("click", function(){
    const search = document.getElementById('searchinput').value;
    getLocationDetails(search);
});
