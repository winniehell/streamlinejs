/*** Generated by streamline 0.10.5 (generators) - DO NOT EDIT ***/var galaxy = require("streamline/lib/generators/runtime"); (galaxy.unstar(function*(_) {var delay_ = galaxy.unstar(delay, 0), delayFail_ = galaxy.unstar(delayFail, 0); QUnit.module(module.id);

function evalTest(f, val) {
	f(  function(err, result) {
		var str = err ? "ERR: " + err : result;
		strictEqual(str, val, val);
		start();
	});
}

function* delay(_, val) {
	(yield galaxy.invoke(null, setTimeout, [_, 0], 0));
	return val;
}

function* delayFail(_, err) {
	(yield galaxy.invoke(null, setTimeout, [_, 0], 0));
	throw err;
}

function throwError(message) {
	throw new Error(message);
}

asyncTest("eval return", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		return (yield delay(_, 5));
	}, 0), 5);
}, 0));
asyncTest("eval if true", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		if (true) return (yield delay(_, 3));
		return 4;
	}, 0), 3);
}, 0));
asyncTest("eval if false", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		if (false) return (yield delay(_, 3));
		return 4;
	}, 0), 4);
}, 0));
asyncTest("eval while", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var i = 1,
			result = 1;
		while (i < 5) {
			result = (yield delay(_, i * result));
			i++;
		}
		return result;
	}, 0), 24);
}, 0));
asyncTest("eval for", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var result = 1;
		for (var i = 1; i < 5; i++) {
			result = (yield delay(_, i)) * (yield delay(_, result));
		}
		return result;
	}, 0), 24);
}, 0));
asyncTest("eval for in", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var foo = {
			a: 1,
			b: 2,
			c: 3,
			d: 5
		};
		var result = 1;
		for (var k in foo) {
			result = (yield delay(_, foo[(yield delay(_, k))])) * (yield delay(_, result));
		}
		return result;
	}, 0), 30);
}, 0));
asyncTest("fully async for in", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var result = 1;
		for (var i = (yield delay(_, 2)); i < (yield delay(_, 5)); i = (yield delay(_, i)) + 1) {
			result = (yield delay(_, result)) * (yield delay(_, i));
		}
		return result;
	}, 0), 24);
}, 0));
asyncTest("break in loop", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var result = 1;
		for (var i = 1; i < 10; i++) {
			if (i == 5) break;
			result = (yield delay(_, result)) * (yield delay(_, i));
		}
		return result;
	}, 0), 24);
}, 0));
asyncTest("continue", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var result = 1;
		for (var i = 1; i < 10; i++) {
			if (i >= 5) continue;
			result = (yield delay(_, result)) * (yield delay(_, i));
		}
		return result;
	}, 0), 24);
}, 0));
asyncTest("break in while", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var i = 1,
			result = 1;
		while (i < 10) {
			if (i == 5) break;
			result = (yield delay(_, result)) * (yield delay(_, i));
			i++;
		}
		return result;
	}, 0), 24);
}, 0));
asyncTest("continue in while", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var i = 1,
			result = 1;
		while (i < 10) {
			i++;
			if (i >= 5) continue;
			result = (yield delay(_, result)) * (yield delay(_, i));
		}
		return result;
	}, 0), 24);
}, 0));
asyncTest("for (;;)", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var i = 0;
		for (;;) {
			if ((yield delay(_, ++i)) === 10) return i;
		}
	}, 0), 10);
}, 0));
asyncTest("eval lazy", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var result = 1;
		return (yield delay(_, (yield delay(_, result + 8)) < 5)) && true ? 2 : 4;
	}, 0), 4);
}, 0));
asyncTest("eval lazy full async", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var result = 1;
		return (yield delay(_, (yield delay(_, result + 8)) < 5)) && true ? (yield delay(_, 2)) : (yield delay(_, 4));
	}, 0), 4);
}, 0));
asyncTest("try catch 1", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		try {
			return (yield delay(_, "ok"));
		} catch (ex) {
			return (yield delay(_, "err"));
		}
	}, 0), "ok");
}, 0));
asyncTest("try catch 2", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		try {
			throw (yield delay(_, "thrown"));
		} catch (ex) {
			return (yield delay(_, "caught ")) + ex;
		}
	}, 0), "caught thrown");
}, 0));
asyncTest("try catch 3", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		try {
			throw (yield delay(_, "thrown"));
		} catch (ex) {
			return (yield delay(_, "caught ")) + ex;
		}
	}, 0), "caught thrown");
}, 0));
asyncTest("try catch 5", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		try {
			(yield delayFail(_, "delay fail"));
		} catch (ex) {
			return (yield delay(_, "caught ")) + ex;
		}
	}, 0), "caught delay fail");
}, 0));
asyncTest("try catch 6", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		try {
			throwError("direct");
			return (yield delay(_, "ok"));
		} catch (ex) {
			return (yield delay(_, "caught ")) + ex.message;
		}
	}, 0), "caught direct");
}, 0));
asyncTest("try catch 7", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		try {
			var message = (yield delay(_, "indirect"));
			throwError(message);
			return (yield delay(_, "ok"));
		} catch (ex) {
			return (yield delay(_, "caught ")) + ex.message;
		}
	}, 0), "caught indirect");
}, 0));
asyncTest("try finally 1", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "";
		try {
			x += (yield delay(_, "try"));
		} finally {
			x += (yield delay(_, " finally"));
		}
		x += " end";
		return x;
	}, 0), "try finally end");
}, 0));
asyncTest("try finally 2", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "";
		try {
			x += (yield delay(_, "try"));
			return x;
		} finally {
			x += (yield delay(_, " finally"));
		}
		x += " end";
		return x;
	}, 0), "try");
}, 0));
asyncTest("try finally 3", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "";
		try {
			x += (yield delay(_, "try"));
			throw "bad try";
		} finally {
			x += (yield delay(_, " finally"));
		}
		x += " end";
		return x;
	}, 0), "ERR: bad try");
}, 0));
asyncTest("try finally 4", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "";
		try {
			x += (yield delay(_, "try"));
			throwError("except");
		} finally {
			x += (yield delay(_, " finally"));
		}
		x += " end";
		return x;
	}, 0), "ERR: Error: except");
}, 0));
asyncTest("try finally 5", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "";
		try {
			try {
				x += (yield delay(_, "try"));
				throwError("except");
				x += " unreached";
			} finally {
				x += (yield delay(_, " finally"));
			}
			x += " end";
			return x;
		} catch (ex) {
			return x + "/" + ex.message;
		}
	}, 0), "try finally/except");
}, 0));
asyncTest("try catch finally 1", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "";
		try {
			try {
				x += (yield delay(_, "try"));
				throw new Error("except");
				x += " unreached";
			} catch (ex) {
				x += (yield delay(_, " catch " + ex.message));
				throw ex;
			} finally {
				x += (yield delay(_, " finally"));
			}
			x += " end";
			return x;
		} catch (ex) {
			return x + "/" + ex.message;
		}
	}, 0), "try catch except finally/except");
}, 0));
asyncTest("try catch finally 2", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "";
		try {
			try {
				x += (yield delay(_, "try"));
				throwError("except");
				x += " unreached";
			} catch (ex) {
				x += " catch " + ex.message;
				throw ex;
			} finally {
				x += " finally";
			}
			x += " end";
			return x;
		} catch (ex) {
			return x + "/" + ex.message;
		}
	}, 0), "try catch except finally/except");
}, 0));
asyncTest("nested try/catch 1", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "";
		try {
			try {
				x += (yield delay(_, "try"));
			} catch (ex) {
				x += (yield delay(_, " inner catch " + ex.message));
			}
			throwError(" except");
		} catch (ex) {
			return x + " outer catch" + ex.message;
		}
	}, 0), "try outer catch except");
}, 0));
asyncTest("nested try/catch 2", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "";
		try {
			try {
				x += (yield delay(_, "try"));
			} catch (ex) {
				x += " inner catch " + ex.message;
			}
			throw new Error(" except");
		} catch (ex) {
			return x + " outer catch" + ex.message;
		}
	}, 0), "try outer catch except");
}, 0));
asyncTest("nested try/catch 3", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "";
		try {
			try {
				x += (yield delay(_, "try"));
			} catch (ex) {
				x += (yield delay(_, " inner catch " + ex.message));
			}
			throw new Error(" except");
		} catch (ex) {
			return x + " outer catch" + ex.message;
		}
	}, 0), "try outer catch except");
}, 0));
asyncTest("nested try/finally 1", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "";
		try {
			try {
				x += (yield delay(_, "try"));
			} finally {
				x += (yield delay(_, " inner finally"));
			}
			throwError(" except");
		} catch (ex) {
			return x + " outer catch" + ex.message;
		}
	}, 0), "try inner finally outer catch except");
}, 0));
asyncTest("nested try/finally 2", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "";
		try {
			try {
				x += (yield delay(_, "try"));
			} finally {
				x += " inner finally";
			}
			throwError(" except");
		} catch (ex) {
			return x + " outer catch" + ex.message;
		}
	}, 0), "try inner finally outer catch except");
}, 0));
asyncTest("nested try/finally 3", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "";
		try {
			try {
				x += (yield delay(_, "try"));
			} finally {
				x += (yield delay(_, " inner finally"));
			}
			throw new Error(" except");
		} catch (ex) {
			return x + " outer catch" + ex.message;
		}
	}, 0), "try inner finally outer catch except");
}, 0));
asyncTest("and ok", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "<<";
		if ((yield delay(_, true)) && (yield delay(_, true))) x += "T1";
		else x += "F1";
		if ((yield delay(_, true)) && (yield delay(_, false))) x += "T2";
		else x += "F2";
		if ((yield delay(_, false)) && (yield delay(_, true))) x += "T3";
		else x += "F3";
		if ((yield delay(_, false)) && (yield delay(_, false))) x += "T4";
		else x += "F4";
		if ((yield delay(_, false)) && (yield delayFail(_, "bad"))) x += "T5";
		else x += "F5";
		x += ">>";
		return x;
	}, 0), "<<T1F2F3F4F5>>");
}, 0));
asyncTest("or ok", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var x = "<<";
		if ((yield delay(_, true)) || (yield delay(_, true))) x += "T1";
		else x += "F1";
		if ((yield delay(_, true)) || (yield delay(_, false))) x += "T2";
		else x += "F2";
		if ((yield delay(_, false)) || (yield delay(_, true))) x += "T3";
		else x += "F3";
		if ((yield delay(_, false)) || (yield delay(_, false))) x += "T4";
		else x += "F4";
		if ((yield delay(_, true)) || (yield delayFail(_, "bad"))) x += "T5";
		else x += "F5";
		x += ">>";
		return x;
	}, 0), "<<T1T2T3F4T5>>");
}, 0));
asyncTest("switch with default", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {var g_ = galaxy.unstar(g, 0);
		function* g(_, i) {
			var result = "a";
			switch ((yield delay(_, i))) {
			case 1:
				result = (yield delay(_, "b"));
				break;
			case 2:
				return (yield delay(_, "c"));
			case 3:
			case 4:
				result = (yield delay(_, "d"));
				break;
			default:
				result = (yield delay(_, "e"));
			}
			return result;
		}

		return (yield g(_, 0)) + (yield g(_, 1)) + (yield g(_, 2)) + (yield g(_, 3)) + (yield g(_, 4)) + (yield g(_, 5));
	}, 0), "ebcdde");
}, 0));
asyncTest("switch without default", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {var g_ = galaxy.unstar(g, 0);
		function* g(_, i) {
			var result = "a";
			switch ((yield delay(_, i))) {
			case 1:
				result = "b";
				break;
			case 2:
				return "c";
			case 3:
			case 4:
				result = "d";
				break;
			}
			return result;
		}

		return (yield g(_, 0)) + (yield g(_, 1)) + (yield g(_, 2)) + (yield g(_, 3)) + (yield g(_, 4)) + (yield g(_, 5));
	}, 0), "abcdda");
}, 0));
asyncTest("switch with fall through", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {var g_ = galaxy.unstar(g, 0);
		function* g(_, i) {
			var result = "/";
			switch ((yield delay(_, i))) {
			case 1:
				result += (yield delay(_, "b"));
				break;
			case 2:
				result += (yield delay(_, "c"));
			case 3:
			case 4:
				result += "d";
			case 5:
				result += (yield delay(_, "e"));
				break;
			case 6:
				result += (yield delay(_, "f"));
			default:
				result += (yield delay(_, "g"));
			}
			return result;
		}

		return (yield g(_, 0)) + (yield g(_, 1)) + (yield g(_, 2)) + (yield g(_, 3)) + (yield g(_, 4)) + (yield g(_, 5)) + (yield g(_, 6)) + (yield g(_, 7));
	}, 0), "/g/b/cde/de/de/e/fg/g");
}, 0));
asyncTest("this", 5, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {var delay2_ = galaxy.unstar(delay2, 1);
		function O(x) {
			this.x = x;
		}

		O.prototype.test1 = galaxy.unstar(function*(_) {
			var self = this;
			this.x = (yield delay(_, this.x + 1));
			strictEqual(this, self);
		}, 0);
		O.prototype.test2 = galaxy.unstar(function*(_) {
			var self = this;
			try {
				this.x = (yield delay(_, this.x + 1));
				strictEqual(this, self);
			} catch (ex) {
				ok(false);
			}
		}, 0);
		O.prototype.test3 = galaxy.unstar(function*(_) {
			var self = this;
			try {
				this.x = (yield delay(_, this.x + 1));
				throwError("test3");
				ok(false);
			} catch (ex) {
				strictEqual(this, self);
				this.x = (yield delay(_, this.x + 1));
			}
		}, 0);

		function* delay2(val, _) {
			return (yield delay(_, val));
		}

		O.prototype.test4 = galaxy.unstar(function*(_) {
			var self = this;
			var v1 = delay2_(this.x + 1, false);
			var v2 = delay2_(1, false);
			this.x = (yield galaxy.invoke(null, v1, [_], 0)) + (yield galaxy.invoke(null, v2, [_], 0));
			strictEqual(this, self);
		}, 0);
		var o = new O(1);
		(yield galaxy.invoke(o, "test1", [_], 0));
		(yield galaxy.invoke(o, "test2", [_], 0));
		(yield galaxy.invoke(o, "test3", [_], 0));
		(yield galaxy.invoke(o, "test4", [_], 0));
		return o.x;
	}, 0), 7);
}, 0));
asyncTest("scoping", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {var test_ = galaxy.unstar(test, 0);
		function* test(_) {
			var foo = "abc";

			function bar() {
				return foo;
			}

			(yield delay(_));
			var foo = "xyz";
			return bar;
		}

		return (yield test(_))();
	}, 0), "xyz");
}, 0));
asyncTest("return undefined", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {var test_ = galaxy.unstar(test, 0);
		function* test(_) {
			(yield delay(_));
			return;
		}

		return (yield test(_));
	}, 0), undefined);
}, 0));
asyncTest("futures test", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {var delay2_ = galaxy.unstar(delay2, 1);
		function* delay2(val, _) {
			return (yield delay(_, val));
		}

		var a = delay2_('a', false);
		var b = delay2_('b', false);
		var c = delay2_('c', false);
		var d = delay2_('d', false);
		return (yield galaxy.invoke(null, a, [_], 0)) + (yield galaxy.invoke(null, b, [_], 0)) + (yield galaxy.invoke(null, d, [_], 0)) + (yield galaxy.invoke(null, c, [_], 0));
	}, 0), "abdc");
}, 0));
asyncTest("last case without break", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		switch (true) {
		case true:
			(yield delay(_));
		}
		return 1;
	}, 0), 1);
}, 0));

