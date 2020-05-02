import { IconProp } from '@fortawesome/fontawesome-svg-core';

export enum NavigationLabel {
  Long = 'long',
  Short = 'short',
}

export interface NavigationEntity {
  path: string[];
  label: { [NavigationLabel.Long]: string; [NavigationLabel.Short]: string };
  icon: IconProp;
}
