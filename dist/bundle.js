'use strict';

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _reactRedux = require('react-redux');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _App = require('./containers/App');

var _App2 = _interopRequireDefault(_App);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _store2.default)();
var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactRouter.Router,
    { history: history },
    _react2.default.createElement(_reactRouter.Route, { path: '/', component: _App2.default })
  )
), document.getElementById('root'));
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCompleted = exports.completeAll = exports.completeTodo = exports.editTodo = exports.deleteTodo = exports.addTodo = undefined;

var _reduxActions = require('redux-actions');

var addTodo = exports.addTodo = (0, _reduxActions.createAction)('add todo');
var deleteTodo = exports.deleteTodo = (0, _reduxActions.createAction)('delete todo');
var editTodo = exports.editTodo = (0, _reduxActions.createAction)('edit todo');
var completeTodo = exports.completeTodo = (0, _reduxActions.createAction)('complete todo');
var completeAll = exports.completeAll = (0, _reduxActions.createAction)('complete all');
var clearCompleted = exports.clearCompleted = (0, _reduxActions.createAction)('clear complete');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SHOW_ALL = exports.SHOW_ALL = 'show_all';
var SHOW_COMPLETED = exports.SHOW_COMPLETED = 'show_completed';
var SHOW_ACTIVE = exports.SHOW_ACTIVE = 'show_active';
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = undefined;

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.logger = _logger2.default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (store) {
  return function (next) {
    return function (action) {
      console.log(action);
      return next(action);
    };
  };
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouterRedux = require('react-router-redux');

var _redux = require('redux');

var _todos = require('./todos');

var _todos2 = _interopRequireDefault(_todos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  routing: _reactRouterRedux.routerReducer,
  todos: _todos2.default
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = [{
  text: 'Use Redux',
  completed: false,
  id: 0
}];

exports.default = (0, _reduxActions.handleActions)({
  'add todo': function addTodo(state, action) {
    return [{
      id: state.reduce(function (maxId, todo) {
        return Math.max(todo.id, maxId);
      }, -1) + 1,
      completed: false,
      text: action.payload
    }].concat((0, _toConsumableArray3.default)(state));
  },
  'delete todo': function deleteTodo(state, action) {
    return state.filter(function (todo) {
      return todo.id !== action.payload;
    });
  },
  'edit todo': function editTodo(state, action) {
    return state.map(function (todo) {
      return todo.id === action.payload.id ? (0, _extends3.default)({}, todo, { text: action.payload.text }) : todo;
    });
  },
  'complete todo': function completeTodo(state, action) {
    return state.map(function (todo) {
      return todo.id === action.payload ? (0, _extends3.default)({}, todo, { completed: !todo.completed }) : todo;
    });
  },
  'complete all': function completeAll(state, action) {
    var areAllMarked = state.every(function (todo) {
      return todo.completed;
    });
    return state.map(function (todo) {
      return (0, _extends3.default)({}, todo, {
        completed: !areAllMarked
      });
    });
  },
  'clear complete': function clearComplete(state, action) {
    return state.filter(function (todo) {
      return todo.completed === false;
    });
  }
}, initialState);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configure;

var _redux = require('redux');

var _middleware = require('../middleware');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configure(initialState) {
  var create = window.devToolsExtension ? window.devToolsExtension()(_redux.createStore) : _redux.createStore;

  var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_middleware.logger)(create);

  var store = createStoreWithMiddleware(_reducers2.default, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', function () {
      var nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TodoTextInput = require('../TodoTextInput');

var _TodoTextInput2 = _interopRequireDefault(_TodoTextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function (_Component) {
  (0, _inherits3.default)(Header, _Component);

  function Header() {
    (0, _classCallCheck3.default)(this, Header);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Header).apply(this, arguments));
  }

  (0, _createClass3.default)(Header, [{
    key: 'handleSave',
    value: function handleSave(text) {
      if (text.length) {
        this.props.addTodo(text);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'header',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Todos'
        ),
        _react2.default.createElement(_TodoTextInput2.default, {
          newTodo: true,
          onSave: this.handleSave.bind(this),
          placeholder: 'What needs to be done?' })
      );
    }
  }]);
  return Header;
}(_react.Component);

exports.default = Header;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Story = function (_Component) {
  (0, _inherits3.default)(Story, _Component);

  function Story(props, context) {
    (0, _classCallCheck3.default)(this, Story);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Story).call(this, props, context));
  }

  (0, _createClass3.default)(Story, [{
    key: 'render',
    value: function render() {
      //const {todo, completeTodo, deleteTodo} = this.props
      var element = _react2.default.createElement(
        'article',
        { className: (0, _classnames2.default)(_style2.default.story, this.props.storyType === "featured-story" ? _style2.default.featuredStory : "") },
        _react2.default.createElement(
          'h2',
          { className: _style2.default.headline },
          '"Bacon Ipsum Dolor amet Prosciutto"'
        ),
        _react2.default.createElement(
          'p',
          { className: _style2.default.summary },
          '"Bacon ipsum dolor amet prosciutto ball tip chuck shankle corned beef pig tail pastrami, ground round andouille shoulder drumstick landjaeger. Biltong jowl frankfurter ball tip shoulder landjaeger leberkas tri-tip. Rump alcatra beef jerky doner venison pork chop. Tenderloin alcatra ball tip, t-bone rump beef chuck. Pork loin kielbasa turkey tongue jowl ham filet mignon chuck swine bacon prosciutto jerky. Doner shank brisket porchetta sausage. Turkey pork tenderloin ball tip shankle. Tenderloin ribeye shankle ball tip. Beef ribs pig ham hock, tri-tip ball tip meatloaf kevin bresaola pork belly shank swine spare ribs chicken short loin bacon. Leberkas ham t-bone beef, hamburger frankfurter pancetta rump pork loin doner kevin cupim shank pork chop filet mignon. Chicken short ribs t-bone kielbasa prosciutto. Short loin pig swine ball tip spare ribs, filet mignon boudin. Ham cupim jerky tail. Pork belly pastrami capicola, pork cow chicken cupim. Ham hock meatloaf porchetta, tri-tip landjaeger pancetta pork. Beef ball tip jowl tenderloin short ribs sausage. Pastrami ham turducken pancetta tail capicola. Meatloaf cupim shoulder, pig biltong beef tri-tip filet mignon ribeye pork chop pastrami rump. Corned beef porchetta doner pastrami strip steak venison pig. Beef ribs shoulder salami pork belly pancetta ball tip tail ribeye flank doner tenderloin. Venison pork chop ham hock filet mignon strip steak. Tongue alcatra cow, sirloin meatloaf tenderloin shoulder porchetta spare ribs tail."'
        )
      );
      return element;
    }
  }]);
  return Story;
}(_react.Component);

