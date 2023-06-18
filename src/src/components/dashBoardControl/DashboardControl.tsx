/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';

import { useAtom } from 'jotai';

import { Subtitle1 } from '@fluentui/react-components';

import { appStateAtom } from '../../atoms/appStateAtom';
import { useUtils } from '../../hooks/useUtils';
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
 const {  title } = props;
 const {isInTeams} = useUtils();

  React.useEffect(() => {
    setAppState({
      ...appGlobalState,
      ...props,
    });
  }, []);

  const showTitle = React.useMemo(()=> {
      if (!isInTeams){
        return <div style={{display: "flex", justifyContent:"center", alignContent:"center", width:'100%', padding: 15, backgroundColor: "white", marginBottom: 1 }}>

        <Subtitle1>{title}</Subtitle1>
        </div>
      }
      return null;
  },[isInTeams, title]);

  const containerStyles = useContainerStyles();
  return (
    <>
      <div className={containerStyles.root}>
      {showTitle}
        
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
