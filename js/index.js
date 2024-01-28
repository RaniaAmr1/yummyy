
let rowData = document.getElementById("rowData")

let searchbtn = document.getElementById("searchbtn")

let submitbtn 

$(document).ready(()=>{
   getsearch("").then(()=>{
      $(".inner-loading-screen").fadeOut(300);
      $("body").css("overflow" , "visible");
   
      
   })
   
})

function openside(){
    $(".nav-menu ").animate({left:0} , 300)
 
    $(".close-open-icon").removeClass("fa-align-justify")
    $(".close-open-icon").addClass("fa-x")

    
   

    for(let i=0 ; i<5 ; i++)
    {
      $(".nav-links li").eq(i).animate({
         top:0
      } ,(i+5)*100)
    }

}
function closeside(){
    let boxwidth = $(".nav-menu .nav-tab").outerWidth()
    $(".nav-menu ").animate({left:-boxwidth} , 300)
  
    $(".close-open-icon").addClass("fa-align-justify")
    $(".close-open-icon").removeClass(" fa-x")

    $(".nav-links li").animate({top:300} ,500)
}

closeside()

$(".nav-menu i.close-open-icon").click(()=>{
   
   if($(".nav-menu").css("left") == "0px")
   {
     closeside()
   }
   else{
      openside()
   }
  
})


function display(arr){
    let cartoona ='';
    for(let i=0 ; i<arr.length ; i++)
    {
      cartoona += `
      <div class="col-md-3">
      <div onclick="getdetailsMeal('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
         <img class="w-100 bg-info" src="${arr[i].strMealThumb}" >
         <div class="meal-layer position-absolute d-flex align-items-center text-black cursor-pointer">
            <h3>${arr[i].strMeal}</h3>
         </div>
      </div>
   </div>
      `
    }
   rowData.innerHTML = cartoona;
}



async function getcategory(){
   rowData.innerHTML=""
   $(".inner-loading-screen").fadeIn(500);
    searchbtn.innerHTML ="";
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)

    let response = await api.json()

    

    displaycategory(response.categories)

    $(".inner-loading-screen").fadeOut(500);
}

function displaycategory(arr){
    let cartoona =``
    for(let i=0 ; i<arr.length ; i++)
    {
        cartoona += `
        <div class="col-md-3">
        <div onclick="getcategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2">
           <img class="w-100 " src="${arr[i].strCategoryThumb }" >
           <div class="meal-layer position-absolute  text-center text-black p-2 cursor-pointer">
              <h3>${arr[i].strCategory}</h3>
              <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
           </div>
        </div>
     </div>
        `

    }
    rowData.innerHTML =cartoona;
}

async function getarea()
{
   rowData.innerHTML=""
   $(".inner-loading-screen").fadeIn(500);
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let response = await api.json()

    

    displayarea(response.meals)
    $(".inner-loading-screen").fadeOut(500);
}


function displayarea(arr){
    let cartoona='';
    for(let i=0 ; i<arr.length ; i++)
    {
        cartoona += `
        <div class="col-md-3">
        <div onclick="getareaMeals('${arr[i].strArea}')" class="text-center rounded-2">
          
              <h3>${arr[i].strArea}</h3>
            
              <i class="fa-solid fa-house-laptop fa-2x cursor-pointer"></i>
        </div>
     </div>
        `

    }
    rowData.innerHTML =cartoona;
}



async function getIngredients()
{
   rowData.innerHTML=""
   $(".inner-loading-screen").fadeIn(500);
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let response = await api.json()

   
    
    displayIngredients(response.meals.slice(0,20))
    $(".inner-loading-screen").fadeOut(500);
}

async function displayIngredients(arr){
    let cartoona='';
    for(let i=0 ; i<arr.length ; i++)
    {
        cartoona += `
        <div class="col-md-3">
        <div onclick="getingredientsMeals('${arr[i].strIngredient}')" class="text-center rounded-2">
             <i class="fa-solid fa-drumstick-bite fa-4x cursor-pointer "></i>
              <h3>${arr[i].strIngredient}</h3>
            
              <p>${arr[i].strDescription.split(" ").slice(0 , 20).join(" ")}</p>
        </div>
     </div>
        `

    }
    rowData.innerHTML =cartoona;
}

