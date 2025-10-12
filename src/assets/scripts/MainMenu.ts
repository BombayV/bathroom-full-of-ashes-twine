import { testPath } from '../utils/testPath';

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

export const InitMainMenu = () => {
  setTimeout(() => {
    const img = document.getElementById('background-image') as HTMLImageElement;
    if (img) {
      const possiblePaths = [
        'assets/images/background.jpg',
        './assets/images/background.jpg',
        '/assets/images/background.jpg',
      ];

      testPath(possiblePaths, img);
    }

    const fsButton = document.getElementById('fullscreen-button');
    fsButton?.addEventListener('click', toggleFullscreen);
  }, 0);
};
