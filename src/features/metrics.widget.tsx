import { useProviders } from "@providers/index";
import { GroupItem } from "@components/group.component";
import {
  animate,
  AnimationPlaybackControlsWithThen,
  MotionValue,
} from "motion";
import {
  Accessor,
  createEffect,
  createMemo,
  EffectFunction,
  ParentProps,
} from "solid-js";
import { useMotionValue } from "@/motion/hooks";
import { FaSolidMemory } from "solid-icons/fa";
import { FaSolidSun } from "solid-icons/fa";
import { RiDeviceCpuLine } from "solid-icons/ri";

function Metric(props: ParentProps) {
  return (
    <span class="flex items-center justify-center gap-1 not-last:mr-2">{props.children}</span>
  );
}

function metricsAnimation(
  rawMotionValue: MotionValue<number>,
  metric: Accessor<number | undefined>,
): EffectFunction<
  AnimationPlaybackControlsWithThen | undefined,
  AnimationPlaybackControlsWithThen
> {
  return (prev) => {
    const control = animate(rawMotionValue, metric() || 0, {
      duration: 1,
      ease: "circOut",
      autoplay: Boolean(!prev || prev.state === "finished"),
    });

    if (prev && prev.state === "running") {
      prev?.then(() => {
        control.play();
      });
    }

    return control;
  };
}

export function MetricsWidget() {
  const providers = useProviders();
  const cpuUsage = useMotionValue(0);
  const memoryUsage = useMotionValue(0);
  const weather = useMotionValue(0);

  createEffect(
    metricsAnimation(
      cpuUsage.raw,
      createMemo(() => {
        const usage = providers.cpu?.usage;
        return usage;
      }),
    ),
  );

  createEffect(
    metricsAnimation(
      memoryUsage.raw,
      createMemo(() => {
        const usage = providers.memory?.usage;
        return usage;
      }),
    ),
  );

  createEffect(
    metricsAnimation(
      weather.raw,
      createMemo(() => {
        const usage = providers.weather?.celsiusTemp;
        return usage;
      }),
    ),
  );

  return (
    <GroupItem class="justify-end">
      <Metric>
        <RiDeviceCpuLine class="w-4 h-4 text-gruvvy-watermelon-raspberry" />
        {Math.round(cpuUsage.get()).toLocaleString(undefined, {})}%
      </Metric>
      <Metric>
        <FaSolidMemory class="w-4 h-4 text-gruvvy-watermelon-watermelon" />
        {Math.round(memoryUsage.get()).toLocaleString(undefined, {})}%
      </Metric>
      <Metric>
        <FaSolidSun
          class="w-3.5 h-3.5 transition-colors"
          classList={{
            "text-gruvvy-watermelon-mint": weather.get() <= -20,

            "text-gruvvy-watermelon-watermelon": weather.get() <= -10,

            "text-gruvvy-watermelon-lavender": weather.get() <= 5,

            "text-gruvvy-watermelon-raspberry": weather.get() <= 14,

            "text-gruvvy-watermelon-peach": weather.get() <= 25,

            "text-gruvvy-watermelon-cherry": weather.get() >= 25,
          }}
        />
        {Math.round(weather.get())}°
      </Metric>
    </GroupItem>
  );
}
