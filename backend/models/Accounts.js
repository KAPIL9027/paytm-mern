import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const accountsSchema = new Schema({
    userId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account',accountsSchema);
export {
    Account
}