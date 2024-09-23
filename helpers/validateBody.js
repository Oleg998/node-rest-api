import HttpError from "./HttpError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

async function validateUser(data) {
  const user = new User(data);
  try {
    await user.save();
    console.log('User added successfully');
  } catch (error) {
    if (error.code === 11000) { // Код помилки для дублювання ключа
      console.error('Email and event combination already exists');
    } else {
      console.error('Error adding user:', error);
    }
  }
}



export default validateBody;
