import './main.css';
import { passageInitHandler } from './assets/events/passageInitHandler.ts';
import { passageEndHandler } from './assets/events/passageEndHandler.ts';

// Make image path available globally for Twine
setTimeout(() => {
  if (typeof window !== 'undefined' && (window as any).jQuery) {
    const $ = (window as any).$;

    $(document).on(':passageend', passageEndHandler);
    $(document).on(':passageinit', passageInitHandler);

      document.getElementById('style-core-macro')?.remove();
      document.getElementById('style-normalize')?.remove();
      document.getElementById('style-font-emoji')?.remove();
      document.getElementById('style-core-passage')?.remove();
      document.getElementById('style-ui-dialog-legacy')?.remove();
      document.getElementById('style-ui-dialog-settings')?.remove();
      document.getElementById('style-ui-dialog-saves')?.remove();
      document.getElementById('style-core')?.remove();
  }
}, 0);
