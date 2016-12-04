#lang typed/racket

(provide Capability?
         Client-Incoming
         Client-Incoming-Capability?
         Client-Outgoing
         Client-Outgoing-Capability?
         generate-capability-token)

(require net/jwt)

(require/typed net/uri-codec
  [alist->form-urlencoded (-> (Listof (Pairof Symbol String)) String)])

(struct Capability ())

(struct Client-Incoming-Capability Capability
        ([client-name : String]))

(define Client-Incoming Client-Incoming-Capability)

(struct Client-Outgoing-Capability Capability
        ([app-sid : String]
         [client-name : (Option String)]
         [app-params : (Option (HashTable Symbol String))]))

(define (Client-Outgoing
          [app-sid : String]
          #:clientName [client-name : (Option String) #f]
          #:appParams [app-params : (Option (HashTable Symbol String)) #f])
  : Client-Outgoing-Capability
  (Client-Outgoing-Capability
    app-sid client-name app-params))

(define (encode-scope-url [cap : Capability])
  : String
  (define-values (permission args)
    (match cap
      [(Client-Incoming-Capability client-name)
       (values
         "incoming"
         `((clientName . ,client-name)))]
      [(Client-Outgoing-Capability app-sid client-name app-params)
       (values
         "outgoing"
         `((appSid . ,app-sid)
           ,@(if client-name
                 `((clientName . ,client-name))
                 `())
           ,@(if app-params
                 `((appParams . ,(alist->form-urlencoded (hash->list app-params))))
                 `())))]))
  (string-append
    "scope:client:"
    permission
    "?"
    (alist->form-urlencoded args)))

(define (generate-capability-token
          [account-sid : String]
          [auth-token : String]
          #:valid-seconds [valid-seconds : Natural 3600]
          [capabilities : (Pairof Capability (Listof Capability))])
  : String
  (encode/sign
    "HS256" auth-token
    #:other
    (ann
      (hasheq 'scope
              (string-join (map encode-scope-url capabilities) " "))
      JSXHash)
    #:iss account-sid
    #:exp (+ (current-seconds) valid-seconds)))
