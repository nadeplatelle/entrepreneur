const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp();


exports.Customer = functions.https.onCall((data, context) => {
    return admin.firestore().collection('Customers').add({
        name: data.name,
        contact: data.contact,
        email: data.email,
        phone: data.phone,
        notes: data.notes
    })
})

exports.Job = functions.https.onCall((data, context) => {
    return admin.firestore().collection('Jobs').add({
        building: data.building,
        invoicedBy: data.invoicedBy,
        jobType: data.jobType,
        timeQuoted: data.timeQuoted,
        timeSpent: data.timeSpent,
        materialsNotes: data.materialsNotes,
        totalPrice: data.totalPrice,
        dateQuoted: data.dateQuoted,
        dateInvoiced: data.dateInvoiced
    })
})

exports.Supplier = functions.https.onCall((data, context) => {
    return admin.firestore().collection('Suppliers').add({
        name: data.name,
        contact: data.contact,
        email: data.email,
        phone: data.phone,
        notes: data.notes
    })
})



exports.Building = functions.https.onCall((data, context) => {
    return admin.firestore().collection('Buildings').add({
        name: data.name,
        address: data.address,
        customer: data.customer,
        invoiceToname: data.invoiceToname,
        invoiceToemail: data.invoiceToemail,
        buildingNotes: data.buildingNotes,
    })
})


exports.EditCustomer = functions.https.onCall((data, context) => {
    return admin.firestore().collection('Customers').doc(data.id).update({name: data.name, 
        contact: data.contact, 
        email: data.email,
        phone: data.phone,
        notes: data.notes
       })
})

exports.EditSupplier = functions.https.onCall((data, context) => {
    return admin.firestore().collection('Suppliers').doc(data.id).update({name: data.name, 
        contact: data.contact, 
        email: data.email,
        phone: data.phone,
        notes: data.notes
       })
})


exports.EditBuilding = functions.https.onCall((data, context) => {
    return admin.firestore().collection('Buildings').doc(data.id).update({name: data.name, 
        customer: data.customer, 
        address: data.address,
        invoiceToname: data.invoiceToname,
        invoiceToemail: data.invoiceToemail,
        buildingNotes: data.buildingNotes
       })
})

exports.EditJob = functions.https.onCall((data, context) => {
    return admin.firestore().collection('Jobs').doc(data.id).update({
        building: data.building, 
        invoicedBy: data.invoicedBy, 
        jobType: data.jobType,
        timeQuoted: data.timeQuoted,
        timeSpent: data.timeSpent,
        totalPrice: data.totalPrice,
        dateQuoted: data.dateQuoted,
        dateInvoiced: data.dateInvoiced,
        materialsNotes: data.materialsNotes
       })
})



