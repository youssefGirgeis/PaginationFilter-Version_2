var $studentsList = $('.student-list'); // all students
var studentsNumber; // number of students in the list
var mainPage = $('.page'); // main page
var pagesNumber; // number of pages
var originalPagesNumber; // number of pages before the search
var pagesCreation = 0; // this is a counter after any new search
var pageHeader = $('.page-header'); 
var studentSearch; // this a div for the input and the button
var $input; 
var message = $('<p><i class="fa fa-frown-o fa-2x" aria-hidden="true"></i>Sorry, there are no matches. Please try different name or email address.<i class="fa fa-frown-o fa-2x" aria-hidden="true"></i></p>').addClass('message'); // when there is no match
mainPage.append(message); //append to the end of the page
message.hide(); // initially hidden.

/* function below for the initial display of students before any search
 and it shows 10 students per page*/

function inititalDisplay(){
    studentSearch = $('<div></div>').addClass('student-search'); // add class student-search to the div
    $input = $('<input placeholder="Search for students">');
    var $button = $('<button>Search</button>');
    studentSearch.append($input); // apppend input to studentSearch div.
    studentSearch.append($button); // append button to studentSearch div.
    pageHeader.append(studentSearch); // append studentSearch div to the header div
    
    /*for loop below to hide all students in the list*/
    for(var i=0; i<$studentsList.children().length; i++){
        $('.student-list li').eq(i).hide();
    }
    /*for loop below to to show the first 10 students in the list*/
    for(var i=0; i<10; i++){
        $('.student-list li').eq(i).show();
    }
    createPages($studentsList.children().length); // call createpages function
}

/*function below is responsible for create the pages based on the number of students*/  
function createPages(studentsNumber){
    
    pagesCreation++; 
    pagesNumber = Math.ceil(studentsNumber/10); // calculate the number of pages.
    
    /*pagesNumber changes after search, originalPagesNumber
    saves the original number of students before the search*/
    if(pagesCreation <= 1){ 
        originalPagesNumber = pagesNumber;
    }
    
    //create new list that contains the number of pages and add class pagination.
    var pagesList = $('<ul></ul>').addClass('pagination');
    mainPage.append(pagesList); // append the new list to mainpage
    
    // this for loop for creation of pages: it creates listitems and links
    // and then append links to listitems, then append listitems to the list(pagesList)
    for(var i=0; i<pagesNumber; i++){
        var page = $('<li></li>'); // create a listitem
        var link = $('<a href="#">'+ (i+1) +'</a>'); // create links
        page.append(link); // append links to listitem
        pagesList.append(page); // append listitem to list
    }
    $('.pagination li a').first().addClass('active'); // set the first number to active
    $('.pagination li a').click(tenPerPage); // when a user click on any number,
    //tenPerPage function gets called.
}

/* function below returns the index of the first block element
for each page after the search*/
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

/*function below displays 10 students per page before search and after*/
function tenPerPage(){

    $('.pagination li a').removeClass('active'); // removes active class from all links
    $(this).addClass('active'); // add class active the link(number) that user clicked.

    var blockCounter = 0; // this variable is counter for listitems with a diplay as block
    var pageNumber = parseInt($(this).text()); // the number of the page
    var start = (pageNumber * 10) - 10; // is the index of the first student out of 10
    var end = pageNumber * 10; // is the index of the last student out of 10
    
    
    // if condition checks if search happened.
    if($('.pagination').children().length < originalPagesNumber){

        var index = getIndex(pageNumber); // get the index of the first block element
        for(var i=0; i<$studentsList.children().length; i++){ // hide all students
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
        
    }else{ // if no search then, hide all and display based on the page number.
        for(var i=0; i<$studentsList.children().length; i++){
            $('.student-list li').css('display', 'none');
        }
    
        for(var i = start; i < end; i++){
            $('.student-list li').eq(i).css('display', 'block');
        }
    }
}

function search(){
    
    var counter = 0; // how many matches
    var noMatch = 0; // counts unmatched students
    var studentsNames = $('.student-list li h3'); // all students names
    var studentsEmails = $('.student-list li .email'); // all students emails
    
    for(var i=0; i<$studentsList.children().length; i++){
        var n = $('.student-list li .email').eq(i).text().indexOf('@'); //index of @
        
        //line below to get email address
        var email = $('.student-list li .email').eq(i).text().substring(0, n);
        
        // if condition to check names and email adresses
        if(studentsNames.eq(i).text().indexOf($input.val().toLowerCase()) !== -1 || email.indexOf($input.val().toLowerCase()) !== -1){

            $('.student-list li').eq(i).css('display', 'block');// display if input matches
            counter++;
        }else{
            noMatch++;
            $('.student-list li').eq(i).css('display', 'none'); // dont diplay if input doesnt match
        }
    }
    
    if(noMatch === $studentsList.children().length){ //if no matches at all, then we diplay the message
        message.show();
    }else{
        message.hide();
    }
    
    if(counter > 10){ // if number of matches > 10 then,
        $('.pagination').detach(); // remove the original pages.
        createPages(counter); // call creates pages to create new pages, where counter = number of students
        tenPerPageSearch(); // this function is the initial display after the search which displays the first 10 students after the search.
    }else{ // if matches less than 10 then,
        $('.pagination').hide(); // hide number of pages
        tenPerPageSearch(); // call this function
    }
    
    if($input.val().length === 0){ // if the user erases what entered = input is empty
        $('.pagination').detach(); // remove number pf pages
        createPages($studentsList.children().length); // back to initial display
    }
}

// this function is the initial display after the search which displays the first 10 students after the search.
function tenPerPageSearch(){
    var blockCounter = 0; // counter for listitems with display block.
    
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

