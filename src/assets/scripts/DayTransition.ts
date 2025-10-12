import SugarCubeUtils from '../utils/sugarcube';

export const DayTransition = (path: string, elementId: string) => {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.remove('opacity-0');
      setTimeout(() => {
        element.classList.add('opacity-0');
        setTimeout(() => {
          SugarCubeUtils.whenReady(() => {
            SugarCubeUtils.goToPassage(path);
          });
        }, 6000);
      }, 8000);
    }
  }, 500);
};
