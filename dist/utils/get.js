'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadLocal = undefined;

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var downloadLocal = exports.downloadLocal = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(projectName, projectType) {
    var templatePath;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            templatePath = '';
            _context.t0 = projectType;
            _context.next = _context.t0 === 'web' ? 4 : _context.t0 === 'mfe-subapp' ? 6 : _context.t0 === 'mfe-master' ? 8 : 10;
            break;

          case 4:
            templatePath = 'hql7/wl-template-vue';
            return _context.abrupt('break', 11);

          case 6:
            templatePath = 'hql7/wl-template-mfe-subapp-vue';
            return _context.abrupt('break', 11);

          case 8:
            templatePath = 'hql7/wl-template-mfe-master-vue';
            return _context.abrupt('break', 11);

          case 10:
            templatePath = 'hql7/wl-template-vue';

          case 11:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              //projectName 为下载到的本地目录
              (0, _downloadGitRepo2.default)(templatePath, projectName, function (err) {
                if (err) {
                  reject(err);
                }
                resolve();
              });
            }));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function downloadLocal(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();