# mongo-mysql-Db
## Mongo Database
### create a admin user
```
db.createUser(
  {
    user: "andrea",
    pwd: "abc123",
    roles: [{ role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase"]
  }
)
```

### Check the currently logged in user
```db.runCommand({connectionStatus: 1})```

### create a normal user with roles
```
e
```
## mysql
