'use babel';

export default class GoogleTranslateModalView {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('atom-google-translate-modal-view__box');
    this.loaded = false;
    this.selectionText = null;

    const webview = this.webview = document.createElement('webview');

    webview.addEventListener('dom-ready', () => {
      webview.insertCSS(`
        #gt-promo-lr,
        #gt-ft-res {
          display: none !important
        }
      `);

      if (!this.loaded) {
        this.loaded = true;
        this.insertText();
      }


      //   :root:root:root:root:root body *:not(#gt-c):not(#gt-text-all):not(#gt-main):not(#gt-form-c):not(#gt-form):not(#gt-text-c):not(#gt-text-top):not(#gt-src-c):not(#gt-res-c):not(#gt-src-p) {
      //     display: none;
      //   }
      //
      //   :root body #gt-src-c *:not(#gt-src-tools):not(#file_div):not(#select_document),
      //   :root body #gt-res-c * {
      //     display: block !important;
      //   }
      //
      //   :root body #gt-text-top {
      //     display: flex;
      //   }
      //
      //   :root body #gt-src-c,
      //   :root body #gt-res-c {
      //     flex: 1 1 100%;
      //   }
      //
      // `);
    });

    lang = atom.config.get('google-translate-modal.lang');
    webview.src = "https://translate.google.co.jp/?hl=#{lang}";
    webview.className = [
      'atom-google-translate-modal-view__view',
      'native-key-bindings'
    ].join(' ');
    this.element.appendChild(webview);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  setText(text) {
    this.selectionText = text;
    return this;
  }

  insertText() {
    if (this.selectionText && this.loaded) {
      this.webview.executeJavaScript(`
        document.getElementById('source').value = '${this.selectionText}';
      `);
    }
  }
}
