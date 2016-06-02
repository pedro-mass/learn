import marked from 'marked';

class ArticleCtrl {
  constructor(article, $sce, $rootScope) {
    'ngInject';

    this.article = article;

    // Update the title of this page
    $rootScope.setPageTitle(this.article.title);

    // Transform the markdown into html
    this.article.body = $sce.trustAsHtml(marked(this.article.body, { sanitize: true }));
  }
}

export default ArticleCtrl;
