import { useBreakpoints } from '@vueuse/core';
import { computed, type ComputedRef } from 'vue';

export type TResolutions = 'mobile' | 'tablet' | 'desktop';

const breakpoints: Record<TResolutions, number> = {
  mobile: 0,
  tablet: 768,
  desktop: 1024
};

export const useScreenSize = () => {
  const screenSize = useBreakpoints<TResolutions>(breakpoints);

  const activeBreakpoint: ComputedRef<TResolutions> =
    screenSize.active() as ComputedRef<TResolutions>;

  const isMobile = computed(() => activeBreakpoint.value === 'mobile');
  const isTablet = computed(() => activeBreakpoint.value === 'tablet');
  const isDesktop = computed(() => activeBreakpoint.value === 'desktop');

  return {
    activeBreakpoint,
    isMobile,
    isTablet,
    isDesktop
  };
};