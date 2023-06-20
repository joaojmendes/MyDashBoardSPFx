/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import { Todo } from '@microsoft/mgt-react/dist/es6/spfx';

import {
  HEIGHT_ON_SPSITE,
  HEIGHT_ON_TEAMS,
} from '../../constants/constants';
import { useUtils } from '../../hooks/useUtils';
import { useMgtTodoStyles } from './useMgtTodoStyles';

export interface IMgtTodoProps {}

export const MgtTodo: React.FunctionComponent<IMgtTodoProps> = (props: React.PropsWithChildren<IMgtTodoProps>) => {
  const styles = useMgtTodoStyles();
  const {isInTeams} = useUtils();
  return (
    <>
      <div className={styles.root} style={{height: isInTeams ? HEIGHT_ON_TEAMS : HEIGHT_ON_SPSITE}}>
        <Todo   className={styles.todo}/>
      </div>
    </>
  );
};
