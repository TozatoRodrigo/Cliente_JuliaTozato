# Automação — post semanal do blog

Toda semana, escreve **1 novo post** de blog (SEO + GEO + autoridade), valida, publica em produção
e verifica — com **rollback automático** se algo falhar.

## Arquitetura (por que é assim)

| Arquivo | Papel |
|---|---|
| `weekly-blog-brief.md` | O "briefing" que o Claude executa: escolhe tema (backlog embutido), escreve o post no padrão, valida e chama o deploy. |
| `build-deploy.sh` | **Determinístico** (não é a IA improvisando): builda na VPS (container `node:22-alpine`, porque o build local trava neste Mac), faz backup, publica, reinicia e **verifica**. Se falhar, **reverte sozinho**. |
| `validate-blog.mjs` | Valida o frontmatter contra o schema Zod (title ≤70, description 110–165, categoria, faqs). |
| `run-weekly-blog.sh` | Wrapper do launchd: prepara o PATH (Node arm64) e roda o `claude` em modo headless com o brief. |
| `com.juliatozato.weekly-blog.plist` | Agendamento do launchd — **segunda-feira 09:00** (horário local). |
| `logs/` | Um log por execução (`run-<timestamp>.log`) + saída do launchd. |

A lógica de infra (deploy) é código fixo e testado; a IA só cuida do conteúdo. Assim, uma execução
ruim nunca derruba o site.

## Ativar (fazer UMA vez)

```bash
chmod +x ~/Desktop/site_julia/automation/build-deploy.sh ~/Desktop/site_julia/automation/run-weekly-blog.sh
mkdir -p ~/Desktop/site_julia/automation/logs
cp ~/Desktop/site_julia/automation/com.juliatozato.weekly-blog.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.juliatozato.weekly-blog.plist
```

## Testar agora (sem esperar segunda)

Rodar a automação completa uma vez, na hora:
```bash
bash ~/Desktop/site_julia/automation/run-weekly-blog.sh; echo "exit: $?"
```
Depois, ver o log mais recente:
```bash
ls -t ~/Desktop/site_julia/automation/logs/run-*.log | head -1 | xargs cat
```

Testar só o build+deploy (rebuild do site atual, sem escrever post):
```bash
bash ~/Desktop/site_julia/automation/build-deploy.sh /
```

## Gerenciar

- **Desligar temporariamente:** `launchctl unload ~/Library/LaunchAgents/com.juliatozato.weekly-blog.plist`
- **Religar:** `launchctl load ~/Library/LaunchAgents/com.juliatozato.weekly-blog.plist`
- **Ver se está ativo:** `launchctl list | grep juliatozato`
- **Mudar dia/horário:** editar `StartCalendarInterval` no `.plist` (dentro de `~/Library/LaunchAgents/`), depois unload + load. `Weekday`: 1=segunda … 0/7=domingo.
- **Trocar/adicionar temas:** editar o BACKLOG em `weekly-blog-brief.md`.

## O que você precisa saber

- **O Mac precisa estar ligado** no horário. Se estiver dormindo/desligado, o launchd dispara assim
  que ligar. (Para rodar com o Mac desligado, só migrando para a nuvem — outra arquitetura.)
- Cada execução **consome tokens** do seu plano Claude (escreve ~1.500 palavras + build/deploy).
- Roda com `--dangerously-skip-permissions` (necessário para ser автônomo). Ele age só dentro do
  projeto e no deploy da VPS; ainda assim, é um agente com Bash liberado — por isso a ativação é
  manual e sua.
- **Backlog embutido:** ~18 temas prontos (≈4 meses). Quando acabarem, o agente gera temas novos
  sozinho seguindo a estratégia editorial descrita no brief.
- **Revisão recomendada:** de vez em quando, leia o post da semana (`/blog`) e o log. Se quiser
  aprovar antes de publicar, dá para mudar o fluxo para "escrever como rascunho" — me peça.
