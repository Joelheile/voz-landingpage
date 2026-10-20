import { delay } from "../delay";
import { useInView } from "../hooks/useInView";
import { useTicks } from "../hooks/useTicks";
import { PageBar, Panel } from "./Panel";

const days = [
  32, 48, 20, 64, 58, 12, 8, 70, 44, 52, 90, 36, 18, 10, 62, 76, 40, 84, 56, 22,
  14, 66, 72, 50, 96, 60, 28, 80, 88, 100,
];

const apps = [
  { name: "Slack", words: 412 },
  { name: "Mail", words: 288 },
  { name: "Cursor", words: 196 },
  { name: "Notion", words: 154 },
  { name: "Messages", words: 98 },
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
      <Panel label="Insights: 1,284 words this week, a chart of the last 30 days and top apps">
        <PageBar title="Insights" />
        <strong className="panel-display">
          {words.toLocaleString("en-US")} words this week
        </strong>
        <p className="panel-text">
          212 today, 18,940 in total, about 7 h of typing saved. You speak at
          148 words per minute. Voz removed 311 filler words.
        </p>
        <span className="panel-label">Last 30 days</span>
        <div className="chart">
          {days.map((height, i) => (
            <i key={i} style={{ ...delay(i * 18), height: `${height}%` }} />
          ))}
        </div>
        <span className="panel-label">Top apps</span>
        <ul className="apps">
          {apps.map((app, i) => (
            <li key={app.name}>
              <span>{app.name}</span>
              <span className="usage">
                <i
                  style={{
                    ...delay(300 + i * 50),
                    width: `${(app.words / apps[0].words) * 100}%`,
                  }}
                />
              </span>
              <span className="count">{app.words}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