asyncTest("async comma operator", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var a;
		return a = 4, a++, a = (yield delay(_, 2 * a)), (yield delay(_, a + 1));
	}, 0), 11);
}, 0));

asyncTest("async constructor", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {var Foo_ = galaxy.unstar(Foo, 1);
		function* Foo(val, _) {
			(yield delay(_));
			this.x = val;
		}
		Foo_.prototype.y = function() {
			return this.x + 1;
		};
		return  (yield galaxy.new(galaxy.star(Foo_,1), 1)(5, _)).y();
	}, 0), 6);
}, 0));

asyncTest("fibo false async", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {var fibo_ = galaxy.unstar(fibo, 0);
		function* fibo(_, n) {
			return n > 1 ? (yield fibo(_, n - 1)) + (yield fibo(_, n - 2)) : 1;
		}
		return (yield fibo(_, 16));
	}, 0), 1597);
}, 0));

asyncTest("coffeescript wrapper 1", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		return (yield (function*() {
			return (yield delay(_, "cs1"));
		})());
	}, 0), "cs1");
}, 0));

asyncTest("coffeescript wrapper 2", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		return (yield (function*() {
			return (yield delay(_, "cs2"));
		}).call(this));
	}, 0), "cs2");
}, 0));

asyncTest("coffeescript wrapper 3", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		return (yield (function*() {
			return (yield delay(_, "cs3"));
		}).apply(this, arguments));
	}, 0), "cs3");
}, 0));

