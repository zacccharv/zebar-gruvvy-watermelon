import { Accessor, createEffect, createSignal, Signal } from "solid-js";

export const createStoredSignal = <T>(
  init: T,
  keySignal: Accessor<string | undefined>,
): Signal<T> => {
  const [loaded, setLoaded] = createSignal(false);
  const [get, set] = createSignal<T>(init);

  createEffect(() => {
    const key = keySignal();

    if (!key) {
      return;
    }

    if (!loaded()) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(get()));
  });

  createEffect(() => {
    if (loaded()) {
      return;
    }

    const key = keySignal();

    if (!key) {
      return;
    }

    const value = localStorage.getItem(key);

    if (value) {
      set(() => JSON.parse(value) as T);
    }

    setLoaded(true);
  });

  return [get, set];
};
