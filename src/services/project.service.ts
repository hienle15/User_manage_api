import mysql from 'mysql2';
import connection from "../utils/database";
import pool from '../utils/database';

// Cập nhật lại interface: user_ids là mảng số
interface ProjectData {
  name: string;
  description: string;
  user_ids?: number[]; // đổi từ user_id: number
}

// Hàm thực thi truy vấn
const executeQuery = (sql: string, params: any[] = []) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Lấy tất cả project
export const findAll = () =>
  executeQuery("SELECT * FROM projects");

// Lấy 1 project theo id
export const findOne = (id: number) =>
  executeQuery("SELECT * FROM projects WHERE id = ?", [id]);

// Tạo mới project
export const create = (data: ProjectData) =>
  executeQuery(
    "INSERT INTO projects (name, description, user_ids) VALUES (?, ?, ?)",
    [data.name, data.description, JSON.stringify(data.user_ids)] // stringify mảng
  );

// Cập nhật project
export const update = (id: number, data: ProjectData) => {
  const dataWithJson = {
    ...data,
    user_ids: JSON.stringify(data.user_ids) // stringify trước khi lưu
  };
  const fields = Object.keys(dataWithJson);
  const values = Object.values(dataWithJson);

  return executeQuery(
    `UPDATE projects SET ${fields.map(f => `${f} = ?`).join(', ')} WHERE id = ?`,
    [...values, id]
  );
};

// Xoá project
export const remove = (id: number) =>
  executeQuery("DELETE FROM projects WHERE id = ?", [id]);

export const isDuplicateProject = async (data: ProjectData, excludeId?: number): Promise<boolean> => {
    const { name, description, user_ids } = data;

    // Kiểm tra trùng name + description
    const baseQuery = "SELECT * FROM projects WHERE name = ? AND description = ?";
    const baseParams = [name, description];

    if (excludeId) {
        const query = baseQuery + " AND id != ?";
        const params = [...baseParams, excludeId];
        const results = await executeQuery(query, params);
        
        // Log để debug
        console.log('Checking duplicate with excludeId:', {
            query,
            params,
            results
        });

        // Nếu có kết quả => có project khác trùng
        if (Array.isArray(results) && results.length > 0) {
            return true;
        }
    } else {
        const results = await executeQuery(baseQuery, baseParams);
        
        // Log để debug
        console.log('Checking duplicate without excludeId:', {
            query: baseQuery,
            params: baseParams,
            results
        });

        // Nếu có kết quả => trùng
        if (Array.isArray(results) && results.length > 0) {
            return true;
        }
    }

    return false;
};