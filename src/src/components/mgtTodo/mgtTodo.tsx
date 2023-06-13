import './styles.css';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import { Todo } from '@microsoft/mgt-react/dist/es6/spfx';

import { useMgtTodoStyles } from './useMgtTodoStyles';

export interface IMgtTodoProps {}

export const MgtTodo: React.FunctionComponent<IMgtTodoProps> = (props: React.PropsWithChildren<IMgtTodoProps>) => {
  const styles = useMgtTodoStyles();
  return (
    <>
      <div className={styles.root}>
        <Todo   className={styles.todo}/>
      </div>
    </>
  );
};
