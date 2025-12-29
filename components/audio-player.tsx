"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface AudioPlayerProps {
  src: string
  title?: string
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = Number.parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handlePlaybackRateChange = () => {
    const audio = audioRef.current
    if (!audio) return

    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2]
    const currentIndex = rates.indexOf(playbackRate)
    const nextIndex = (currentIndex + 1) % rates.length
    const newRate = rates[nextIndex]

    audio.playbackRate = newRate
    setPlaybackRate(newRate)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = Number.parseFloat(e.target.value)
    audio.volume = newVolume
    setVolume(newVolume)
  }

  const skip = (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds))
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-primary/5 dark:bg-card border border-primary/10 dark:border-border rounded-xl p-6">
      <audio ref={audioRef} src={src} preload="metadata" />

      {title && (
        <div className="flex items-center gap-2 mb-4 text-sm text-text-muted">
          <span className="material-icons-outlined text-primary">headphones</span>
          <span>{title}</span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-text-muted mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Skip Back */}
          <button
            onClick={() => skip(-10)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background hover:bg-primary hover:text-white transition-colors text-text-muted"
            title="تراجع 10 ثواني"
          >
            <span className="material-icons-outlined">replay_10</span>
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlayPause}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover transition-colors shadow-lg"
          >
            <span className="material-icons-outlined text-3xl">{isPlaying ? "pause" : "play_arrow"}</span>
          </button>

          {/* Skip Forward */}
          <button
            onClick={() => skip(10)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background hover:bg-primary hover:text-white transition-colors text-text-muted"
            title="تقدم 10 ثواني"
          >
            <span className="material-icons-outlined">forward_10</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Playback Speed */}
          <button
            onClick={handlePlaybackRateChange}
            className="px-3 py-1 rounded-lg bg-background text-sm font-medium text-text-muted hover:bg-primary hover:text-white transition-colors"
            title="سرعة التشغيل"
          >
            {playbackRate}x
          </button>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-text-muted">
              {volume === 0 ? "volume_off" : volume < 0.5 ? "volume_down" : "volume_up"}
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
