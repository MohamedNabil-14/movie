new WOW().init();
let navmenu = $(".navmenu").outerWidth();
let cat = document.querySelectorAll(".category p")
$(document).ready(()=>{
    $(".shadow").addClass("hideee")
    $("body").css("overflow","auto")
})

//---------------------------------------------------------------------nav
$(".centericon").click(function() { 
    let left = $(".contain").css("left")
    if( left < "0"){
        $(".divtoinmate").fadeOut(10)
        $(".contain").animate({left : 0} , 500)
        $(".centericon i").removeClass("fa-bars");
        $(".centericon i").addClass("fa-times");
        showcat()
    }else{
        $(".contain").animate({left : -234.5} , 500)
        let left = $(".contain").css("left")
        $(".centericon i").removeClass("fa-times");
        $(".centericon i").addClass("fa-bars");
        hidecat() 
        $(".divtoinmate").delay(500).fadeIn(0);
        
    }
});

// for show category in nav 
function showcat(){
    $(".category p").eq(0).animate({top:0},500)
    $(".category p").eq(1).delay(100).animate({top:0},500)
    $(".category p").eq(2).delay(200).animate({top:0},500)
    $(".category p").eq(3).delay(300).animate({top:0},500)
    $(".category p").eq(4).delay(400).animate({top:0},500)
    $(".category p").eq(5).delay(500).animate({top:0},500)
}

// for hide category in nav 
function hidecat() {
    $(".category p").eq(0).animate({top:290},200)
    $(".category p").eq(1).animate({top:290},200)
    $(".category p").eq(2).animate({top:290},200)
    $(".category p").eq(3).animate({top:290},200)
    $(".category p").eq(4).animate({top:290},200)
    $(".category p").eq(5).animate({top:290},200)
}

// for hover on category in nav 
cat.forEach(function(ca){
    ca.addEventListener("mouseover" , ()=>{
        $(ca).addClass("border-right")
        $(ca).removeClass("border-left")
    })
    ca.addEventListener("mouseout" , ()=>{
        $(ca).removeClass("border-right")
        $(ca).addClass("border-left")
    })
})
//----------------------------------------------------------------end nav







// ---------------------------------------search
function search(val) {
    let serval = `https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${val}`
    display_items(serval)
    if(val == ""){
        changecat("now_playing")
    }
}


function searchword(val){
    let search = arrayitems.filter((ee)=>{
        if(ee.original_title.includes(val.toUpperCase()))
        {return ee}})
    let lastsearch =search.map(function(arr) {
    return `<div class="col-md-4 col-sm-6 mb-3 wow bounceIn">
    <div  class="dispaly_contain">
    <img src="https://image.tmdb.org/t/p/w500/${arr.poster_path}" class="img-fluid rounded" alt="">
    <div class="detials rounded p-3"></div>
            <div class="textditails text-center px-3">
            <div class="savebtn">
            <i data-id="${arr.id}" class="fas fa-star"></i></div>
                <h4>${arr.original_title}</h4>
                <p style="font-size: 80%">${arr.overview}</p>
                <h4 class="py-3">rate : ${arr.vote_average}</h4>
                <h5>${arr.release_date}</h5>
    </div>
    </div>
    </div>`})
    $(".refoo").html(lastsearch) 
    }

// ---------------------------------- end search








//--------------------display
document.addEventListener("load", changecat("now_playing"))
cat.forEach(function(ca) {
    ca.addEventListener("click",()=>{
       let target =  ca.dataset.id
       if(target == "trending"){
        trending()
       }else{
        changecat(target)
       }
    })
})

function trending(){
    let trend = `https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
    display_items(trend)
    $("html,body").animate({scrollTop:0},500)
}

function changecat(e){
    let gecat = `https://api.themoviedb.org/3/movie/`+e+`?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
    display_items(gecat)
    $("html,body").animate({scrollTop:0},500)
}

// display all items 
async function display_items(targetcat) {
    let x = await fetch (targetcat)
    let array = await x.json()
    globalThis.arrayitems = array.results
    let datatodis = arrayitems.map(function(arr) {
        return `<div class="col-md-4 col-sm-6 mb-5 wow bounceIn">
        <div  class="dispaly_contain">
            <img src="https://image.tmdb.org/t/p/w500/${arr.poster_path}" class="img-fluid rounded" alt="">
            <div class="detials rounded p-3"></div>
            <div class="textditails text-center px-3">
            <div class="savebtn">
            <i data-id="${arr.id}" class="fas fa-star"></i></div>
                <h4>${arr.original_title}</h4>
                <p style="font-size: 80%">${arr.overview}</p>
                <h4 class="py-3">rate : ${arr.vote_average}</h4>
                <h5>${arr.release_date}</h5>
            </div>
        </div>
    </div>`
    })
    $(".refoo").html(datatodis)
    fav()
}

