from backend_rest import BackendRest
from backend import Backend

with Backend() as b:
  BackendRest(b).run()
