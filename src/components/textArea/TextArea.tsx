// import Quill from 'quill';
// import 'quill/dist/quill.snow.css';
// import React, { useEffect, useRef } from 'react';
// import styles from './style.module.css';
// import { TextAreaProps } from './TextArea.types';

// const TextArea: React.FC<TextAreaProps> = ({ value, onChange, placeholder = '', readOnly = false }) => {
//   const quillRef = useRef<Quill | null>(null);
//   const editorRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!editorRef.current || quillRef.current) return;

//     quillRef.current = new Quill(editorRef.current, {
//       theme: 'snow',
//       placeholder,
//       readOnly,
//       modules: {
//         toolbar: false,
//         clipboard: { matchVisual: false },
//       },
//     });

//     console.log('value', value);

//     const handler = () => {
//       if (onChange && quillRef.current) {
//         const html = quillRef.current.root.innerHTML; // ← this is crucial
//         onChange(html); // ← pass this to justificationMap
//       }
//     };

//     quillRef.current.on('text-change', handler);

//     return () => {
//       quillRef.current?.off('text-change', handler);
//     };
//   }, [onChange, placeholder, readOnly, value]);

//   useEffect(() => {
//     if (quillRef.current && value !== quillRef.current.root.innerHTML) {
//       quillRef.current.root.innerHTML = value || '';
//     }
//   }, [value]);
//   console.log('value', value);

//   return (
//     <div className={styles.richTextContainer}>
//       <div ref={editorRef} style={{ height: '150px' }} />
//     </div>
//   );
// };

// export default TextArea;
import React from 'react';
import styles from './style.module.css';
import { TextAreaProps } from './TextArea.types';
import { log } from 'console';

const TextArea: React.FC<TextAreaProps> = ({ value, onChange, placeholder = '', readOnly = false }) => {
  console.log('value', value);
  return (
    <div className={styles.textAreaContainer}>
      <textarea
        className={styles.textArea}
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
          console.log('e.target.value', e.target.value);
        }}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={6}
      />
    </div>
  );
};

export default TextArea;