exports.default = Story;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _TODO_FILTERS;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TodoItem = require('../TodoItem');

var _TodoItem2 = _interopRequireDefault(_TodoItem);

var _Footer = require('../Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _filters = require('../../constants/filters');

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TODO_FILTERS = (_TODO_FILTERS = {}, (0, _defineProperty3.default)(_TODO_FILTERS, _filters.SHOW_ALL, function () {
  return true;
}), (0, _defineProperty3.default)(_TODO_FILTERS, _filters.SHOW_ACTIVE, function (todo) {
  return !todo.completed;
}), (0, _defineProperty3.default)(_TODO_FILTERS, _filters.SHOW_COMPLETED, function (todo) {
  return todo.completed;
}), _TODO_FILTERS);

var MainSection = function (_Component) {
  (0, _inherits3.default)(MainSection, _Component);

  function MainSection(props, context) {
    (0, _classCallCheck3.default)(this, MainSection);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MainSection).call(this, props, context));

    _this.state = { filter: _filters.SHOW_ALL };
    return _this;
  }

  (0, _createClass3.default)(MainSection, [{
    key: 'handleClearCompleted',
    value: function handleClearCompleted() {
      var atLeastOneCompleted = this.props.todos.some(function (todo) {
        return todo.completed;
      });
      if (atLeastOneCompleted) {
        this.props.actions.clearCompleted();
      }
    }
  }, {
    key: 'handleShow',
    value: function handleShow(filter) {
      this.setState({ filter: filter });
    }
  }, {
    key: 'renderToggleAll',
    value: function renderToggleAll(completedCount) {
      var _props = this.props;
      var todos = _props.todos;
      var actions = _props.actions;

      if (todos.length > 0) {
        return _react2.default.createElement('input', {
          className: _style2.default.toggleAll,
          type: 'checkbox',
          checked: completedCount === todos.length,
          onChange: actions.completeAll });
      }
    }
  }, {
    key: 'renderFooter',
    value: function renderFooter(completedCount) {
      var todos = this.props.todos;
      var filter = this.state.filter;

      var activeCount = todos.length - completedCount;

      if (todos.length) {
        return _react2.default.createElement(_Footer2.default, { completedCount: completedCount,
          activeCount: activeCount,
          filter: filter,
          onClearCompleted: this.handleClearCompleted.bind(this),
          onShow: this.handleShow.bind(this) });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var todos = _props2.todos;
      var actions = _props2.actions;
      var filter = this.state.filter;


      var filteredTodos = todos.filter(TODO_FILTERS[filter]);
      var completedCount = todos.reduce(function (count, todo) {
        return todo.completed ? count + 1 : count;
      }, 0);

      return _react2.default.createElement(
        'section',
        { className: _style2.default.main },
        this.renderToggleAll(completedCount),
        _react2.default.createElement(
          'ul',
          { className: _style2.default.normal },
          filteredTodos.map(function (todo) {
            return _react2.default.createElement(_TodoItem2.default, (0, _extends3.default)({ key: todo.id, todo: todo }, actions));
          })
        ),
        this.renderFooter(completedCount)
      );
    }
  }]);
  return MainSection;
}(_react.Component);

