import { motionValue, MotionValueOptions } from "motion";
import { createSignal, onMount } from "solid-js";

export function useMotionValue<T>(init: T, options?: MotionValueOptions) {
  let value = motionValue(init, options);
  const [get, set] = createSignal<T>(value.get());

  onMount(() => {
    return value.on("change", set);
  });

  return {
    get,
    set: (v: T) => value.set(v),
    raw: value,
  };
}
