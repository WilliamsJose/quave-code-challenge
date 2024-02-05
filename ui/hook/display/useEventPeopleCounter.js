import { useContext } from 'react';
import { HomeContext } from '../context/HomeContext';

export const useEventPeopleCounter = () => {
  const { homeState } = useContext(HomeContext);
  let formattedPeopleByGroup = 0;

  if (homeState.peopleByGroup) {
    formattedPeopleByGroup = Object.entries(homeState.peopleByGroup).map(([group, count]) => group !== 'undefined'
      ? `${group} (${count})`
      : '');
    formattedPeopleByGroup = formattedPeopleByGroup.filter(arr => arr).join(', ');
  }

  return {
    peopleByEvent: homeState.peopleByEvent,
    peopleByGroup: formattedPeopleByGroup,
    peopleNotCheckedIn: homeState.peopleNotCheckedIn,
  };
};
