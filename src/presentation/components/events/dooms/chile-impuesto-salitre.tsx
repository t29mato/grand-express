/**
 * 鉱物輸出に思わぬ税関の再査定(fine)。
 *
 * 本文の芯は「書類は鉱山を出たときは正しかったのに、港の税関で輸出税が
 * 再査定され、コンテナを進めるにはその場で差額を払うしかなかった」。
 *
 * 構図表:昼 / 港ゲートの側面 / 主役は**下りたままの赤白バー**と差し替わる
 * 書類 / 人2(係官と運転手)/ 地色は港のグレー。
 *
 * 動くのは**係官のスタンプ・めくれ上がる新しい査定書・バーの先で振れる
 * 停止札・運転手が財布を出す腕**。バーそのものは最後まで上がらない。
 * 止めた状態でも、下りたバーと突き出された書類で「止められて払う」と分かる。
 */
export function ChileImpuestoSalitre() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼の港。クレーンとコンテナの中景。 */}
      <rect width="400" height="210" fill="#a8bcc8" />
      <rect y="70" width="400" height="30" fill="#8fa8b8" />

      {/* 遠景:ガントリークレーンと船 */}
      <g stroke="#7f92a0" strokeWidth="4" fill="none" opacity="0.8">
        <path d="M28,100V44M62,100V44M14,44h62M14,44l10,-14" />
      </g>
      <path d="M36,44v16" stroke="#5f7280" strokeWidth="2" fill="none" opacity="0.8" />
      <rect x="10" y="86" width="110" height="14" fill="#7a6a5a" opacity="0.9" />
      <g opacity="0.9">
        <rect x="16" y="74" width="26" height="12" fill="#3f7f9a" />
        <rect x="46" y="74" width="26" height="12" fill="#c8a13f" />
        <rect x="76" y="74" width="26" height="12" fill="#4f9a5f" />
        <rect x="30" y="62" width="26" height="12" fill="#c8452f" />
      </g>

      {/* 中景:積まれたコンテナの山(右) */}
      <g>
        <rect x="298" y="66" width="34" height="17" fill="#8a5a9a" />
        <rect x="336" y="66" width="34" height="17" fill="#3f7f9a" />
        <rect x="316" y="49" width="34" height="17" fill="#c8452f" />
        <rect x="354" y="49" width="34" height="17" fill="#4f9a5f" />
        <rect x="298" y="83" width="34" height="17" fill="#c8a13f" />
        <rect x="336" y="83" width="34" height="17" fill="#5f6874" />
      </g>

      {/* 舗装 */}
      <rect y="100" width="400" height="110" fill="#9aa2a8" />
      <rect y="100" width="400" height="6" fill="#7f888e" />
      <path d="M0,168h150M244,168h156" stroke="#c8cdd2" strokeWidth="3" strokeDasharray="18 14" fill="none" opacity="0.7" />

      {/* 税関の詰め所(右) */}
      <rect x="284" y="112" width="64" height="52" fill="#e8e4d8" />
      <path d="M278,112h76l-7,-12h-62z" fill="#c8452f" />
      <rect x="292" y="124" width="16" height="14" fill="#5f7f96" />
      <rect x="322" y="124" width="16" height="40" fill="#4a5560" />
      {/* 窓口のカウンターと係官 */}
      <rect x="284" y="150" width="64" height="6" fill="#b8b4a8" />

      {/* コンテナトラック(左から来て停まっている) */}
      <g>
        <ellipse cx="120" cy="186" rx="86" ry="7" fill="#000" opacity="0.16" />
        <rect x="42" y="138" width="108" height="30" fill="#6b7278" />
        <rect x="46" y="126" width="100" height="26" fill="#b87333" />
        <rect x="46" y="126" width="100" height="5" fill="#8a5525" />
        <path d="M58,152v-20M78,152v-20M98,152v-20M118,152v-20M138,152v-20" stroke="#8a5525" strokeWidth="2" opacity="0.7" />
        <rect x="150" y="132" width="34" height="36" rx="3" fill="#3f6f9a" />
        <rect x="156" y="138" width="20" height="12" fill="#cfe4f0" />
        <g fill="#2f2b26">
          <circle cx="70" cy="172" r="8" />
          <circle cx="100" cy="172" r="8" />
          <circle cx="164" cy="172" r="8" />
        </g>
        <g fill="#8a8f92">
          <circle cx="70" cy="172" r="3" />
          <circle cx="100" cy="172" r="3" />
          <circle cx="164" cy="172" r="3" />
        </g>
      </g>

      {/* ゲートの支柱と、**下りたままのバー** */}
      <rect x="212" y="108" width="10" height="72" fill="#5f6874" />
      <rect x="209" y="104" width="16" height="8" rx="2" fill="#4a5560" />
      <g>
        <rect x="218" y="152" width="118" height="8" rx="4" fill="#e8443f" />
        <g fill="#f2f4f6">
          <rect x="232" y="152" width="16" height="8" />
          <rect x="264" y="152" width="16" height="8" />
          <rect x="296" y="152" width="16" height="8" />
        </g>
      </g>
      {/* バー先端の停止札。風でゆれる。 */}
      <g className="cis-tag">
        <path d="M330,160v10" stroke="#5f6874" strokeWidth="2" fill="none" />
        <rect x="322" y="170" width="16" height="12" rx="2" fill="#f5b31c" />
        <path d="M326,174h8M326,178h8" stroke="#33302c" strokeWidth="1.6" fill="none" />
      </g>

      {/* 係官。新しい査定書を突き出す。 */}
      <g>
        <ellipse cx="252" cy="196" rx="15" ry="4" fill="#000" opacity="0.18" />
        <g fill="#2f3a48">
          <rect x="246" y="180" width="5" height="16" rx="2" />
          <rect x="254" y="180" width="5" height="16" rx="2" />
        </g>
        <path d="M244,182l3,-26h11l3,26z" fill="#3f5f9f" />
        <circle cx="252" cy="148" r="7.4" fill="#c98f5f" />
        <path d="M244,147h16l-1,-4h-14z" fill="#2f3a48" />
        <path d="M244,162l-16,8" stroke="#3f5f9f" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
      {/* 突き出された査定書。数字が増えた紙。 */}
      <g className="cis-paper">
        <rect x="206" y="164" width="20" height="14" rx="1.6" fill="#f6f2e4" />
        <path d="M209,168h14M209,171h14M209,174h9" stroke="#8a8478" strokeWidth="1.2" fill="none" />
        <path d="M218,173h6" stroke="#c8452f" strokeWidth="2" fill="none" />
      </g>
      {/* スタンプ。何度でも押される。 */}
      <g className="cis-stamp">
        <rect x="286" y="140" width="10" height="8" rx="2" fill="#5a4630" />
        <rect x="284" y="147" width="14" height="3" rx="1" fill="#33302c" />
      </g>

      {/* 運転手。財布から札を出す。 */}
      <g>
        <ellipse cx="192" cy="200" rx="14" ry="4" fill="#000" opacity="0.18" />
        <g fill="#3f3428">
          <rect x="186" y="184" width="5" height="16" rx="2" />
          <rect x="194" y="184" width="5" height="16" rx="2" />
        </g>
        <path d="M184,186l3,-26h11l3,26z" fill="#e8443f" />
        <circle cx="192" cy="152" r="7.4" fill="#8a6a4a" />
        <path d="M185,150a8,8 0 0 1 15,0z" fill="#f5b31c" />
        <g className="cis-arm">
          <path d="M200,166l14,4" stroke="#e8443f" strokeWidth="5" strokeLinecap="round" fill="none" />
          <rect x="212" y="164" width="11" height="8" rx="1.4" fill="#6b5330" />
          <rect x="214" y="160" width="8" height="5" fill="#7fae8a" />
        </g>
      </g>

      <style>{`
        .cis-paper {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: cis-thrust 3.6s ease-in-out infinite;
        }
        @keyframes cis-thrust {
          0%, 100% { transform: translateX(10px) rotate(4deg); }
          40%, 70% { transform: translateX(0) rotate(0deg); }
        }
        .cis-stamp {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cis-stamp 3.6s ease-in-out infinite;
        }
        @keyframes cis-stamp {
          0%, 55%, 100% { transform: translateY(-8px) rotate(-8deg); }
          64%, 72% { transform: translateY(0) rotate(0deg); }
          80% { transform: translateY(-5px) rotate(-4deg); }
        }
        .cis-tag {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: cis-sway 2.8s ease-in-out infinite;
        }
        @keyframes cis-sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(6deg); }
        }
        .cis-arm {
          transform-box: fill-box;
          transform-origin: 0% 30%;
          animation: cis-pay 3.6s ease-in-out infinite;
        }
        @keyframes cis-pay {
          0%, 30%, 100% { transform: rotate(6deg) translateY(2px); }
          60%, 80% { transform: rotate(0deg) translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cis-paper, .cis-stamp, .cis-tag, .cis-arm { animation: none; }
          /* 書類は突き出され、スタンプは押された位置で止める。 */
          .cis-stamp { transform: translateY(0); transform-box: fill-box; transform-origin: 50% 100%; }
        }
      `}</style>
    </svg>
  );
}
