import mongoose from "mongoose";

const blacklistToken = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

const blacklistTokenData = mongoose.model("blacklistTokenData", blacklistToken);

export default blacklistTokenData;
