export type QuestionType = 'single' | 'multiple' | 'text';

export interface PollOption {
    id: string;
    label: string;
    value: string;
}

export interface PollQuestion {
    id: string;
    order: number;
    type: QuestionType;
    title: string;
    description?: string;
    /** Optional URL to an illustration/diagram served from static assets or CDN */
    mediaUrl?: string;
    options?: PollOption[];
}

export const POLL_QUESTIONS: PollQuestion[] = [
    // ─── Step 1 — Role / Context ─────────────────────────────────────────────
    {
        id: 'q1',
        order: 1,
        type: 'single',
        title: 'What is your role when using a tourniquet?',
        description:
            'Select the role that best describes your typical situation.',
        options: [
            { id: 'q1_a', label: 'First responder / EMT', value: 'first_responder' },
            { id: 'q1_b', label: 'Military / Tactical operator', value: 'military' },
            { id: 'q1_c', label: 'Civilian bystander', value: 'civilian' },
            { id: 'q1_d', label: 'Medical professional (hospital)', value: 'medical_pro' },
        ],
    },

    // ─── Step 2 — Training level ──────────────────────────────────────────────
    {
        id: 'q2',
        order: 2,
        type: 'single',
        title: 'How would you rate your tourniquet training level?',
        options: [
            { id: 'q2_a', label: 'No training — learning basics', value: 'none' },
            { id: 'q2_b', label: 'Basic first-aid course', value: 'basic' },
            { id: 'q2_c', label: 'TCCC / PHTLS certified', value: 'tccc' },
            { id: 'q2_d', label: 'Advanced trauma instructor', value: 'instructor' },
        ],
    },

    // ─── Step 3 — Equipment familiarity (multi-select) ───────────────────────
    {
        id: 'q3',
        order: 3,
        type: 'multiple',
        title: 'Which tourniquet types have you worked with?',
        description: 'Select all that apply.',
        mediaUrl: 'https://assets.turniket.app/images/tourniquet-types.png',
        options: [
            { id: 'q3_a', label: 'CAT (Combat Application Tourniquet)', value: 'cat' },
            { id: 'q3_b', label: 'SOFTT-W', value: 'softt_w' },
            { id: 'q3_c', label: 'SAM XT', value: 'sam_xt' },
            { id: 'q3_d', label: 'Improvised (belt, rope, etc.)', value: 'improvised' },
            { id: 'q3_e', label: 'None yet', value: 'none' },
        ],
    },

    // ─── Step 4 — Application scenario ──────────────────────────────────────
    {
        id: 'q4',
        order: 4,
        type: 'single',
        title: 'In which scenario would you most likely apply a tourniquet?',
        mediaUrl: 'https://assets.turniket.app/images/scenario-diagram.jpg',
        options: [
            { id: 'q4_a', label: 'Extremity blast / shrapnel injury', value: 'blast' },
            { id: 'q4_b', label: 'Gunshot wound to arm or leg', value: 'gsw' },
            { id: 'q4_c', label: 'Severe laceration with arterial bleeding', value: 'laceration' },
            { id: 'q4_d', label: 'Crush injury / entrapment', value: 'crush' },
        ],
    },

    // ─── Step 5 — Correct placement knowledge ────────────────────────────────
    {
        id: 'q5',
        order: 5,
        type: 'single',
        title: 'Where should a tourniquet be placed for a lower-leg wound?',
        description:
            'Choose the anatomically correct placement according to TCCC guidelines.',
        mediaUrl: 'https://assets.turniket.app/images/limb-placement.svg',
        options: [
            { id: 'q5_a', label: '2–3 inches above the wound', value: 'correct_proximal' },
            { id: 'q5_b', label: 'Directly over the wound site', value: 'over_wound' },
            { id: 'q5_c', label: 'At the joint (knee)', value: 'at_joint' },
            { id: 'q5_d', label: 'On the thigh only', value: 'thigh_only' },
        ],
    },

    // ─── Step 6 — Time awareness ─────────────────────────────────────────────
    {
        id: 'q6',
        order: 6,
        type: 'single',
        title: 'What is the maximum recommended tourniquet application time before reassessment?',
        options: [
            { id: 'q6_a', label: '30 minutes', value: '30_min' },
            { id: 'q6_b', label: '1 hour', value: '1_hour' },
            { id: 'q6_c', label: '2 hours', value: '2_hours' },
            { id: 'q6_d', label: 'It depends — no fixed limit', value: 'depends' },
        ],
    },

    // ─── Step 7 — Pressure & tightness check ─────────────────────────────────
    {
        id: 'q7',
        order: 7,
        type: 'single',
        title: 'How do you confirm a tourniquet is tight enough?',
        options: [
            { id: 'q7_a', label: 'Bleeding stops and distal pulse is absent', value: 'correct' },
            { id: 'q7_b', label: 'Patient reports significant pain', value: 'pain' },
            { id: 'q7_c', label: 'The strap cannot be tightened further', value: 'strap_limit' },
            { id: 'q7_d', label: 'Limb turns blue/purple', value: 'color_change' },
        ],
    },

    // ─── Step 8 — Equipment availability ────────────────────────────────────
    {
        id: 'q8',
        order: 8,
        type: 'multiple',
        title: 'Where do you currently carry or store a tourniquet?',
        description: 'Select all that apply.',
        options: [
            { id: 'q8_a', label: 'On my person / kit', value: 'on_person' },
            { id: 'q8_b', label: 'Vehicle first-aid kit', value: 'vehicle' },
            { id: 'q8_c', label: 'Home first-aid kit', value: 'home' },
            { id: 'q8_d', label: 'Workplace / office kit', value: 'workplace' },
            { id: 'q8_e', label: 'I don\'t carry one', value: 'none' },
        ],
    },

    // ─── Step 9 — Pain & tissue concern ─────────────────────────────────────
    {
        id: 'q9',
        order: 9,
        type: 'single',
        title: 'What is your biggest concern about applying a tourniquet?',
        options: [
            { id: 'q9_a', label: 'Causing unnecessary pain', value: 'pain_concern' },
            { id: 'q9_b', label: 'Applying it incorrectly', value: 'technique' },
            { id: 'q9_c', label: 'Permanent nerve/tissue damage', value: 'nerve_damage' },
            { id: 'q9_d', label: 'No concerns — I am confident', value: 'confident' },
        ],
    },

    // ─── Step 10 — Free-text feedback ────────────────────────────────────────
    {
        id: 'q10',
        order: 10,
        type: 'text',
        title: 'Any additional comments or questions about tourniquet use?',
        description: 'Optional — share anything you\'d like us to know.',
    },
];
