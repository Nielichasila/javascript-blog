
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
  console.log('clickedElement:', clickedElement);
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
}
{
    const optArticleSelector = '.post',
          optTitleSelector = '.post-title',
          optTitleListSelector = '.titles',
          optArticleTagsSelector = '.post-tags .list';
    function generateTitleLinks(){
        const titleList = document.querySelector(optTitleListSelector);
        console.log('titleList', titleList);
        titleList.innerHTML = '';   
        const articles =  document.querySelectorAll('.post');
        let html = '';
        for(let article of articles){        
          const articleId = article.getAttribute('id'); 
          const articleTitle = article.querySelector(optTitleSelector).innerHTML;   
          const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
          html = html + linkHTML;
        }
        console.log('html', html);
        titleList.innerHTML = html;
      }
      generateTitleLinks();
}
const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
    /* find all articles */

    /* START LOOP: for every article: */

    /* find tags wrapper */

    /* make html variable with empty string */

    /* get tags from data-tags attribute */

    /* split tags into array */

    /* START LOOP: for each tag */

    /* generate HTML of the link */

    /* add generated code to html variable */

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
}

generateTags();