import mysql from 'mysql2/promise';

export default async function conectar(){

if (global.poolconexoes){
    return await global.poolconexoes.getConnection();

}
const pool = await mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'recrutamento',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });

  global.poolconexoes = pool;
  return await pool.getConnection();

}