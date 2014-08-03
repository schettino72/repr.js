from glob import glob

from doitweb import JsHint


DOIT_CONFIG = {
    'default_tasks': ['jshint', 'test:PhantomJS'],
    'verbosity': 2,
    }


KARMA_CMD = 'karma start karma.conf.js --single-run'
SRC_FILES = glob('src/*.js')
TEST_FILES = glob('test/*.js')


def task_jshint():
    hint = JsHint(config='hint.json')
    yield hint.tasks(SRC_FILES + TEST_FILES)


def task_test():
    for browser in ('PhantomJS', 'Firefox'):
        yield {
            'name': browser,
            'actions': [KARMA_CMD + ' --browsers ' + browser],
            'file_dep': SRC_FILES + TEST_FILES,
            }

def task_coverage():
    """annotate for coverage and run tests"""
    return {
        'actions': ['env KARMA_MODE=coverage ' + KARMA_CMD +
                    ' --browsers PhantomJS'],
        'file_dep': SRC_FILES + TEST_FILES,
        'uptodate': [False],
        }
