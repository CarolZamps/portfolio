/**
 * Simulações do case, portadas do deck: cada uma é CSS puro em loop (estilos em globals.css, .sim e .wa).
 * Medidas em cqw: tudo escala com a largura do cartão onde está.
 * Nomes internos (contrato de API, repositório) viraram genéricos na versão pública.
 */

/** Mesma lógica do deck: terminal digitando o pedido e listando o que o Claude Code fez. */
export function TerminalSim() {
  const lines: [string, string, string?, string?][] = [
    ["1.7s", "Read", "docs/api-contract.md"],
    ["2.1s", "Write", "WebChat.tsx", "+128"],
    ["2.5s", "Edit", "ChatLauncher.tsx", "+34"],
    ["2.9s", "Edit", "tokens.css", "+12"],
    ["3.4s", "Bash", "npm run build", "✓ sem erros"],
  ];
  return (
    <div
      className="sim"
      style={{ background: "var(--color-note-4)" }}
      role="img"
      aria-label="Terminal do Claude Code: o pedido é digitado e ele lê a documentação, cria o componente, ajusta tokens e roda o build sem erros"
    >
      <div className="sim-win sim-dark">
        <div className="sim-bar">
          <i />
          <i />
          <i />
          <span>claude code</span>
        </div>
        <div className="sim-term">
          <p>
            <b className="sim-prompt">&gt;</b>
            <span className="sim-ttype">criar o webchat a partir do frame do Figma</span>
          </p>
          {lines.map(([delay, cmd, arg, tail]) => (
            <p key={cmd + arg} className="sim-tln sim-seq" style={{ animationDelay: delay }}>
              <em>{cmd}</em> {arg}
              {tail && <s className={tail.startsWith("✓") ? "ok" : ""}>{tail}</s>}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Estados do launcher: repouso, hover (escala e brilho), aberto, com os valores sendo ajustados. */
export function LauncherSim() {
  return (
    <div
      className="sim"
      style={{ background: "var(--color-note-2)" }}
      role="img"
      aria-label="Estados do ícone de ajuda: repouso, hover com escala e brilho, e aberto"
    >
      <div className="sim-win sim-light">
        <div className="sim-bar">
          <i />
          <i />
          <i />
          <span>estados do launcher</span>
        </div>
        <div className="sim-ubody">
          <div className="sim-stage">
            <div className="sim-lnch">
              <b className="sim-q">?</b>
              <span className="sim-lav" />
            </div>
            <p className="sim-state">
              <span>repouso</span>
              <span>hover</span>
              <span>aberto</span>
            </p>
          </div>
          <div className="sim-props">
            <div>
              <span>duração</span>
              <b>240 ms</b>
            </div>
            <div>
              <span>escala</span>
              <b>1 → 1,07</b>
            </div>
            <div>
              <span>brilho</span>
              <b>0 → 100%</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** A Diana só existia aqui: conversa de WhatsApp, fora do portal. */
export function WhatsAppPhone() {
  return (
    <div
      className="wa"
      role="img"
      aria-label="Conversa no WhatsApp: a Diana se apresenta, o parceiro pede ajuda para montar o cardápio e ela se oferece para dar o suporte"
    >
      <div className="wa-head">
        <span className="wa-back">‹</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projetos/diana/diana-av.png" alt="" width={64} height={64} />
        <span className="wa-name">
          <b>
            Diana · iFood <i className="wa-vfy">✓</i>
          </b>
          <span>online</span>
        </span>
      </div>
      <div className="wa-body">
        <div className="wa-msg in">
          Oi, tudo bem? Aqui é a Diana do iFood. Como posso te ajudar?<i>11:14</i>
        </div>
        <div className="wa-msg out">
          Estou com dúvidas para conseguir montar o meu cardápio. Você pode me ajudar com isso?<i>11:15</i>
        </div>
        <div className="wa-msg in">
          Claro, consigo sim. Pode me contar qual é a sua dúvida, que eu vou te dar o suporte necessário.<i>11:16</i>
        </div>
      </div>
      <div className="wa-foot">
        <span>Mensagem</span>
        <em>↑</em>
      </div>
    </div>
  );
}
