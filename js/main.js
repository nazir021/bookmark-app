//listen for from submit
document.getElementById('myForm').addEventListener('submit',saveBookmarks);

//save Bookmark
function  saveBookmarks (e){
    //Get from values
    let siteName =  document.getElementById('siteName').value;
    let siteUrl =  document.getElementById('siteUrl').value;

    if(!validForm(siteName,siteUrl)){
        return false;
    }

    var bookmark={
        name : siteName,
        url : 'http://'+siteUrl
    }
    
    //local storage test
    // localStorage.setItem('test','Hello World');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');

    if(localStorage.getItem('bookmarks')===null){
        //Init Array
        var bookmarks = [];
        //Add to Array 
        bookmarks.push(bookmark);
        //Set to local Storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }else{
        //Get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmarks to Array
        bookmarks.push(bookmark);
        //Re-set To local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    
    }
    //clear form
    document.getElementById('myForm').reset();

    //Re-fetch
    fetchBookmarks();

    //Prevent from from submitting 
    e.preventDefault();
}
 //Delete Booksmarks 
 function deleteBookmark(url){ 
    //Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through bookmark
    for (let i = 0 ; i<bookmarks.length ; i++){
        if(bookmarks[i].url == url){
            //Remove from Array
            bookmarks.splice(i,1);
        }
    }
    //Re-set To local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    //Re-fetch
    fetchBookmarks();
 }

//fetch bookmarks

function fetchBookmarks(){
    //Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get output id
    let bookmarksResult= document.getElementById('bookmarksResult');

    //Build Output
    bookmarksResult.innerHTML='';
    for (let i =0; i< bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResult.innerHTML +='<div class="well">'+
        '<h3>'+name+'&ensp;'+
        '<a class="btn btn-primary" target="_blank" href="'+url+'">Go</a>'+'&ensp;'+
        '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>'+
        '</h3>'+
        '</div>';    
    }

    
}

function validForm(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert('Please Fill Up the Form');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)){
        alert('Please Enter a valid URL');
        return false;
    }
    return true;

}