module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return User;
  };
  