"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lokijs_1 = __importDefault(require("lokijs"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
var db = new lokijs_1.default('group_chat.db');
var users = db.addCollection('users');
app.delete('/users/:username', (req, res) => {
    const username = req.params.username;
    users.removeWhere({ 'username': username });
    res.json({
        "success": true,
        "msg": "User Removed!",
    });
});
app.post('/users/register', (req, res) => {
    const { username, fcm_token } = req.body;
    if (username == undefined) {
        res.statusCode = 400; // bad Request
        res.json({
            msg: 'Missing username',
            success: false,
        });
    }
    else {
        const user = users.findOne({ "username": username });
        if (user != undefined) {
            res.statusCode = 409;
            res.json({
                msg: "User already exists",
                success: false,
            });
            return;
        }
        res.json({
            msg: 'OK',
            success: true,
        });
        users.insert({
            "username": username,
            "fcm_token": fcm_token,
        });
    }
});
app.put('/users/:username/fcmtoken', (req, res) => {
    const { fcm_token } = req.body;
    const uname = req.params.username;
    const user = users.findOne({ "username": uname });
    if (user == undefined) {
        res.json({
            msg: "User not found",
            success: false,
        });
    }
    else {
        user.fcm_token = fcm_token;
        users.update(user);
        res.json({
            success: true,
            msg: "User token updated!!",
        });
    }
});
app.get('/users/:username/fcmtoken', (req, res) => {
    const uname = req.params.username;
    const user = users.findOne({ "username": uname });
    if (user == undefined) {
        res.json({
            msg: "User not found",
            success: false,
        });
    }
    else {
        res.json({
            success: true,
            fcm_token: user.fcm_token,
        });
    }
});
app.get('/users/exists/:username', (req, res) => {
    const uname = req.params.username;
    const user = users.findOne({ "username": uname });
    if (user == undefined) {
        res.json({
            msg: "User not found",
            success: false,
        });
    }
    else {
        res.json({
            msg: "User found",
            success: true,
        });
    }
});
app.listen(port, () => {
    console.log('listening on port ', port);
});
//# sourceMappingURL=app.js.map