#!/bin/bash
# Coloca no ar o /painel do Núcleo Afetar (04/11/2026). Rodar DEPOIS do publicar-fase2.sh da NexaCloud (schema-v29).
# 1) registra o site nas estatísticas da NexaCloud (chave de leitura guardada em ~/.config/nexacloud/nucleoafetar-site-token);
# 2) grava PAINEL_SENHA e NEXA_SITE_TOKEN no projeto da Vercel (conta gueth1) sem imprimir os valores;
# 3) envia o código ao GitHub e publica na Vercel.
set -e
CFG=~/.config/nexacloud
TOKEN=$(tr -d '\n' < $CFG/nucleoafetar-site-token)
HASH=$(printf 'site-read:%s' "$TOKEN" | shasum -a 256 | cut -d' ' -f1)
cd ~/NexaCloud/edge/control
npx --yes wrangler@4 d1 execute nexacloud-control --remote --command "INSERT INTO web_sites(id,domain,read_token_hash) VALUES('nucleoafetar','nucleoafetar.com.br','$HASH') ON CONFLICT(id) DO UPDATE SET read_token_hash=excluded.read_token_hash" >/dev/null && echo "Site registrado nas estatísticas da NexaCloud."
python3 - <<'PY'
import json, os, urllib.request
cfg = os.path.expanduser('~/.config/nexacloud')
vt = open(f'{cfg}/vercel-nucleoafetar-token').read().strip()
proj = 'prj_q1EFLJfPgVknLFNPNWWIANxLHU2B'
vals = {'PAINEL_SENHA': open(f'{cfg}/nucleoafetar-painel-senha').read().strip(), 'NEXA_SITE_TOKEN': open(f'{cfg}/nucleoafetar-site-token').read().strip()}
for k, v in vals.items():
    body = {'key': k, 'value': v, 'type': 'encrypted', 'target': ['production', 'preview']}
    req = urllib.request.Request(f'https://api.vercel.com/v10/projects/{proj}/env?upsert=true', json.dumps(body).encode(),
                                 {'authorization': 'Bearer ' + vt, 'content-type': 'application/json'}, method='POST')
    try:
        urllib.request.urlopen(req, timeout=30); print('Vercel:', k, 'gravada')
    except urllib.error.HTTPError as e:
        print('Vercel:', k, 'falhou', e.code, e.read()[:150])
PY
cd ~/nucleo-afetar-site && git push origin HEAD:main && echo "Código enviado ao GitHub (main)."
npx --yes vercel@latest deploy --prod --yes --token "$(tr -d '\n' < $CFG/vercel-nucleoafetar-token)" 2>&1 | tail -2
echo; echo "Senha do painel (guarde no gerenciador de senhas):"; cat $CFG/nucleoafetar-painel-senha
echo "Endereço: https://www.nucleoafetar.com.br/painel"
