export interface Listing {
  id: string
  title: string
  slug: string
  type: "sale" | "rent"
  propertyType: string
  status: "available" | "sold" | "rented" | "pending"
  saleLable?: string
  price: number
  comparePrice?: number

  images: string[]
  description?: string

  location: Location

  features?: string[]
  specifications?: Specification[]

  agentId?: string
  featured: boolean
}

export interface Location {
  address?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  latitude?: number
  longitude?: number
}

export interface Specification {
  key: string
  value: string
}

export interface Agent {
  id: string
  name: string
  slug: string
  image?: string
  phone?: string
  email?: string
  whatsapp?: string
  bio?: string
  featured: boolean
}

export interface PropertyType {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  featured: boolean
}