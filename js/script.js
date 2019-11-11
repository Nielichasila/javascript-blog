'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
});*/
const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!'); 
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
}
const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles',
      optArticleTagsSelector = '.post-tags .list',
      optArticleAuthorSelector = '.post-author',
      optTagsListSelector = '.tags.list'; 

function generateTitleLinks(customSelector = ''){
    const titleList = document.querySelector(optTitleListSelector);
    console.log('titleList', titleList);
    titleList.innerHTML = '';   
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for(let article of articles){        
        const articleId = article.getAttribute('id'); 
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;   
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        html = html + linkHTML;
    }
    titleList.innerHTML = html;
}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');
for(let link of links){
    link.addEventListener('click', titleClickHandler);
}

function calculateTagsParams(tags) {
    const params = {
        max: 0, 
        min: 999999
    }
        for(let tag in tags){
        console.log(tag + ' is used ' + tags[tag] + ' times');
    }
        if(tags[tag] > params.max){
        params.max = tags[tag];
        }if(tags[tag] < params.min){
        params.min = tags[tag];
    }
return params;
}

function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    const articles =  document.querySelectorAll(optArticleSelector);
    for(let article of articles){
        const tagsList = article.querySelector(optArticleTagsSelector);
        let html = '';
        const articleTags = article.getAttribute('data-tags');
        const articleTagsArray = articleTags.split(' ');
        console.log('articleTagsArray' , articleTagsArray);
        for(let tag of articleTagsArray){ 
            const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
            html = html + linkHTML;
            /* [NEW] check if this link is NOT already in allTags */
            if(!allTags.hasOwnProperty(tag)) {
            /* [NEW] add generated code to allTags array */
                allTags[tag] = 1;
            }else {
                allTags[tag]++;
            }
        }
        tagsList.innerHTML = html;
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    let allTagsHTML = ' ';
    /* [NEW] START LOOP: for each tag for allTags: */
    for(let tag in allTags) {
    /* [NEW] Generate code of a link and add it to allTagsHTML */
        allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')' + '</a></li>';
    /*[NEW] END LOOP for each tag for allTags: */
    }
    /* [NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for(let activeTag of activeTags) {
        /* remove class active */
        activeTag.classList.remove('active');
        /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks){
        /* add class active */
        tagLink.classList.add('active');
        /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll(optArticleTagsSelector+ ' a');
    /* START LOOP: for each link */
    for(let tag of tagLinks){
        /* add tagClickHandler as event listener for that link */
        tag.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
    }
}
    addClickListenersToTags();


function generateAuthors(){
    const authorArticles = document.querySelectorAll(optArticleSelector);
    for (let authorArticle of authorArticles) {
        const authorList = authorArticle.querySelector(optArticleAuthorSelector);
        let html = '';
        const articleAuthor = authorArticle.getAttribute('data-author');
        const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor  + '</a>' + ' ';
        html = html + linkHTML;
        authorList.innerHTML = html;
    }
}
generateAuthors();

function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    for (let activeAuthor of activeAuthors) {
        activeAuthor.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');
    for (let authorLink of authorLinks) {
        authorLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
    console.log(generateTitleList);
}

function addClickListenersToAuthors() {
    const authorLinks = document.querySelectorAll(optArticleAuthorSelector + ' a');
    for(let author of authorLinks){
            author.addEventListener('click', authorClickHandler);
        }
    }
    addClickListenersToAuthors();
