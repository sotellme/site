FROM m4burns/racket-backend:latest

COPY *.rkt /sotellme/

RUN cd /sotellme && raco make main.rkt

ENV PLTSTDERR="debug@sotellme"

CMD racket /sotellme/main.rkt
