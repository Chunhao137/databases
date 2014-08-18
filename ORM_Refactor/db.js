var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatter", "root", "");

var User = sequelize.define('users', {
  username: Sequelize.STRING
});

var Message = sequelize.define('message' {
  user_id: Sequelize.INTEGER,
  message: Sequelize.STRING,
  roomname: Sequelize.STRING
});

Message.belongsTo(User,{foriegnKey: 'users_id'});

User.hasMany(Message);

Sequelize.sync().error(function(){
   console.log('sync failed');
  }).success(function(){
	console.log('woot woot');
  });


exports.findAllMessages = function(cb){
	 Message.findAll({
	 	attributes: ['message','roomname'],
	 	include: [{model:User, attributes:['username']}]}).success(function(messages){
	 		 cb(messages);
	 	}).error(function(error){
	 		 console.log('Error in findAllMessages:',error);
	 		 cb(error);
	 	})
};

exports.findOrCreateUser = function(username, cb){
	 User.findOrCreate({username: username}).success(cb);
};

exports.saveMessage = function(chat,cb){
	 Message.create(chat)
	 .success(cb)
	 .error(function(error){
	 	 console.log("error saving message: ", error);
	 	 cb(error);
	 })
}
/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/


	
	  