asyncTest("sync try/catch in async", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		try {
			throw new Error("catch me");
		} catch (ex) {
			return "got it";
		}
	}, 0), "got it");
}, 0));

asyncTest("sync try/catch inside conditional", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		if (true) {
			try {} catch (ex) {}
		}
	}, 0), undefined);
}, 0));

asyncTest("labelled break", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var result = '';
		outer:
		for (var i = 1; i < 10; i++) {
			inner:
			for (var j = 5; j < 10; j++) {
				result = (yield delay(_, result)) + '!';
				if (i == 1 && j == 7) break;
				if (i == 2 && j == 7) break inner;
				if (i == 3 && j == 7) continue inner;
				if (i == 4 && j == 7) continue outer;
				if (i == 5 && j == 7) break outer;
				result = (yield delay(_, result)) + (yield delay(_, i)) + (yield delay(_, j)) + '-';
			}
			result += (yield delay(_, '/'));
		}
		return result;
	}, 0), '!15-!16-!/!25-!26-!/!35-!36-!!38-!39-/!45-!46-!!55-!56-!');
}, 0));

asyncTest("octal literal", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		return 010;
	}, 0), 8);
}, 0));

asyncTest("typeof rewriting bug (fibers)", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var hello = "hello";
		return typeof(hello);
	}, 0), "string");
}, 0));

