const conn = require('../database');
module.exports = {
  postFeed (req, res) {
    const feed = {
      creator: req.session.loggedInUser.username,
      content: req.body.content
    };

    conn.query('INSERT INTO feed SET ?', feed, function(err, data) {
      if(err)
        console.log(err)
      res.json({status: 'success'});
    })
  },
  postComment (req, res) {
    const comment = {
      creator: req.session.loggedInUser.username,
      content: req.body.content,
      feed_id: req.body.feed_id
    };

    conn.query('INSERT INTO comments SET ?', comment, function(err, data) {
      if(err)
        console.log(err)
      res.json({status: 'success'});
    })
  },
  getFeeds (req, res, skip) {
    let currentUser = req.session.loggedInUser.username;
    let limit = skip + ',' + 10;
    conn.query('SELECT users.id as creatorId, users.username as creatorUsername, ' +
      'users.avatar as creatorAvatar, feed.content as content, feed.id as feedId, ' +
      'feed.created_at as feedCreatedAt, ' +
      'COUNT(likes.post_id) AS likedByCount, ' +
      'COUNT(comments.feed_id) AS commentCount, ' +
      'COUNT(if(likes.username = ?, likes.username, NULL )) AS likedByCurrentUser ' +
      'FROM feed LEFT JOIN users ON users.username=feed.creator ' + 
      'LEFT JOIN likes on feed.id  = likes.post_id ' +
      'LEFT JOIN comments on feed.id = comments.feed_id ' +
      'GROUP BY feedId ORDER BY feedId DESC LIMIT ' + limit, currentUser, function(err, data) {
        console.log(err)
        res.json({data})
    })
  },
  getComments (req, res) {
    let feedId = req.params.feedId;
    conn.query('SELECT users.id as creatorId, users.username as creatorUsername, ' +
      'users.avatar as creatorAvatar, comments.content as content, comments.id as commentId, ' +
      'comments.created_at as commentCreatedAt, comments.feed_id as feedId ' +
      'FROM comments INNER JOIN users ON users.username=comments.creator ' + 
      'WHERE comments.feed_id = ? ORDER BY commentId DESC', [feedId], function(err, data) {
        res.json({data})
    })
  },
  likeFeed (req, res) {
    const data = {
      username: req.session.loggedInUser.username,
      post_id: req.body.post_id
    }
    conn.query('SELECT * FROM likes WHERE post_id = ? AND username = ?', [data.post_id, data.username], function(err, likeData) {
      if(likeData.length > 0) {
        conn.query('DELETE FROM likes WHERE post_id=? AND username =?', [data.post_id, data.username], function(err, result) {
          res.json({status: 'deleted'})
        })
      } else {
        conn.query('INSERT INTO likes SET ?', data, function(err, data) {
          if(err)
            console.log(err)
          res.json({status: 'success'});
        })
      }
    })
  }
}