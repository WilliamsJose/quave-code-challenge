import React from 'react';
import { useEventPeopleCounter } from '../../hook/display/useEventPeopleCounter';

export const EventPeopleCounter = () => {
  const { peopleByEvent, peopleNotCheckedIn, peopleByGroup } = useEventPeopleCounter();

  return (
    <div>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People in this event right now: {peopleByEvent}</p>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People not checked in: {peopleNotCheckedIn}</p>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People by Company in this event right now: {peopleByGroup}</p>
    </div>
  );
}