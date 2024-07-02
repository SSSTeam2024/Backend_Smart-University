const userService = require("../../services/UserServices/UserServices");
const globalFunctions = require("../../utils/globalFunctions");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      login,
      role_id,
      departement_id,
      password,
      app_name,
      photoBase64String,
      photoExtension,
      api_token,
      status
    } = req.body;
    const photoPath = "files/userFiles";
    let photo = globalFunctions.generateUniqueFilename(
      photoExtension,
      "photoUser"
    );
    let document = {
      base64String: photoBase64String,
      extension: photoExtension,
      name: photo,
      path: photoPath,
    };
    let user = await userService.createUser({
      name,
      email,
      login,
      role_id,
      departement_id,
      password,
      api_token,
      photo,
      app_name,
      api_token,
      status
    }, [document]);
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, login, role, departement_id, password, api_token, photo, app_name, status} = req.body;

    let user = await userService.updateUser( userId, { name, email, login, role, departement_id, password, api_token, photo, app_name, status} );
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await userService.loginUser(login, password);
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

exports.getUserByToken = async (req, res) => {
  try {
    const { api_token } = req.body;
    console.log(`Get user by token request received controller: ${api_token}`);
    const user = await userService.getUserByToken(api_token);
    if (!user) {
      console.log(`User not found for token controller: ${api_token}`);
      return res.status(404).send('User not found');
    }
    console.log(`User found for token: ${api_token}`);
    res.json({ user });
  } catch (error) {
    console.error(`Get user by token error controller: ${error.message}`);
    res.status(500).send(error.message);
  }
};

exports.logoutUser = async (req, res) => {
  try {

    let id = req.params.id;

  await userService.logout(id);

  res.sendStatus(200);
  } catch (error) {
    res.status(401).send(error.message);
  }
};