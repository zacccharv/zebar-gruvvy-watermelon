import { GroupItem } from "@components/group.component";
import { useProviders } from "@providers/index";
import { FaSolidClock } from "solid-icons/fa";

export function DateTimeWidget() {
  const providers = useProviders();

  return <GroupItem class="text-gruvvy-watermelon-mint bold"><FaSolidClock class="w-4 h-4"/>{providers.date?.formatted}</GroupItem>;
}
