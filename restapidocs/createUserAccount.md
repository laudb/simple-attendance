User Signup
 ===
Creates a user.

**URL**: `/user/signup`

**Method**: `POST`

**Auth Required**: NO

**Data Constraints**  

```json
{
    "fullName": "[firstName LastName]",
    "email": "[Email Address]",
}
```

**Data Example** 

```json
{
    "fullName": "Joe Boxer",
    "email": "joe@boxer.com",
}
```


Success Response
---
**Code**: 201

**Content Example**
```json
{ 
    "Response": "User has been created." 
}
```

Error Response
---
**Condition**: "If User could not be saved"

**Code**: 400

**Content Example**
```json
{ 
    "Response": "Error Saving User: [user]" 
}
```

**Condition**: "If User already exists"

**Code**: 400

**Content Example**
```json
{ 
    "Response": "User already Exists." 
}
```