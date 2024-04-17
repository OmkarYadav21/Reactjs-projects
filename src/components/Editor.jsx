import React, { useRef, useEffect } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import Codemirror from 'codemirror';
import ACTIONS from "../Actions";

const Editor = ({socketRef, roomID, onCodeChange}) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const initEditor = () => {
      const textarea = document.getElementById('realtimeEditor');
      if (textarea) {
        editorRef.current = Codemirror.fromTextArea(textarea, {
          mode: { name: 'javascript', json: true },
          theme: 'dracula',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        });
      }
      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes;
        console.log('changes', changes);
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomID,
            code,
          });
        }
      });
    };
    initEditor();

    // Cleanup function
    return () => {
      editorRef.current.toTextArea(); // Remove CodeMirror instance
    };
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
      }
    };
  }, [socketRef.current]);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
