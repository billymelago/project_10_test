$(document).ready(function() {
    

var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");

//An image to overlay
$overlay.append($image);

//A caption to overlay
$overlay.append($caption);

//Add overlay
$("body").append($overlay);
   
    $('.film_list li').click(function() {
        
        $.getJSON('https://swapi.co/api/people/?page=1', function(peopleResponse){
            var people = peopleResponse.results;
            var peopleList = '<ul>';
            $.each(people, function(i, peopleData){
               peopleList += '<li>' + peopleData.name;
                peopleList += '</li>';
            });
            peopleList += '</ul>';
            $('#overlay').html(peopleList);
        });
        $overlay.show();
    });
    $overlay.click(function(){
        $(this).hide();
    });

  $('form').submit(function (e) {
    e.preventDefault();

    var page = 1; 
    var $searchField = $('#search');
    var $submitButton = $('#submit');
    $searchField.prop('disabled', true);
    $submitButton.attr('disabled', true).val('Looking...');

    // Start by getting all of the film data. We do this right away so we
    // don't have to make any more api calls for films.
    $.getJSON('https://swapi.co/api/films/', function (filmResponse) {
      var films = filmResponse.results;

      // Now make the api call for the planet query.
      $.getJSON('https://swapi.co/api/planets/?search=' + page,
        { search: $('#search').val() },
        function(planetResponse) {
          var planetHTML = '<ul>';
          $.each(planetResponse.results, function(i, planet) {
            planetHTML += '<li class="">';
            planetHTML += '<p class="image">' + planet.name + '</p>';
            planetHTML += '<p>Terrain: ' + planet.terrain + '</p>';
            planetHTML += '<p>' + planet.population + '</p>';
            if (planet.films.length) {
              planetHTML += '<h6 class="people_cont">Movie Apperances</h6>';
              planetHTML += '<ul class="people_card">';

              /*
              Iterate over each of the planet's films. This data is a
              list of film urls that looks like this:
              "films": [
                "http://swapi.co/api/films/6/",
                "http://swapi.co/api/films/1/"
              ],
              */
              $.each(planet.films, function(i, filmUrl) {

                // For each film url, find this film in the original films
                // data from the API.
                for (var c = 0; c < films.length; c++) {
                  if (films[c].url === filmUrl) {

                    // If there's a match, add the LI and break.
                    planetHTML += '<li>' + films[c].title + ',';
                      planetHTML += films[c].director + '</li>';
                    break;
                  }
                }
              });
              planetHTML += '</ul>';
            }

            planetHTML += '</li>';
          }); // end each planets

          planetHTML += '</ul>';
          $('#planets').html(planetHTML);
          $searchField.prop('disabled', false);
          $submitButton.attr('disabled', false).val('Search');
          
            $('.people_card').hide();
            $('.people_cont').click(function() {
                $('.people_card').toggle();
            });
          
        });// end planet call
        
        
        
        
        $('#next').click(function() {
    if(page < 7) {
      $('#planets').html();
      page++;
      
      var nextPage = 'https://swapi.co/api/planets/?page=' + page;
      function displayNextPage(response) {
        var planetHTML = '<h3>Planet Page ' + page + ' of 7</h3><ul>';
        $.each(response.results, function(i, planet) {
            planetHTML += '<li class="">';
            planetHTML += '<p class="image">' + planet.name + '</p>';
            planetHTML += '<p>Terrain: ' + planet.terrain + '</p>';
            planetHTML += '<p>' + planet.population + '</p>';

            if (planet.films.length) {
              planetHTML += '<h6 id="people_cont">Movie Apperances</h6>';
              planetHTML += '<ul class="people_card">';

              /*
              Iterate over each of the planet's films. This data is a
              list of film urls that looks like this:
              "films": [
                "http://swapi.co/api/films/6/",
                "http://swapi.co/api/films/1/"
              ],
              */
              $.each(planet.films, function(i, filmUrl) {

                // For each film url, find this film in the original films
                // data from the API.
                for (var c = 0; c < films.length; c++) {
                  if (films[c].url === filmUrl) {

                    // If there's a match, add the LI and break.
                    planetHTML += '<li>' + films[c].title + '</li>';
                    break;
                  }
                }
              });
              planetHTML += '</ul>';
            }

            planetHTML += '</li>';
          }); // end each planets

          planetHTML += '</ul>';
          $('#planets').html(planetHTML);
          $searchField.prop('disabled', false);
          $submitButton.attr('disabled', false).val('Search');
          
            $('.people_card').hide();
            $('#people_cont').click(function() {
                $('.people_card').toggle();
        });
        } //end displayNextPage
      $.getJSON(nextPage, displayNextPage);
    }
  }); //end button next
        
        
    }); //end films call
      
       
      
      
      
  }); //end submit function

  
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

  // Maybe unnecessary?
  //$.getJSON('https://swapi.co/api/films/', function films(data){
  //    var Allfilms = '<ul>';
  //    $.each(data.results, function(i, filmData) {
  //        var Ourfilms = filmData.title;
  //        var characters = filmData.characters;
  //        
  //        $.getJSON(characters, function people(p_data) {
  //           var AllPeople = '<ul>';
  //            $.each(p_data.results, function(i, person) {
  //                var name= person.name;
  //                AllPeople += '<li>' + name + '</li>';
  //                AllPeople += '</ul>';
  //                $('#planets').html(AllPeople);
  //            }); //end $.each(,person)
  //        }); //end $.getJSON(,people(p_data))
  //        
  //        
  //        Allfilms += '<li>' + Ourfilms + '</li>';
  //        Allfilms += '</ul>'
  //        $('#planets').html(Allfilms);
  //        console.log(Ourfilms);
  //    });// end $.each(,filmData)
  //    
  //});//end $.getJSON(,film(data))
    
    
}); // end ready