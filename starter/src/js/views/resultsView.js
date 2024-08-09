import views from './views';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class resultsView extends views {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recepies found for your query! Try again. :P';
  _message = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new resultsView();
