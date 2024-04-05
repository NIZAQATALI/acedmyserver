module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.TEXT,
      },
      last_name: {
        type: DataTypes.TEXT,
      },
      password:{
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING,
      }
    }
    );
    return User;
  };
  