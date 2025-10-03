import Image from 'next/image';

export default function Logo({ width = 200, height, className = '', darkMode = false }) {
  // Calculate height based on width to maintain aspect ratio
  // Assuming original logo ratio is approximately 2:1 (width:height)
  const calculatedHeight = height || Math.round(width * 0.4);

  return (
    <div className={`logo-container ${className}`} style={{
      display: 'inline-block',
      padding: '10px',
      backgroundColor: darkMode ? '#3a3a3a' : 'white',
      borderRadius: '15px',
      boxShadow: darkMode ? '0 8px 25px rgba(0, 0, 0, 0.5)' : '0 8px 25px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s ease'
    }}>
      <Image
        src={darkMode ? '/logo-dark.jpg' : '/logo.jpg'}
        alt="Company Logo"
        width={width}
        height={calculatedHeight}
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
