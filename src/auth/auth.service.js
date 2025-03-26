const pool = require('../config/db').pool

module.exports = {

    employeeLogin: async (data, callBack) => {
        const { user_name, password } = data
        pool.query(
            `SELECT * FROM employees where email_id=$1 OR phone::TEXT=$1`,
            [user_name],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.rows);
            }
        );
    },
}