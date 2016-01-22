module.exports = {
  "name": "User",
  "properties": {
    "email": {
      "type": "string",
      "required": true
    },
    "password": {
      "type": "string",
      "required": true
    },
    "emailVerified": "boolean",
    "created": "date",
    "lastUpdated": "date"
  },
  "acls": [
    {
      "principalType": "ROLE",
      "principalId": "everyone",
      "permission": "DENY"
    },
    {
      "principalType": "ROLE",
      "principalId": "everyone",
      "permission": "ALLOW",
      "property": "create"
    },
    {
      "principalType": "ROLE",
      "principalId": "everyone",
      "permission": "ALLOW",
      "property": "login"
    },
    {
      "principalType": "ROLE",
      "principalId": "everyone",
      "permission": "ALLOW",
      "property": "logout"
    }
  ]
}
