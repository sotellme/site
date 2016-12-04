#lang racket

(require "capability.rkt"
         "config.rkt"
         web-server/servlet
         web-server/servlet-env
         json)

(define twiml-doc
"<?xml version=\"1.0\" encoding=\"UTF-8\" ?>  
<Response> 
  <Say>Hello World</Say>
  <Play>https://api.twilio.com/Cowbell.mp3</Play>
</Response>")

(define (response/json expr)
  (response/full
    200
    #"OK"
    (current-seconds)
    #"application/json"
    empty
    (list (jsexpr->bytes expr))))

(define (response/xml-string str)
  (response/full
    200
    #"OK"
    (current-seconds)
    #"application/xml"
    empty
    (list (string->bytes/utf-8 str))))

(define (start request)
  (match (url->string (request-uri request))
    ["/gencaptoken"
     (response/json
       (generate-capability-token
         ACCOUNT-SID
         AUTH-TOKEN
         (list
           (Client-Outgoing
             APP-SID))))]
    ["/voice"
     (response/xml-string twiml-doc)]
    [else
     (response/xexpr
        '(html
             (body "Hello World")))]))

(serve/servlet start
               #:listen-ip "0.0.0.0"
               #:port 8000
               #:servlet-regexp #rx".*"
               #:command-line? #t
               #:banner? #t)
