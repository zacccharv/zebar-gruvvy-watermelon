import { createMemo, Index, Show, Switch, Match } from "solid-js";
import { Motion, Presence } from "solid-motionone";
import { GroupItem } from "@components/group.component";
import { useProviders } from "@providers/index";
import { createStoredSignal } from "@/components/signal-storage.hook";
import { WorkspaceDisplayMode } from "@/components/workspaces.types";
import { FaSolidDesktop } from "solid-icons/fa";

export function WorkspacesGlazewmWidget() {
  const providers = useProviders();

  const displayModeStorageKey = createMemo(() => {
    const deviceId = providers.glazewm?.currentMonitor.deviceName;
    if (!deviceId) {
      return undefined;
    }

    return `${deviceId}:workspaces-display-mode`;
  });

  const [displayMode, setDisplayMode] = createStoredSignal(
    WorkspaceDisplayMode.normal,
    displayModeStorageKey,
  );

  const toggleDisplayMode = () => {
    setDisplayMode(
      displayMode() === WorkspaceDisplayMode.normal
        ? WorkspaceDisplayMode.icons
        : WorkspaceDisplayMode.normal,
    );
  };

  const focusWrokspace = async (workspaceId: string) => {
    await providers.glazewm?.runCommand(`focus --workspace ${workspaceId}`);
  };

  return (
    <GroupItem
      class="overflow-visible"
      onContextMenu={(e) => {
        e.preventDefault();
        toggleDisplayMode();
      }}
    >
      <FaSolidDesktop class="mr-2 text-gruvvy-watermelon-watermelon w-4.5 h-4.5" />
      <Index each={providers.glazewm?.currentMonitor.children}>
        {(workspace) => (
          <Presence exitBeforeEnter>
            <Show
              when={workspace().children.length > 0 || workspace().isDisplayed}
            >
              <Motion.span
                class="origin-left inline-flex items-center justify-center h-full w-full py-1"
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 0.5,
                }}
              >
                <Motion.button
                  class="origin-left transition-colors h-[90%] px-2 py-2 rounded-full overflow-visible hover:bg-gruvvy-watermelon-mint hover:text-gruvvy-watermelon-base border-solid border-t-1 border-transparent inline-flex items-center justify-center"
                  classList={{
                    "text-gruvvy-watermelon-base font-bold bg-gruvvy-watermelon-watermelon": workspace().isDisplayed,
                    "px-2":
                      displayMode() === WorkspaceDisplayMode.icons &&
                      !workspace().isDisplayed,
                  }}
                  onClick={() => {
                    focusWrokspace(workspace().name);
                  }}
                  animate={{
                    fontSize:
                      displayMode() === WorkspaceDisplayMode.icons &&
                      !workspace().isDisplayed
                        ? "1.5rem"
                        : "13px",
                  }}
                  exit={{
                    fontSize: 0,
                  }}
                >
                  <Switch>
                    <Match when={displayMode() === WorkspaceDisplayMode.normal}>
                      {workspace().displayName ?? workspace().name}
                    </Match>
                    <Match when={displayMode() === WorkspaceDisplayMode.icons}>
                      <Show
                        when={workspace().isDisplayed}
                        fallback={
                          (workspace().displayName ?? workspace().name)?.split(
                            " ",
                          )[0]
                        }
                      >
                        {(workspace().displayName ?? workspace().name)?.split(
                          " ",
                        )?.[1] ??
                          workspace().displayName ??
                          workspace().name}
                      </Show>
                    </Match>
                  </Switch>
                </Motion.button>
              </Motion.span>
            </Show>
          </Presence>
        )}
      </Index>
    </GroupItem>
  );
}
