import { v4 as uuidv4 } from "uuid";

export const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(), // Generate UUID by default
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female"),
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
      },
      resetToken: {
        type: DataTypes.STRING,
      },
      tokenConfirmed: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: "Users",
    }
  );
  return User;
};
