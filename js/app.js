var $studentsList = $('.student-list');
var studentsNumber;
var mainPage = $('.page');
var pagesNumber;
var originalPagesNumber;
var pagesCreation = 0;
var pageHeader = $('.page-header');
var studentSearch;
var $input;
var message = $('<p><i class="fa fa-frown-o fa-2x" aria-hidden="true"></i>Sorry, there are no matches. Please try different name or email address.<i class="fa fa-frown-o fa-2x" aria-hidden="true"></i></p>').addClass('message');
mainPage.append(message);
message.hide();

function inititalDisplay(){
    studentSearch = $('<div></div>').addClass('student-search');
    $input = $('<input placeholder="Search for students">');
    var $button = $('<button>Search</button>');
    studentSearch.append($input);
    studentSearch.append($button);
    pageHeader.append(studentSearch);

    for(var i=0; i<$studentsList.children().length; i++){
        $('.student-list li').eq(i).hide();
    }
    for(var i=0; i<10; i++){
        $('.student-list li').eq(i).show();
    }
    createPages($studentsList.children().length);
}


function createPages(studentsNumber){
    
    pagesCreation++;
    pagesNumber = Math.ceil(studentsNumber/10);
    if(pagesCreation <= 1){
        originalPagesNumber = pagesNumber;
    }

    var pagesList = $('<ul></ul>').addClass('pagination');
    mainPage.append(pagesList);
    
    for(var i=0; i<pagesNumber; i++){
        var page = $('<li></li>');
        var link = $('<a href="#">'+ (i+1) +'</a>');
        page.append(link);
        pagesList.append(page);
    }
    $('.pagination li a').first().addClass('active');
    $('.pagination li a').click(tenPerPage);
}


function tenPerPage(){

    $('.pagination li a').removeClass('active');
    $(this).addClass('active');

    var blockCounter = 0;
    var pageNumber = parseInt($(this).text());
    var start = (pageNumber * 10) - 10;
    var end = pageNumber * 10;
    
    if($('.pagination').children().length < originalPagesNumber){

        var index = getIndex(pageNumber);
        for(var i=0; i<$studentsList.children().length; i++){
            $('.student-list li').eq(i).hide();

        }
        for(var i = index; i < $studentsList.children().length; i++){
            if($('.student-list li').eq(i).hasClass('block')){
                blockCounter++;
                $('.student-list li').eq(i).css('display', 'block');
            }
            if(blockCounter > 10){
                $('.student-list li').eq(i).hide();
            }
        }
        
    }else{
        for(var i=0; i<$studentsList.children().length; i++){
            $('.student-list li').css('display', 'none');
        }
    
        for(var i = start; i < end; i++){
            $('.student-list li').eq(i).css('display', 'block');
        }
    }
}

function getIndex(pageNumber){
    var blockCounter = 0;
    for(var i = 0; i < $studentsList.children().length; i++){
        if($('.student-list li').eq(i).hasClass('block')){
            blockCounter++;
            }
            if(blockCounter > (pageNumber - 1) * 10){
                return($('.student-list li').eq(i).index());
                break;
            }
        }
}

function search(){
    
    var counter = 0;
    var noMatch = 0;
    var studentsNames = $('.student-list li h3');
    
    for(var i=0; i<$studentsList.children().length; i++){
        if(studentsNames.eq(i).text().indexOf($input.val().toLowerCase()) !== -1){

            $('.student-list li').eq(i).css('display', 'block');
            counter++;
        }else{
            noMatch++;
            $('.student-list li').eq(i).css('display', 'none');
        }
    }
    
    if(noMatch === $studentsList.children().length){
        message.show();
    }else{
        message.hide();
    }
    
    if(counter > 10){
        $('.pagination').detach();
        createPages(counter);
        tenPerPageSearch();
    }else{
        $('.pagination').hide();
        tenPerPageSearch();
    }
    
    if($input.val().length === 0){
        $('.pagination').detach();
        createPages($studentsList.children().length);
    }
}

function tenPerPageSearch(){
    var blockCounter = 0;
    
    for(var i=0; i<$studentsList.children().length; i++){
             $('.student-list li').eq(i).removeClass('block');
    }
    
    for(var i=0; i<$studentsList.children().length; i++){
        if($('.student-list li').eq(i).css('display') === 'block'){
             $('.student-list li').eq(i).addClass('block');
        }
    }
    
    for(var i=0; i<$studentsList.children().length; i++){
        if($('.student-list li').eq(i).css('display') === 'block'){
            blockCounter++;
        }
        if(blockCounter > 10){
            $('.student-list li').eq(i).hide();
        }
    }
}

inititalDisplay();
$('input').on('keyup', search);

