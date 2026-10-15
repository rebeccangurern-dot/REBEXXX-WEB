import { AudioTrack, VisualEntry, PinterestBoard, NotebookEntry, SocialLink } from '../types';

export const ARTIST_INFO = {
  name: 'REBEXXX',
  location: 'Nairobi, Kenya',
  origin: 'Nairobi, Kenya',
  headline: 'NOT HERE TO BE ONE THING.',
  subheadline: 'Songs, feelings and other forms of becoming.',
  coreIdea: 'REBEXXX is not a finished character. She is a world in motion.',
  statusBanner: 'Some things are still becoming. Stay close.',
  shortBio:
    'REBEXXX is an emerging genre-fluid singer-songwriter and multidisciplinary artist based in Nairobi, Kenya. Enigmatic, sensual, honest, hopeful, daring, adaptable, rebellious, and kind. She gives meaning to the words she sings and writes in a world where generic is the norm.',
  longBio: [
    "I used to perform concerts at home for 100,000 imaginary fans: my dolls. They sat across the floor in patient rows, listening to melodies I pulled out of thin air. Now I'm keeping the promise I made to that younger version of myself.",
    "I've wanted to be an artist for as long as I can remember. I've always found ways to express myself through what I wear, what I paint, what I write, and what I imagine.",
    "That same creative instinct follows me into everything I build, including my businesses. I love taking an idea, imagining what it could become, and finding ways to bring it to life. Whether I'm creating music, developing a concept, or building something from the ground up, I'm drawn to possibilities that don't yet have a shape.",
    "I'm genre-fluid by nature. I don't want to be confined to one sound, one medium, or one version of myself.",
    "I don't have everything figured out, and I don't need to. I'm giving myself permission to create, experiment, be seen, and discover how far I can go.",
    "This is me, right now. It doesn't dictate who I'll be tomorrow. But choosing this path feels like a step towards the person I've always imagined becoming.",
    "It's been brewing in me for a long time. It's time for the world to see. It's time for me to see myself.",
  ],
  influences: [
    { name: 'Sevdaliza', resonance: 'Daring sonic textures and mysterious avant-garde presence' },
    { name: 'Beyoncé', resonance: 'Uncompromising vocal discipline, authority, and artistic rigor' },
    { name: 'Charli XCX', resonance: 'Hyper-kinetic pop experimentation and fearless reinvention' },
    { name: 'Amaarae', resonance: 'Ethereal sensuality, genre fluidity, and modern African futurism' },
    { name: 'Rihanna', resonance: 'Magnetic poise, effortless confidence, and tactile fashion instinct' },
    { name: 'Tame Impala', resonance: 'Psychedelic chord progressions and cinematic sonic immersion' },
    { name: 'Doja Cat', resonance: 'Playful unpredictability, vocal elasticity, and sharp lyricism' },
    { name: '50 Cent', resonance: 'Unyielding attitude, grit, and hypnotic rhythm cadences' },
    { name: 'Britney Spears', resonance: 'Pure pop emotion, vulnerability, and primal hook intuition' },
  ],
  dimensions: [
    {
      title: 'Sound & Songwriting',
      description:
        'Genre-fluid arrangements merging nocturnal R&B basslines, alternative rock distortion, African rhythmic nuances, and intimate confessionals.',
    },
    {
      title: 'The Hue of Blue and the Blues',
      description:
        'Currently working on a collection of huge canvases and oil paint, born from channeling feelings after a dark time and exploring how blue mixes with other colors to evoke emotion.',
    },
    {
      title: 'Studio Journals & Manuscripts',
      description:
        'Documenting the creative fire in Nairobi studios — from the nervous first session making UH HUH to discovering mastery and the hunger to grow.',
    },
    {
      title: 'Visual Moodboards & Universe',
      description:
        'Curated aesthetic archives, Pinterest boards, and atmospheric worlds defining the emerging multidisciplinary vision of REBEXXX.',
    },
  ],
};

