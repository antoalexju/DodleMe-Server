const User = require('./User');
const Event = require('./Event');
const Time = require('./Time');
const Answer = require('./Answer');
const Participant = require('./Participant');
const IdentifiedUser = require('./IdentifiedUser');

User.hasMany(Event, {foreignKey: 'creator', as: 'events'});
Event.belongsTo(User, {foreignKey: 'creator', as: 'userCreator'});

Event.hasMany(Time, {foreignKey: 'idEventAttached', as: 'times'});
Time.belongsTo(Event, {foreignKey: 'idEventAttached', as: 'event'});

Time.hasMany(Answer, {foreignKey: 'idTime', as: 'answers'});
Answer.belongsTo(Time, {foreignKey: 'idTime', as: 'time'});

Event.hasMany(Participant, {foreignKey: 'idEvent', as: 'participants'});
Participant.belongsTo(Event, {foreignKey: 'idEvent', as: 'event'});

User.hasMany(IdentifiedUser, {foreignKey: 'idIdentifiedUser', as: 'information'});
IdentifiedUser.belongsTo(User, {foreignKey: 'idIdentifiedUser', as: 'user'});

User.hasMany(Answer, {foreignKey: 'idUser', as: 'answers'});
Answer.belongsTo(User, {foreignKey: 'idUser', as: 'user'});

module.exports = {
    User,Event,Time,Answer,Participant,IdentifiedUser
}