import { Theme } from '@fluentui/react-components';
import { BaseComponentContext } from '@microsoft/sp-component-base';

export interface IDashBoardProps {
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  themeString?: string;
  theme?: Theme;
  context: BaseComponentContext;
}
