var $studentsList = $('.student-list');
var studentsNumber;
//var student = $studentsList.children().first();
//student.css('display', 'none');
var mainPage = $('.page');
var list = $('<ul></ul>').addClass('pagination');
//list.addClass('adasa');
mainPage.append(list);

function inititalDisplay(){
    for(var i=0; i<$studentsList.children().length; i++){
        $('.student-list li').css('display', 'none');

    }
    for(var i=0; i<10; i++){
        $('.student-list li').eq(i).css('display', 'block');
    }
    createPages($studentsList.children().length);
}


function createPages(studentsNumber){
    //var studentsNumber = $studentsList.children().length;
    var pagesNumber = Math.ceil(studentsNumber/10);
    //console.log(pagesNumber);
    var pagesList = $('<ul></ul>').addClass('pagination');
    mainPage.append(pagesList);
    
    for(var i=0; i<pagesNumber; i++){
        var page = $('<li></li>');
        var link = '<a href="#">'+ (i+1) +'</a>';
        page.append(link);
        pagesList.append(page);
    }
    console.log(studentsNumber);
}

function tenPerPage(){
    //alert($( this ).text());
    var pageNumber = parseInt($(this).text());
    var start = (pageNumber * 10) - 10;
    var end = pageNumber * 10;
    
    for(var i=0; i<$studentsList.children().length; i++){
        $('.student-list li').css('display', 'none');

    }
    
    for(var i = start; i < end; i++){
        $('.student-list li').eq(i).css('display', 'block');
    }
    
}

inititalDisplay();
$('.pagination li a').on('click', tenPerPage);