asyncTest("ASI problems", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var s = "a";
		s = (yield delay(_, s));
		s = (yield delay(_, s));
		(yield delay(_, s));
		(yield delay(_, s));
		return s;
	}, 0), "a");
}, 0));

function twoResults(a, b, cb) {
	setTimeout(function() {
		cb(null, a, b);
	}, 0);
}

function twoResultsSync(a, b, cb) {
	cb(null, a, b);
}

asyncTest("multiple results ~_", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var results = (yield galaxy.invoke(null, twoResults, ['abc', 'def', _], 2));
		return results;
	}, 0), "abc");
}, 0));

asyncTest("multiple results [_]", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var results = (yield galaxy.invoke(null, twoResults, ['abc', 'def', _], { callbackIndex: 2, returnArray: true }));
		return results.join('-');
	}, 0), "abc-def");
}, 0));

asyncTest("multiple results with future", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {var wrapper_ = galaxy.unstar(wrapper, 2);
		function* wrapper(a, b, _) { return (yield galaxy.invoke(null, twoResults, [a, b, _], { callbackIndex: 2, returnArray: true })); }
		var results = (yield galaxy.invoke(null, wrapper_('abc', 'def', false), [_], 0));
		return results.join('-');
	}, 0), "abc-def");
}, 0));

