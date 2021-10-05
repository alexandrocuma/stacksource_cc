# Stack Source Code Challenge

## Install dependencies with : 
`` yarn install or npm install ``

## Run app with : 
`` yarn dev or npm run dev``

Project has some dummy zipcodes added already to be used with the endpoint below

### Get Grouped Zipcodes
`curl -v -X GET http://localhost:8080/zipcodes`

Every endpoint below will throw error status 422 if:
``` 
- Zipcode is not 5 digits
- Zipcode is already added
- Zipcode is not a number
- Zipcode does not exist
```

### Exists a Zipcode 
`curl -v -X GET http://localhost:8080/zipcode/:zipcode`

### Create a Zipcode 
`curl -v -X POST http://localhost:8080/zipcode/:zipcode`

### Delete a Zipcode 
`curl -v -X DELETE http://localhost:8080/zipcode/:zipcode`
