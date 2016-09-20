var $studentsList = $('.student-list');

//var student = $studentsList.children().first();
//student.css('display', 'none');
var mainPage = $('.page');
var list = $('<ul></ul>').addClass('pagination');
//list.addClass('adasa');
mainPage.append(list);




function createPages(){
    var studentsNumber = $studentsList.children().length;
    var pagesNumber = Math.ceil(studentsNumber/10);
    //console.log(pagesNumber);
    var pagesList = $('<ul></ul>').addClass('pagination');
    mainPage.append(pagesList);
    
    for(var i=0; i<pagesNumber; i++){
        var page = $('<li><a href="#">'+ (i+1) +'</a></li>');
        pagesList.append(page);
    }
}

createPages();


