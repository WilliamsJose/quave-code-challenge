import { useContext } from 'react';
import { HomeContext } from '../context/HomeContext';

export const useEventPeopleCounter = () => {
  const { homeState } = useContext(HomeContext);
  const pieChartData = [];

  if (homeState.peopleByGroup) {
    // I will filter group count only for chart performance purpose,
    // but in another situation, i should call PO and talk before take a decision.
    Object.entries(homeState.peopleByGroup).map(([group, count]) => group !== 'undefined' && count > 2
      ? pieChartData.push({ id: group, value: count, label: group })
      : undefined);
  }

  return {
    peopleByEvent: homeState.peopleByEvent,
    peopleByGroup: pieChartData,
    peopleNotCheckedIn: homeState.peopleNotCheckedIn,
  };
};