exports.default = MainSection;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Story = require('../Story');

var _Story2 = _interopRequireDefault(_Story);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StoryList = function (_Component) {
  (0, _inherits3.default)(StoryList, _Component);

  function StoryList(props, context) {
    (0, _classCallCheck3.default)(this, StoryList);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(StoryList).call(this, props, context));
  }

  (0, _createClass3.default)(StoryList, [{
    key: 'render',
    value: function render() {
      //const {todo, completeTodo, deleteTodo} = this.props
      var element = _react2.default.createElement(
        'ul',
        { className: _style2.default.list },
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(_Story2.default, { storyType: "featured-story" })
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(_Story2.default, null)
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(_Story2.default, null)
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(_Story2.default, null)
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(_Story2.default, null)
        )
      );
      return element;
    }
  }]);
  return StoryList;
}(_react.Component);

exports.default = StoryList;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _FILTER_TITLES;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _filters = require('../../constants/filters');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FILTER_TITLES = (_FILTER_TITLES = {}, (0, _defineProperty3.default)(_FILTER_TITLES, _filters.SHOW_ALL, 'All'), (0, _defineProperty3.default)(_FILTER_TITLES, _filters.SHOW_ACTIVE, 'Active'), (0, _defineProperty3.default)(_FILTER_TITLES, _filters.SHOW_COMPLETED, 'Completed'), _FILTER_TITLES);

var Footer = function (_Component) {
  (0, _inherits3.default)(Footer, _Component);

  function Footer() {
    (0, _classCallCheck3.default)(this, Footer);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Footer).apply(this, arguments));
  }

  (0, _createClass3.default)(Footer, [{
    key: 'renderTodoCount',
    value: function renderTodoCount() {
      var activeCount = this.props.activeCount;

      var itemWord = activeCount === 1 ? 'item' : 'items';

      return _react2.default.createElement(
        'span',
        { className: _style2.default.count },
        _react2.default.createElement(
          'strong',
          null,
          activeCount || 'No'
        ),
        ' ',
        itemWord,
        ' left'
      );
    }
  }, {
    key: 'renderFilterLink',
    value: function renderFilterLink(filter) {
      var title = FILTER_TITLES[filter];
      var _props = this.props;
      var selectedFilter = _props.filter;
      var onShow = _props.onShow;


      return _react2.default.createElement(
        'a',
        { className: (0, _classnames3.default)((0, _defineProperty3.default)({}, _style2.default.selected, filter === selectedFilter)),
          style: { cursor: 'pointer' },
          onClick: function onClick() {
            return onShow(filter);
          } },
        title
      );
    }
  }, {
    key: 'renderClearButton',
    value: function renderClearButton() {
      var _props2 = this.props;
      var completedCount = _props2.completedCount;
      var onClearCompleted = _props2.onClearCompleted;

      if (completedCount > 0) {
        return _react2.default.createElement(
          'button',
          { className: _style2.default.clearCompleted, onClick: onClearCompleted },
          'Clear completed'
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'footer',
        { className: _style2.default.normal },
        this.renderTodoCount(),
        _react2.default.createElement(
          'ul',
          { className: _style2.default.filters },
          [_filters.SHOW_ALL, _filters.SHOW_ACTIVE, _filters.SHOW_COMPLETED].map(function (filter) {
            return _react2.default.createElement(
              'li',
              { key: filter },
              _this2.renderFilterLink(filter)
            );
          })
        ),
        this.renderClearButton()
      );
    }
  }]);
  return Footer;
}(_react.Component);

