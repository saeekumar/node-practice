const { sendResponse } = require("../middleware/response");
const { addEmployee, updateEmployee, fetchEmpById, fetchAllEmployees, fetchAllEmployeesCount } = require("./employee.service");

module.exports = {
    createEmployee: async (req, res) => {

        let data = req.body;
        if (!data.first_name || !data.email_id || !data.phone || !data.password) {
            return sendResponse(res, false, 400, "Please fill mandatory fields", []);
        }

        const payload = {
            first_name: data?.first_name,
            last_name: data?.last_name,
            email_id: data?.email_id,
            phone: data?.phone,
            password: data?.password
        };
        addEmployee(payload, (err, results) => {
            if (err) {
                console.log(err);
                return sendResponse(res, false, 400, err?.message || "employee not added", []);
            }
            return sendResponse(res, true, 200, "employee added successfully", []);
        });
    },

    updateEmployee: async (req, res) => {

        let data = req.body;
        if (!data.first_name || !data.email_id || !data.phone|| !data.id) {
            return sendResponse(res, false, 400, "Please fill mandatory fields", []);
        }

        const payload = {
            first_name: data?.first_name,
            last_name: data?.last_name,
            email_id: data?.email_id,
            phone: data?.phone,
            id:data?.id 
        };
        updateEmployee(payload, (err, results) => {
            if (err) {
                console.log(err);
                return sendResponse(res, false, 400, err?.message || "employee not updated ", []);
            }
            return sendResponse(res, true, 200, "employee updated successfully", []);
        });
    },
    getEmployeeById: async (req, res) => {

        let data = req.params;
        if (!data.id) {
            return sendResponse(res, false, 400, "Id is required", []);
        }

        fetchEmpById(data.id, (err, results) => {
            if (err) {
                console.log(err);
                return sendResponse(res, false, 400, err?.message || "employee details error ", []);
            }
            if (results && results.length > 0) {
                const { password, ...employeeDetails } = results[0]
                return sendResponse(res, true, 200, "employee details", employeeDetails);
            } else {
                return sendResponse(res, true, 200, "employee details not found", {});

            }
        });
    },
    getAllEmployees: async (req, res) => {
        if (!req.params.limit || !req.params.page) {
            return sendResponse(res, false, 500, "Page and Limit is required");
        };

        fetchAllEmployees(req, (err, results) => {
            if (err) {
                console.log(err);
                return sendResponse(res, false, 400, err?.message || "employee list error ", []);
            }

            return sendResponse(res, true, 200, "employees list", results);


        });
    },
    getAllEmployeesCount: async (req, res) => {


        fetchAllEmployeesCount((err, results) => {
            if (err) {
                console.log(err);
                return sendResponse(res, false, 400, err?.message || "employee list error ", []);
            }
            console.log(results);

            return sendResponse(res, true, 200, "Total employees count ", { total: results[0].total });


        });
    },
}