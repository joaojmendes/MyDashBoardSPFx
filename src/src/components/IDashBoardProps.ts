import { BaseComponentContext } from '@microsoft/sp-component-base';
import { Theme } from '@fluentui/react';

export interface IDashBoardProps {
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  themeString?: string;
  theme?: Theme  | undefined;
  context: BaseComponentContext;
  title: string;
}
