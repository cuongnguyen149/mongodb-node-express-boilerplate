import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const testSchema = new Schema({
    Citicode: {
        type: String,
    }
});

export default mongoose.model('Test', testSchema);
