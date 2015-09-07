Directory API
=============

In order to get your JWT, send the following request to the API:

```bash
POST /api/authenticate
    {
        username: '',
        password: '',
        ios: false # if true, JWT doesn't expire
    }   
```

Once you have your JWT, you have to include the following header with every request:

```javascript
req.headers['x-access-token'] = 'yourjwt'
```

The following API methods are available:

| Method | Route              | Data Expected | Response        |
|--------|--------------------|---------------|-----------------|
| GET    | `/api/schools`     | None          | List of schools |
| GET    | `/api/schools/*id*`| None          | Specific school |
| POST   | `/api/schools`     | JSON school   | the new school  |
| PUT    | `/api/schools/*id*`| JSON school   | success status  |
| DELETE | `/api/schools/*id*`| None          | success status  |
| POST   | `/api/verify`      | None          | success status  |
| POST   | `/api/pictures`    | file array    | 'ok'            |

School JSON Structure:

```json
{
    name: '',
    address: {
        street: '',
        city: '',
        state: '',
        zip: ''
    },
    phone: '',
    enrollment: 0,
    yearbook: false,
    contacts: [
        {name: '', position: '', contact: '', img: '*path*'}
    ]
}
```

User JSON Structure:

```json
{
    name: '',
    password: '',
    admin: false
}
```
