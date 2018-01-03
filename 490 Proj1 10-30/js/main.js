$(document).ready(function(){
    
    

    make_grid(searched_movies);
    $(".grid_view_button").click(function(){
        make_grid(searched_movies);
    });
    $(".list_view_button").click(function(){
        make_list(searched_movies);
    });
    
    $(".search_button").click(find_movies);
    $(".search").on('keyup',search);
    $(".sort_selector").on('change',sort_movies);
    
    $("html").on('click',function(){
        $("#suggestions_box").hide();
     });  
});
//movie data
var movies = movies['movies'];
var searched_movies = [];
searched_movies= searched_movies.concat(movies);

//make the grid of movies, change view buttons
function make_grid(data){
    var template = $("#grid-movie-template").html();
    var html_maker = new htmlMaker(template);
    var html = html_maker.getHTML(data);
    $(".gridMovies").html(html);
    
    setHD(searched_movies,"grid");
    $(".list_view_button").attr("src", "data/list.jpg");
    $(".grid_view_button").attr("src", "data/grid_pressed.jpg");
    return;
}

//make the list of movies, change view buttons
function make_list(data){    
    var template = $("#list-movie-template").html();
    var html_maker = new htmlMaker(template);
    var html = html_maker.getHTML(data);
    $(".gridMovies").html(html);
    
    setHD(searched_movies,"list");
    setRating(searched_movies);
    $(".list_view_button").attr("src", "data/list_pressed.jpg");
    $(".grid_view_button").attr("src", "data/grid.jpg");
    return;
}

function search(){
    
    var html = "";
    var value = $(".search").val();
    var show = false;
    var count = 0;
    for(var i = 0; i<movies.length;++i){
        var start = movies[i].title.toLowerCase().search(value.toLowerCase().trim());
        if (start !== -1){
            count++;
            if(count < 6){
                html += "<div class='sub_suggestions' data-item='" + movies[i].title + "' >";
                html += "<b>" +movies[i].title+ "</b>";
                html += "(" + movies[i].year + "), Starring:" + movies[i].starring;
                html += "</div>";
                show = true;
        }
        }
    }
    if(show){
        $("#suggestions_box").html(html);
        
        $(".sub_suggestions").on('click', function(){
           var item = $(this).attr('data-item');
           $('.search').val(item);
           $('.sub_suggestions').children().css('font-weight','bold');
        });
        $("#suggestions_box").show();
    }
    else
        $('#suggestions_box').hide();
}

//function to load movies matching search text into view
function find_movies(){
    var value = $(".search").val();
    if (searched_movies.length != 0){
            searched_movies = [];
    }
    for(var i = 0; i<movies.length;++i){
        var start = movies[i].title.toLowerCase().search(value.toLowerCase().trim());
        if (start !== -1){
            searched_movies.push(movies[i]);
        }
    }   
    var template = $("#list-movie-template").html();
    var html_maker = new htmlMaker(template);
    var html = html_maker.getHTML(searched_movies);
    if($(".list_view_button").attr("src")== "data/list_pressed.jpg"){
        make_list(searched_movies);
    }
    else
        make_grid(searched_movies);
    
    
}

function sort_movies(){
    var by=$(".sort_selector").val().toLowerCase();
    searched_movies=searched_movies.sort(
            function(a,b){
                if(a[by]<b[by])
                    return -1;
                if(a[by]==b[by])
                    return 0;
                if(a[by]>b[by])
                    return 1;
            }            
            );
    if($(".list_view_button").attr("src")== "data/list_pressed.jpg"){
        make_list(searched_movies);
    }else
        make_grid(searched_movies);
}
//adds HD tags
function setHD(data, type){
    var movies_arr = $(".gridMovies").children();
    for (var i = 0; i< movies_arr.length; i++){
        var temp = movies_arr[i];
        var tag = $(temp).find("img." + type + "hd");
        if (data[i].HD == true){
            tag.attr("style", "display:block;");
        }
    }
}

function setRating(data){
    var movies_arr = $(".gridMovies").children();
    for (var i = 0; i< movies_arr.length; i++){
        
        var temp = movies_arr[i];
        var s = $(temp).find(".listRating");
        var rating = data[i].rating;
        var count = 0;
        s.children().each(function(){
            if (count < rating + 1){
                $(this).attr("src","data/gold_star.png");
            }
            else if (count > rating){
                return false;
            }
            count++;
        });
        count = 0;
        
    }
}
