/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';

import { useAtom } from 'jotai';

import { appStateAtom } from '../../atoms/appStateAtom';
import { Center } from '../center/Center';
import { useContainerStyles } from '../Container/useContainerStyles';
import { IDashBoardProps } from '../IDashBoardProps';
import { Left } from '../left/Left';
import { MyDay } from '../myDay/MyDay';
import { MyFeed } from '../myFeed/MyFeed';
import { MyFiles } from '../myFiles/MyFiles';
import { People } from '../people/People';
import { Right } from '../right/Right';

export const DashboardControl: React.FunctionComponent<IDashBoardProps> = (
  props: React.PropsWithChildren<IDashBoardProps>
) => {
  const [appGlobalState, setAppState] = useAtom(appStateAtom);
  React.useEffect(() => {
    setAppState({
      ...appGlobalState,
      ...props,
    });
  }, []);

  const containerStyles = useContainerStyles();

  return (
    <>
      <div className={containerStyles.root}>
        <div className={containerStyles.grid}>
          <Left>
            <MyDay />
          </Left>
          <Center>
            <MyFiles />
            <MyFeed />
          </Center>
          <Right>
            <People />
          </Right>  
        </div>
      </div>
   
    </>
  );
};
