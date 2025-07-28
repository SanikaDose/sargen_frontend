'use client';

import { useState, useRef, useEffect } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import './CustomAudioRecorder.css';

const CustomAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer for recording duration
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (!audioURL) {
        setRecordingTime(0);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, audioURL]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          noiseSuppression: true,
          echoCancellation: true,
          autoGainControl: true,
        },
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);

        // Stop all tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const togglePlay = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!audioRef.current || !audioURL) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const deleteRecording = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    setAudioURL(null);
    setIsPlaying(false);
    setDuration(0);
    setRecordingTime(0);
  };

  const downloadRecording = () => {
    if (!audioURL) return;

    const link = document.createElement('a');
    link.href = audioURL;
    link.download = `recording-${new Date().toISOString().slice(0, 19)}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="audio-recorder-container">
      <div className="recording-section">
        {isRecording && (
          <div className="recording-indicator">
            <div className={`recording-dot ${isRecording ? 'blinking' : ''}`}></div>
            <span style={{ color: 'black' }}>Recording...</span>
          </div>
        )}

        <button
          className={`record-button ${isRecording ? 'recording' : 'ready'}`}
          onClick={isRecording ? stopRecording : startRecording}
          title={isRecording ? 'Stop Recording' : 'Start Recording'}
        >
          {isRecording ? <MicOffIcon fontSize="large" /> : <MicIcon fontSize="large" />}
        </button>

        <div className="time-display">{formatTime(recordingTime)}</div>
      </div>

      {audioURL && (
        <div className="audio-player">
          <div className="player-controls">
            <button className="control-button" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </button>

            <button className="control-button download-button" onClick={downloadRecording} title="Download Recording">
              <DownloadIcon />
            </button>

            <button className="control-button delete-button" onClick={deleteRecording} title="Delete Recording">
              <DeleteIcon />
            </button>
          </div>

          <div className={`waveform-placeholder ${isPlaying ? 'playing' : ''}`}></div>

          {/* <div className="status-text">{isPlaying ? 'Playing...' : 'Ready to play'}</div> */}

          <audio
            ref={audioRef}
            src={audioURL}
            onEnded={() => setIsPlaying(false)}
            onLoadedMetadata={() => {
              if (audioRef.current) {
                setDuration(Math.floor(audioRef.current.duration));
              }
            }}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </div>
  );
};

export default CustomAudioRecorder;
