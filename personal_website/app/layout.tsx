// app/layout.tsx

import './global.css'
import Sidebar from './sidebar'

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}