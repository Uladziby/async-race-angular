import { ElementRef } from '@angular/core';
import { RaceDirective } from './highlight-directive.directive';

describe('HighlightDirectiveDirective', () => {
  it('should create an instance', () => {
    const divElement = document.createElement('div'); // Create an HTMLDivElement instance

    const directive = new RaceDirective(
      divElement as unknown as ElementRef<HTMLDivElement>
    );
    expect(directive).toBeTruthy();
  });
});
