const { sendResponse } = require("../middleware/response");
const { employeeLogin } = require("./auth.service");

module.exports = {
    loginEmployee: async (req, res) => {

        let data = req.body;
        if (!data.user_name || !data.password) {
            return sendResponse(res, false, 400, "Please fill mandatory fields", []);
        }

        const payload = {
            user_name: data?.user_name,
            password: data?.password
        };
        employeeLogin(payload, (err, results) => {
            if (err) {
                console.log(err);
                return sendResponse(res, false, 400, err?.message || "employee not added", []);
            }
            console.log(results, "ress");
            if (results && results.length > 0) {
                userDetails = results[0]
                if (userDetails.password === payload.password) {
                    const {password,...user}=results[0]
                    return sendResponse(res, true, 200, "Logged in successfully", user);
                } else {
                    return sendResponse(res, true, 200, "Invalid credentials", []);

                }
            } else {
                return sendResponse(res, true, 200, "No employee found with given details", []);
            }
        });
    },

}