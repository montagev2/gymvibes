export type Role = 'member' | 'trainer' | 'admin'

export type MembershipTier = 'none' | 'bronze' | 'silver' | 'gold_vip'

export interface MemberProfile {
  id: string
  name: string
  email: string
  phone: string
  role: Role
  membershipTier: MembershipTier
  membershipExpiry?: string
  qrPassCode?: string
  avatarUrl?: string
  pin?: string
  isBlocked?: boolean
  createdAt: string
}

export type MuscleGroup =
  | 'chest'
  | 'biceps'
  | 'triceps'
  | 'lats'
  | 'quads'
  | 'glutes'
  | 'abs'
  | 'shoulders'

export interface Exercise {
  id: string
  name: string
  targetMuscle: MuscleGroup
  difficulty: 'Beginner' | 'Intermediate' | 'Olympian'
  equipment: string
  description: string
  defaultSets: number
  defaultReps: string
  caloriesBurn: number
  tips: string[]
}

export interface WorkoutSet {
  setNumber: number
  weightKg: number
  reps: number
}

export interface WorkoutLog {
  id: string
  userId: string
  exerciseName: string
  targetMuscle: MuscleGroup
  sets: WorkoutSet[]
  notes?: string
  createdAt: string
}

export interface MembershipPlan {
  id: string
  tier: MembershipTier
  name: string
  tagline: string
  priceMonth: number
  priceAnnual: number
  badgeColor: string
  features: string[]
  isPopular?: boolean
}

export interface Trainer {
  id: string
  name: string
  specialty: string
  targetMuscleFocus: MuscleGroup[]
  experienceYears: number
  rating: number
  reviewsCount: number
  avatar: string
  bio: string
  hourlyFee: number
  availableSlots: string[]
}

export interface TrainerBooking {
  id: string
  userId: string
  trainerName: string
  slotTime: string
  targetFocus: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}
