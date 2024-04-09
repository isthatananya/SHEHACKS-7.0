const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String },
    Age: { type: [String] },
    Ethnicity:
    {
        type: [String]
    }
});


const TravelRequestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});

model.exports = { UserSchema, TravelRequestSchema }