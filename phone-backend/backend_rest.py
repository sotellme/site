import logging
from bottle import response, Bottle
from backend import NumberFormatException

logger = logging.getLogger(__name__)

class BackendRest:
  def __init__(self, backend):
    self.backend = backend
    self.app = Bottle()
    self.app.route('/dial/<number_a>/<number_b>', callback=self.dial)
    self.app.route('/kill/<conference_id>', callback=self.kill)

  def run(self, host='0.0.0.0', port=8080):
    self.app.run(host=host, port=port)

  def dial(self, number_a, number_b):
    try:
      return self.backend.verify_and_dial([number_a, number_b])
    except NumberFormatException:
      response.status = 400
      return 'Invalid number'
    except Exception:
      logger.exception('Exception in dial {} {}'.format(number_a, number_b))
      response.status = 500
      return 'Internal error'

  def kill(self, conference_id):
    try:
      return self.backend.kill_conference(conference_id)
    except NumberFormatException:
      response.status = 400
      return 'Invalid conference ID'
    except Exception:
      logger.exception('Exception in kill {}'.format(conference_id))
      response.status = 500
      return 'Internal error'
