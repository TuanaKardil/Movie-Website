const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2VlYTgxYWYwNDM4MjExYWVhZDRmOWI5YTA1ZWM3OCIsInN1YiI6IjY0ZjZjZjRkYThiMmNhMDBjNGFjNzc4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oeJ28_HU6_wCqlzsA5EbtAvZJ7uMxKVZoStRiXu7g4E'
  }
};
var x = new URLSearchParams(window.location.search)
var y = String( x.get("id"))
fetch('https://api.themoviedb.org/3/movie/'+y, options)
  .then(response => response.json())
  .then(data => {
   let movieName = data["title"]
   let rating=data["vote_average"]
   let date=data["release_date"];
   let tagline=data["tagline"];
   let overview=data["overview"];
   let budget=data["budget"];

   let posterPath=data["poster_path"];
   let imageURL='https://image.tmdb.org/t/p/original'+posterPath;
   document.getElementById("poster-field").src=imageURL;


   var genres="";
   for(var i=0;i<data["genres"].length;i++){
    if(i==data["genres"].length-1){
      genres+=data["genres"][i]["name"];
    }else{
      genres+=data["genres"][i]["name"]+" / ";
    }
    
   }
   prepareValue("movie-name-field","🎥"+movieName)
   prepareValue("rating-field","⭐"+rating)
   prepareValue("release-date-field","("+date+")");
   prepareValue("tagline-field",tagline);
   prepareValue("overview-field",overview);
   prepareValue("budget-field","💸Budget: $"+budget);
   prepareValue("genres-field","🍿Genres: "+genres);
   
  })

  fetch('https://api.themoviedb.org/3/movie/'+y+'/credits', options)
  .then(response => response.json())
  .then(data => {
    for(var i=0;i<8;i++){
      let name=data["cast"][i]["name"];
      let character=data["cast"][i]["character"];
      let profilePath=data["cast"][i]["profile_path"];
      let profileURL='https://image.tmdb.org/t/p/original'+profilePath;

      let characterContainer=document.getElementById("character-container-field");
      let characterBox=createElementWithClass("div","character-box");
      characterContainer.appendChild(characterBox);
      characterBox.innerHTML=`
      <div class="character-image">
        <img id="profile-field" src=${profileURL} alt="" height="200px">
          </div>
          <div class="character-name">
            <p>${name}</p>
            <p class="nickname">(${character})</p>
          </div>
      `
    }
  })


  fetch('https://api.themoviedb.org/3/movie/'+y+'/reviews', options)
  .then(response => response.json())
  .then(data => {
    for(var i=0;i<data["results"].length;i++){
      let username=data["results"][i]["author_details"]["username"];
      let rating=data["results"][i]["author_details"]["rating"];
      let content=data["results"][i]["content"];
      let avatarPath=data["results"][i]["author_details"]["avatar_path"];
      if(avatarPath==null){
        var avatarURL='./profile-pic.webp';
      }else{
        var avatarURL='https://image.tmdb.org/t/p/original'+avatarPath;
      }

      let reviewContainer=document.getElementById("review-container-field");
      let reviewBox=createElementWithClass("div","review-box");
      reviewContainer.appendChild(reviewBox);
      reviewBox.innerHTML=`
      <div class="user-review-info">
            <div class="user-image-box">
              <img src=${avatarURL} alt="" height="10px">
            </div>
            <div class="username">
              <p>${username}</p>
            </div>
            <div class="user-rating">
              <p>⭐${rating}</p>
            </div>
          </div>
          <div class="user-review-content">
            <p>${content.length>300?content.substring(0,300) +"...":content}</p>
          </div>
      `
    }

  })




  fetch('https://api.themoviedb.org/3/movie/'+y+'/similar', options)
  .then(response => response.json())
  .then(data => {
    for(var i=0;data["results"].length;i++){
      let title=data["results"][i]["title"];
      let rating=data["results"][i]["vote_average"];
      var similarPosterPath=data["results"][i]["poster_path"];

      if(similarPosterPath==null){
        var similarPosterURL='./profile-pic.webp';
      }else{
        var similarPosterURL='https://image.tmdb.org/t/p/original'+similarPosterPath;
      }

      let similarTitleField=document.getElementById("similar-title-field");
      similarTitleField.innerHTML=`
      <h2>You may also like</h2>
      `

      let similarContainer=document.getElementById("similar-container-field");
      let similarBox=createElementWithClass("div","similar-box");
      similarContainer.appendChild(similarBox);
      similarBox.innerHTML=`
      <div class="similar-image">
            <img src=${similarPosterURL} alt="" height="300px" width="250px">
          </div>
          <div class="similar-info">
            <p id="name">${title}</p>
            <p id="rating">⭐${rating}</p>
          </div>
      `
    }
  })







  function prepareValue(p1, p2){
    document.getElementById(p1).innerHTML=p2
  }


  function createElementWithId(tag, id) {
    const element = document.createElement(tag);
    element.setAttribute("id", id);
    return element;
  }

  function createElementWithClass(tag, class_name) {
    const element = document.createElement(tag);
    element.setAttribute("class", class_name);
    return element;
  }