import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Udawalawe Safari by Nuwan'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #052e16, #064e3b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '40px',
            padding: '60px',
            width: '100%',
            height: '100%',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.udawalawasafari.lk/logo.png"
            alt="Logo"
            width={180}
            height={180}
            style={{
              borderRadius: '90px',
              border: '4px solid rgba(16, 185, 129, 0.8)',
              marginBottom: '40px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          />
          
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 20px 0',
              textAlign: 'center',
              lineHeight: 1.1,
              textShadow: '0 4px 10px rgba(0,0,0,0.5)',
            }}
          >
            Udawalawe Safari <span style={{ color: '#10b981', marginLeft: '16px' }}>by Nuwan</span>
          </h1>
          
          <p
            style={{
              fontSize: '32px',
              color: '#a7f3d0',
              margin: '0 0 40px 0',
              textAlign: 'center',
              fontWeight: 500,
              maxWidth: '800px',
            }}
          >
            #1 Rated Wildlife Jeep Tours & Guaranteed Elephant Sightings in Sri Lanka
          </p>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 24px', backgroundColor: 'rgba(245, 158, 11, 0.2)', borderRadius: '20px', color: '#f59e0b', fontSize: '24px', fontWeight: 'bold' }}>
              ⭐ 5-Star Rated Guide
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 24px', backgroundColor: 'rgba(16, 185, 129, 0.2)', borderRadius: '20px', color: '#10b981', fontSize: '24px', fontWeight: 'bold' }}>
              🐘 Custom 4x4 Jeeps
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
