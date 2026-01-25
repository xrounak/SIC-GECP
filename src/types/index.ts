// Member type
export interface Member {
    id: string;
    name: string;
    role: string;
    domain: string;
    image_url: string;
}

// Event type
export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    venue: string;
    status: 'upcoming' | 'past';
}

// Join Application type
export interface JoinApplication {
    id: string;
    name: string;
    email: string;
    branch: string;
    year: string;
    skills: string;
    motivation: string;
    created_at: string;
}

// Event Registration type
export interface EventRegistration {
    id: string;
    event_id: string;
    name: string;
    email: string;
}

// Gallery Image type
export interface GalleryImage {
    id: string;
    image_url: string;
    caption: string;
    created_at: string;
}
