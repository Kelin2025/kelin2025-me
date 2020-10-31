export const getIconPath = ({ id, icon }: { id: number; icon: string }) =>
  `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${id}/${icon}.jpg`;

export const getGamePath = ({ id }: { id: number }) =>
  `https://kelin2025.me/steam/${id}`;
