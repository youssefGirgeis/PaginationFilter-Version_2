var $studentsList = $('.student-list');
var studentsNumber;
//var student = $studentsList.children().first();
//student.css('display', 'none');
var mainPage = $('.page');

//list.addClass('adasa');
//mainPage.append(pagesList);
var $input = $('input');

function inititalDisplay(){
    for(var i=0; i<$studentsList.children().length; i++){
        $('.student-list li').css('display', 'none');

    }
    for(var i=0; i<10; i++){
        $('.student-list li').eq(i).css('display', 'block');
    }
    console.log('ini');
    createPages($studentsList.children().length);
}


function createPages(studentsNumber){
    console.log('createpages');
    //var studentsNumber = $studentsList.children().length;
    var pagesNumber = Math.ceil(studentsNumber/10);
    console.log(pagesNumber);
    var pagesList = $('<ul></ul>').addClass('pagination');
    mainPage.append(pagesList);
    
    for(var i=0; i<pagesNumber; i++){
        var page = $('<li></li>');
        var link = $('<a href="#">'+ (i+1) +'</a>');
        page.append(link);
        pagesList.append(page);
    }
    $('.pagination li a').first().addClass('active');
    console.log(studentsNumber);
    $('.pagination li a').click(tenPerPage);
}

function tenPerPage(){
    //alert($( this ).text());
    console.log('tenperpage');
    $('.pagination li a').removeClass('active');
    $(this).addClass('active');
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

function search(){
    
    var counter = 0;
    var studentsNames = $('.student-list li h3');
    //console.log($studentsList);
    
    for(var i=0; i<$studentsList.children().length; i++){
        if(studentsNames.eq(i).text().indexOf($input.val().toLowerCase()) !== -1){
            console.log(studentsNames.eq(i).text());
            $('.student-list li').eq(i).css('display', 'block');
            counter++;
        }else{
            $('.student-list li').eq(i).css('display', 'none');
        }
    }
    
    if(counter > 10){
        $('.pagination').remove();
        createPages(counter);
        tenPerPageSearch();
    }else{
        $('.pagination').hide();
    }
    
    if($input.val().length === 0){
        console.log('empty');
        $('.pagination').remove();
        createPages($studentsList.children().length);
    }
    
}

function tenPerPageSearch(){
    var blockCounter = 0;
    console.log('tenPerPageSearch')
    for(var i=0; i<$studentsList.children().length; i++){
        if($('.student-list li').eq(i).css('display') === 'block'){
            blockCounter++;
            console.log(blockCounter);
        }
        if(blockCounter > 10){
            $('.student-list li').eq(i).css('display', 'none');
        }
    }
}


inititalDisplay();

$('input').on('keyup', search);



