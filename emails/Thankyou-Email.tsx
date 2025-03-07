import React from 'react';
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import jwt from 'jsonwebtoken';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `https://www.physiomedix.com`;

const secretKey = process.env.JWS_SECRET!


const ThankYouEmail = ({email} : {email: string}) => {

  const unsubscribeToken = jwt.sign({ email}, secretKey, { expiresIn: '7d' });

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Thank you for subscribing to PhysioMedix! Monthly newsletter</Preview>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Row>
              <Column style={headerContent}>
                <Heading style={headerContentTitle}>Thank You for Subscribing!</Heading>
              </Column>
            </Row>
          </Section>

          {/* Content */}
          <Section style={styleContent}>
            <Text style={paragraph}>
              Welcome to the PhysioMedix community! We&apos;re thrilled to have you on board.
              You&apos;ll receive regular updates, insights, and exclusive content straight to your inbox.
            </Text>
          </Section>

          {/* Read More */}
          <Section style={buttonContainer}>
            <Link style={button} href="https://www.physiomedix.com">Visit Our Platform</Link>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You’re receiving this email because you subscribed to PhysioMedix updates.
            </Text>
            <Link href={`${baseUrl}/unsubscribe?token=${unsubscribeToken}`} style={footerLink}>Unsubscribe</Link>
            <Hr style={footerDivider} />
            <Text style={footerAddress}><strong>PhysioMedix</strong>, Nairobi, Kenya</Text>
            <Text style={footerHeart}>{'<3'}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ThankYouEmail;

const main = {
  backgroundColor: '#f3f3f5',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
};
const container = {
  width: '680px',
  maxWidth: '100%',
  margin: '0 auto',
  backgroundColor: '#ffffff',
};
const logo = {
  display: 'flex',
  background: '#f3f3f5',
  padding: '20px 30px',
};
const header = {
  borderRadius: '5px 5px 0 0',
  display: 'flex',
  backgroundColor: '#2b2d6e',
};
const headerContent = { padding: '20px 30px 15px' };
const headerContentTitle = {
  color: '#fff',
  fontSize: '27px',
  fontWeight: 'bold',
};
const styleContent = { padding: '30px 30px 40px 30px' };
const paragraph = { fontSize: '15px', lineHeight: '21px', color: '#3c3f44' };
const buttonContainer = { marginTop: '24px', display: 'block', marginLeft: '14px' };
const button = {
  backgroundColor: '#0095ff',
  border: '1px solid #0077cc',
  fontSize: '17px',
  padding: '13px 17px',
  borderRadius: '4px',
  color: '#fff',
};
const footer = { width: '680px', maxWidth: '100%', margin: '32px auto', padding: '0 30px' };
const footerText = { fontSize: '12px', color: '#9199a1', margin: '0' };
const footerLink = { color: '#9199a1', textDecoration: 'underline', fontSize: '12px', marginRight: '10px' };
const footerDivider = { borderColor: '#d6d8db', margin: '30px 0' };
const footerAddress = { fontSize: '12px', color: '#9199a1' };
const footerHeart = { fontSize: '11px', color: '#e06c77', margin: '0 0 32px 0' };
