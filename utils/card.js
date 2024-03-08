import Flutterwave from 'flutterwave-node-v3';

const flw = new Flutterwave(
    process.env.FLW_PUBLIC_KEY,
    process.env.FLW_SECRET_KEY
);

export async function createVcard(payload) {
    try {
        const result = await flw.VirtualCard.create(payload);
        return result;
    } catch (err) {
        throw err;
    }
}
