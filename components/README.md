# Components Directory Structure

This directory contains all the React components used throughout the application, organized by site/usage.

## Structure

- `common/`: Components used across multiple pages/sites
  - `CookieConsent.tsx`: Cookie consent popup
  - `ParallaxBackground.tsx`: Parallax background effect
  - `submenu.tsx`: Dropdown submenu component for navigation

- `landing/`: Components specific to the landing/home page
  - `HeroGeometric.tsx`: Hero section with geometric animation
  - `InfiniteSlider.tsx` & `InfiniteSlider.css`: Infinite slider component
  - `LogoSlider.tsx` & `LogoSlider.module.css`: Logo carousel component
  - `draggable-scroll.tsx`: Draggable scrolling component
  - `featured-logos.tsx`: Featured logos display component

- `technology/`: Components specific to the technology page
  - `parallax-hero.tsx`: Parallax hero section for technology page
  - `scroll-reveal.tsx`: Scroll reveal animation component
  - `scroll-technology.tsx`: Technology section with scroll effects

- `about/`: Components specific to the about pages
  - (Currently empty, as no components are exclusive to about pages)

- `ui/`: UI components from the shadcn/ui library
  - Various UI components like buttons, inputs, etc.

## Usage

Import components using their relative path from the components directory:

```tsx
// For common components
import { Submenu } from "@/components/common/submenu";

// For landing page components
import { HeroGeometric } from "@/components/landing/HeroGeometric";

// For technology page components
import { ScrollReveal } from "@/components/technology/scroll-reveal";

// For UI components
import { Button } from "@/components/ui/button";
``` 