exports.default = Footer;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TodoTextInput = require('../TodoTextInput');

var _TodoTextInput2 = _interopRequireDefault(_TodoTextInput);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TodoItem = function (_Component) {
  (0, _inherits3.default)(TodoItem, _Component);

  function TodoItem(props, context) {
    (0, _classCallCheck3.default)(this, TodoItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TodoItem).call(this, props, context));

    _this.state = {
      editing: false
    };
    return _this;
  }

  (0, _createClass3.default)(TodoItem, [{
    key: 'handleDoubleClick',
    value: function handleDoubleClick() {
      this.setState({ editing: true });
    }
  }, {
    key: 'handleSave',
    value: function handleSave(id, text) {
      if (text.length === 0) {
        this.props.deleteTodo(id);
      } else {
        this.props.editTodo({ id: id, text: text });
      }
      this.setState({ editing: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this,
          _classnames;

      var _props = this.props;
      var todo = _props.todo;
      var completeTodo = _props.completeTodo;
      var deleteTodo = _props.deleteTodo;


      var element = void 0;
      if (this.state.editing) {
        element = _react2.default.createElement(_TodoTextInput2.default, { text: todo.text,
          editing: this.state.editing,
          onSave: function onSave(text) {
            return _this2.handleSave(todo.id, text);
          } });
      } else {
        element = _react2.default.createElement(
          'div',
          { className: _style2.default.view },
          _react2.default.createElement('input', { className: _style2.default.toggle,
            type: 'checkbox',
            checked: todo.completed,
            onChange: function onChange() {
              return completeTodo(todo.id);
            } }),
          _react2.default.createElement(
            'label',
            { onDoubleClick: this.handleDoubleClick.bind(this) },
            todo.text
          ),
          _react2.default.createElement('button', { className: _style2.default.destroy, onClick: function onClick() {
              return deleteTodo(todo.id);
            } })
        );
      }

      // TODO: compose
      var classes = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, _style2.default.completed, todo.completed), (0, _defineProperty3.default)(_classnames, _style2.default.editing, this.state.editing), (0, _defineProperty3.default)(_classnames, _style2.default.normal, !this.state.editing), _classnames));

      return _react2.default.createElement(
        'li',
        { className: classes },
        element
      );
    }
  }]);
  return TodoItem;
}(_react.Component);

exports.default = TodoItem;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TodoTextInput = function (_Component) {
  (0, _inherits3.default)(TodoTextInput, _Component);

  function TodoTextInput(props, context) {
    (0, _classCallCheck3.default)(this, TodoTextInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TodoTextInput).call(this, props, context));

    _this.state = {
      text: _this.props.text || ''
    };
    return _this;
  }

  (0, _createClass3.default)(TodoTextInput, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var text = e.target.value.trim();
      if (e.which === 13) {
        this.props.onSave(text);
        if (this.props.newTodo) {
          this.setState({ text: '' });
        }
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({ text: e.target.value });
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      var text = e.target.value.trim();
      if (!this.props.newTodo) {
        this.props.onSave(text);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var classes = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, _style2.default.edit, this.props.editing), (0, _defineProperty3.default)(_classnames, _style2.default.new, this.props.newTodo), _classnames), _style2.default.normal);

      return _react2.default.createElement('input', { className: classes,
        type: 'text',
        autoFocus: 'true',
        placeholder: this.props.placeholder,
        value: this.state.text,
        onBlur: this.handleBlur.bind(this),
        onChange: this.handleChange.bind(this),
        onKeyDown: this.handleSubmit.bind(this) });
    }
  }]);
  return TodoTextInput;
}(_react.Component);

exports.default = TodoTextInput;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _Header = require('../../components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _MainSection = require('../../components/MainSection');

var _MainSection2 = _interopRequireDefault(_MainSection);

var _StoryList = require('../../components/StoryList');

var _StoryList2 = _interopRequireDefault(_StoryList);

var _todos = require('../../actions/todos');

var TodoActions = _interopRequireWildcard(_todos);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App() {
    (0, _classCallCheck3.default)(this, App);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
  }

  (0, _createClass3.default)(App, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var todos = _props.todos;
      var actions = _props.actions;
      var children = _props.children;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_StoryList2.default, null),
        children
      );
    }
  }]);
  return App;
}(_react.Component);

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(TodoActions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);