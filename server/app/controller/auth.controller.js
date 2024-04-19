const userModel = require('../schema/user.schema');
const checkUserIsExits = require('../model/auth.model');
const singup = async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const exitsUSer = await checkUserIsExits(req.body.email);

    if (exitsUSer) {
        return res.status(400).json({ message: 'User already exist', ok: false });
    }
    else {
        try {
            const savedata = await userModel.create(data);
            return res.status(200).json({ message: savedata, ok: true });
        }
        catch (error) {
            res.send(error);
        }
    }

}

const login = async (req, res) => {
    try {
        const user = await checkUserIsExits(req.body.email);
        if (!user) {
            return res.status(400).json({ message: 'User Not found' });
        }

        if (req.body.password !== user.password) {
            return res.status(400).json({ message: "Password incorrect" });
        }

        req.session.data = {
            userid: user._id,
            email: req.body.email,
            name: user.name,
        }
        return res.status(200).json({ data: req.session.data, message: 'Sigin Suceesfully' });

    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                res.clearCookie("connect.sid"); 
                res.status(500).json({ error: 'Internal Server Error' });
            }
            else {
                res.status(200).json({ message: 'Session deleted successfully' });
            }
        });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
}

module.exports = { singup, login, logout };
