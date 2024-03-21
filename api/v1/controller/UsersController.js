const { register, getUserById} = require("../services/UserService");

exports.registerUser = async (req, res) => {
    const response = await register(req.body, req.headers['key']);
    res.status(response.status).json(response);
};

exports.getUserById = async (req, res) => {
    const userId = req.params.userId
    const response = await getUserById(userId)
    res.status(response.status).json(response)
    // Cari pengguna berdasarkan ID

};