import { IconProp } from '@fortawesome/fontawesome-svg-core';

export enum NavigationLabel {
  Long = 'long',
  Short = 'short',
}

export type NavigationEntity = {
  path: string[];
  label: { [NavigationLabel.Long]: string; [NavigationLabel.Short]: string };
  icon: IconProp;
  title: string;
};

export type MainNavigation = {
  path: string[];
  label: string;
  icon: IconProp;
  title: string;
}[];
