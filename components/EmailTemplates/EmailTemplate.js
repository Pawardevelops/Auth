// EmailTemplate.js
import React from 'react';

const EmailTemplate = ({ link, typeOfAction }) => {
  return (
    <div style={{ backgroundColor: '#e9ecef', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        {/* Logo Section */}
        <div style={{ textAlign: 'center', padding: '36px 24px' }}>
          <img
            src={link}
            alt="Logo"
            style={{ width: '48px' }}
          />
        </div>

        {/* Hero Section */}
        <div style={{ padding: '36px 24px 0', borderTop: '3px solid #d4dadf' }}>
          <h1 style={{ margin: '0', fontSize: '32px', fontWeight: '700', lineHeight: '48px' }}>
            Confirm Your Email Address
          </h1>
        </div>

        {/* Copy Block */}
        <div style={{ padding: '24px', backgroundColor: '#ffffff' }}>
          <p>
            Tap the button below to confirm your email address. If you didn't create an account, you
            can safely delete this email.
          </p>
        </div>

        {/* Button */}
        <div style={{ textAlign: 'center', padding: '12px' }}>
          <a
            href={link}
            target="_blank"
            style={{
              display: 'inline-block',
              padding: '16px 36px',
              fontFamily: 'Source Sans Pro, Helvetica, Arial, sans-serif',
              fontSize: '16px',
              color: '#ffffff',
              backgroundColor: '#1a82e2',
              borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            Do Something Sweet
          </a>
        </div>

        {/* Copy Block */}
        <div style={{ padding: '24px', backgroundColor: '#ffffff' }}>
          <p>
            If that doesn't work, copy and paste the following link in your browser:
            <a href={link} target="_blank">
              {link}
            </a>
          </p>
        </div>

        {/* Copy Block */}
        <div style={{ padding: '24px', backgroundColor: '#ffffff', borderBottom: '3px solid #d4dadf' }}>
          <p>
            Cheers,
            <br />
            Paste
          </p>
        </div>

        {/* Footer Section */}
        <div style={{ padding: '24px' }}>
          <p>
            You received this email because we received a request for {typeOfAction} for your
            account. If you didn't request {typeOfAction}, you can safely delete this email.
          </p>
          <p>
            To stop receiving these emails, you can <a href="https://www.airender.co">unsubscribe</a>
            at any time.
          </p>
          <p>Paste 1234 S. Broadway St. City, State 12345</p>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;
