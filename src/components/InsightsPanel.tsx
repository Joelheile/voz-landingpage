import { delay } from "../delay";
import { useInView } from "../hooks/useInView";
import { useTicks } from "../hooks/useTicks";
import { PageBar, Panel } from "./Panel";

const periods = ["Today", "7 days", "30 days", "All time"];

const days = [
  { label: "Fri", height: 34 },
  { label: "Sat", height: 62 },
  { label: "Sun", height: 48 },
  { label: "Mon", height: 0 },
  { label: "Tue", height: 70 },
  { label: "Wed", height: 40 },
  { label: "Thu", height: 100 },
];

const tiles = [
  { value: "148", label: "words per minute" },
  { value: "9m", label: "talking" },
  { value: "46", label: "fillers removed" },
];

const apps = [
  { name: "Slack", icon: "/apps/slack.png", words: 412 },
  { name: "Mail", icon: "/apps/mail.png", words: 348 },
  { name: "Notion", icon: "/apps/notion.png", words: 236 },
  { name: "Messages", icon: "/apps/messages.png", words: 182 },
  { name: "Notes", icon: "/apps/notes.png", words: 106 },
];

const weekWords = 1284;
const countTicks = 30;
const easeOut = (x: number) => 1 - (1 - x) ** 3;

export function InsightsPanel() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const t = useTicks({
    running: inView,
    interval: 30,
    length: countTicks,
    loop: false,
  });
  const words = Math.round(weekWords * easeOut(t / (countTicks - 1)));

  return (
    <div ref={ref} className="insights" data-inview={inView}>
      <Panel label="Insights for the last 7 days: 1,284 words, 148 words per minute and the apps you dictate into most">
        <PageBar title="Insights" />
        <div className="segmented">
          {periods.map((period) => (
            <span key={period} data-selected={period === "7 days"}>
              {period}
            </span>
          ))}
        </div>
        <div className="total">
          <strong>{words.toLocaleString("en-US")}</strong>
          <span>words</span>
        </div>
        <div className="chart">
          {days.map((day, i) => (
            <span key={day.label}>
              <i
                data-empty={day.height === 0}
                style={{ ...delay(i * 40), height: `${Math.max(day.height, 2)}%` }}
              />
              <small>{day.label}</small>
            </span>
          ))}
        </div>
        <div className="tiles">
          {tiles.map((tile) => (
            <span key={tile.label}>
              <strong>{tile.value}</strong>
              {tile.label}
            </span>
          ))}
        </div>
        <span className="panel-label">Top apps</span>
        <ul className="apps">
          {apps.map((app) => (
            <li key={app.name}>
              <img src={app.icon} alt="" width={18} height={18} />
              {app.name}
              <span className="count">{app.words}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
