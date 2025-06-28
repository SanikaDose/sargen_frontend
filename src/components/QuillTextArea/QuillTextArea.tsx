// components/QuillTextArea/QuillTextArea.tsx
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useEffect, useRef } from 'react';
import styles from './style.module.css';
import { QuillTextAreaProps } from './QuillTextArea.types';

const QuillTextArea: React.FC<QuillTextAreaProps> = ({ value, onChange, placeholder = '', readOnly = false, toolbar = 'full' }) => {
  const quillRef = useRef<Quill | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!editorRef.current || !toolbarRef.current || initializedRef.current) return;

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
        toolbar: {
          container: toolbarRef.current,
          handlers: {},
        },
        clipboard: { matchVisual: false },
      },
    });

    // Manually add toolbar options to the custom toolbar
    const quillToolbarModule = quillRef.current.getModule('toolbar');
    if (quillToolbarModule && toolbarOptions[toolbar]) {
      // The toolbar is now controlled by our custom container
    }

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
      {/* Fixed toolbar at top */}
      <div ref={toolbarRef} className={styles.customToolbar}>
        <span className="ql-formats">
          <select className="ql-header">
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="">Normal</option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
          <button className="ql-strike"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
        </span>
        <span className="ql-formats">
          <select className="ql-color"></select>
          <select className="ql-background"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-link"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-clean"></button>
        </span>
      </div>

      {/* Scrollable editor area */}
      <div className={styles.editorWrapper}>
        <div ref={editorRef} className={styles.editor} />
      </div>
    </div>
  );
};

export default QuillTextArea;
