from doitweb import JsHint

def task_jshint():
    hint = JsHint(config='hint.json')
    yield hint.tasks(['*.js'])
