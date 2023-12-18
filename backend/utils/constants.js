const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const emailRegex = /^\S+@\S+\.\S+$/;

module.exports = {
  urlRegex,
  emailRegex,
  ID_MESSAGE: 'Пользователь по указанному _id не найден.',
};
