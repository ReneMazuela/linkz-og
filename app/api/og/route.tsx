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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
        <h1 style={{ fontSize: 78, marginTop: 30 }}>{username}</h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
