import React from 'react';
import { useEventPeopleCounter } from '../../hook/display/useEventPeopleCounter';
import { PieChart } from '@mui/x-charts';

export const EventPeopleCounter = () => {
  const { peopleByEvent, peopleNotCheckedIn, peopleByGroup } = useEventPeopleCounter();

  return (
    <div>
      <div className="lg:flex lg:flex-row">
        <p className="mt-2 w-full bg-slate-300 rounded p-1 lg:mr-1">People in this event right now: {peopleByEvent}</p>
        <p className="mt-2 w-full bg-slate-300 rounded p-1 lg:ml-1">People not checked in: {peopleNotCheckedIn}</p>
      </div>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People by Company in this event right now: </p>
        <PieChart
          key="pie-chart"
          series={[
            {
              data: peopleByGroup,
              type: 'pie',
            },
          ]}
          height={450}
          margin={{ left: 100, top: 150 }}
          slotProps={{
            legend: {
              direction: 'row',
              hidden: false,
              position: {
                vertical: 'top',
                horizontal: 'right',
              },
              itemGap: 2,
              itemMarkWidth: 10,
            },
          }}
        />
    </div>
  );
};
