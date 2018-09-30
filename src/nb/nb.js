var BayesClassifier = require('bayes-classifier')
var classifier = new BayesClassifier()
import instant from "./instant.js"
import notInstant from"./notInstant.js"

classifier.addDocuments(instant, `instant`)
classifier.addDocuments(notInstant, `not instant`)

classifier.train()

// Storing classifier
var storeFile = `${__dirname}/store.json`
fs.writeFileSync(storeFile, JSON.stringify(classifier))