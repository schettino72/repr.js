from glob import glob

from doitweb import JsHint


DOIT_CONFIG = {
    'default_tasks': ['jshint', 'test:PhantomJS'],
    'verbosity': 2,
    }


################## developement  ###################

KARMA_CMD = 'karma start karma.conf.js --single-run'
SRC_FILES = glob('src/*.js')
TEST_FILES = glob('test/*.js')


def task_jshint():
    hint = JsHint(config='hint.json')
    yield hint.tasks(SRC_FILES + TEST_FILES)


def task_test():
    """run unit-tests"""
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



################## setup  ###################

def task_dev_setup():
    """install setup third-part packages"""
    yield {
        'name': 'npm',
        'actions': ['npm install'],
        'file_dep': ['package.json'],
        'targets': ['node_modules'],
        }

    yield {
        'name': 'bower',
        'actions': ['bower install'],
        'file_dep': ['bower.json'],
        'targets': ['bower_components'],
        }


    # build/move used files from bower_components to components folder
    components = {
        'chai.js': 'chai/chai.js',
        'mocha.css': 'mocha/mocha.css',
        'mocha.js': 'mocha/mocha.js',
        }
    for dst, src in components.items():
        yield {
            'name': 'bower-{}'.format(dst),
            'actions': ['mkdir -p components',
                        'cp %(dependencies)s %(targets)s'],
            'file_dep': ['bower_components/{}'.format(src)],
            'targets': ['components/{}'.format(dst)],
            }
