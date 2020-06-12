import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema(
    {
        name: String,
        contact_person: String,
        telephone_num: String,
        location: String,
        num_of_employees: Number,
    }
);