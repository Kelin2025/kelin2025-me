import { css } from "@/lib/styled";
import { h, spec } from "forest";
import { openTab } from "@/lib/route";
import { eventWithData } from "@/lib/dom-utils";

import { attachClick } from "@/ui/logic/click";

import twitch from "@/ui/assets/icons/twitch.svg";
import discord from "@/ui/assets/icons/discord.svg";
import youtube from "@/ui/assets/icons/youtube.svg";
import { Grid, Card, Icon } from "@/ui";
import { $device } from "@/ui/logic/screen";

css`
  [data-contact-card]:hover {
    color: #fff;
    background: var(--color);
  }

  [data-contact-title] {
    color: #fff;
    margin: 20px 0 0;
  }
`;

const $cols = $device.map(device =>
  device === "phone" ? "1fr" : "1fr 1fr 1fr"
);

export const ContactsCards = () => {
  Grid({ cols: $cols }, () => {
    Card(() => {
      spec({ data: { color: "twitch", contactCard: true } });
      Icon({ link: twitch, scale: 3 });
      h("h3", { text: "Twitch", data: { contactTitle: true } });
      attachClick(eventWithData("https://twitch.tv/kelin2025", openTab));
    });
    Card(() => {
      spec({ data: { color: "youtube", contactCard: true } });
      Icon({ link: youtube, scale: 3 });
      h("h3", { text: "Youtube", data: { contactTitle: true } });
      attachClick(eventWithData("https://youtube.com/kelin2025", openTab));
    });
    Card(() => {
      spec({ data: { color: "discord", contactCard: true } });
      Icon({ link: discord, scale: 3 });
      h("h3", { text: "Discord", data: { contactTitle: true } });
      attachClick(eventWithData("https://discord.gg/ZNxXVs9", openTab));
    });
  });
};
