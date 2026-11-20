export interface CompanyProfile {
  name: string
  kraPin: string
  email: string
  phone: string
  county: string
  address: string
}

export interface NotificationPreferences {
  orderConfirmations: boolean
  lowStock: boolean
  deliveryDelays: boolean
  weeklySummary: boolean
}

export interface SettingsValues {
  profile: CompanyProfile
  notifications: NotificationPreferences
}

export type ProfileErrors = Partial<Record<keyof CompanyProfile, string>>

export const settingsCounties = ['Nairobi', 'Kiambu', 'Mombasa', 'Nakuru', 'Kisumu']

export const notificationOptions: {
  key: keyof NotificationPreferences
  label: string
  description: string
}[] = [
  {
    key: 'orderConfirmations',
    label: 'Order confirmations',
    description: 'Email the account owner when a customer order is confirmed.',
  },
  {
    key: 'lowStock',
    label: 'Low stock alerts',
    description: 'Send an SMS when a product falls below its reorder level.',
  },
  {
    key: 'deliveryDelays',
    label: 'Delivery delays',
    description: 'Notify the operations team when a route is running late.',
  },
  {
    key: 'weeklySummary',
    label: 'Weekly sales summary',
    description: 'Email a sales and margin summary every Monday at 08:00.',
  },
]

export const defaultSettings: SettingsValues = {
  profile: {
    name: 'Green Basket Ltd',
    kraPin: 'P051234567Q',
    email: 'accounts@greenbasket.co.ke',
    phone: '+254 712 340 118',
    county: 'Nairobi',
    address: '14 Market Road, Westlands, Nairobi',
  },
  notifications: {
    orderConfirmations: true,
    lowStock: true,
    deliveryDelays: false,
    weeklySummary: true,
  },
}

export function cloneSettings(values: SettingsValues): SettingsValues {
  return { profile: { ...values.profile }, notifications: { ...values.notifications } }
}

export function settingsEqual(a: SettingsValues, b: SettingsValues) {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function validateProfile(profile: CompanyProfile): ProfileErrors {
  const errors: ProfileErrors = {}
  if (!profile.name.trim()) errors.name = 'Enter the company name.'
  if (!/^[A-Z]\d{9}[A-Z]$/.test(profile.kraPin.trim().toUpperCase()))
    errors.kraPin = 'Enter an 11-character KRA PIN, such as P051234567Q.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim()))
    errors.email = 'Enter an email address, such as accounts@company.co.ke.'
  return errors
}
