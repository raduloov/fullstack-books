import { MutableRefObject } from 'react';

export enum SliderPositions {
  START = 'start',
  END = 'end'
}

export const getSliderPosition = (
  sliderRef: MutableRefObject<HTMLDivElement | null>
): string | undefined => {
  const slider = sliderRef.current;

  if (!slider) {
    throw new Error('Provided parameter is not a valid HTML div ref element.');
  }

  /**
   * There could be 0.5 or 1 offset,
   * so I add the extra edge cases
   */
  if (
    slider.scrollWidth - slider.scrollLeft === slider.clientWidth ||
    slider.scrollWidth - slider.scrollLeft === slider.clientWidth - 0.5 ||
    slider.scrollWidth - slider.scrollLeft === slider.clientWidth + 0.5 ||
    slider.scrollWidth - slider.scrollLeft === slider.clientWidth - 1 ||
    slider.scrollWidth - slider.scrollLeft === slider.clientWidth + 1
  ) {
    return SliderPositions.END;
  }

  if (slider.scrollLeft === 0) {
    return SliderPositions.START;
  }
};
