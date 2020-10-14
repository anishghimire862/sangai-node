const conn = require('../database');
module.exports = {
  postEcard (req, res, next) {
    const file = req.file;
    const sender = req.session.loggedInUser.username;
    const receiver = req.body.receiver
    if(!file) {
      console.log('No file selected');
    } else {
      let fs = require('fs');
      fs.readFile('./data/ecards.json', 'utf-8', function(err, data) {
        if(err)
          console.log(err)
        let arrayOfObjects = JSON.parse(data);
        arrayOfObjects.ecards.push({
          image: file.filename,
          sender: sender,
          receiver: receiver,
          message: req.body.message
        });
        fs.writeFile('./data/ecards.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
          if(err)
            console.log(err);
            const notification = {
              sender: sender,
              receiver: receiver,
              type: 'ecard',
              content: file.filename
            }
            conn.query('INSERT INTO notifications SET ?', notification, function(err, data) {
              if(err)
                console.log(err)
            })
        })
        res.json({status: 'success', path: file.path, filename: file.filename, sender: sender, receiver: receiver});
      })
    }
  }
}