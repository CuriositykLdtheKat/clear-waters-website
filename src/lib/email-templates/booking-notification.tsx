import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  phone?: string
  businessName?: string
  preferredDate?: string
  preferredTime?: string
  message?: string
}

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, serif' }
const container = { padding: '28px 28px', maxWidth: '560px' }
const heading = { color: '#0f4c4c', fontSize: '22px', margin: '0 0 8px' }
const label = { color: '#6b7280', fontSize: '12px', margin: '12px 0 0', letterSpacing: '0.08em', textTransform: 'uppercase' as const }
const value = { color: '#111827', fontSize: '15px', margin: '2px 0 0' }

const Row = ({ title, text }: { title: string; text?: string }) =>
  text ? (
    <Section>
      <Text style={label}>{title}</Text>
      <Text style={value}>{text}</Text>
    </Section>
  ) : null

const Email = ({
  name,
  email,
  phone,
  businessName,
  preferredDate,
  preferredTime,
  message,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`New consultation request${name ? ` from ${name}` : ''}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New consultation request</Heading>
        <Text style={{ color: '#4b5563', fontSize: '14px', margin: '0' }}>
          Someone just submitted the booking form on Clear Waters Bookkeeping.
        </Text>
        <Hr style={{ borderColor: '#e5e7eb', margin: '20px 0' }} />
        <Row title="Name" text={name} />
        <Row title="Email" text={email} />
        <Row title="Phone" text={phone} />
        <Row title="Business" text={businessName} />
        <Row title="Preferred date" text={preferredDate} />
        <Row title="Preferred time" text={preferredTime} />
        <Row title="Message" text={message} />
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `New consultation request${data['name'] ? ` — ${data['name']}` : ''}`,
  displayName: 'Booking notification',
  to: 'info@clearwatersbookkeeping.com',
  previewData: {
    name: 'Jane Rivera',
    email: 'jane@rivera-design.com',
    phone: '(555) 201-8890',
    businessName: 'Rivera Design Co.',
    preferredDate: '2026-08-14',
    preferredTime: '10:00 AM',
    message: 'Behind on reconciliations for the last two quarters.',
  },
} satisfies TemplateEntry