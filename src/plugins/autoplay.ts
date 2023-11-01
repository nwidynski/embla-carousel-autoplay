import { EmblaCarouselType } from 'embla-carousel';
import { OptionsHandlerType } from 'embla-carousel/components/OptionsHandler';

import {
  AutoplayOptions,
  AutoplayPluginType,
  AutoplayPluginOptions,
  AutoplayPluginFunction,
} from './autoplay.types';

declare module 'embla-carousel/components/Plugins' {
  interface EmblaPluginsType {
    autoplay?: AutoplayPluginType;
  }
}

const AutoplayPlugin: AutoplayPluginFunction = (
  userOptions: AutoplayPluginOptions = {}
): AutoplayPluginType => {
  let options: AutoplayPluginOptions;
  let emblaApi: EmblaCarouselType;
  let interaction: () => void;
  let timer = 0;
  let jump = false;

  function init(
    emblaApiInstance: EmblaCarouselType,
    optionsHandler: OptionsHandlerType
  ): void {
    emblaApi = emblaApiInstance;

    const { mergeOptions, optionsAtMedia } = optionsHandler;

    const defaultOptions: Required<AutoplayOptions> = {
      active: true,
      breakpoints: {},
      delay: 4000,
      jump: false,
      playOnInit: true,
      stopOnFocusIn: true,
      stopOnInteraction: true,
      stopOnMouseEnter: false,
      stopOnLastSnap: false,
      rootNode: null,
    };

    const base = mergeOptions(defaultOptions, AutoplayPlugin.globalOptions);
    options = optionsAtMedia(mergeOptions(base, userOptions));

    jump = options.jump ?? false;
    interaction = options.stopOnInteraction ? destroy : stop;

    const { eventStore, ownerDocument, ownerWindow } =
      emblaApi.internalEngine();
    const emblaRoot = emblaApi.rootNode();
    const root = (options.rootNode && options.rootNode(emblaRoot)) || emblaRoot;

    emblaApi.on('pointerDown', interaction);
    if (!options.stopOnInteraction) emblaApi.on('pointerUp', reset);

    if (options.stopOnMouseEnter) {
      eventStore.add(root, 'mouseenter', interaction);
      if (!options.stopOnInteraction) eventStore.add(root, 'mouseleave', reset);
    }

    if (options.stopOnFocusIn) {
      eventStore.add(root, 'focusin', interaction);
      if (!options.stopOnInteraction) eventStore.add(root, 'focusout', reset);
    }

    eventStore.add(ownerDocument, 'visibilitychange', () => {
      if (ownerDocument.visibilityState === 'hidden') return stop();
      reset();
    });
    eventStore.add(ownerWindow, 'pagehide', (event: PageTransitionEvent) => {
      if (event.persisted) stop();
    });

    if (options.playOnInit) play();
  }

  function destroy(): void {
    emblaApi.off('pointerDown', interaction);
    if (!options.stopOnInteraction) emblaApi.off('pointerUp', reset);
    stop();
    timer = 0;
  }

  function play(jumpOverride?: boolean): void {
    stop();
    if (typeof jumpOverride !== 'undefined') jump = jumpOverride;
    timer = window.setTimeout(next, options.delay);
  }

  function stop(): void {
    if (!timer) return;
    window.clearTimeout(timer);
  }

  function reset(): void {
    if (!timer) return;
    stop();
    play();
  }

  function next(): void {
    const { index } = emblaApi.internalEngine();
    const lastIndex = emblaApi.scrollSnapList().length - 1;
    const kill = options.stopOnLastSnap && index.get() === lastIndex;

    if (kill) return destroy();

    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext(jump);
    } else {
      emblaApi.scrollTo(0, jump);
    }
    play();
  }

  const self: AutoplayPluginType = {
    name: 'autoplay',
    options: userOptions,
    init,
    destroy,
    play,
    stop,
    reset,
  };
  return self;
};

AutoplayPlugin.globalOptions = <AutoplayOptions | undefined>undefined;

export default AutoplayPlugin;
