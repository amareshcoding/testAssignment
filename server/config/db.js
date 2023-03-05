import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
const mongoConnect = async () => {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default mongoConnect

