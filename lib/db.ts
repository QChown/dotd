import mysql from 'mysql';

// Define a type for the connection config object
interface ConnectionConfig extends mysql.ConnectionConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

// Connection configuration
const config: ConnectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'newpassword',
  database: 'CocktailDB'
};

// Create the MySQL connection
const connection = mysql.createConnection(config);

connection.connect((err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).json({ message: 'Database connection failed', error: err });
    return;
  }
  console.log('Connected to the database');
});

export default connection;
