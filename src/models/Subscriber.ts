import mongoose, { Schema, Document } from 'mongoose'

export interface ISubscriber extends Document {
    email: String;
}

const subscriberSchema: Schema<ISubscriber> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const Subscriber = mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', subscriberSchema);

export default Subscriber;