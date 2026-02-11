// Member type
export interface Member {
    id: string;
    name: string;
    role: string;
    domain: string;
    image_url: string;
    bio_md?: string;
    created_at?: string;
}

// Event type
export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    venue: string;
    status: 'upcoming' | 'past';
    content_md?: string;
    created_at?: string;
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
    // Team Leader (required)
    team_leader_name: string;
    team_leader_branch: string;
    team_leader_year: string;
    team_leader_email: string;
    team_leader_mobile: string;
    // Team Member 1 (optional)
    member1_name?: string;
    member1_branch?: string;
    member1_year?: string;
    // Team Member 2 (optional)
    member2_name?: string;
    member2_branch?: string;
    member2_year?: string;
    // Team Member 3 (optional)
    member3_name?: string;
    member3_branch?: string;
    member3_year?: string;
    // Team Member 4 (optional)
    member4_name?: string;
    member4_branch?: string;
    member4_year?: string;
    created_at?: string;
}

// Gallery Image type
export interface GalleryImage {
    id: string;
    image_url: string;
    caption: string;
    details_md?: string;
    created_at: string;
}
