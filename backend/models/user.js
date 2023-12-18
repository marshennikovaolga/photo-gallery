const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const InvalidCredentialsError = require('../errors/invalidCredentialsError');
const { urlRegex, emailRegex } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длина поля - 2 символа'],
    maxlength: [30, 'Максимальная длина поля - 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Минимальная длина поля - 2 символа'],
    maxlength: [30, 'Максимальная длина поля - 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Введите корректный URL.',
    },
  },
  email: {
    type: String,
    required: [true, 'Заполните поле'],
    unique: true,
    validate: {
      validator(email) {
        return emailRegex.test(email);
      },
      message: 'Введите корректный email.',
    },
  },
  password: {
    type: String,
    required: [true, 'Заполните поле'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new InvalidCredentialsError('Ошибка в адресе электронной почты или пароле.');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new InvalidCredentialsError('Ошибка в адресе электронной почты или пароле.');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
