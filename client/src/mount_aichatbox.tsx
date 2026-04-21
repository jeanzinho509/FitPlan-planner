import React from 'react';
import ReactDOM from 'react-dom/client';
import { AIChatBox } from './components/AIChatBox';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div style={{ padding: '2rem' }}>
    <AIChatBox
      messages={[]}
      onSendMessage={() => {}}
      suggestedPrompts={['Test Prompt 1', 'Test Prompt 2']}
    />
  </div>
);
