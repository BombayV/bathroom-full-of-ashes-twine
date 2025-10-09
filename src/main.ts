import './main.css';
import { passageInitHandler } from './assets/events/passageInitHandler.ts';
import { passageEndHandler } from './assets/events/passageEndHandler.ts';

setTimeout(() => {
  if (typeof window !== 'undefined' && (window as any).jQuery) {
    const $ = (window as any).jQuery;
    console.log('Setting up SugarCube event listeners');
    $(document).on(':passageend', passageEndHandler);
    $(document).on(':passageinit', passageInitHandler);
  }
}, 0);
