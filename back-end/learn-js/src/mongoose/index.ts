import mongoose, { Schema } from 'mongoose';

const MyModel = mongoose.model('Test', new Schema({ name: String }));
const doc = new MyModel();
MyModel.update()

doc instanceof MyModel; // true
doc instanceof mongoose.Model; // true
doc instanceof mongoose.Document; // true