import React, { useState } from 'react'
import Button from '../common/Button'

interface LivePreviewProps {
  themeId: string
  images: string[]
  albumTitle?: string
}

const LivePreview: React.FC<LivePreviewProps> = ({
  themeId,
  images,
  albumTitle = 'My Photography Album',
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const isDark = themeId === 'dark'
  const isVibrant = themeId === 'vibrant'

  const content = (
    <div
      className={`
        w-full flex flex-col transition-colors duration-500
        ${isFullScreen ? 'fixed inset-0 z-50 overflow-y-auto' : 'h-[500px] border rounded-lg overflow-hidden shadow-2xl'}
        ${
          isDark
            ? 'bg-gray-950 text-white'
            : isVibrant
              ? 'bg-orange-50 text-gray-900'
              : 'bg-white text-gray-900'
        }
      `}
    >
      {/* Browser-like Header (only in mini-view) */}
      {!isFullScreen && (
        <div
          className={`px-4 py-2 border-b flex items-center justify-between gap-2 ${
            isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'
          }`}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div
            className={`px-3 py-0.5 rounded text-[10px] flex-1 max-w-xs truncate ${
              isDark ? 'bg-gray-800 text-gray-500' : 'bg-white text-gray-400 border border-gray-100'
            }`}
          >
            https://omnichannel.ai/album/preview
          </div>
          <button
            onClick={() => setIsFullScreen(true)}
            className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter hover:underline"
          >
            Full Screen
          </button>
        </div>
      )}

      {/* Full Screen Close Button */}
      {isFullScreen && (
        <button
          onClick={() => setIsFullScreen(false)}
          className="fixed top-6 right-6 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Hero Section */}
      <div className={`${isFullScreen ? 'py-32' : 'py-12'} px-8 text-center`}>
        <h1 className={`${isFullScreen ? 'text-6xl' : 'text-3xl'} font-serif tracking-tight mb-4 italic`}>
          {albumTitle}
        </h1>
        <div
          className={`w-12 h-0.5 mx-auto ${
            isDark ? 'bg-gray-700' : isVibrant ? 'bg-orange-400' : 'bg-gray-300'
          }`}
        />
      </div>

      {/* Gallery Grid */}
      <div className={`flex-1 p-8 ${!isFullScreen ? 'overflow-y-auto' : ''}`}>
        <div className={`max-w-7xl mx-auto ${images.length > 0 ? '' : 'h-64'}`}>
          {images.length > 0 ? (
            <div className={`grid gap-8 ${isFullScreen ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3'}`}>
              {images.map((img, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl group relative"
                >
                  <img
                    src={img}
                    alt={`Album ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-400 italic">
              <svg className="w-10 h-10 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              No images uploaded yet
            </div>
          )}
        </div>

        {/* Story Section */}
        <div className={`${isFullScreen ? 'mt-32 pb-32' : 'mt-16 pb-8'} max-w-2xl mx-auto text-center space-y-6`}>
          <div
            className={`h-px w-full ${
              isDark ? 'bg-gray-800' : isVibrant ? 'bg-orange-100' : 'bg-gray-100'
            }`}
          />
          <p
            className={`font-serif italic leading-relaxed ${isFullScreen ? 'text-2xl' : 'text-sm'} ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            "Every picture tells a story, a moment frozen in time. Captured with passion and
            curated for your eyes only."
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`p-10 text-center text-xs tracking-widest uppercase ${
          isDark ? 'text-gray-600 border-t border-gray-900' : 'text-gray-300 border-t border-gray-50'
        }`}
      >
        © 2026 {albumTitle} • Created with Omni-Channel
      </div>
    </div>
  )

  return <>{content}</>
}

export default LivePreview
