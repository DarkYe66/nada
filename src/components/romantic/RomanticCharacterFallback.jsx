export default function RomanticCharacterFallback({ phase = 'idle', facing = 'user' }) {
  return (
    <svg
      className={`romantic-fallback romantic-phase-${phase} romantic-facing-${facing}`}
      viewBox="0 0 220 340"
      role="img"
      aria-label="Personaje ilustrado con cabello rizado, camiseta verde y botas"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="character-skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd09b" />
          <stop offset="0.56" stopColor="#f2ad70" />
          <stop offset="1" stopColor="#df8954" />
        </linearGradient>
        <linearGradient id="character-hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#211c1b" />
          <stop offset="0.58" stopColor="#382a23" />
          <stop offset="1" stopColor="#1f1b1a" />
        </linearGradient>
        <linearGradient id="character-shirt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#77ce59" />
          <stop offset="0.55" stopColor="#55b84b" />
          <stop offset="1" stopColor="#399443" />
        </linearGradient>
        <linearGradient id="character-pants" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b606b" />
          <stop offset="1" stopColor="#383e49" />
        </linearGradient>
        <linearGradient id="character-boots" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a56d37" />
          <stop offset="0.6" stopColor="#80502b" />
          <stop offset="1" stopColor="#573722" />
        </linearGradient>
        <filter id="character-soft-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <ellipse cx="110" cy="326" rx="57" ry="9" fill="#352a2c" opacity="0.19" filter="url(#character-soft-shadow)" />

      {/* Each leg pivots at the hip for a compact, natural walk cycle. */}
      <g className="fallback-leg fallback-leg-left">
        <path d="M82 221 Q96 225 108 226 L103 277 Q101 291 98 300 L76 298 Q73 290 76 277Z" fill="url(#character-pants)" stroke="#343943" strokeWidth="2" />
        <path d="M77 250 Q88 256 103 252 M75 282 Q86 286 101 283 M83 233 L80 244" fill="none" stroke="#89909a" strokeWidth="2" opacity="0.42" />
        <path d="M76 293 Q87 299 100 294 L101 306 L99 313 Q91 317 69 314 Q63 313 65 308 L70 300Z" fill="url(#character-boots)" stroke="#573a26" strokeWidth="2" />
        <path d="M68 311 Q83 315 101 309 L103 316 Q88 321 65 317Z" fill="#493123" />
        <path d="M76 302 L91 304 M75 306 L90 308 M78 300 L76 309 M88 301 L87 310" fill="none" stroke="#e2bd88" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      <g className="fallback-leg fallback-leg-right">
        <path d="M111 226 Q125 223 139 220 L146 276 Q149 291 145 299 L123 300 Q119 291 117 277Z" fill="url(#character-pants)" stroke="#343943" strokeWidth="2" />
        <path d="M116 249 Q130 254 144 249 M120 282 Q133 286 147 282 M137 233 L141 245" fill="none" stroke="#89909a" strokeWidth="2" opacity="0.42" />
        <path d="M123 294 Q136 299 147 293 L153 301 L158 309 Q160 314 153 316 Q131 319 119 313 L119 306Z" fill="url(#character-boots)" stroke="#573a26" strokeWidth="2" />
        <path d="M120 311 Q136 316 157 309 L160 316 Q140 322 119 317Z" fill="#493123" />
        <path d="M128 302 L143 304 M129 306 L145 308 M131 300 L130 309 M141 301 L141 310" fill="none" stroke="#e2bd88" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Neck and relaxed left arm. */}
      <path d="M95 111 L95 143 Q109 155 125 142 L123 109Z" fill="url(#character-skin)" />
      <path d="M97 128 Q110 137 123 128" fill="none" stroke="#c57a4d" strokeWidth="2" opacity="0.58" />
      <g className="fallback-arm-left">
        <path d="M75 146 Q64 150 62 164 L56 190 Q53 201 59 207 Q66 210 70 200 L79 176 L88 157Z" fill="url(#character-skin)" stroke="#cb8152" strokeWidth="1.5" />
        <path d="M57 196 Q62 199 68 197 L67 211 Q63 218 57 214 Q52 208 57 196Z" fill="url(#character-skin)" />
        <path d="M56 209 L53 216 M61 211 L59 218 M65 210 L64 216" stroke="#bd7047" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Green short-sleeve shirt, collar, placket, pocket and soft fabric folds. */}
      <path d="M76 141 Q87 132 100 134 L110 142 L122 134 Q138 134 151 145 L161 218 Q146 232 110 235 Q75 233 60 219 L67 161 Q68 149 76 141Z" fill="url(#character-shirt)" stroke="#388341" strokeWidth="2" />
      <path d="M75 145 Q65 147 62 159 L57 173 Q68 181 83 174 L91 151Z" fill="#54b54b" stroke="#398c40" strokeWidth="2" />
      <path d="M145 145 Q156 148 160 159 L166 174 Q154 181 140 174 L132 151Z" fill="#51b249" stroke="#398c40" strokeWidth="2" />
      <path d="M97 138 L110 149 L123 137 L119 154 L110 162 L101 154Z" fill="#348b3e" stroke="#2f7939" strokeWidth="1.5" />
      <path d="M101 140 L110 149 L119 140" fill="none" stroke="#b3e394" strokeWidth="2" strokeLinecap="round" />
      <path d="M110 161 L110 204" stroke="#319044" strokeWidth="2" opacity="0.65" />
      <circle cx="114" cy="171" r="2" fill="#b4dc83" />
      <circle cx="114" cy="183" r="2" fill="#b4dc83" />
      <path d="M76 169 L94 169 L94 188 Q85 190 76 187Z" fill="#62bc51" stroke="#398c40" strokeWidth="1.5" />
      <path d="M78 173 Q85 175 92 173" fill="none" stroke="#a4df79" strokeWidth="1.5" opacity="0.8" />
      <path d="M70 191 Q77 195 87 194 M141 190 Q149 195 154 191 M77 212 Q85 216 93 215 M143 211 Q135 217 127 215" fill="none" stroke="#a4dd80" strokeWidth="2" opacity="0.55" />
      <path d="M65 217 Q108 231 156 217 L155 233 Q111 246 67 233Z" fill="#419943" opacity="0.9" />
      <path d="M68 222 Q109 235 151 222" fill="none" stroke="#9cda73" strokeWidth="1.5" opacity="0.6" />

      {/* Forearms and hands at rest; the right arm has a matching kiss pose. */}
      <g className="fallback-arm-right fallback-arm-rest">
        <path d="M160 173 Q165 185 166 197 Q168 205 162 209 Q156 211 153 203 L149 184 L145 176Z" fill="url(#character-skin)" stroke="#ca7d4e" strokeWidth="1.5" />
        <path d="M155 199 Q160 201 166 198 L166 211 Q163 218 157 215 Q152 211 155 199Z" fill="url(#character-skin)" />
        <path d="M156 211 L155 217 M161 212 L161 219 M165 210 L167 216" stroke="#bd7047" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g className="fallback-arm-right fallback-arm-kiss">
        <path d="M145 151 Q157 151 163 160 L168 174 Q157 182 143 176 L135 160Z" fill="#51b249" stroke="#398c40" strokeWidth="2" />
        <path d="M161 173 Q164 162 157 153 L143 136 L135 128 Q130 123 126 127 Q122 131 128 138 L143 159 Q148 169 153 179Z" fill="url(#character-skin)" stroke="#ca7d4e" strokeWidth="1.7" />
        <path d="M130 132 Q124 126 121 119 Q119 113 123 111 Q127 109 131 116 L137 125 Q140 118 144 119 Q148 120 145 126 L141 136 Q137 143 132 139Z" fill="url(#character-skin)" stroke="#c47b50" strokeWidth="1.3" />
        <path d="M124 115 L131 125 M129 113 L136 124 M140 123 L137 131" fill="none" stroke="#bd7047" strokeWidth="1.3" strokeLinecap="round" />
      </g>

      {/* Short, softly curled hair frames the face without hiding it. */}
      <path d="M67 75 Q57 61 63 45 Q59 34 71 28 Q75 14 89 20 Q97 8 108 17 Q120 7 129 20 Q145 14 151 31 Q165 39 156 55 Q162 69 151 84 L153 107 Q149 124 137 129 L130 111 L79 115 L71 131 Q57 122 61 104Z" fill="url(#character-hair)" stroke="#211a18" strokeWidth="2" />
      <path d="M67 48 Q68 34 80 33 Q83 20 94 26 Q103 14 111 26 Q121 15 130 28 Q143 22 148 39 Q157 45 150 58 Q143 48 134 51 Q126 62 113 60 Q100 61 91 53 Q80 60 70 58Z" fill="url(#character-hair)" stroke="#211a18" strokeWidth="2" />
      <path d="M76 33 Q81 24 88 31 Q91 39 83 42 M96 25 Q103 20 107 29 Q108 37 101 39 M117 25 Q125 21 129 30 Q130 37 123 40 M137 34 Q145 30 148 39 Q148 46 141 48" fill="none" stroke="#76604c" strokeWidth="2.6" strokeLinecap="round" opacity="0.76" />

      {/* Expressive face with warm eyes, brows, a natural smile and light blush. */}
      <g className="fallback-head">
        <path d="M76 58 Q80 36 107 34 Q134 34 144 58 L141 91 Q139 112 122 123 Q110 131 97 123 Q79 112 77 91Z" fill="url(#character-skin)" stroke="#c87b50" strokeWidth="1.5" />
        <path d="M77 72 Q69 69 68 78 Q69 88 78 90 M143 72 Q151 69 152 78 Q151 88 142 90" fill="url(#character-skin)" stroke="#c57a4d" strokeWidth="1.5" />
        <ellipse cx="83" cy="93" rx="8" ry="4.5" fill="#db6d62" opacity="0.18" />
        <ellipse cx="136" cy="93" rx="8" ry="4.5" fill="#db6d62" opacity="0.18" />
        <path d="M82 70 Q91 65 100 69 M119 69 Q128 65 137 70" fill="none" stroke="#38241f" strokeWidth="2.7" strokeLinecap="round" />
        <g className="fallback-eyes-open">
          <path d="M82 79 Q91 73 101 79 Q98 89 91 89 Q85 88 82 79Z" fill="#fff8e9" />
          <path d="M118 79 Q127 73 137 79 Q134 88 128 89 Q120 89 118 79Z" fill="#fff8e9" />
          <g className="fallback-pupils">
            <ellipse cx="93" cy="82" rx="3.6" ry="5.3" fill="#4a3026" />
            <ellipse cx="127" cy="82" rx="3.6" ry="5.3" fill="#4a3026" />
            <circle cx="94" cy="80" r="1.5" fill="#fff" />
            <circle cx="128" cy="80" r="1.5" fill="#fff" />
          </g>
          <path d="M82 79 Q91 73 101 79 M118 79 Q127 73 137 79" fill="none" stroke="#3b2922" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g className="fallback-eyes-closed" fill="none" stroke="#55372c" strokeWidth="2.4" strokeLinecap="round">
          <path d="M83 82 Q92 88 101 82 M119 82 Q128 88 136 82" />
        </g>
        <path d="M110 82 Q106 90 109 93" fill="none" stroke="#c77b50" strokeWidth="1.8" strokeLinecap="round" />
        <path className="fallback-mouth-neutral" d="M100 103 Q110 109 120 103" fill="none" stroke="#9b4e45" strokeWidth="2.5" strokeLinecap="round" />
        <path className="fallback-mouth-smile" d="M98 101 Q110 115 122 101 Q111 107 98 101Z" fill="#a74f47" stroke="#874039" strokeWidth="1.3" strokeLinejoin="round" />
        <path className="fallback-mouth-kiss" d="M105 103 Q108 99 111 103 Q115 99 118 103 Q118 108 111 111 Q105 108 105 103Z" fill="#a84d47" />

        {/* Forehead curls keep the same silhouette while the head turns. */}
        <path d="M69 68 Q63 53 72 44 Q76 34 86 39 Q93 30 101 38 Q109 29 117 37 Q126 31 133 40 Q144 36 151 50 Q155 61 148 72 Q141 57 132 57 Q124 67 112 63 Q99 66 91 58 Q79 68 69 68Z" fill="url(#character-hair)" stroke="#211a18" strokeWidth="1.8" />
        <path d="M75 49 Q81 39 87 47 M96 42 Q103 35 108 44 M119 42 Q126 36 131 45 M138 47 Q144 42 147 52" fill="none" stroke="#79634e" strokeWidth="2.3" strokeLinecap="round" opacity="0.76" />
      </g>
    </svg>
  );
}
