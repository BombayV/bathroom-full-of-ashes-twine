const EVENTS: Record<string, () => void> = {
  Start: () => {},
  MainMenu: () => {},
};

const passageEndHandler = (e: any) => {
  const { name } = e.passage;
  if (EVENTS[name]) {
    EVENTS[name]();
  }
};

export { passageEndHandler };
