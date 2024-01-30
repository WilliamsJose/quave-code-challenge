import { Meteor } from 'meteor/meteor';
import { People } from '../people/people';
import { Communities } from '../communities/communities';

Meteor.publish('people', () => People.find());
Meteor.publish('communities', () => Communities.find());
