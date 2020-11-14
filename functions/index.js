const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp();


exports.SaveCustomer = functions.https.onCall((data, context) => {
    return admin.firestore().collection('Customers').add({
        name: data.name,
        contact: data.contact,
        email: data.email,
        phone: data.phone,
        notes: data.notes
    })
})

