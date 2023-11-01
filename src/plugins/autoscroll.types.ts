import { CreatePluginType } from 'embla-carousel/components/Plugins';
import { CreateOptionsType } from 'embla-carousel/components/Options';

export type AutoscrollOptions = CreateOptionsType<{
  delay?: number;
  jump?: boolean;
  playOnInit?: boolean;
  stopOnFocusIn?: boolean;
  stopOnInteraction?: boolean;
  stopOnMouseEnter?: boolean;
  stopOnLastSnap?: boolean;
  rootNode?: ((emblaRoot: HTMLElement) => HTMLElement | null) | null;
}>;

export interface AutoscrollPluginFunction {
  (userOptions?: AutoscrollPluginOptions): AutoscrollPluginType;
  globalOptions?: AutoscrollPluginOptions | undefined;
}

export type AutoscrollPluginType = CreatePluginType<
  {
    play: (jump?: boolean) => void;
    stop: () => void;
    reset: () => void;
  },
  AutoscrollOptions
>;

export type AutoscrollPluginOptions = AutoscrollPluginType['options'];
