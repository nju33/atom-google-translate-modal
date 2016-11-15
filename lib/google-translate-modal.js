'use babel';

import GoogleTranslateModalView from './google-translate-modal-view';
import { CompositeDisposable } from 'atom';

export default {
  view: null,
  modalPanel: null,
  subscriptions: null,

  config: {
    lang: {
      title: 'Language',
      description: 'Specify language (e.g. `ja` `en`)',
      type: 'string',
      default: 'ja'
    }
  },

  activate() {
    this.view = new GoogleTranslateModalView();

    this.modalPanel = atom.workspace.addModalPanel({
      item: this.view.getElement(),
      visible: false
    });

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'Google Translate Modal: Toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.view.destroy();
  },

  serialize() {
    return {
      state: this.view.serialize()
    };
  },

  toggle() {
    this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
  }

};
