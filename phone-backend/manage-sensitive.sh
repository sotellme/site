#!/bin/sh

FILES=(
  sensitive.py
  asterisk-config/sip.conf
  asterisk-config/extensions.conf
  asterisk-config/manager.conf
  asterisk-config/confbridge.conf
)

ENCRYPT_ARGS="--recipient m4burns@uwaterloo.ca"

case "$1" in
  "encrypt")
    for i in "${FILES[@]}"
    do
      gpg -q --yes --encrypt $ENCRYPT_ARGS "$i"
      git add "$i".gpg
    done 
    ;;
  "decrypt")
    for i in "${FILES[@]}"
    do
      gpg -q --yes --decrypt "$i".gpg
    done 
    ;;
   *)
    echo "usage: $0 [encrypt|decrypt]"
    exit 1
    ;;
esac
    
