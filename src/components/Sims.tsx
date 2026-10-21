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

/** Esboço da hipótese: a Diana existia só no WhatsApp; e se ela estivesse dentro do portal? */
export function HypothesisSketch() {
  return (
    <div className="sk" role="img" aria-label="Esboço: a conversa com a Diana no WhatsApp e, abaixo, o portal de setup com o ícone de ajuda. A pergunta: e se ela estivesse aqui?">
      <div className="sk-card">
        <span className="sk-t">WhatsApp</span>
        <span className="sk-b in">Oi, aqui é a Diana</span>
        <span className="sk-b out">preciso de ajuda…</span>
      </div>
      <div className="sk-arrow">
        <svg viewBox="0 0 24 80" aria-hidden>
          <path d="M12 2v68" strokeDasharray="6 6" />
          <path d="M5 62l7 12 7-12" />
        </svg>
        <span>e se ela estivesse aqui?</span>
      </div>
      <div className="sk-card portal">
        <span className="sk-t">Portal · setup</span>
        <i className="sk-bar w1" />
        <i className="sk-bar w2" />
        <i className="sk-bar w1" />
        <span className="sk-dot">?</span>
      </div>
    </div>
  );
}
