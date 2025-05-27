const pool = require('../config/db').pool

module.exports = {

    addEmployee: async (data, callBack) => {
        const { first_name, last_name, email_id, phone, password } = data
        pool.query(
            `insert into employees(first_name,last_name,email_id,phone,password)values($1,$2,$3,$4,$5) RETURNING id`,
            [first_name, last_name, email_id, phone, password],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.rows);
            }
        );
    },

    updateEmployee: async (data, callBack) => {
        const { first_name, last_name, email_id, phone,id } = data
        pool.query(
            `UPDATE employees SET first_name=$1, last_name=$2,email_id=$3,phone=$4 WHERE id=$5 RETURNING id`,
            [first_name, last_name, email_id, phone,id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.rows);
            }
        );
    },

    fetchEmpById: async (id, callBack) => {

        pool.query(
            `SELECT * FROM employees WHERE id=$1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.rows);
            }
        );
    },

    fetchAllEmployees: async (req, callBack) => {
        const params = req.params;

        limit = `LIMIT ${params?.limit} OFFSET ${(params?.page - 1) * params?.limit}`;
        extCond = "WHERE TRUE ";
        order = ` ORDER BY e.id DESC `;

        pool.query(
            `SELECT id,first_name,last_name,email_id,phone,created_at FROM employees e  ${extCond} ${order}${limit}`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.rows);
            }
        );
    },

    fetchAllEmployeesCount: async (callBack) => {

        pool.query(
            `SELECT COUNT(id) AS total FROM employees`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.rows);
            }
        );
    },
}