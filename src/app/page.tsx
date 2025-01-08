import { formatMoney } from "@/lib/utils";

export default function Home() {
  const money = formatMoney(100000);
  return (
    <div>
      <h1>Home</h1>
      <span>Phan Văn Thành</span>
      <p>This will is Landing Page</p>
      {money}
    </div>
  );
}
