// components/QuillTextArea/QuillTextArea.tsx
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useEffect, useRef } from 'react';
import styles from './style.module.css';
import { QuillTextAreaProps } from './QuillTextArea.types';

const QuillTextArea: React.FC<QuillTextAreaProps> = ({
  value,
  onChange,
  placeholder = '',
  readOnly = false,
  toolbar = 'full',
}) => {
  const quillRef = useRef<Quill | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!editorRef.current || initializedRef.current) return;

    const toolbarOptions = {
      full: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        ['link'],
        ['clean'],
      ],
    };

    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder,
      readOnly,
      modules: {
        toolbar: toolbarOptions[toolbar],
        clipboard: { matchVisual: false },
      },
    });

    // Set initial content
    if (value) {
      try {
        quillRef.current.root.innerHTML = value;
      } catch {
        quillRef.current.setText(value);
      }
    }

    quillRef.current.on('text-change', () => {
      const html = quillRef.current?.root.innerHTML;
      onChange?.(html || '');
    });

    initializedRef.current = true;
  }, [onChange, placeholder, readOnly, toolbar, value]);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div className={styles.richTextContainer}>
      <div ref={editorRef} style={{ flex: 1 }} />
    </div>
  );
};

export default QuillTextArea;
