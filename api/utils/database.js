const fs = require('fs').promises;
const path = require('path');

// Simple file-based database for demo purposes
// In production, use a real database like MongoDB, PostgreSQL, etc.
const DB_FILE = path.join(process.cwd(), 'data', 'users.json');

/**
 * Initialize database file if it doesn't exist
 */
const initDB = async () => {
  try {
    const dataDir = path.dirname(DB_FILE);
    await fs.mkdir(dataDir, { recursive: true });
    
    try {
      await fs.access(DB_FILE);
    } catch {
      // File doesn't exist, create it
      await fs.writeFile(DB_FILE, JSON.stringify({ users: [] }, null, 2));
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
};

/**
 * Read all users from database
 */
const getAllUsers = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    const db = JSON.parse(data);
    return db.users || [];
  } catch (error) {
    console.error('Failed to read users:', error);
    return [];
  }
};

/**
 * Save users to database
 */
const saveUsers = async (users) => {
  try {
    const db = { users };
    await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
    return true;
  } catch (error) {
    console.error('Failed to save users:', error);
    return false;
  }
};

/**
 * Find user by email
 */
const findUserByEmail = async (email) => {
  const users = await getAllUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

/**
 * Find user by ID
 */
const findUserById = async (id) => {
  const users = await getAllUsers();
  return users.find(user => user.id === id);
};

/**
 * Create new user
 */
const createUser = async (userData) => {
  const users = await getAllUsers();
  
  // Check if user already exists
  const existingUser = users.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // Generate unique ID
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
  
  const newUser = {
    id,
    email: userData.email.toLowerCase(),
    password: userData.password,
    name: userData.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  users.push(newUser);
  await saveUsers(users);
  
  // Return user without password
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

/**
 * Update user
 */
const updateUser = async (id, updateData) => {
  const users = await getAllUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...updateData,
    updatedAt: new Date().toISOString()
  };
  
  await saveUsers(users);
  
  // Return user without password
  const { password, ...userWithoutPassword } = users[userIndex];
  return userWithoutPassword;
};

module.exports = {
  initDB,
  getAllUsers,
  findUserByEmail,
  findUserById,
  createUser,
  updateUser
};
