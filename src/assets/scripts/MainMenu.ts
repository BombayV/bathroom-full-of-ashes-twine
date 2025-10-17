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
    const fsButton = document.getElementById('fullscreen-button');
    fsButton?.addEventListener('click', toggleFullscreen);
  }, 0);
};
