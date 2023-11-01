<p align="center">
  <a href="https://github.com/davidjerleke/embla-carousel" target="_blank"><img width="70" height="70" src="/assets/embla-logo.svg" alt="Embla Carousel"></a>
</p>
<h2 align="center">Autoscroll for Embla Carousel</h2>

<p align="center">
  This plugin extends the native autoscroll plugin of the amazing
  <a href="https://github.com/davidjerleke/embla-carousel">Embla Carousel</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/embla-carousel-autoscroll" target="_blank">
    <img src="https://img.shields.io/npm/v/embla-carousel-autoscroll.svg"
  /></a>
  
  <img alt="NPM" src="https://img.shields.io/npm/l/embla-carousel-autoscroll">
  
  <a href="https://bundlephobia.com/result?p=embla-carousel-autoscroll@latest" target="_blank">
    <img
      src="https://img.shields.io/bundlephobia/minzip/embla-carousel-autoscroll?color=%234c1&label=gzip%20size"
    />
  </a>
</p>

## Installation

First you need to follow the [installation instructions for Embla Carousel](https://github.com/davidcetinkaya/embla-carousel#installation), after that you can add autoscroll support:

```sh
npm install --save embla-carousel-autoscroll  # yarn add embla-carousel-autoscroll
```

### JavaScript / TypeScript

```js
import EmblaCarousel from 'embla-carousel';
import AutoscrollPlugin from 'embla-carousel-autoscroll';

// initialize Embla Carousel
const embla = EmblaCarousel(emblaNode, {}, [
  AutoscrollPlugin({ stopOnFocusIn: true }),
]);
```

### React

```js
import { useEmblaCarousel } from 'embla-carousel-react';
import AutoscrollPlugin from 'embla-carousel-autoscroll';

const EmblaCarouselComponent = ({ children }) => {
  const [emblaRef, embla] = useEmblaCarousel({}, [
    AutoscrollPlugin({ stopOnFocusIn: true }),
  ]);

  // ...
};
```

## Options

### delay

**Type**: number<br/>
**Default**: en-US

Locale to be used in IETF's BCP 47 format.

### jump

**Type**: false | "off" | "polite" | "assertive"<br/>
**Default**: false

Whether the screen reader should announce slide changes. Recommended to be turned off if autoscroll is used.

### playOnInit

**Type**: number<br/>
**Default**: 300

The debounce to use when updating aria properties.

### stopOnFocusIn

**Type**: Function<br/>
**Default**: (evt: HTMLElement, target: HTMLElement) => void

Whether the autoscroll stops if a slide or it's descendant receives focus.

### stopOnInteraction

**Type**: Function<br/>
**Default**: (evt: HTMLElement, target: HTMLElement) => void

Whether the autoscroll stops if the user interacts with the carousel.

### stopOnMouseEnter

**Type**: Function<br/>
**Default**: (evt: HTMLElement, target: HTMLElement) => void

Whether the autoscroll stops if the user hovers the carousel.

### stopOnLastSnap

**Type**: Function<br/>
**Default**: (evt: HTMLElement, target: HTMLElement) => void

Whether the autoscroll stops if the last snap point is reached.

## Global Options

You can also set global options that will be applied to all instances. This allows for overriding the default plugin options with your own:

```js
AutoscrollPlugin.globalOptions = {
  debounce: 1000,
};
```

## OS & Browser Support

- Mac OS (Chrome, Firefox, Safari, Edge), Magic Mouse, Magic Trackpad
- Windows (Chrome, Firefox, Edge), Microsoft Precision Touchpads

## Thanks

Kudos to [David Jerleke](https://github.com/davidjerleke) for creating [Embla Carousel](https://github.com/davidjerleke/embla-carousel) with its open API 🙏

## License

MIT.
