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

exports.SaveJob = functions.https.onCall((data, context) => {
    return admin.firestore().collection('Jobs').add({
        customer: data.customer,
        jobType: data.jobType,
        timeQuoted: data.timeQuoted,
        timeSpent: data.timeSpent,
        materialsNotes: data.materialsnotes
    })
})

exports.SaveSupplier = functions.https.onCall((data, context) => {
    return admin.firestore().collection('Suppliers').add({
        name: data.name,
        contact: data.contact,
        email: data.email,
        phone: data.phone,
        notes: data.notes
    })
})

