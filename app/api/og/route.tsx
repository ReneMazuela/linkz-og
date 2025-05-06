import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import React from 'react'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const username = searchParams.get('username') || 'user'
  const avatar = searchParams.get('avatar') || 'https://linkz.gg/default-avatar.jpg'
  const background = searchParams.get('background') || 'https://l1.linkz.gg/assets/linkzbg.png'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Layer 1: Background image with lower opacity */}
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.8,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        />

        {/* Layer 2: Black overlay */}
        <div
          style={{
            backgroundColor: 'black',
            opacity: 0.85,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />

        {/* Layer 3: Foreground content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <img
            src={avatar}
            width={280}
            height={280}
            style={{
              borderRadius: '50%',
              border: '6px solid white',
              objectFit: 'cover',
            }}
          />
          <h1 style={{ fontSize: 78, marginTop: 30 }}>linkz.gg/{username}</h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
