/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import {
  MgtTemplateProps,
} from '@microsoft/mgt-react/dist/es6/MgtTemplateProps';

import { Event } from './Event';
import { useMgtAgendaStyles } from './useMgtAgendaStyles';

export const AgendaDefaultTemplate: React.FunctionComponent<MgtTemplateProps> = (props: React.PropsWithChildren<MgtTemplateProps>) => {
  const agendaStyles = useMgtAgendaStyles();
  const { events } = props.dataContext;
  return (
    <div className={agendaStyles.root}>
      {events?.map((event: any, index: number) => {
        return <Event key={index} event={event} />;
      })}
    </div>
  );
};