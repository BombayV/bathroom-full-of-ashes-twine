export const testPath = (possiblePaths: string[], img: HTMLImageElement, index = 0) => {
  const path = possiblePaths[index];
  if (index >= possiblePaths.length) {
    console.error('Could not load image from any path');
    return;
  }

  const testImg = new Image();
  testImg.onload = () => {
    img.src = path;
    console.log('Image loaded successfully from:', path);
  };
  testImg.onerror = () => {
    console.log('Failed to load from:', path);
    testPath(possiblePaths, img, index + 1);
  };
  testImg.src = path;
};


(window as any).testPath = testPath;