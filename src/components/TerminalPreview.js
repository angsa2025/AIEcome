import { el } from '../utils/dom.js';

/**
 * @param {{ voiceExample: string }} props
 */
export function TerminalPreview({ voiceExample }) {
  return el('div', { className: 'terminals' },
    el('div', { className: 'terminal' },
      el('div', { className: 'terminal__header' },
        el('h3', { className: 'terminal__title' }, '📱 买家端 · AI 语音采购'),
        el('span', { className: 'terminal__tag' }, '核心交互')
      ),
      el('div', { className: 'terminal__body' },
        el('div', { className: 'mock-ui' },
          el('div', { className: 'mock-bar mock-bar--medium' }),
          el('div', { className: 'mock-bar mock-bar--short' }),
          el('div', { className: 'mock-voice' },
            el('div', { className: 'mock-mic', 'aria-hidden': 'true' }, '🎙'),
            el('span', { className: 'mock-voice__text' }, voiceExample)
          ),
          el('div', { className: 'mock-card-row' },
            el('div', { className: 'mock-card' }),
            el('div', { className: 'mock-card' }),
            el('div', { className: 'mock-card' })
          )
        )
      )
    ),
    el('div', { className: 'terminal' },
      el('div', { className: 'terminal__header' },
        el('h3', { className: 'terminal__title' }, '📊 公海比价结果页'),
        el('span', { className: 'terminal__tag' }, '智能排序')
      ),
      el('div', { className: 'terminal__body' },
        el('div', { className: 'mock-ui' },
          el('div', { className: 'mock-bar mock-bar--wide' }),
          el('div', { className: 'mock-bar mock-bar--medium' }),
          el('div', { className: 'mock-bar mock-bar--short' }),
          el('div', { className: 'mock-card-row', style: { marginTop: '16px' } },
            el('div', { className: 'mock-card mock-card--highlight' })
          ),
          el('div', { className: 'mock-card-row' },
            el('div', { className: 'mock-card mock-card--dim' })
          ),
          el('div', { className: 'mock-card-row' },
            el('div', { className: 'mock-card mock-card--dimmer' })
          )
        )
      )
    )
  );
}
