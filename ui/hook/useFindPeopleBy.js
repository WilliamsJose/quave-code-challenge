import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../people/people';

export const useFindPeopleBy = search => {
  return useTracker(() => {
    const handle = Meteor.subscribe('people');
    const peopleLoading = !handle.ready();
    const peopleFound = People.find(search ?? {}).fetch();
    return [
      peopleLoading,
      peopleFound,
    ];
  }, [search]);
};
