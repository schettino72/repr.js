from glob import glob

from doitweb import JsHint


KARMA_CMD = 'karma start karma.conf.js --single-run'
SRC_FILES = glob('src/*.js')
TEST_FILES = glob('test/*.js')


def task_jshint():
    hint = JsHint(config='hint.json')
    yield hint.tasks(SRC_FILES)


def task_test():
    return {
        'actions': [KARMA_CMD],
        'file_dep': SRC_FILES + TEST_FILES,
        }