asyncTest("multiple results synchronously", 1, galaxy.unstar(function*(_) {
	evalTest(galaxy.unstar(function* f(_) {
		var results = (yield galaxy.invoke(null, twoResultsSync, ['abc', 'def', _], { callbackIndex: 2, returnArray: true }));
		return results.join('-');
	}, 0), "abc-def");
}, 0));

asyncTest("this in futures", 2, galaxy.unstar(function*(_) {
	var c = {
		v: 1,
		test: galaxy.unstar(function*(_) { return this.v; }, 0)
	};
	strictEqual((yield galaxy.invoke(c, "test", [_], 0)), 1, "direct call");
	strictEqual((yield galaxy.invoke(null, c.test(false), [_], 0)), 1, "future call");
	start();
}, 0));

asyncTest("arity of async functions", 3, galaxy.unstar(function*(_) {
	var f = galaxy.unstar(function*(_, a, b, c, d, e, f, g, h, i) { return a + b; }, 0);
	var g = galaxy.unstar(function*(_, a) { return (yield (f.__starred__0 || 0)(_, 1, 2));}, 0);
	strictEqual(f.length, 10, "f.length === 10");
	strictEqual(g.length, 2, "g.length === 2");
	strictEqual((yield (g.__starred__0 || 0)(_)), 3, "g(_) === 3");
	start();
}, 0));

asyncTest("futures on _(fn, idx)", 1, galaxy.unstar(function*(_) {
	var f = galaxy.streamlinify(function(i, cb) {
		setTimeout(function() {
			cb(null, i + 1);
		}, 0);
	}, 1);
	var fut = f(5, false);
	strictEqual((yield galaxy.invoke(null, fut, [_], 0)), 6, "fut(_) === 6");
	start();
}, 0));

asyncTest("do while", 1, galaxy.unstar(function*(_) {var read_ = galaxy.unstar(read, 0);
	var i = 0;
	function* read(_) {
		return (yield delay(_, ++i)); 
	}
	var s = "";
	var v = (yield read(_));
	do {
		s += v;
	} while ((v = (yield read(_))) < 5);
	strictEqual(s, "1234");
	start();
}, 0));

asyncTest("return undefined", 1, galaxy.unstar(function*(_) {var read_ = galaxy.unstar(read, 0), f_ = galaxy.unstar(f, 0);
	function* read(_) {
		return (yield delay(_, 1)); 
	}
	function* f(_) {
		(yield read(_));
	}
	strictEqual((yield f(_)), undefined);
	start();
}, 0));

// enable later
false && asyncTest("futures on non-streamline APIs", 1, galaxy.unstar(function*(_) {
	function nat(cb) {
		setImmediate(function() {
			cb(null, "abc");
		});
	}
	var fut = nat(false);
	strictEqual((yield galaxy.invoke(null, fut, [_], 0)), "abc");
	start();
}, 0));


}, 0).call(this, function(err) {
  if (err) throw err;
}));