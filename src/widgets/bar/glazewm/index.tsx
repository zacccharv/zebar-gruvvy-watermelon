/* @refresh reload */
import "@/index.css";
import { render } from "solid-js/web";
import { motion } from "solid-motionone";
import { ProvidersProvider } from "@providers/index";
import { Group } from "@components/group.component";
import { MediaWidget } from "@features/media.widget";
import { MetricsWidget } from "@features/metrics.widget";
import { KeyboardLayoutWidget } from "@features/keyboard-layout.widget";
import { DateTimeWidget } from "@features/date-time.widget";
import { onMount } from "solid-js";
import { WorkspacesGlazewmWidget } from "@/features/workspaces.glazewm.widget";
import { FocusedWindowTitleGlazewmWidget } from "@/features/focused-window-title.glazewm.widget";
import { Separator } from "@/features/separator";
motion;

render(() => <App />, document.getElementById("root")!);

export function LeftGroup() {
  return (
    <Group
      animationOptions={{
        initial: {
          x: "-200%",
        },
        animate: {
          x: 0,
        },
        transition: {
          duration: 2.0,
        },
      }}
      class="justify-self-start justify-start"
    >
      <WorkspacesGlazewmWidget />
      <Separator />
      <MediaWidget />
    </Group>
  );
}

export function CenterGroup() {
  return (
    <Group
      animationOptions={{
        initial: {
          y: "-200%",
        },
        animate: {
          y: 0,
        },
        transition: {
          duration: 2.0,
        },
      }}
      class="justify-self-center"
    >
      <FocusedWindowTitleGlazewmWidget />
    </Group>
  );
}

export function RightGroup() {
  return (
    <Group
      animationOptions={{
        initial: {
          x: "200%",
        },
        animate: {
          x: 0,
        },
        transition: {
          duration: 2.0,
        },
      }}
      class="justify-self-end justify-end"
    >
      <MetricsWidget />
      <Separator />
      <KeyboardLayoutWidget />
      <Separator />
      <DateTimeWidget />
    </Group>
  );
}

function App() {
  onMount(() => {
    setTimeout(() => {
      for (let i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i]?.href?.includes("/__zebar/normalize.css")) {
          document.styleSheets[i]!.disabled = true;
        }
      }
    }, 2000);
  });
  return (
    <ProvidersProvider WmType="glazewm">
      <div class="h-full grid grid-cols-3 px-[16px] items-end">
        <LeftGroup />
        <CenterGroup />
        <RightGroup />
      </div>
    </ProvidersProvider>
  );
}
