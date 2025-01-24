const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { Role } = require('../models/Role');

// Fungsi untuk register user
const registerUser = async (req, res) => {
  const { username, password, roles } = req.body; // roles adalah array

  console.log('HASILE USER' , User); 

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = await User.create({ username, password });

    // Jika ada roles, assign role ke user
    if (roles && roles.length > 0) {
      const roleRecords = await Role.findAll({
        where: { name: roles }, // mencari role yang sesuai dengan nama di roles
      });

      await newUser.addRoles(roleRecords); // Menambahkan roles ke user
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Fungsi untuk login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
      include: Role, // Mengambil role yang terkait dengan user
    });

    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    const isValid = await user.isValidPassword(password); // Anda harus menambahkan fungsi isValidPassword pada model User
    if (!isValid) return res.status(401).json({ message: 'Invalid username or password' });

    const roles = user.Roles.map((role) => role.name); // Ambil nama role dari user

    const token = jwt.sign(
      { userId: user.id, username: user.username, roles },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fungsi untuk menambahkan role ke user
const addRoleToUser = async (req, res) => {
  const { userId, role } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const roleRecord = await Role.findOne({ where: { name: role } });
    if (!roleRecord) {
      return res.status(404).json({ message: 'Role not found' });
    }

    await user.addRole(roleRecord); // Menambahkan role ke user
    res.json({ message: `Role ${role} added to user ${user.username}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { registerUser, loginUser, addRoleToUser };
