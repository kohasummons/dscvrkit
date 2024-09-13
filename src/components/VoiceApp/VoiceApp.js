'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function VoiceApp() {
  const circleRef = useRef(null)
  const [audioContext, setAudioContext] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const [words, setWords] = useState([])
  const animationRef = useRef(null)
  const recognitionRef = useRef(null)

  const setupAudio = async () => {
    let context = audioContext
    if (!context) {
      context = new (window.AudioContext || window.webkitAudioContext)()
      setAudioContext(context)
    }

    const analyser = context.createAnalyser()
    analyser.fftSize = 1024
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const source = context.createMediaStreamSource(stream)
      source.connect(analyser)

      const animateCircle = () => {
        if (!isListening) return

        analyser.getByteFrequencyData(dataArray)
        
        const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength
        const volume = Math.log(average + 1) / Math.log(256)

        // Adjust the scale factor to make the pulse calmer for low voices
        const scaleFactor = 0.5 + volume * 0.5 // This will range from 0.5 to 1 based on volume

        gsap.to(circleRef.current, {
          scale: scaleFactor,
          duration: 0.1,
          ease: 'power2.out',
        })

        animationRef.current = requestAnimationFrame(animateCircle)
      }

      animateCircle()
    } catch (err) {
      console.error('Error accessing microphone:', err)
    }
  }

  const setupSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser')
      return
    }

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true

    recognitionRef.current.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1]
      if (lastResult.isFinal) {
        const newWord = lastResult[0].transcript.trim()
        setWords(prevWords => {
          const updatedWords = [...prevWords, { text: newWord, id: Date.now() }]
          return updatedWords.slice(-10) // Keep only the last 10 words
        })
      }
    }

    recognitionRef.current.start()
  }

  const handleStartListening = async () => {
    if (audioContext && audioContext.state === 'suspended') {
      await audioContext.resume()
    }
    setIsListening(true)
    setWords([])
    setupSpeechRecognition()
  }

  const handleStopListening = () => {
    setIsListening(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  useEffect(() => {
    if (isListening) {
      setupAudio()
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (audioContext) {
        audioContext.close()
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [isListening, audioContext])

  useEffect(() => {
    // Remove words after 3 seconds
    const timer = setInterval(() => {
      setWords(prevWords => prevWords.filter(word => Date.now() - word.id < 3000))
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-black">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div
          ref={circleRef}
          className="w-32 h-32 bg-white rounded-full mb-8"
        ></div>
        <div className="w-full max-w-2xl h-32 overflow-hidden text-white text-center">
          {words.map(word => (
            <span key={word.id} className="inline-block mx-1 animate-fade-out">
              {word.text}
            </span>
          ))}
        </div>
      </div>
      <div className="w-full max-w-md">
        {!isListening ? (
          <button
            onClick={handleStartListening}
            className="w-full bg-green-500 text-white text-xl font-bold py-4 px-6 rounded-full hover:bg-green-600 transition-colors duration-300 shadow-lg"
          >
            Start Listening
          </button>
        ) : (
          <button
            onClick={handleStopListening}
            className="w-full bg-red-500 text-white text-xl font-bold py-4 px-6 rounded-full hover:bg-red-600 transition-colors duration-300 shadow-lg"
          >
            Stop Listening
          </button>
        )}
      </div>
    </main>
  )
}
