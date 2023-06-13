import * as React from 'react';
import * as ReactDom from 'react-dom';

import * as strings from 'DashBoardWebPartStrings';

import {
  Providers,
  SharePointProvider,
} from '@microsoft/mgt';
import {
  BaseComponentContext,
  IReadonlyTheme,
} from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { Dashboard } from '../../components/DashBoard';
import { IDashBoardProps } from '../../components/IDashBoardProps';
import { getSP } from '../../pnpjs/pnpjsConfig';

export interface IDashBoardWebPartProps {
  description: string;
}

export default class DashBoardWebPart extends BaseClientSideWebPart<IDashBoardWebPartProps> {
  private _isDarkTheme: boolean = false;

  private _themeString: string = "";

  private _applyTheme = (theme: string): void => {
    this.context.domElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);

    if (theme === "dark") {
      this._themeString = "dark";
    }

    if (theme === "default") {
      this._themeString = "default";
    }

    if (theme === "contrast") {
      this._themeString = "contrast";
    }
    this.render();
  };

  public render(): void {
    const element: React.ReactElement<IDashBoardProps> = React.createElement(Dashboard, {
      isDarkTheme: this._isDarkTheme,
      themeString: this._themeString ?? "default",
      hasTeamsContext: !!this.context.sdks.microsoftTeams,
      context: this.context as BaseComponentContext,
    });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    if (!Providers.globalProvider) {
      Providers.globalProvider = new SharePointProvider(this.context);
    }
    if (this.context.sdks.microsoftTeams) {
      // in teams ?
      const teamsContext = await this.context.sdks.microsoftTeams?.teamsJs.app.getContext();

      this._applyTheme(teamsContext.app.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.app.registerOnThemeChangeHandler(this._applyTheme);
    }

    getSP(this.context);
    return Promise.resolve();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }
    this._isDarkTheme = !!currentTheme.isInverted;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
