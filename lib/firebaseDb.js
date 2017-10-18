var admin = require("firebase-admin")
require('dotenv').config()

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_PROJECT_ID + "@appspot.gserviceaccount.com",
    privateKey: process.env.FIREBASE_PRIVATE_KEY
  }),
  databaseURL: "https://" + process.env.FIREBASE_DB_NAME + ".firebaseio.com"
})

// admin.database.enableLogging(true);

exports.firebaseDb = admin.database()