//-------------- end display



// ----------------------------------------regex   

function validtext(inputtar,regex) {
    if(regex.test(inputtar.value)){
        $(inputtar).next().addClass("hideee")
        $(".mybtn").removeClass("disabled")
    }else{
        $(inputtar).next().removeClass("hideee");
        $(".mybtn").addClass("disabled")
    }
}
$(".allinputs input").keyup(function(e) { 
    validtext(e.target,pattern[e.target.attributes.name.value])
});

const pattern= {
    name:/^[a-z\d]{5,12}$/,
    password:/^[\w@-]{8,20}$/,
    rpassword:/^[\w@-]{8,20}$/,
    phone:/^\d{11}$/,
    email:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    age:/^\S[0-9]{0,3}$/
}

// // ----------------------------------------end regex   


// other

$(window).scroll(()=>{
    let scrol = $(window).scrollTop()
    if(scrol > "500" ){
        $(".divtoinmate").addClass("floting")
    }else{
        $(".divtoinmate").removeClass("floting")
    }
})
$(".divtoinmate").click(()=>{
    $("html,body").animate({scrollTop:0},1000)
})





$(".Contactus").click(()=>{
    let Contactoffset = $("#contacusoff").offset().top
    $("html,body").animate({scrollTop:Contactoffset},1000)
})


first()
function first() {
    if (localStorage.getItem("favmovie") == null){
        globalThis.Watchlist = []
        bookdisplay()
    }else{
        globalThis.Watchlist = JSON.parse(localStorage.getItem("favmovie"))
        bookdisplay()
    }
}

function fav(){
    $(".savebtn i").click((e)=>{
        let fav =  $(e.target).data( "id")
        $(e.target).fadeOut(700)
        Watchlist.push(fav)
        lstfilter()
    })
}
function lstfilter(){
    localStorage.setItem("favmovie" , JSON.stringify(Array.from(new Set(Watchlist))))
    first()
}




// ------------------------------------------------------------------------------------------bookmark
let bookWidth = $(".book").outerWidth()
$(".book").css("right" , -bookWidth+13)
$(".after").click(()=>{
    let bookright = $(".book").css("right")
    if(bookright <= "0"){
        $("body").css("overflow","hidden")
        $(".book").animate({right:0},700)
          $(".openclose").removeClass("fa-bookmark");
          $(".openclose").addClass("fa-times-circle");
    }else{
        $(".book").animate({right:-bookWidth+14},700)   
        $(".openclose").addClass("fa-bookmark");
        $(".openclose").removeClass("fa-times-circle");
        $("body").css("overflow","auto")
    }
})

async function bookdisplay() {
    globalThis.moviearray = []
    let hasala = ``
    for(i=0 ; i<Watchlist.length ; i++){
        let x = await fetch (`https://api.themoviedb.org/3/movie/+${Watchlist[i]}+?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
        moviearray.push(await x.json())}

    for(t=0 ; t<moviearray.length ; t++){
        hasala +=`<div class="col-md-4 col-sm-6 mb-3">
        <div  class="dispaly_contain">
            <img src="https://image.tmdb.org/t/p/w500/${moviearray[t].poster_path}" class="img-fluid rounded" alt="">
            <div class="detials rounded p-1"></div>
            <div class="textditails text-center px-3">
                <h5>${moviearray[t].original_title}</h5>
                <div class="deletmovie">
                <i data-id="${moviearray[t].id}" class="fas fa-calendar-times"></i></div>
                <p style="font-size: 80%">${moviearray[t].overview}</p>
                <h4 class="py-1">rate : ${moviearray[t].vote_average}</h4>
                <h5>${moviearray[t].release_date}</h5>
            </div>
        </div>
    </div>`
    }
    $(".bookdisplay").html(hasala)
    calldelet()
}


function calldelet() {
    $(".deletmovie i").click((e)=>{
        let delet =  $(e.target).data("id")
        Watchlist.splice(Watchlist.indexOf(delet),1)
        lstfilter()
    })   
}
$(".clearlocal").click(()=>{
    localStorage.clear()
    first()
})