export const UNRELEASED_TRACKS: AudioTrack[] = [
  {
    id: 'track-uh-huh',
    title: 'UH HUH',
    subtitle: 'Official Unreleased Song (Private Demo)',
    durationSeconds: 168,
    status: 'In Studio / Demo',
    bpm: 104,
    key: 'C Minor',
    sonicMood: 'Sensual bass bounce, genre-fluid alternative pop, sharp vocal confidence & effortless cool',
    lyricsExcerpt:
      "I dont want to live my life and let it's waste / Uh Huh, / Kila mahali mi nacheki copy paste / I built my back you can't break it.",
    description:
      'The official debut unreleased song by REBEXXX. An unapologetic, genre-fluid exploration of confidence, sensuality, and vocal swagger with deep sub-bass and sharp vocal delivery.',
    credits: 'Written & Performed by REBEXXX · Produced in Nairobi',
    recordedAt: 'Nairobi Studio Sessions, 2026',
    externalUrl:
      'https://soundcloud.com/user-669712436/uh-huh-gen1/s-WXRsd2Eqdeo?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing&si=a384bd325ff942978d810c832c0e513d',
    isPrivateTrack: true,
  },
];

export const PINTEREST_BOARDS: PinterestBoard[] = [
  {
    id: 'pin-2026-becoming',
    title: '2026 becoming',
    subtitle: 'Entering a new Timeline',
    url: 'https://pinterest.com',
    curatorNotes: 'Entering a new Timeline',
  },
  {
    id: 'pin-bdd',
    title: 'BDD',
    subtitle: "She's not bad, she's free",
    url: 'https://pinterest.com',
    curatorNotes: "She's not bad, she's free",
  },
  {
    id: 'pin-girl',
    title: 'Girl',
    subtitle: 'I just want to GIRL. I LOVE BEING A GIRL!',
    url: 'https://pinterest.com',
    curatorNotes: 'I just want to GIRL. I LOVE BEING A GIRL!',
  },
  {
    id: 'pin-rebecca-voyage',
    title: 'REBECCA VOYAGE',
    subtitle: 'The creative mood board for RV BEAUTY.',
    url: 'https://pinterest.com',
    curatorNotes: 'The creative mood board for RV BEAUTY.',
  },
];

export const VISUAL_JOURNAL: VisualEntry[] = [
  {
    id: 'vis-painting-01',
    title: 'The Hue of Blue and the Blues (Canvas I)',
    category: 'Paintings',
    medium: 'Huge Canvases & Oil Paint',
    year: '2026',
    imageSrc: '/images/painting_hue_of_blue_01.jpg',
    altText: 'Huge canvas oil painting from the collection THE HUE OF BLUE AND THE BLUES by REBEXXX',
    caption: 'Part of the ongoing collection "THE HUE OF BLUE AND THE BLUES".',
    notes:
      'Currently working on a collection named "THE HUE OF BLUE AND THE BLUES". A lot of inspiration is taken from the color blue and how it mixes with other colors to bring forth emotion. Huge canvases and oil paint. A lot of this came forth after a dark time, where I channeled my feelings to my canvas and brought forth this collection.',
    dimensions: 'Huge Canvas · Oil on Linen',
  },
  {
    id: 'vis-painting-02',
    title: 'The Hue of Blue and the Blues (Canvas II)',
    category: 'Paintings',
    medium: 'Huge Canvases & Oil Paint',
    year: '2026',
    imageSrc: '/images/painting_hue_of_blue_02.jpg',
    altText: 'Second huge canvas oil painting study from THE HUE OF BLUE AND THE BLUES collection by REBEXXX',
    caption: 'Emotional resonance of blue mixing with earthy and deep pigments on large-scale linen.',
    notes:
      'Currently working on a collection named "THE HUE OF BLUE AND THE BLUES". A lot of inspiration is taken from the color blue and how it mixes with other colors to bring forth emotion. Huge canvases and oil paint. A lot of this came forth after a dark time, where I channeled my feelings to my canvas and brought forth this collection.',
    dimensions: 'Huge Canvas · Oil on Linen',
  },
  {
    id: 'vis-studio-01',
    title: 'Making UH HUH (Studio Journal)',
    category: 'Studio Journal',
    medium: 'Documentary Studio Photography & Personal Journal',
    year: '2026',
    imageSrc: '/images/rebexxx_studio_mood_1791886056599.jpg',
    altText: 'REBEXXX studio workspace and recording setup in Nairobi',
    caption: 'When I made UH HUH, it was my first time in the studio. I was really nervous but I did it anyway.',
    notes:
      "When I made UH HUH, it was my first time in the studio. I was really nervous but I did it anyway. I wrote the song pretty fast, everyone was amazed and surprised at that especially for a first timer. In that moment that's when I knew I can actually do it. I saw proof that the process isn't hard, and I'm great at it. Its a fabulous place for me to grow. I want more.",
    dimensions: 'Nairobi Studio Sessions · First Studio Session',
  },
];

