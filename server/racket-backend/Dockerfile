FROM m4burns/racket:20161203

RUN raco pkg install --skip-installed --deps search-auto --no-setup \
       compiler-lib \
       web-server \
       typed-racket \
       net-jwt \
       aws \
       rosette \
       csv-reading \
       disassemble \
       errortrace \
       google \
       http \
       db \
  && ( raco setup -iIDK || true )
