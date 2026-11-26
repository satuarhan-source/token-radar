# Synmerco state backups
- backups/ = encrypted tar.gz (AES-256-CBC pbkdf2). Passphrase in pass.txt (in-repo, repo is private).
- Restore: openssl enc -d -aes-256-cbc -pbkdf2 -in backups/<file>.enc -pass file:pass.txt -out state.tar.gz && tar xzf state.tar.gz -C /root/
