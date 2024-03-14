export default function VirtualCardModel(sequelize, DataTypes) {
    return sequelize.define('virtualCards', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        currency: {
            type: DataTypes.ENUM('USD', 'NGN'),
            allowNull: false,
            defaultValue: 'USD',
        },
        card_pan: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        masked_pan: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        card_type: {
            type: DataTypes.ENUM('mastercard', 'visa'),
            allowNull: false,
            defaultValue: 'mastercard',
        },
        cvv: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiration: {
            type: DataTypes.DATE,
        },
        name_on_card: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
}
