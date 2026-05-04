export interface ProofStat {
  value: string;
  label: string;
  sublabel?: string;
}

const proofStats: ProofStat[] = [
  {
    value: "10+",
    label: "Apps Shipped",
    sublabel: "App Store & Play Store",
  },
  {
    value: "25K+",
    label: "Users Served",
    sublabel: "Across production apps",
  },
  {
    value: "4.5+",
    label: "Average Rating",
    sublabel: "From real users",
  },
  {
    value: "5",
    label: "RN Upgrades Led",
    sublabel: "0.71 → 0.79 → 0.81 → 0.82",
  },
  {
    value: "40%",
    label: "Perf Improvements",
    sublabel: "Re-render & frame-time wins",
  },
  {
    value: "100+",
    label: "Mentees Trained",
    sublabel: "RN, TS, Redux, performance",
  },
];

export default proofStats;
