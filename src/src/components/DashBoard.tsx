import * as React from 'react';

import { Provider } from 'jotai';

import {
  FluentProvider,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  tokens,
} from '@fluentui/react-components';

import { DashboardControl } from './dashBoardControl/DashboardControl';
import { IDashBoardProps } from './IDashBoardProps';

export const Dashboard: React.FunctionComponent<IDashBoardProps > = (props: React.PropsWithChildren<IDashBoardProps >) => {
  const { themeString ,   } = props;
  return (
    <>
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <Provider>
          <DashboardControl  {...props} />
        </Provider>
      </FluentProvider>

    </>
  );
};

