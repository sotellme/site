from asterisk.ami import AMIClient, SimpleAction
from bottle import route, run, response
from sensitive import dial_in_number
import re

@route('/<number_a>/<number_b>')
def hello(number_a, number_b):
  numbers = [ number_a, number_b ]
  if not all([ re.match('^(1[0-9]{10}|4443)$', number) for number in numbers ]):
    response.status = 400
    return 'Invalid number'
  do_call(conference_id, *numbers)
  return conference_id

def gen_conference_id():
  return ''.join(random.choice('0123456789abcdef') for n in xrange(10))

def do_call(conference_id, *numbers):
  client = AMIClient(address='asterisk',port=5038)

  client.login(username='asterisk',secret='asterisk')

  for number in numbers:
    action = SimpleAction(
        'Originate',
        Channel='LOCAL/{}@voipms-outbound'.format(number),
        Exten='10',
        Variable='SOTELLME_CONF_ID={}'.format(conference_id),
        Priority=1,
        Context='sotellme',
        CallerID='"SoTellMe" <{}>'.format(dial_in_number),
        Async='yes'
      )
    client.send_action(action)

  client.logoff()
  client.disconnect()


run(host='0.0.0.0', port=8080, debug=True)
