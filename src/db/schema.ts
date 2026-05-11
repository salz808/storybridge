import { pgTable, text, timestamp, uuid, jsonb, boolean } from 'drizzle-orm/pg-core';

export const churches = pgTable('churches', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  logoUrl: text('logo_url'),
  
  // Parking to Pew content
  parkingTitle: text('parking_title').default('Arriving & Parking'),
  parkingDescription: text('parking_description'),
  parkingImageUrl: text('parking_image_url'),
  
  enteringTitle: text('entering_title').default('Entering the Building'),
  enteringDescription: text('entering_description'),
  enteringImageUrl: text('entering_image_url'),
  
  kidsTitle: text('kids_title').default('Kids Check-In'),
  kidsDescription: text('kids_description'),
  kidsImageUrl: text('kids_image_url'),
  
  seatingTitle: text('seating_title').default('Finding a Seat'),
  seatingDescription: text('seating_description'),
  seatingImageUrl: text('seating_image_url'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const visitors = pgTable('visitors', {
  id: uuid('id').defaultRandom().primaryKey(),
  churchId: uuid('church_id').references(() => churches.id).notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  visitDate: text('visit_date'),
  kidsInfo: text('kids_info'),
  status: text('status').default('pending'), // pending, visited, etc.
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const stories = pgTable('stories', {
  id: uuid('id').defaultRandom().primaryKey(),
  churchId: uuid('church_id').references(() => churches.id).notNull(),
  type: text('type').notNull(), // 'text' | 'video'
  content: text('content'), // rich text content if type is 'text'
  videoUrl: text('video_url'), // URL if type is 'video'
  transcript: text('transcript'),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  tags: jsonb('tags').$type<string[]>(),
  status: text('status').default('pending').notNull(), // 'pending' | 'approved' | 'featured' | 'archived'
  consent: boolean('consent').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const chmsSettings = pgTable('chms_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  churchId: uuid('church_id').references(() => churches.id).notNull().unique(),
  provider: text('provider').notNull(), // 'pco' | 'ccb'
  config: jsonb('config').notNull(), // API keys, tokens, client IDs
  mappings: jsonb('mappings').notNull(), // Event to workflow mapping
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const syncLogs = pgTable('sync_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  churchId: uuid('church_id').references(() => churches.id).notNull(),
  entityType: text('entity_type').notNull(), // 'visitor' | 'story'
  entityId: uuid('entity_id').notNull(),
  status: text('status').notNull(), // 'success' | 'error' | 'manual_review'
  details: text('details'),
  provider: text('provider').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
