$(document).ready(function() {


 $('form').submit(function (evt) {
   evt.preventDefault();
   $searchField = $('#search'); 
   $submitButton = $('#submit');
   
   $searchField.prop('disabled', true);
   $submitButton.attr('disabled', true).val('Looking...');
   
    // the AJAX part 
    var f = 1; 
    var flickerAPI = 'https://swapi.co/api/planets/?page=' + f;
    var animal = $('#search').val();
    var flickrOptions = {
        search: animal
    };
     console.log(flickerAPI);
    function displayPhotos(data) {
      var photoHTML = '<ul>';
      $.each(data.results,function(i,planet) {
        photoHTML += '<li class="">';
        photoHTML += '<p class="image">' + planet.name + '</p>';
        photoHTML += '<p>Terrain: ' + planet.terrain + '</p>';  
        photoHTML += '<p>' + planet.population + '</p></li>';
          
        if(planet.films.length > 0) {
            var movieAPI = planet.films;
            
            function displayMovies(movie_data) {
                photoHTML += '<h6>Movie Apperances</h6>';
                photoHTML += '<ul>';
                $.each(movie_data, function(i,movies) {
                    photoHTML += '<li>' + movies.title + '</li>';
                    
                    console.log(movies);
                }); //end each movies
                photoHTML += '</ul>';
                $('#photos').html(photoHTML);
            }; //end displayMovies() 
        } else {
            console.log('No info here!');
        }
        $.getJSON(movieAPI, flickrOptions, displayMovies);
          
      }); // end each planets
            
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
      $searchField.prop('disabled', false);
      $submitButton.attr('disabled', false).val('Search');
    }; //end displayPhotos() 
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

     $('#next').click(function() {
        if(f < 7) {
            $('#photos').html();
            f++;
            var nextPage = 'https://swapi.co/api/planets/?page=' + f;
            function displayNextPage(response) {
              var photoHTML = '<h3>Planet Page ' + f + '</h3><ul>';
              $.each(response.results,function(i,planet) {
                photoHTML += '<li class="">';
                photoHTML += '<p class="image">' + planet.name + '</p>';
                photoHTML += '<p>Terrain: ' + planet.terrain + '</p>';  
                photoHTML += '<p>' + planet.population + '</p></li>';
                 }); // end each planets
            
              photoHTML += '</ul>';
              $('#photos').html(photoHTML);
              $searchField.prop('disabled', false);
              $submitButton.attr('disabled', false).val('Search');  
            }; //end displatNextPage
            $.getJSON(nextPage, flickrOptions, displayNextPage);
        }
    }); //end button next

     
    $('#prev').click(function() {
        if(f > 1) {
            $('#photos').html();
            f--;
            var nextPage = 'https://swapi.co/api/planets/?page=' + f;
            function displayNextPage(response) {
              var photoHTML = '<h3>Planet Page ' + f + '</h3><ul>';
              $.each(response.results,function(i,planet) {
                photoHTML += '<li class="">';
                photoHTML += '<p class="image">' + planet.name + '</p>';
                photoHTML += '<p>Terrain: ' + planet.terrain + '</p>';  
                photoHTML += '<p>' + planet.population + '</p></li>';
                 }); // end each planets
            
              photoHTML += '</ul>';
              $('#photos').html(photoHTML);
              $searchField.prop('disabled', false);
              $submitButton.attr('disabled', false).val('Search');  
            }; //end displatNextPage
            $.getJSON(nextPage, flickrOptions, displayNextPage);
        }
    }); //end button prev
 
  }); // end click
    
    
}); // end ready