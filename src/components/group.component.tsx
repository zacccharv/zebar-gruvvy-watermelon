import { JSX, ParentComponent, splitProps } from "solid-js";
import { Motion, Options, motion } from "solid-motionone";
import { ClassNameValue, twMerge } from "tailwind-merge";
motion;

export type GroupProps = {
  class?: ClassNameValue;
  classList?: Record<string, boolean>;
  onClick?: JSX.EventHandler<HTMLDivElement, MouseEvent>;
  onContextMenu?: JSX.EventHandler<HTMLDivElement, MouseEvent>;
  animationOptions?: Options;
};

export const Group: ParentComponent<GroupProps> = (props) => {
  const [local] = splitProps(props, ["animationOptions"]);
  return (
    <Motion.div
      {...local.animationOptions}
      class={twMerge(
        "my-3 h-[36px] max-h-[36px] flex flex-row justify-center items-center gap-3 bg-gruvvy-watermelon-base text-gruvvy-watermelon-text border-gruvvy-watermelon-highlight-low border-[2px] w-fit rounded-[1.5rem] border-solid py-0 px-[1.2rem]",
        "hover:border-gruvvy-watermelon-mint transition-colors",
        props.class,
      )}
      classList={props.classList}
      onClick={props.onClick}
    >
      {props.children}
    </Motion.div>
  );
};

export const GroupItem: ParentComponent<GroupProps> = (props) => {
  const [local] = splitProps(props, ["animationOptions"]);
  return (
    <div
      {...local.animationOptions}
      class={twMerge(
        "transition-transform h-full inline-flex items-center gap-2 text-ellipsis overflow-hidden whitespace-nowrap leading-[1.5]",
        props.class,
      )}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
    >
      {props.children}
    </div>
  );
};
