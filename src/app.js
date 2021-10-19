"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var typeorm_1 = require("typeorm");
var studentmgt_1 = require("./entity/studentmgt");
//importing amqlib 
var amqp = require("amqplib/callback_api");
(0, typeorm_1.createConnection)().then(function (db) {
    var studentRepository = db.getRepository(studentmgt_1.studentmgt);
    amqp.connect('amqps://wmqmekbr:RCf9DHx6XLA0lpx7gk1T8OOT1x7Ax0eo@bonobo.rmq.cloudamqp.com/wmqmekbr', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var app = express();
            //for the frontend application
            app.use(cors({
                origin: ["http://localhost:3000"]
            }));
            app.use(express.json());
            //Read all Students as an array
            app.get('/api/students', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var students;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, studentRepository.find()
                            //amqlib testing
                        ];
                        case 1:
                            students = _a.sent();
                            //amqlib testing
                            channel.sendToQueue('testing123', Buffer.from('Hello from the other Side'));
                            res.json(students);
                            return [2 /*return*/];
                    }
                });
            }); });
            //Retrive a Single user a a single entity
            app.get('/api/students/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var oneStudent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, studentRepository.findOne(req.params.id)];
                        case 1:
                            oneStudent = _a.sent();
                            return [2 /*return*/, res.json(oneStudent)];
                    }
                });
            }); });
            //Create Students
            app.post('/api/students', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var newstudent, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, studentRepository.create(req.body)];
                        case 1:
                            newstudent = _a.sent();
                            return [4 /*yield*/, studentRepository.save(newstudent)];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, res.send(result)];
                    }
                });
            }); });
            //update a student
            app.put('/api/students/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var updatestudent, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, studentRepository.findOne(req.params.id)];
                        case 1:
                            updatestudent = _a.sent();
                            studentRepository.merge(updatestudent, req.body);
                            return [4 /*yield*/, studentRepository.save(updatestudent)];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, res.send(result)];
                    }
                });
            }); });
            //delete a student
            app.delete('/api/students/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, studentRepository.delete(req.params.id)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, res.send(result)];
                    }
                });
            }); });
            //Disabling a student
            app.post('/api/students/:id/disable', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var disablestudent, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, studentRepository.findOne(req.params.id)];
                        case 1:
                            disablestudent = _a.sent();
                            disablestudent.isDisabled = true;
                            return [4 /*yield*/, studentRepository.save(disablestudent)];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, res.send(result)];
                    }
                });
            }); });
            console.log('Listening to post 8000');
            app.listen(8000);
        });
    });
});
