import { Component, Prop, h } from '@stencil/core';
import { ColorName, ColorShadeName, AllowedColors } from '../../types';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @Prop() color?: ColorName | AllowedColors<`${ColorName}-${ColorShadeName}`>;
  /**
   * Typing the prop without a union of something else also seems to generate the expected values
   * for this type correctly.
   */
  // @Prop() color?: AllowedColors<`${ColorName}-${ColorShadeName}`>;
  /**
   * Typing the prop without a generic also does not seem to result in the same issue, it correctly
   * expands the underlying values for `${ColorName}-${ColorShadeName}`. However, it does NOT
   * expand the values for `ColorName`.
   */
  // @Prop() color?: ColorName | `${ColorName}-${ColorShadeName}`;

  render() {
    return <div>Hello, World! I'm Test</div>;
  }
}
