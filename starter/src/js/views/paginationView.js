import views from './views';
import icons from 'url:../../img/icons.svg';

class paginationView extends views {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const pageNum = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(pageNum);
    // Page 1, and there are otjher pages
    if (this._data.page === 1 && pageNum > 1) {
      return `
      <button data-goto ='${
        this._data.page + 1
      }' class="btn--inline pagination__btn--next">
        <span> Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    // last page
    if (this._data.page === pageNum && pageNum > 1) {
      return `<button data-goto ='${
        pageNum - 1
      }' class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Prev Page</span>
      </button>
      `;
    }
    // Other page
    if (this._data.page < pageNum) {
      return `<button data-goto ='${
        this._data.page - 1
      }' class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>
      <button data-goto ='${
        this._data.page + 1
      }' class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    // Page 1, and there are no other pages
    return '';
  }
}

export default new paginationView();
