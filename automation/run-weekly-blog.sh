#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Wrapper chamado pelo launchd toda semana. Prepara o ambiente (Node arm64 no
# PATH, para o build/validador não usarem o Node x86 que trava), e roda o
# Claude Code em modo headless com o brief de escrita+deploy do post.
#
# Log de cada execução em automation/logs/run-<timestamp>.log
# ---------------------------------------------------------------------------
set -uo pipefail

PROJECT="/Users/rodrigodiastozato/Desktop/site_julia"
BRIEF="$PROJECT/automation/weekly-blog-brief.md"
LOGDIR="$PROJECT/automation/logs"
CLAUDE="/Users/rodrigodiastozato/.local/bin/claude"
NODE_BIN="/Users/rodrigodiastozato/.nvm/versions/node/v22.23.1/bin"

# Node arm64 primeiro no PATH + locais usuais + o claude.
export PATH="$NODE_BIN:/Users/rodrigodiastozato/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

# Autenticação:
#  - Opção A (assinatura): rode `claude login` uma vez; o CLI usa o Keychain sozinho.
#  - Opção B (API key, robusta p/ headless): crie ~/.claude-automation.env com a linha
#      export ANTHROPIC_API_KEY=sk-ant-...
#    que este bloco carrega automaticamente se o arquivo existir.
if [ -f "$HOME/.claude-automation.env" ]; then
  # shellcheck disable=SC1091
  . "$HOME/.claude-automation.env"
fi

mkdir -p "$LOGDIR"
STAMP="$(date +%Y%m%d-%H%M%S)"
LOG="$LOGDIR/run-$STAMP.log"

cd "$PROJECT" || { echo "projeto não encontrado" > "$LOG"; exit 1; }

{
  echo "===== Execução semanal do blog — $STAMP ====="
  echo "node: $(node -v 2>/dev/null) ($(node -p 'process.arch' 2>/dev/null))"
  echo "----------------------------------------------"
} > "$LOG"

# Modo headless: -p imprime e sai; bypass de permissões para rodar sem prompts.
"$CLAUDE" -p "$(cat "$BRIEF")" \
  --model claude-sonnet-5 \
  --dangerously-skip-permissions \
  --add-dir "$PROJECT" \
  --output-format text \
  >> "$LOG" 2>&1

CODE=$?
echo "----------------------------------------------" >> "$LOG"
echo "===== fim (exit $CODE) — $(date +%H:%M:%S) =====" >> "$LOG"
exit $CODE
