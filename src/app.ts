const bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors');
const app = express();

const server = require('http').Server(app);
const port = 8080;
var zipcodes: Array<number> = [12346, 12345, 12347, 56793, 23567, 23457, 23459, 23458, 23456]


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req: any, res: any) {
  res.send(`Hello <b>StackSource</b> from world`);
});

const sortFunc = function (group: Array<number>, text: string) {
  if (group.length > 1) {
    text = `${group[0]}-${group[group.length - 1]}, ${text}`
  } else if (group.length === 1) {
    text = `${group[0]}, ${text}`
  }
  return text
}

app.route('/zipcodes')
  .get(function (req: any, res: any) {
    let previous = 0
    let group = []
    let text = ''
    zipcodes = zipcodes.sort(function (first: number, second: number) { return first - second })
    for (let zipcode of zipcodes) {
      if (zipcode - previous === 1) {
        group.push(zipcode)
      } else {
        text = sortFunc(group, text)
        group = []
        group.push(zipcode)
      }
      previous = zipcode
    }
    text = sortFunc(group, text)
    res.status(200).send(text)
  })

app.all('/zipcode/:zipcode', function (req: any, res: any, next: any) {
  if (req.params.zipcode.length !== 5) {
    res.status(422).send('Zipcode must be 5 digits')
  } else if (isNaN(req.params.zipcode)) {
    res.status(422).send('Zipcode must be a number')
  } else {
    next()
  }
})

app.route('/zipcode/:zipcode')
  .get(function (req: any, res: any) {
    let index = zipcodes.findIndex(zip => zip === +req.params.zipcode)
    if (index > -1) return res.status(200).send(true)
    else res.status(200).send(false)
  })
  .post(function (req: any, res: any) {
    let index = zipcodes.findIndex(zip => zip === +req.params.zipcode)
    if (index <= -1) {
      zipcodes.push(+req.params.zipcode)
      res.status(200).send('Zipcode added');
    } else {
      res.status(422).send('Zipcode already added');
    }
  })
  .delete(function (req: any, res: any) {
    let index = zipcodes.findIndex(zip => zip === +req.params.zipcode)
    if (index > -1) {
      zipcodes.splice(index, 1)
      res.status(200).send('Zipcode removed');
    } else {
      res.status(422).send('Zipcode does not exist');
    }
  })


app.use(function (req: any, res: any, next: any) {
  res.status(404).send("Wrong route try again lol");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});