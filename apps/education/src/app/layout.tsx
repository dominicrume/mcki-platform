import "../styles/globals.css";
export const metadata = { title: "MCKI · education" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  </head><body>{children}</body></html>);
}