async function getcategoryMeals(category)
{
   rowData.innerHTML=""
   $(".inner-loading-screen").fadeIn(500);
    
  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)

  let response = await api.json()


  display(response.meals.slice(0,20))
  $(".inner-loading-screen").fadeOut(500);

}


async function getareaMeals(area)
{
   rowData.innerHTML=""
   $(".inner-loading-screen").fadeIn(500);

    
  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)

  let response = await api.json()


  display(response.meals.slice(0,20))
  $(".inner-loading-screen").fadeOut(500);

}


async function getingredientsMeals(gred)
{
   rowData.innerHTML=""
   $(".inner-loading-screen").fadeIn(500);

    searchbtn.innerHTML="";
  let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${gred}`)

  let response = await api.json()


  display(response.meals)
  $(".inner-loading-screen").fadeOut(500);

}


async function getdetailsMeal(mealId)
{  
   rowData.innerHTML=""
   $(".inner-loading-screen").fadeIn(500);

    searchbtn.innerHTML="";
  
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)

    let response = await api.json()

   
    displaydetails(response.meals[0])
    $(".inner-loading-screen").fadeOut(500);
  
}


function displaydetails(meal){
      let getIngredient =[]
       for(let i=1 ; i<=20 ; i++)
       {
         if(meal[`strIngredient${i}`]){
            getIngredient +=`<li class="alert alert-danger m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
            
         }
       }

       let tags = meal.strTags?.split(" , ")
       if(!tags) tags=[]
        let tagsrc =``
       for(let i=0 ; i < tags.length ; i++)
       {
         tagsrc += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`

       }
      
        let cartoona = `
        <div class="col-md-4">
         <img src="${meal.strMealThumb}" class="w-100 rounded-2">
            <p>Brown stew chicken</p>
       </div>
       <div class="col-md-8">
         <h1>Instrucations</h1>
         <p>${meal.strInstructions}</p>
         <h3><span class="fw-bolder">Area:</span>${meal.strArea}</h3>
         <h3><span class="fw-bolder">Category:</span>${meal.strCategory}</h3>
         <h3>Recpies :</h3>
         <ul class="list-unstyled d-flex flex-wrap g-3">
          ${getIngredient}
         </ul>
         <h3>tags :</h3>
         <ul class="list-unstyled d-flex g-3">
           ${tagsrc}
         </ul>
         <a target="_blank" href="${meal.strSource}" class="btn btn-success">source</a>
         <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">YouTube</a>
       </div>
        
        
        `
        rowData.innerHTML=cartoona;
}
 

function search(){ 
    searchbtn.innerHTML =  `
    <div class="row py-2 ">
    <div class="col-md-6 ">
       <input onkeyup="getsearch(this.value)" class="form-control bg-transparent text-white"  type="text" placeholder="Search By Name">
    </div>

    <div class="col-md-6">
       <input onkeyup="getletter(this.value)" maxlength="1" class="form-control bg-transparent" type="text" placeholder="Search By Frist Letter">
    </div>
 </div>
 `
  
  rowData.innerHTML=""
}


async function getsearch(term)
{
   rowData.innerHTML=""
   $(".inner-loading-screen").fadeIn(500);

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)

    let response = await api.json()
   response.meals ?  display(response.meals) : display([])
   $(".inner-loading-screen").fadeOut(500);

   
}


async function getletter(term)
{  
   rowData.innerHTML=""
   $(".inner-loading-screen").fadeIn(500);

    term == "" ? term = "a" : "";
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)

    let response = await api.json()

   response.meals ? display(response.meals) : display([])
   $(".inner-loading-screen").fadeOut(500);

}

function showcontacts(){
   rowData.innerHTML =`<div class="contact min-vh-100 d-flex justify-content-center align-items-center ">
   <div class="container w-75  text-center">
      <div class="row g-4">
         <div class="col-md-6">
            <input id="nameInput"  onkeyup="inputsvalidation()"   type="text" class="form-control" placeholder="Enter Your Name">
            <div id="namealert" class="alert alert-danger w-100 mt-2 d-none">
              special characters and number not allowed
            </div>
         </div>

         <div class="col-md-6">
            <input id="emailInput" onkeyup="inputsvalidation()"  type="email" class="form-control" placeholder="Enter Your Email">
            <div id="emailalert" class="alert alert-danger w-100 mt-2 d-none">
              email not valid *ex@yyy.zzz
            </div>
         </div>

         <div class="col-md-6">
            <input id="phoneInput" onkeyup="inputsvalidation()"   type="number" class="form-control" placeholder="Enter Your phone">
            <div id="phonealert" class="alert alert-danger w-100 mt-2 d-none">
            phone not valid
          </div>
         </div>
         
         <div class="col-md-6">
            <input id="ageInput" onkeyup="inputsvalidation()"  type="number" class="form-control" placeholder="Enter Your age">
            <div  id="agealert" class="alert alert-danger w-100 mt-2 d-none">
            age not valid
           </div>
         </div>

         <div class="col-md-6">
            <input id="passwordInput" onkeyup="inputsvalidation()"  type="password" class="form-control" placeholder="Enter Your password">
            <div id="passwordalert" class="alert alert-danger w-100 mt-2 d-none">
            password not valid
          </div>
         </div>

         <div class="col-md-6">
            <input id="repasswordInput" onkeyup="inputsvalidation()"  type="password" class="form-control" placeholder=" Repassword">
            <div id="repasswordalert" class="alert alert-danger w-100 mt-2 d-none">
            repassword not valid
            </div>
         </div>
         
      </div>
      <button id="submitbtn" disabled class="btn btn-outline-info mt-3">Submit</button>
   </div>
 </div> `
 submitbtn = document.getElementById("submitbtn")

document.getElementById("nameInput").addEventListener("focus" ,()=>{
   nameInputTouched = true
})

document.getElementById("emailInput").addEventListener("focus" ,()=>{
   emailInputTouched = true
})

document.getElementById("phoneInput").addEventListener("focus" ,()=>{
   phoneInputTouched = true
})

document.getElementById("ageInput").addEventListener("focus" ,()=>{
   ageInputTouched = true
})

document.getElementById("passwordInput").addEventListener("focus" ,()=>{
   passwordInputTouched = true
})

document.getElementById("repasswordInput").addEventListener("focus" , ()=>{
   repasswordInputTouched = true
})
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;



function inputsvalidation(){
   if(nameInputTouched){
      if(nameInput()) {
         document.getElementById("namealert").classList.replace("d-block" , "d-none")
      }else{
         document.getElementById("namealert").classList.replace("d-none" , "d-block" )
   
      }
   }
      
   

   if(emailInputTouched){
      if(emailInput())
      {
         document.getElementById("emailalert").classList.replace("d-block" , "d-none")
      }else{
         document.getElementById("emailalert").classList.replace("d-none" , "d-block" )
   
      }
   }


   if(phoneInputTouched){
      if(phoneInput())
   {
      document.getElementById("phonealert").classList.replace("d-block" , "d-none")
   }else{
      document.getElementById("phonealert").classList.replace("d-none" , "d-block" )

   }
   }


   if(ageInputTouched){
      if(ageInput())
   {
      document.getElementById("agealert").classList.replace("d-block" , "d-none")
   }else{
      document.getElementById("agealert").classList.replace("d-none" , "d-block" )

   }
   }

  if(passwordInputTouched){
   if(passwordInput())
   {
      document.getElementById("passwordalert").classList.replace("d-block" , "d-none")
   }else{
      document.getElementById("passwordalert").classList.replace("d-none" , "d-block" )

   }
  }

  if(repasswordInputTouched){
   if(repasswordInput())
   {
      document.getElementById("repasswordalert").classList.replace("d-block" , "d-none")
   }else{
      document.getElementById("repasswordalert").classList.replace("d-none" , "d-block" )

   }
  }


    if( nameInput() &&
    emailInput() &&
    phoneInput() &&
    ageInput() &&
    passwordInput() &&
    repasswordInput() ){
      submitbtn.removeAttribute("disabled")
    }else{
      submitbtn.setAttribute("disabled" , true)
    }
    
}



function nameInput(){
   return (/^[a-zA-Z ]+$/.test( document.getElementById("nameInput").value))
}

function emailInput(){
   return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( document.getElementById("emailInput").value))
}

function phoneInput(){
   return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test( document.getElementById("phoneInput").value))
}

function ageInput(){
   return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test( document.getElementById("ageInput").value))
}

function passwordInput(){
   return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test( document.getElementById("passwordInput").value))
}

function repasswordInput(){
   return  document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}