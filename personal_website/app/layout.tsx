// app/layout.tsx

import './global.css'
import Sidebar from './sidebar'

export const metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio website',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}