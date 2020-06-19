# Description
  A node.js RESTful API where a user can create an account and have attendees check-in or check-out.

## Url
`https://simpleattendance-api.herokuapp.com/`

### API Endpoints
| Base Url |
| ------ |
| `[baseUrl]/api/v1`|


| Description | Verb | Route | 
| ------ | ------ | ------ |
| [Service Status](restapidocs/getServiceStatus.md) | GET | /api-status |
| Users |  |  |
| [Create user account](restapidocs/createUserAccount.md) | POST | /user/signup |
| [User login](restapidocs/loginUser.md) | POST | /user/login |
| Get a User | GET | /user/:id |
| Delete a User | DELETE | /user/:userId |
| Attendees |  |  |
| Get All Attendees of a User | GET | /user/:id/attendees |
| [Attendee Check-In](restapidocs/attendeeCheckIn.md) | POST | /attendee/:id/check-in |
| [Attendee Check-Out](restapidocs/attendeeCheckOut.md) | POST | /attendee/:id/check-out |
