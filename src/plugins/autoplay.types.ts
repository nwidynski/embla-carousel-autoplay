import { CreatePluginType } from 'embla-carousel/components/Plugins';
import { CreateOptionsType } from 'embla-carousel/components/Options';

export type AutoplayOptions = CreateOptionsType<{
  delay?: number;
  jump?: boolean;
  playOnInit?: boolean;
  stopOnFocusIn?: boolean;
  stopOnInteraction?: boolean;
  stopOnMouseEnter?: boolean;
  stopOnLastSnap?: boolean;
  rootNode?: ((emblaRoot: HTMLElement) => HTMLElement | null) | null;
}>;

export interface AutoplayPluginFunction {
  (userOptions?: AutoplayPluginOptions): AutoplayPluginType;
  globalOptions?: AutoplayPluginOptions | undefined;
}

export type AutoplayPluginType = CreatePluginType<
  {
    play: (jump?: boolean) => void;
    stop: () => void;
    reset: () => void;
  },
  AutoplayOptions
>;

export type AutoplayPluginOptions = AutoplayPluginType['options'];
