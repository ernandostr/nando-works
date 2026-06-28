import { useState, useEffect, useRef } from 'react';
import styles from './PasswordModal.module.css';

export default function PasswordModal({ onUnlock, onDismiss }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onDismiss(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDismiss]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onUnlock(value);
    if (!success) {
      setError(true);
      setShake(true);
      setValue('');
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onDismiss}>
      <div
        className={`${styles.card} ${shake ? styles.shake : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="https://media1.tenor.com/m/CFEyyN92GaYAAAAC/clippy-head-scratch.gif"
          alt="Clippy thinking"
          className={styles.gif}
        />
        <p className={styles.eyebrow}>Protected Portfolio</p>
        <p className={styles.body}>
          This portfolio is protected with a password. If you want exclusive access,
          ask the password to Fernando via{' '}
          <a
            href="https://www.linkedin.com/in/fernandostr/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            LinkedIn
          </a>
          .
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="Enter password"
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            autoComplete="off"
          />
          <button type="submit" className={styles.button}>
            Unlock
          </button>
        </form>

        {error && (
          <p className={styles.errorMsg}>Incorrect password. Try again.</p>
        )}
      </div>
    </div>
  );
}
