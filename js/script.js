const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagcloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-authorcloud-link').innerHTML)
};

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {
      id: articleId,
      title: articleTitle
    };
    const linkHTML = templates.articleLink(linkHTMLData);
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const tagsList = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray) {
      // const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      const linkHTMLData = {
        id: tag,
        title: tag
      };
      const linkHTML = templates.tagLink(linkHTMLData);
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsList.innerHTML = html;
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  //console.log('tagsParams:', tagsParams);
  const allTagsData = {
    tags: []
  };
  /* [NEW] START LOOP: for each tag for allTags: */
  for (let tag in allTags) {
    /* [NEW] Generate code of a link and add it to allTagsHTML */
    //const tagLinkHTML = '<li><a class ="tag-size-' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>' + ' ';
    //allTagsHTML += tagLinkHTML;
    //allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')' + '</a></li>';
    /*[NEW] END LOOP for each tag for allTags: */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll(optArticleTagsSelector + ' a');
  /* START LOOP: for each link */
  for (let tag of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function calculateAuthorsParams(authors) {
  const params = {
    max: 0,
    min: 999999
  };
  // [VERY NEW] START LOOP for every tags
  for (let author in authors) {
    //console.log(author + ' is used ' + authors[author] + ' times ');
    /* first option - standard if*/
    // [VERY NEW] set value for params.max as authors[author] only if the value is higher than current
    if (authors[author] > params.max) {
      params.max = authors[author];
      //console.log('params.max:', params.max);
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
      //console.log('params.min:', params.min);
    }
  }
  return params;
}

function calculateAuthorClass(count, params) {
  //console.log('calculateAuthorClass:', calculateAuthorClass, 'count:' ,count, 'params:', params);
  const normalizedCount = count - params.min;
  //console.log('normalizedCount:', normalizedCount);
  const normalizedMax = params.max - params.min;
  //console.log('normalizedMax:', normalizedMax);
  const percentage = normalizedCount / normalizedMax;
  //console.log('percentage:', percentage);
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  //console.log('classNumber:', classNumber);
  return classNumber;
}

function generateAuthors() {
  let allAuthors = {};
  const authorArticles = document.querySelectorAll(optArticleSelector);
  for (let authorArticle of authorArticles) {
    const authorList = authorArticle.querySelector(optArticleAuthorSelector);
    console.log(authorList);
    let html = '';
    const articleAuthor = authorArticle.getAttribute('data-author');
    //const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor  + '</a>' + ' ';
    const linkHTMLData = {
      id: articleAuthor,
      title: articleAuthor
    };
    const linkHTML = templates.authorLink(linkHTMLData);
    html = html + linkHTML;
    if (!allAuthors[articleAuthor]) {
      /* [NEW] add generated code to allTags array */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    authorList.innerHTML = html;
  }
  const authorList = document.querySelector('.authors');
  const authorParams = calculateAuthorsParams(allAuthors);
  //let allAuthorsHTML = ' ';
  const allAuthorsData = {
    authors: []
  };
  for (let articleAuthor in allAuthors) {
    //const authorLinkHTML = '<li><a class ="tag-size-' + calculateAuthorClass(allAuthors[articleAuthor], authorParams) +'" href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>' + ' ';
    //allAuthorsHTML += authorLinkHTML;
    //authorList.innerHTML = allAuthorsHTML;
    allAuthorsData.authors.push({
      author: articleAuthor,
      count: allAuthors[articleAuthor],
      className: calculateAuthorClass(allAuthors[articleAuthor], authorParams)
    });
  }
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#', '');
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }
  const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll(optArticleAuthorSelector + ' a');
  for (let author of authorLinks) {
    author.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();