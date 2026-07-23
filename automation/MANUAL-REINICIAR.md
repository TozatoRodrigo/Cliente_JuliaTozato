# Manual — desligar, reiniciar e reativar o sistema de posts

## Como o sistema funciona (para entender)

```
Cowork (segunda 9h, app aberto)  →  escreve o .mdx em "Posts Blog"
Mac (publicador, a cada 4h + no login)  →  publica na VPS  →  move p/ "Posts Blog realizados"
```

Três peças, e o que cada uma precisa:

| Peça | Onde roda | Sobrevive a reiniciar o Mac? |
|---|---|---|
| **Site no ar** (VPS) | Servidor na nuvem (independente) | ✅ Sim — o site NUNCA cai quando você desliga o Mac |
| **Publicador** (deploy-watcher) | Seu Mac (launchd) | ✅ Sim — recarrega sozinho no login |
| **Gerador de post** | App do Cowork | ✅ Sim — roda quando o app está aberto |

## ✅ Depois de reiniciar o Mac — o que fazer (30 segundos)

**Na prática, só isto:**

1. **Faça login normalmente** no Mac.
2. **Abra o app do Cowork** (para a tarefa agendada poder disparar).

Pronto. O **publicador volta sozinho** — arquivos em `~/Library/LaunchAgents/` são recarregados
automaticamente toda vez que você faz login. Você **não** precisa rodar comando nenhum.

3. (Opcional) Se quiser confirmar que o publicador está ativo:
```bash
launchctl list | grep juliatozato
```
Se aparecer `com.juliatozato.deploy-watcher`, está tudo certo.

## 🔧 Se por algum motivo NÃO estiver ativo — reativar

Rode os 3 comandos (os mesmos da instalação):
```bash
chmod +x ~/Desktop/site_julia/automation/deploy-pending-posts.sh
cp ~/Desktop/site_julia/automation/com.juliatozato.deploy-watcher.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.juliatozato.deploy-watcher.plist
```
Se aparecer "already loaded", é porque já estava ativo — sem problema.

## ▶️ Testar / forçar a publicação agora (sem esperar 4h)

Forçar uma verificação imediata:
```bash
launchctl start com.juliatozato.deploy-watcher
```
Ou rodar direto e ver a saída na hora:
```bash
bash ~/Desktop/site_julia/automation/deploy-pending-posts.sh; echo "fim: $?"
```
Ver o último log do publicador:
```bash
ls -t ~/Desktop/site_julia/automation/logs/deploy-watcher-*.log | head -1 | xargs cat
```

## ⏸️ Pausar / retomar (ex.: viajar, não quero que publique)

Pausar:
```bash
launchctl unload ~/Library/LaunchAgents/com.juliatozato.deploy-watcher.plist
```
Retomar:
```bash
launchctl load ~/Library/LaunchAgents/com.juliatozato.deploy-watcher.plist
```

## ⚠️ Duas condições para rodar sozinho

- **Mac ligado e com você logado.** O publicador só roda no seu login. Se o Mac estiver desligado no
  horário, ele publica assim que você ligar (ele verifica no login e a cada 4h).
- **App do Cowork aberto** para gerar o post. Se estava fechado na segunda, a tarefa roda na próxima
  vez que você abrir o app.

## 🚫 Não mova a pasta do projeto

O publicador aponta para `~/Desktop/site_julia/automation/`. Se você **mover, renomear ou apagar**
essa pasta, o publicador para de funcionar. Se precisar mover, me avise para ajustar os caminhos.

## 🆘 Refazer tudo do zero (ex.: formatou o Mac / trocou de computador)

1. Ter a pasta `~/Desktop/site_julia` de volta (o projeto).
2. Ter a chave SSH `~/.ssh/id_ed25519` (a que acessa `rodrigo@76.13.173.181` sem senha).
   - Testar: `ssh rodrigo@76.13.173.181 'echo ok'` deve responder `ok` sem pedir senha.
3. Rodar os 3 comandos de ativação (seção "reativar" acima).
4. Recriar a tarefa no Cowork com o prompt (versão "só escreve").

A **VPS não precisa de nada** — o site e o script de publicação já estão configurados e no ar lá.

## Como saber que está tudo saudável (check rápido a qualquer momento)

```bash
launchctl list | grep juliatozato          # publicador ativo?
ssh rodrigo@76.13.173.181 'echo ok'         # SSH sem senha funciona?
curl -s -o /dev/null -w "%{http_code}\n" https://psicologajuliatozato.com.br/   # site 200?
```
Três respostas boas (`...deploy-watcher`, `ok`, `200`) = sistema 100%.
