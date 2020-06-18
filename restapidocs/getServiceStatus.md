 Service Message
 ===
Returns service message if API is online.

**URL**: `/api-status`

**Method**: `GET`

**Auth Required**: NO

**Data Constraints**  

`{}`

**Data Example** 

`{}`


Success Response
---
**Code**: 200

**Content Example**
```json
{ 
    "Response": "Simple Attendance v1" 
}
```
Error Response
---
**Code**: 404

**Content Example**
```json
{ 
    "Response": "Route Not Found." 
}
```