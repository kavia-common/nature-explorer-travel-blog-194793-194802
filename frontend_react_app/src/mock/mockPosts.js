const now = new Date();

// PUBLIC_INTERFACE
export function getMockPosts() {
  /** Returns a stable mock dataset for offline/early development. */
  return [
    {
      id: "misty-ridge-01",
      title: "Misty Ridge at Sunrise",
      excerpt:
        "A quiet climb above the treeline—where fog moves like water and every step feels earned.",
      location: "Rocky Mountains",
      theme: "Mountains",
      coverImageUrl: "",
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 20).toISOString(),
      content: [
        "The morning began with a thin blue light behind the pines.",
        "By the time the trail steepened, the world had narrowed to breath, boots, and a ribbon of fog.",
        "At the ridge, the sun didn’t arrive all at once—first it warmed the mist, then it revealed the valley in layers."
      ].join("\n\n")
    },
    {
      id: "river-song-02",
      title: "River Song in Late Summer",
      excerpt:
        "Following a river downstream, listening for the bends—where current and stone write stories together.",
      location: "Pacific Northwest",
      theme: "Rivers",
      coverImageUrl: "",
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 48).toISOString(),
      content: [
        "Some trails are maps. This one was a melody.",
        "The river carried cedar scent, cold spray, and the steady rhythm of moving water.",
        "I stopped often—partly for photographs, mostly to remember how to be still."
      ].join("\n\n")
    },
    {
      id: "forest-cathedral-03",
      title: "Forest Cathedral After Rain",
      excerpt:
        "A slow walk under dripping leaves—where moss holds light and silence has texture.",
      location: "Black Forest",
      theme: "Forests",
      coverImageUrl: "",
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 72).toISOString(),
      content: [
        "Rain doesn’t end in the forest—it lingers.",
        "Every branch becomes a small instrument, tapping water into the understory.",
        "I found a fallen log bright with moss, like the forest had painted it for emphasis."
      ].join("\n\n")
    },
    {
      id: "desert-wind-04",
      title: "Desert Wind & Long Shadows",
      excerpt:
        "When the heat eases, the desert becomes a place of color—soft reds, hard lines, and endless sky.",
      location: "Utah",
      theme: "Desert",
      coverImageUrl: "",
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 120).toISOString(),
      content: [
        "Evening in the desert feels like turning down a volume knob.",
        "The rocks keep their warmth a little longer than the air, and you can watch shadows stretch.",
        "I sat until the first stars found their way through the fading blue."
      ].join("\n\n")
    }
  ];
}
