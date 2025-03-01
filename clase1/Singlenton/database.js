class Database {
    constructor() {
      if (Database.instance) {
        return Database.instance;
      }
      this.connection = this.connect();
      Database.instance = this;
    }
    
    connect() {
      console.log('Conectando a la base de datos...');
      // Simulación de conexión (en un caso real se conectaría a una BD)
      return { connected: true };
    }
    
    getConnection() {
      return this.connection;
    }
  }
  
  module.exports = new Database();

  