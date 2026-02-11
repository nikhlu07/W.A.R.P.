import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Copy, Check } from 'lucide-react';
import './CodeBlock.css';

export default function CodeBlock({ code, language = 'javascript', showLineNumbers = true }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const customStyle = {
    margin: 0,
    padding: '24px',
    background: '#FFFFFF',
    fontSize: '13px',
    lineHeight: '1.6',
    fontFamily: "'JetBrains Mono', monospace",
    border: '2px solid #050505',
    borderRadius: 0,
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-block-language">{language.toUpperCase()}</span>
        <button onClick={handleCopy} className="code-block-copy">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'COPIED' : 'COPY'}</span>
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={{}}
        customStyle={customStyle}
        showLineNumbers={showLineNumbers}
        lineNumberStyle={{
          minWidth: '3em',
          paddingRight: '1em',
          color: '#999',
          userSelect: 'none'
        }}
        wrapLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
