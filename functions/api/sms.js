const { db } = require('../util/admin');

exports.getAllContacts = (request, response) => {
  db.collection('contacts')
    .get()
    .then((data) => {
      let contacts = [];
      data.forEach((doc) => {
        contacts.push({
          id: doc.id,
          name: doc.data().name,
          number: doc.data().number,
        });
      });
      return response.json(contacts);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.postOneContact = (request, response) => {
  const newContactItem = {
    name: request.body.name,
    number: request.body.number,
  };
  db.collection('contacts')
    .add(newContactItem)
    .then((doc) => {
      const responseContactItem = newContactItem;
      responseContactItem.id = doc.id;
      return response.json(responseContactItem);
    })
    .catch((err) => {
      response.status(500).json({ error: 'Something went wrong' });
      console.error(err);
    });
};
