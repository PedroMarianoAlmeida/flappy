export const changeScreen = (screen, screenActive) => {
  screenActive = screen;
  if (screenActive.initialize) {
    screenActive.initialize();
  }
};