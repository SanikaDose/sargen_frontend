// components/textArea/TextArea.tsx
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import styles from './style.module.css';
import { TextAreaProps } from './TextArea.types';

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder = '',
  readOnly = false,
  toolbar = 'full',
}) => {
  const quillRef = useRef<Quill | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const toolbarOptions = {
      full: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
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

    const handler = () => {
      if (onChange) {
        const delta = quillRef.current?.getContents();
        onChange(JSON.stringify(delta));
      }
    };

    quillRef.current.on('text-change', handler);

    return () => {
      quillRef.current?.off('text-change', handler);
    };
  }, [onChange, placeholder, readOnly, toolbar]);

  useEffect(() => {
    if (quillRef.current && value) {
      try {
        const delta = JSON.parse(value);
        quillRef.current.setContents(delta);
      } catch {
        quillRef.current.setText(value);
      }
    }
  }, [value]);

  return (
    <div className={styles.richTextContainer}>
      <div ref={editorRef} style={{ height: '200px' }} />
    </div>
  );
};

export default TextArea;
