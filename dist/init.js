'use strict';

var _get = require('./utils/get');

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _util = require('util');

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var exist = (0, _util.promisify)(_fs2.default.stat);

var init = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(projectName) {
    var projectExist;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (projectName) {
              _context2.next = 3;
              break;
            }

            console.log(_chalk2.default.redBright.bold("请输入项目名称"));
            return _context2.abrupt('return');

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return exist(projectName);

          case 6:
            projectExist = _context2.sent;

            if (projectExist) {
              console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists! 该项目已存在！'));
            }
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](3);

            //命令行交互
            _inquirer2.default.prompt([{
              name: 'description',
              message: 'Please enter the project description: '
            }, {
              name: 'author',
              message: 'Please enter the author name: '
            }]).then(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(answer) {
                var loading;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        //下载模板 选择模板
                        //通过配置文件，获取模板信息
                        loading = (0, _ora2.default)('downloading template ... 模板下载中...');

                        loading.start();
                        loading.color = "yellow";
                        (0, _get.downloadLocal)(projectName).then(function () {
                          loading.succeed();
                          var fileName = projectName + '/package.json';
                          if (_fs2.default.existsSync(fileName)) {
                            var data = _fs2.default.readFileSync(fileName).toString();
                            var json = JSON.parse(data);
                            json.name = projectName;
                            json.author = answer.author;
                            json.description = answer.description;
                            //修改项目文件夹中 package.json 文件
                            _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                            console.log(_logSymbols2.default.success, _chalk2.default.green('Project initialization finished! 项目初始化完成！'));
                          }
                        }, function () {
                          loading.fail();
                        });

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 10]]);
  }));

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = init;