export const NOTEBOOK_ENTRIES: NotebookEntry[] = [
  {
    id: 'note-uh-huh',
    title: 'UH HUH',
    category: 'Lyric Draft',
    writtenIn: 'Nairobi Studio Sessions',
    stanzas: [
      "I dont want to live my life and let it's waste",
      'Uh Huh,',
      'Kila mahali mi nacheki copy paste,',
      'Uh Huh,',
      'They say life is sweet never had a taste,',
      'Uh Huh,',
      "I've been working magic that's whay you see,",
      'Ta-dah',
      'Uh Huh',
      '',
      'Uh-huh,',
      'Live my life, I know you want to taste it,',
      'I dont want to change my life to make it,',
      'Be my guest baby but dont defend it,',
      'I know you like to copy and paste it,',
      'And now I feel so wasted,',
      'And my heart is tainted,',
      "I built my back you can't break it.",
      'Uh Huh!',
    ],
    artistReflection:
      "When I made UH HUH, it was my first time in the studio. I was really nervous but I did it anyway. I wrote the song pretty fast, everyone was amazed and surprised at that especially for a first timer. In that moment that's when I knew I can actually do it. I saw proof that the process isn't hard, and I'm great at it. Its a fabulous place for me to grow. I want more.",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'YouTube',
    handle: '@rebexxxe',
    url: 'https://youtube.com/@rebexxxe?si=Pua7V5_i7NCPGj3n',
    status: 'Active',
    note: 'Official artist channel, music videos, singles & visualizers',
  },
  {
    platform: 'Spotify',
    handle: 'REBEXXX',
    url: 'https://open.spotify.com',
    status: 'Active',
    note: 'Official Spotify artist profile, stream releases & save upcoming tracks',
  },
  {
    platform: 'Instagram',
    handle: '@rebabesss',
    url: 'https://instagram.com/rebabesss?rpxt=MWk3NTczNjgxdHFseA%3D%3D',
    status: 'Active',
    note: 'Visual archive, studio fragments, fashion & aesthetic updates',
  },
  {
    platform: 'SoundCloud',
    handle: 'REBEXXX (Private Vault)',
    url: 'https://soundcloud.com/user-669712436/uh-huh-gen1/s-WXRsd2Eqdeo?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing&si=a384bd325ff942978d810c832c0e513d',
    status: 'Active',
    note: 'Private listening room & unreleased song demo (UH HUH).',
  },
  {
    platform: 'Apple Music',
    handle: 'REBEXXX',
    url: 'https://music.apple.com',
    status: 'Pending Release',
    note: 'Official artist catalogue opening soon.',
  },
  {
    platform: 'TikTok',
    handle: '@rebexxx',
    url: 'https://tiktok.com',
    status: 'Active',
    note: 'Raw vocal experiments, studio moments & creative journal',
  },
];

