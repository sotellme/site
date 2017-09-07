from asterisk.ami import AMIClient, AMIClientAdapter
import sensitive
import redis
import re, random, logging

logger = logging.getLogger(__name__)

class NumberFormatException(Exception):
  pass

class Backend:
  def __init__(self):
    self.client = None
    self.adapter = None
    self.redis = None

  def __enter__(self):
    client = AMIClient(address='asterisk', port=5038)
    client.login(username='asterisk',secret='asterisk')
    self.client = client
    self.adapter = AMIClientAdapter(self.client)
    self.client.add_event_listener(self._event_callback)
    self.redis = redis.StrictRedis(host='redis')
    return self

  def __exit__(self, *args):
    try:
      self.client.logoff()
      self.client.disconnect()
    finally:
      self.adapter = None
      self.client = None
      self.redis = None

  def _event_callback(self, event, source):
    try:
      if 'Channel' not in event or not re.match('^SIP/', event['Channel']):
        return

      if event.name == 'Hangup':
        self._hangup(event['CallerIDNum'])
      elif event.name == 'NewConnectedLine':
        self._connect(event['CallerIDNum'])

    except Exception:
      logger.exception('in AMI event handler')

  def _hangup(self, num):
    print('HANGUP: {}'.format(num))
    self.redis.delete('sotellme_connected_to:{}'.format(num))

  def _connect(self, num):
    print('CONNECT: {}'.format(num))
    self.redis.set('sotellme_connected_to:{}'.format(num), 'yes')

  def _do_call(self, conference_id, *numbers):
    futures = []
    for number in numbers:
      futures.append(self.adapter.Originate(
          Channel='LOCAL/{}@voipms-outbound'.format(number),
          Exten='10',
          Variable='SOTELLME_CONF_ID={}'.format(conference_id),
          Priority=1,
          Context='sotellme',
          CallerID='"SoTellMe" <{}>'.format(sensitive.dial_in_number),
          Async='yes',
        ))
    for future in futures:
      print('Originate result: {}'.format(future.response))

  def _gen_conference_id(self):
    return ''.join(random.choice('0123456789abcdef') for n in range(10))

  def verify_and_dial(self, numbers):
    if not all([ re.match('^(1[0-9]{10}|4443)$', number) for number in numbers ]):
      raise NumberFormatException()

    conference_id = self._gen_conference_id()
    self._do_call(conference_id, *numbers)
    return conference_id

  def kill_conference(self, conference_id):
    if not re.match('^[0-9a-f]*$', conference_id):
      raise NumberFormatException()
    return str(self.adapter.ConfbridgeKick(
        Conference=conference_id,
        Channel='all'
      ).response)
     
