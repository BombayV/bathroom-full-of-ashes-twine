import './main.css';
import { passageInitHandler } from './assets/events/passageInitHandler.ts';
import { passageEndHandler } from './assets/events/passageEndHandler.ts';
import { passageRenderHandler } from './assets/events/passageRenderHandler.ts';

// Make image path available globally for Twine
setTimeout(() => {
  if (typeof window !== 'undefined' && (window as any).jQuery) {
    const $ = (window as any).$;

    $(document).on(':passageend', passageEndHandler);
    $(document).on(':passageinit', passageInitHandler);
    $(document).on(':passagerender', passageRenderHandler);
  }
}, 0);
