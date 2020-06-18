Attendee Check In
 ===
Allows the Attendee to check in.

**URL**: `/attendee/:id/check-in`

**Method**: `POST`

**Auth Required**: NO

**Data Constraints**  

```json
{
    "fullName": "[fullName]",
    "email": "[Email Address]",
    "lat": "[lat]",
    "long": "[long]",
    "checkIn": "[checkIn]"
}
```

**Data Example** 

```json
{
    "email": "joe@boxer.com",
    "password": "f$1F-(9>?",
}
```


Success Response
---
**Code**: 200

**Content Example**
```json
{ 
    "Response": "Welcome [fullName], Check In time is [checkInTime]" 
}
```

Error Response
---
**Condition**: "If there is missing information."

**Code**: 400

**Content Example**
```json
{ 
    "Response": "Input missing" 
}
```

**Condition**: "If there is no user."

**Code**: 400

**Content Example**
```json
{ 
    "Response": "User does not exist" 
}
```

**Condition**: "If attendee already checked in"

**Code**: 400

**Content Example**
```json
{ 
    "Response": "Attendee already exists." 
}
```