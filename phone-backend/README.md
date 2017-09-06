Files containing sensitive information:
  - sensitive.py
  - asterisk-config/

GPG encrypted versions of these files are tracked by git.

Run `./manage-sensitive.sh decrypt' to get the plaintext. Please don't add
plaintext originals back to the repository. Instead, run
`./manage-sensitive.sh encrypt' after you have made changes to the
sensitive files.
