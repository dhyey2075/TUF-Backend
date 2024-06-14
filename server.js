const express = require('express')
const bodyParser = require('body-parser');
const connectToDB = require('./dbconnect.js');
const CodeSubmission = require('./models/code.js');
const cors = require('cors');


const app = express()
const port = 3000

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  connectToDB().then(() => {
    // res.send('db connected')
    // const newCodeSubmission = new CodeSubmission({
    //     username: "Dhyey",
    //     preferredLanguage: "Python",
    //     stdin: "5",
    //     sourceCode: "print('Hello World')"
    // });

    // newCodeSubmission.save().then((doc) => {
    //     console.log(doc);
    // }).catch((err) => {
    //     console.error(err);
    // })
    res.send('server in working...')

  }).catch((err) => {
    res.send('db connection failed')
  });
})

app.get('/getsubmissions', (req, res) => {
    connectToDB().then(() => {
        CodeSubmission.find().then((docs) => {
            res.status(200).json({ submissions: docs });
        }).catch((err) => {
            console.error(err);
            res.status(400).send('Failed to fetch submissions');
        });
    }).catch((err) => {
        res.send('db connection failed')
    });
})

app.post('/submit', (req, res) => {
    connectToDB().then(() => {
        CodeSubmission.find().then((docs) => {

        }).catch((err) => {
            console.error(err);
        });
    }).catch((err) => {
        res.send('db connection failed')
    });
    const { username, preferredLanguage, stdin, sourceCode } = req.body;
    const newCodeSubmission = new CodeSubmission({
        username,
        preferredLanguage,
        stdin,
        sourceCode
    })

    newCodeSubmission.save().then((doc) => {
        console.log(doc);
        res.status(200).send('Code submitted');
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Failed to submit code');
    })
})

app.get('/getbyuser', (req, res) => {
    console.log(req.query);
    connectToDB().then(() => {
        CodeSubmission.find(req.query).then((docs) => {
            res.status(200).json({ submissions: docs });
        }).catch((err) => {
            console.error(err);
            res.status(400).send('Failed to fetch submissions');
        });
    }).catch((err) => {
        res.send('db connection failed')
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})