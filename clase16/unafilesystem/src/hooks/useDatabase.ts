import { useEffect, useState, useRef } from 'react';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

// Definimos la estructura de una Tarea
export interface Tarea {
  id: number;
  nombre: string;
}

export const useDatabase = () => {
  const db = useRef<SQLiteDBConnection>();
  const sqlite = useRef<SQLiteConnection>();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        // Inicializa la conexión principal a SQLite
        sqlite.current = new SQLiteConnection(CapacitorSQLite);
        
        // Crea y abre la base de datos
        const database = await sqlite.current.createConnection(
          'tareas.db', // Nombre del archivo de la DB
          false,
          'no-encryption',
          1,
          false
        );
        await database.open();

        // Query para crear la tabla si no existe
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS tareas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL
          );
        `;
        await database.execute(createTableQuery);
        db.current = database;
        setInitialized(true); // Marcamos la DB como inicializada

      } catch (e) {
        console.error("Error al inicializar la base de datos", e);
      }
    };

    setupDatabase();
  }, []);

  // FUNCIÓN PARA OBTENER TODAS LAS TAREAS
  const getTareas = async (): Promise<Tarea[]> => {
    if (!initialized || !db.current) return [];
    const res = await db.current.query('SELECT * FROM tareas;');
    return res.values || [];
  };

  // FUNCIÓN PARA AGREGAR UNA TAREA
  const agregarTarea = async (nombre: string) => {
    if (!initialized || !db.current) return;
    const queryStr = 'INSERT INTO tareas (nombre) VALUES (?);';
    await db.current.run(queryStr, [nombre]);
  };

  // FUNCIÓN PARA ELIMINAR UNA TAREA
  const eliminarTarea = async (id: number) => {
    if (!initialized || !db.current) return;
    const queryStr = 'DELETE FROM tareas WHERE id = ?;';
    await db.current.run(queryStr, [id]);
  };

    const actualizarTarea = async (id: number, nuevoNombre: string) => {
    if (!initialized || !db.current) return;
    const queryStr = 'UPDATE tareas SET nombre = ? WHERE id = ?;';
    await db.current.run(queryStr, [nuevoNombre, id]);
  };

  return {
    getTareas,
    agregarTarea,
    eliminarTarea,
    actualizarTarea,
    initialized, // Exportamos el estado por si es útil
  };
};