const avatars = [
  "/images/profiles/profile-1.webp",
  "/images/profiles/profile-2.jpg",
  "/images/profiles/profile3.webp",
];

export function getRandomAvatar(seed: string) {
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % avatars.length;

  return avatars[index];
}