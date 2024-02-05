import React from 'react';

export const EventPeopleCounter = ({ peopleByEvent, peopleNotCheckedIn, peopleByGroup }) => {
  let formattedPeopleByGroup = 0;

  if (peopleByGroup) {
    formattedPeopleByGroup = Object.entries(peopleByGroup).map(([group, count]) => group !== 'undefined'
      ? `${group} (${count})`
      : '');
    formattedPeopleByGroup = formattedPeopleByGroup.filter(arr => arr).join(', ');
  }

  return (
    <div>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People in this event right now: {peopleByEvent}</p>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People not checked in: {peopleNotCheckedIn}</p>
      <p className="mt-2 w-full bg-slate-300 rounded p-1">People by Company in this event right now: {formattedPeopleByGroup}</p>
    </div>
  );
}