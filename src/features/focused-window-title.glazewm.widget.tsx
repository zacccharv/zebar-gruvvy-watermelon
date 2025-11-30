import { createMemo } from "solid-js";
import { GroupItem } from "@components/group.component";
import { useProviders } from "@providers/index";

const MAX_DEPTH = 20;

export function FocusedWindowTitleGlazewmWidget() {
  const providers = useProviders();
  const isCurrentMonitor = createMemo(
    () =>
      providers.glazewm?.focusedMonitor.id ===
      providers.glazewm?.currentMonitor.id,
  );

  const title = createMemo(() => {
    let focusedWindow = providers.glazewm?.focusedWorkspace.children.find(
      (w) => w.hasFocus,
    );

    if (!focusedWindow) {
      return "-";
    }

    let depth = 0;

    while (focusedWindow?.type !== "window" && depth < MAX_DEPTH) {
      focusedWindow = focusedWindow?.children.find((w) => w.hasFocus);
      depth++;
    }

    if (focusedWindow?.type === "window") {
      return focusedWindow.title;
    }

    return "-";
  });

  return (
    <GroupItem class="text-ellipsis whitespace-nowrap max-w-[200px] 2xl:max-w-[350px] lg:max-w-[200px]">
      <span
        title={title()}
        classList={{
          "text-gruvvy-watermelon-muted hover:text-inherit": !isCurrentMonitor(),
        }}
      >
        {title()}
      </span>
    </GroupItem>
  );
}
