Attendee Check Out
 ===
Allows the attendee to checkout.

**URL**: `/attendee/:id/check-out`

**Method**: `POST`

**Auth Required**: NO

**Data Constraints**  

```json
{
    "fullName": "[fullName]",
    "email": "[Email Address]",
    "lat": "[lat]",
    "long": "[long]",
    "checkIn": "[checkOut]"
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
    "Response": "5688788bdc6754f7854a68ec5643" 
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

**Condition**: "If User email is not found"

**Code**: 404

**Content Example**
```json
{ 
    "Response": "No User Found" 
}
```

**Condition**: "If User password does not match"

**Code**: 403

**Content Example**
```json
{ 
    "Response": "Auth Error" 
}
```