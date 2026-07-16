export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  token?: string;
}

export interface TouristSpot {
  id?: number;
  title: string;
  location: string;
  category: 'Beach' | 'Mountain' | 'Adventure' | 'Historic' | 'City';
  description: string;
  price: number;
  duration: string;
  imageUrl: string;
  rating?: number;
  totalReviews?: number;
  weather: string;
  facilities: string; // Comma separated list
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface Booking {
  id?: number;
  bookingId?: string;
  spotId: number;
  spotTitle?: string;
  imageUrl?: string;
  travelDate: string;
  travelers: number;
  totalPrice?: number;
  status?: 'PENDING' | 'APPROVED' | 'CANCELLED' | 'COMPLETED';
}

export interface Review {
  id?: number;
  spotId: number;
  name: string;
  rating: number;
  comment: string;
}
