const { db } = require('../util/admin');

exports.getAllEmails = (request, response) => {
  db.collection('emails')
    .get()
    .then((data) => {
      let emails = [];
      data.forEach((doc) => {
        emails.push({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
        });
      });
      return response.json(emails);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.postOneEmail = (request, response) => {
  const newEmailItem = {
    name: request.body.name,
    email: request.body.email,
  };
  db.collection('emails')
    .add(newEmailItem)
    .then((doc) => {
      const responseEmailItem = newEmailItem;
      responseEmailItem.id = doc.id;
      return response.json(responseEmailItem);
    })
    .catch((err) => {
      response.status(500).json({ error: 'Something went wrong' });
      console.error(err);
    });
};
