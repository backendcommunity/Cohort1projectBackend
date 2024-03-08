import db from '../models/index.js';
import { createVcard } from '../utils/card.js';
const { VirtualCard } = db;
const User = db.users;

export async function createCard(req, res) {
    const user = req.user ? await User.findByPk(req.user.id) : false;
    if (!user) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized!',
        });
    }

    const { currency, amount, debitCurrency } = req.body;
    const payload = {
        currency: currency || 'USD',
        amount: amount || 1,
        debit_currency: debitCurrency || 'NGN',
        billing_address: user.address,
        first_name: user.first_name,
        last_name: user.last_name,
        date_of_birth: user.dob.toString().split('-').join('/') || '1996/12/30',
        email: user.email,
        phone: user.phone_number,
        title: user.gender == 'Male' ? 'Mr' : 'Miss',
        gender: user.gender == 'Male' ? 'M' : 'F',
    };

    try {
        const vcard = await createVcard(payload);
        if (vcard.status == 'error') {
            return res.status(400).json({
                status: 'error',
                message: vcard.message,
            });
        }
        await VirtualCard.create(vcard);

        return res.status(201).json({
            status: 'success',
            message: 'Card created successfully',
            data: vcard,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}
