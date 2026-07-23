#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Build + deploy determinístico do site da Julia Tozato.
#
# Por que existe: o build local neste Mac trava de forma intermitente, então
# o build roda NA VPS, dentro de um container node:22-alpine (limpo e rápido).
# O deploy faz backup do html atual, troca pelo novo, reinicia o container e
# VERIFICA. Se a verificação falhar, faz ROLLBACK automático — o site em
# produção nunca fica quebrado.
#
# Uso:  ./build-deploy.sh [CAMINHO_A_VERIFICAR]
#   ex: ./build-deploy.sh /blog/meu-novo-post
#   (sem argumento, verifica apenas a home)
#
# Saída: exit 0 = publicado e verificado; exit != 0 = falhou (e já reverteu).
# ---------------------------------------------------------------------------
set -euo pipefail

PROJECT="/Users/rodrigodiastozato/Desktop/site_julia"
VPS="rodrigo@76.13.173.181"
APP="/home/rodrigo/apps/site-julia"
SITE="https://psicologajuliatozato.com.br"
VERIFY_PATH="${1:-/}"
MIN_PAGES="${MIN_PAGES:-35}"   # o build precisa gerar ao menos isso de .html

cd "$PROJECT"

echo "[1/5] empacotando o código-fonte..."
tar czf /tmp/julia-src.tgz \
  --exclude node_modules --exclude dist --exclude .astro \
  --exclude Fotos --exclude fotos --exclude .git --exclude automation \
  package.json package-lock.json astro.config.mjs tsconfig.json public src tests deploy

echo "[2/5] enviando para a VPS..."
scp -o ConnectTimeout=20 -q /tmp/julia-src.tgz "$VPS:$APP/src.tgz"

echo "[3/5] buildando na VPS (container node:22-alpine)..."
ssh -o ConnectTimeout=20 "$VPS" "APP='$APP' MIN='$MIN_PAGES' bash -s" <<'REMOTE'
set -euo pipefail
cd "$APP"
rm -rf build-src && mkdir build-src
tar xzf src.tgz -C build-src && rm -f src.tgz
docker run --rm -v "$APP/build-src:/app" -w /app node:22-alpine \
  sh -c 'npm ci --silent && npx astro build' > /tmp/julia-build.log 2>&1
docker run --rm -v "$APP/build-src:/app" alpine chown -R "$(id -u):$(id -g)" /app
N=$(find build-src/dist -name '*.html' | wc -l)
echo "    -> build gerou $N páginas"
if [ "$N" -lt "$MIN" ]; then
  echo "ERRO: páginas de menos ($N < $MIN) — build provavelmente falhou"
  tail -25 /tmp/julia-build.log
  rm -rf build-src
  exit 1
fi
REMOTE

echo "[4/5] publicando (backup + troca + restart)..."
ssh -o ConnectTimeout=20 "$VPS" "APP='$APP' bash -s" <<'REMOTE'
set -euo pipefail
cd "$APP"
rm -rf html.deploy-bak && cp -r html html.deploy-bak
rm -rf html && mv build-src/dist html && rm -rf build-src
docker compose restart >/dev/null 2>&1
REMOTE

echo "[5/5] verificando $SITE$VERIFY_PATH ..."
ok=0
for _ in $(seq 1 15); do
  p=$(curl -s -o /dev/null -w '%{http_code}' --max-time 8 "$SITE$VERIFY_PATH" || true)
  h=$(curl -s -o /dev/null -w '%{http_code}' --max-time 8 "$SITE/" || true)
  if [ "$p" = "200" ] && [ "$h" = "200" ]; then ok=1; break; fi
  sleep 3
done

if [ "$ok" != "1" ]; then
  echo "VERIFICAÇÃO FALHOU (path=$p home=$h) — REVERTENDO PARA O BACKUP"
  ssh -o ConnectTimeout=20 "$VPS" "cd '$APP' && rm -rf html && mv html.deploy-bak html && docker compose restart" || true
  exit 1
fi

echo "OK: $SITE$VERIFY_PATH no ar (HTTP 200). Deploy concluído."
