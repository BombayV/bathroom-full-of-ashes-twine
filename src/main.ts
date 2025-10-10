import './main.css';
import { passageInitHandler } from './assets/events/passageInitHandler.ts';
import { passageEndHandler } from './assets/events/passageEndHandler.ts';

// Make image path available globally for Twine
(window as any).bathroomImagePath = 'assets/images/the_bathroom_full_of_ashes.png';

// Loading animation function
export const initLoadingAnimation = (cb?: () => void) => {
  setTimeout(() => {
    const loading = document.getElementById('loading');
    if (loading) {
      setTimeout(() => {
        const img = loading.querySelector('img');
        const p = loading.querySelector('p');
        if (img) img.classList.remove('opacity-0');
        if (p) p.classList.remove('opacity-0');
        setTimeout(() => {
          if (loading) {
            if (p) p.classList.add('opacity-0');
            if (img) img.classList.add('opacity-0');
            setTimeout(() => {
              console.log('Loading animation complete');
              if (cb) cb();
            }, 6000);
          }
        }, 6000);
      }, 100);
    }
  }, 100);
};

(window as any).initLoadingAnimation = initLoadingAnimation;

// Function to hide the init loading screen
export const hideInitScreen = () => {
  const initScreen = document.getElementById('init-screen');
  if (initScreen) {
    initScreen.style.transition = 'opacity 0.5s ease-out';
    initScreen.style.opacity = '0';
    setTimeout(() => {
      initScreen.remove();
    }, 500);
  }
};

(window as any).hideInitScreen = hideInitScreen;

setTimeout(() => {
  if (typeof window !== 'undefined' && (window as any).jQuery) {
    const $ = (window as any).$;

    // Hide init screen when SugarCube is ready
    $(document).one(':storyready', function() {
      setTimeout(hideInitScreen, 1000);
    });

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
