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
      d_o_b: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      finpay_tag: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      profile_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: "Users",
    }
  );
  return User;
};
