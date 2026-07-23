#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Roda NO MAC (via launchd). Publica os posts que a tarefa do Cowork escreveu.
#
# A chave SSH NUNCA sai do Mac. Bash puro — não usa `claude`, então não tem o
# problema de autenticação (401) do modo headless.
#
# Fluxo: para cada .mdx em "Posts Blog":
#   - deriva o slug (remove prefixo de data AAAA-MM-DD- se houver)
#   - envia para a VPS (site-src) e roda publish-post.sh (build+deploy+verify+rollback)
#   - se publicou: move o arquivo para "Posts Blog realizados"
#   - se falhou: remove o .mdx da VPS (para não contaminar o próximo build) e
#     DEIXA o arquivo em "Posts Blog" para você revisar
# ---------------------------------------------------------------------------
set -uo pipefail

BASE="/Users/rodrigodiastozato/Downloads/AgentWorkspace/Clientes/Julia Tozato - Psicologa"
PENDING="$BASE/Posts Blog"
DONE="$BASE/Posts Blog realizados"
VPS="rodrigo@76.13.173.181"
VPS_BLOG="/home/rodrigo/apps/site-julia/site-src/src/content/blog"
LOGDIR="/Users/rodrigodiastozato/Desktop/site_julia/automation/logs"

mkdir -p "$LOGDIR" "$DONE"

shopt -s nullglob
files=("$PENDING"/*.mdx)
[ ${#files[@]} -eq 0 ] && exit 0   # nada pendente: sai sem nem tocar na rede

LOG="$LOGDIR/deploy-watcher-$(date +%Y%m%d-%H%M%S).log"
{
  echo "===== deploy-watcher $(date) — ${#files[@]} arquivo(s) pendente(s) ====="
  for f in "${files[@]}"; do
    base="$(basename "$f" .mdx)"
    slug="$(echo "$base" | sed -E 's/^[0-9]{4}-[0-9]{2}-[0-9]{2}-//')"
    echo "--- $base  ->  slug: $slug"

    if ! scp -o ConnectTimeout=20 -q "$f" "$VPS:$VPS_BLOG/$slug.mdx"; then
      echo "    scp FALHOU — mantendo arquivo em Posts Blog"
      continue
    fi

    if ssh -o ConnectTimeout=20 "$VPS" "bash ~/apps/site-julia/publish-post.sh /blog/$slug"; then
      mv "$f" "$DONE/"
      echo "    OK: publicado e arquivado — https://psicologajuliatozato.com.br/blog/$slug"
    else
      ssh -o ConnectTimeout=20 "$VPS" "rm -f '$VPS_BLOG/$slug.mdx'" || true
      echo "    FALHA no build/deploy (site revertido, .mdx removido da VPS) — arquivo mantido em Posts Blog para revisão"
    fi
  done
  echo "===== fim — $(date +%H:%M:%S) ====="
} >> "$LOG" 2>&1
