import { Common } from 'common/errors/CommonErrors';
import { Auth } from 'common/errors/AuthErrors';
import { User } from 'common/errors/UserErrors';
import { Event } from './EventErrors';

enum ErrorsNumber {
  Common = 100,
  Auth = 200,
  User = 300,
}

export const Errors = {
  Common,
  Auth,
  User,
  Event
};