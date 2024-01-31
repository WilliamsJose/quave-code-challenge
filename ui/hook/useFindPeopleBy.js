import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../people/people';

export const useFindPeopleBy = (search) => {
  return useTracker(() => {
    const handle = Meteor.subscribe('people');
    const loading = !handle.ready();
    const found = People.find(search ?? {}).fetch();
    return {
      loading,
      found,
    };
  });
}