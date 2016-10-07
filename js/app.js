$(document).ready(function() {

    
 $('form').submit(function (evt) {
   evt.preventDefault();
   $searchField = $('#search'); 
   $submitButton = $('#submit');
   
   $searchField.prop('disabled', true);
   $submitButton.attr('disabled', true).val('Looking...');
   
    // the AJAX part 
    var f = 1; 
    var planetAPI = 'https://swapi.co/api/planets/?page=' + f;
    var planet_search = $('#search').val();
    var planetOptions = {
        search: planet_search
    };
     console.log(planetAPI);
    function displayPlanets(data) {
      var planetHTML;
      $.each(data.results,function(i,planet) {
        planetHTML += '<li class="">';
        planetHTML += '<p class="image">' + planet.name + '</p>';
        planetHTML += '<p>Terrain: ' + planet.terrain + '</p>';  
        planetHTML += '<p>' + planet.population + '</p></li>';
          
        if(planet.films.length > 0) {
            var movieAPI = planet.films;
            
            function displayMovies(movie_data) {
                planetHTML += '<h6>Movie Apperances</h6>';
                planetHTML += '<ul>';
                $.each(movie_data, function(i,movies) {
                    planetHTML += '<li>' + movies.title + '</li>';
                    
                    console.log(movies.title);
                    
                }); //end each movies
                
                $('#planets').html(planetHTML);
                
            }; //end displayMovies() 
            
        } else {
            console.log('No info here!');
        }
        $.getJSON(planet.films, displayMovies);
          
      }); // end each planets
            
      planetHTML += '</ul>';
      $('#planets').html(planetHTML);
      $searchField.prop('disabled', false);
      $submitButton.attr('disabled', false).val('Search');
    }; //end displayPlanets() 
    $.getJSON(planetAPI, planetOptions, displayPlanets);

    $('#next').click(function() {
        if(f < 7) {
            $('#planets').html();
            f++;
            var nextPage = 'https://swapi.co/api/planets/?page=' + f;
            function displayNextPage(response) {
              var planetHtml = '<h3>Planet Page ' + f + '</h3><ul>';
              $.each(response.results,function(i,planet) {
                planetHtml += '<li class="">';
                planetHtml += '<p class="image">' + planet.name + '</p>';
                planetHtml += '<p>Terrain: ' + planet.terrain + '</p>';  
                planetHtml += '<p>' + planet.population + '</p></li>';
                 }); // end each planets
            
              planetHtml += '</ul>';
              $('#planets').html(planetHtml);
              $searchField.prop('disabled', false);
              $submitButton.attr('disabled', false).val('Search');  
            }; //end displatNextPage
            $.getJSON(nextPage, planetOptions, displayNextPage);
        }
    }); //end button next

     
    $('#prev').click(function() {
        if(f > 1) {
            $('#planets').html();
            f--;
            var nextPage = 'https://swapi.co/api/planets/?page=' + f;
            function displayNextPage(response) {
              var planetHTML = '<h3>Planet Page ' + f + '</h3><ul>';
              $.each(response.results,function(i,planet) {
                planetHTML += '<li class="">';
                planetHTML += '<p class="image">' + planet.name + '</p>';
                planetHTML += '<p>Terrain: ' + planet.terrain + '</p>';  
                planetHTML += '<p>' + planet.population + '</p></li>';
                 }); // end each planets
            
              planetHTML += '</ul>';
              $('#planets').html(planetHTML);
              $searchField.prop('disabled', false);
              $submitButton.attr('disabled', false).val('Search');  
            }; //end displatNextPage
            $.getJSON(nextPage, planetOptions, displayNextPage);
        }//end if
      }); //end button prev
 
    }); // end click
    
    
    
    
    $.getJSON('https://swapi.co/api/films/', function films(data){
        var Allfilms = '<ul>';
        $.each(data.results, function(i, filmData) {
            var Ourfilms = filmData.title;
            var characters = filmData.characters;
            
            $.getJSON(characters, function people(p_data) {
               var AllPeople = '<ul>';
                $.each(p_data.results, function(i, person) {
                    var name= person.name;
                    AllPeople += '<li>' + name + '</li>';
                    AllPeople += '</ul>';
                    $('#planets').html(AllPeople);
                }); //end $.each(,person)
            }); //end $.getJSON(,people(p_data))
            
            
            Allfilms += '<li>' + Ourfilms + '</li>';
            Allfilms += '</ul>'
            $('#planets').html(Allfilms);
            console.log(Ourfilms);
        });// end $.each(,filmData)
        
    });//end $.getJSON(,film(data))  
    
    
}); // end ready