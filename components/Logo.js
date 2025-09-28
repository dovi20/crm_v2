import Image from 'next/image';

export default function Logo({ width = 200, height = 100, className = '' }) {
  return (
    <div className={`logo-container ${className}`} style={{
      display: 'inline-block',
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s ease'
    }}>
      <Image
        src="/logo.jpg"
        alt="Company Logo"
        width={width}
        height={height}
        priority
        style={{
          objectFit: 'contain',
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '8px'
        }}
      />
    </div>
  );
}
