import { GroupItem } from "@components/group.component";
import { useProviders } from "@providers/index";
import { FaSolidKeyboard } from "solid-icons/fa";

export function KeyboardLayoutWidget() {
  const providers = useProviders();

  return <GroupItem class="text-gruvvy-watermelon-lavender italic bold" ><FaSolidKeyboard class="w-4 h-4"/>{providers.keyboard?.layout.split("-")[0]}</GroupItem>;
}
