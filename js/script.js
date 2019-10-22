
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
      optTitleListSelector = '.titles';
function generateTitleLinks(customSelector = ''){
    const titleList = document.querySelector(optTitleListSelector);
    console.log('titleList', titleList);
    titleList.innerHTML = '';   
    const articles =  document.querySelectorAll(optArticleSelector + customSelector);
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

const optArticleTagsSelector = '.post-tags .list';
function generateTags(){
    const articles =  document.querySelectorAll('.post');
    for(let article of articles){
        const tagsWrapper = article.querySelector(optArticleTagsSelector);
        let html = '';
        const articleTags = article.getAttribute('data-tags');
        const articleTagsArray = articleTags.split(' ');
        for(let tag of articleTagsArray){ 
            const linkArticle = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';
            console.log('linkArticle', linkArticle);
            html = html + linkArticle;
        }
        tagsWrapper.innerHTML = html;
    }
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
    for(let activeTag of activeTags){
    /* remove class active */
        activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = activeTags.querySelectorAll('a[href="' + href + '"]');
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
    const tagLinks = document.querySelectorAll(optArticleTagsSelector);
    /* START LOOP: for each link */
    for(let tag of tagLinks){
    /* add tagClickHandler as event listener for that link */
        tag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
}

addClickListenersToTags();
}