# Description
  A node.js RESTful API where a user can create an account and have attendees check-in or check-out.

### API Endpoints
| Base Url |
| ------ |
| `[baseUrl]/api/v1` + `resource`|


| Description | Verb | Route | 
| ------ | ------ | ------ |
| User root | GET | /user/ |
| Create user account | POST | /user/signup |
| User login | POST | /user/login |
| [Get a User with a given id](restapidocs/getuser.md) | GET | /user/:id |
| Get Attendees belonging to a User | GET | /user/:id/attendees |
| Delete a User | DELETE | /user/:userId |
| Attendee root | GET | /attendee/ |
| Attendee Check-In | POST | /attendee/:id/check-in |
| Attendee Check-Out | POST | /attendee/:id/check-out |

**tbc**