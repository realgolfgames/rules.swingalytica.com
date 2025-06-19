import mongoose from 'mongoose';

const rule_schema = new mongoose.Schema({
  order: { type: Number, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  toc: {
    h2: [
      {
        id: { type: String, required: true },
        text: { type: String, required: true },
        h3: [
          {
            id: { type: String, required: true },
            text: { type: String, required: true }
          }
        ]
      }
    ]
  }
});

/**
 * Represents the Mongoose model for the 'Rule' schema.
 * This model is used to interact with the 'Rule' collection in the database.
 */
export const rule_model = mongoose.model('Rule', rule_schema);
