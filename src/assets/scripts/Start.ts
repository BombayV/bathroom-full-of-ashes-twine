import { testPath } from '../utils/testPath';
import SugarCubeUtils from '../utils/sugarcube';

const initLoadingAnimation = (cb: () => void) => {
  setTimeout(() => {
    console.log('Starting loading animation');
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
              if (cb) cb();
            }, 6000);
          }
        }, 6000);
      }, 100);
    }
  }, 100);
};

export const InitStart = () => {
  setTimeout(() => {
    const img = document.getElementById('bathroom-image') as HTMLImageElement;
    if (img) {
      // Try different possible paths
      const possiblePaths = [
        'assets/the_bathroom_full_of_ashes.png',
        './assets/the_bathroom_full_of_ashes.png',
        '/assets/the_bathroom_full_of_ashes.png',
      ];

      testPath(possiblePaths, img);
    }

    initLoadingAnimation(() => {
      SugarCubeUtils.whenReady(() => {
        SugarCubeUtils.goToPassage('MainMenu');
      });
    });
  }, 100);
};
